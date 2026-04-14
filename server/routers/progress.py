from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from server.auth import get_current_user
from server.database import get_db
from server.models import User, LessonProgress, VocabularyProgress
from server.schemas import (
    LessonProgressUpdate,
    LessonProgressResponse,
    VocabularyPracticeRecord,
    VocabularyProgressResponse,
)

router = APIRouter(prefix="/progress", tags=["progress"])


def _calculate_next_review(attempts: int, correct: int) -> str:
    """Spaced repetition algorithm (mirrors src/database.jl)."""
    if attempts == 0:
        return None
    success_rate = correct / attempts
    if success_rate > 0.8:
        days = 7
    elif success_rate > 0.6:
        days = 3
    else:
        days = 1
    return (datetime.now(timezone.utc) + timedelta(days=days)).isoformat()


def _is_mastered(attempts: int, correct: int) -> bool:
    return attempts >= 3 and (correct / attempts) > 0.8


# --- Lesson Progress ---

@router.get("/lessons", response_model=list[LessonProgressResponse])
def get_lesson_progress(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    rows = (
        db.query(LessonProgress)
        .filter(LessonProgress.user_id == current_user.id)
        .all()
    )
    return rows


@router.put("/lessons", response_model=LessonProgressResponse)
def update_lesson_progress(
    req: LessonProgressUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    now = datetime.now(timezone.utc).isoformat()

    row = (
        db.query(LessonProgress)
        .filter(
            LessonProgress.user_id == current_user.id,
            LessonProgress.lesson_id == req.lesson_id,
        )
        .first()
    )

    if row:
        row.status = req.status
        row.updated_at = now
    else:
        row = LessonProgress(
            user_id=current_user.id,
            lesson_id=req.lesson_id,
            status=req.status,
            updated_at=now,
        )
        db.add(row)

    # Update aggregate counter
    db.flush()
    completed_count = (
        db.query(LessonProgress)
        .filter(
            LessonProgress.user_id == current_user.id,
            LessonProgress.status == "completed",
        )
        .count()
    )
    current_user.progress.lessons_completed = completed_count
    db.commit()
    db.refresh(row)
    return row


# --- Vocabulary Progress ---

@router.get("/vocabulary", response_model=list[VocabularyProgressResponse])
def get_vocabulary_progress(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    rows = (
        db.query(VocabularyProgress)
        .filter(VocabularyProgress.user_id == current_user.id)
        .all()
    )
    return [
        VocabularyProgressResponse(
            word_id=r.word_id,
            attempts=r.attempts,
            correct=r.correct,
            last_practiced=r.last_practiced,
            next_review=r.next_review,
            mastered=_is_mastered(r.attempts, r.correct),
        )
        for r in rows
    ]


@router.post("/vocabulary", response_model=VocabularyProgressResponse)
def record_vocabulary_practice(
    req: VocabularyPracticeRecord,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    now = datetime.now(timezone.utc).isoformat()

    row = (
        db.query(VocabularyProgress)
        .filter(
            VocabularyProgress.user_id == current_user.id,
            VocabularyProgress.word_id == req.word_id,
        )
        .first()
    )

    if row:
        row.attempts += 1
        if req.correct:
            row.correct += 1
        row.last_practiced = now
        row.next_review = _calculate_next_review(row.attempts, row.correct)
    else:
        correct_val = 1 if req.correct else 0
        row = VocabularyProgress(
            user_id=current_user.id,
            word_id=req.word_id,
            attempts=1,
            correct=correct_val,
            last_practiced=now,
            next_review=_calculate_next_review(1, correct_val),
        )
        db.add(row)

    # Update mastered count
    db.flush()
    all_vocab = (
        db.query(VocabularyProgress)
        .filter(VocabularyProgress.user_id == current_user.id)
        .all()
    )
    mastered_count = sum(1 for v in all_vocab if _is_mastered(v.attempts, v.correct))
    current_user.progress.vocabulary_mastered = mastered_count
    db.commit()
    db.refresh(row)

    return VocabularyProgressResponse(
        word_id=row.word_id,
        attempts=row.attempts,
        correct=row.correct,
        last_practiced=row.last_practiced,
        next_review=row.next_review,
        mastered=_is_mastered(row.attempts, row.correct),
    )
