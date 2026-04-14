import json
import os
from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from server.auth import get_current_user
from server.config import DATA_DIR
from server.database import get_db
from server.models import User, VocabularyProgress
from server.schemas import ReviewWordResponse

router = APIRouter(prefix="/review", tags=["review"])

# Vocabulary lookup cache: word_id -> {korean, romanized, english, category}
_vocab_cache: dict[str, dict] = {}


def _load_vocab_cache():
    if _vocab_cache:
        return
    vocab_path = os.path.join(DATA_DIR, "vocabulary.json")
    if not os.path.isfile(vocab_path):
        return
    with open(vocab_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    for category in data.get("categories", []):
        cat_id = category["id"]
        cat_name = category["name"]
        for word in category.get("words", []):
            wid = f"{cat_id}:{word['korean']}"
            _vocab_cache[wid] = {
                "korean": word["korean"],
                "romanized": word["romanized"],
                "english": word["english"],
                "category": cat_name,
            }


@router.get("/due", response_model=list[ReviewWordResponse])
def get_due_for_review(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    _load_vocab_cache()

    now = datetime.now(timezone.utc).isoformat()

    due_rows = (
        db.query(VocabularyProgress)
        .filter(
            VocabularyProgress.user_id == current_user.id,
            VocabularyProgress.next_review.isnot(None),
            VocabularyProgress.next_review <= now,
        )
        .all()
    )

    results = []
    for row in due_rows:
        word_info = _vocab_cache.get(row.word_id)
        if not word_info:
            continue
        success_rate = row.correct / row.attempts if row.attempts > 0 else 0.0
        results.append(
            ReviewWordResponse(
                word_id=row.word_id,
                korean=word_info["korean"],
                romanized=word_info["romanized"],
                english=word_info["english"],
                category=word_info["category"],
                attempts=row.attempts,
                correct=row.correct,
                success_rate=round(success_rate, 2),
            )
        )
    return results
