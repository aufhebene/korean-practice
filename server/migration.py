"""Migrate data from data/users.json into SQLite database."""

import json
import os

from sqlalchemy.orm import Session

from server.auth import hash_password
from server.config import DATA_DIR
from server.database import SessionLocal, init_db
from server.models import User, UserProgress, LessonProgress, VocabularyProgress


DEFAULT_PASSWORD = "changeme123"


def migrate_users():
    """Read data/users.json and insert into SQLite (idempotent)."""
    init_db()

    users_path = os.path.join(DATA_DIR, "users.json")
    if not os.path.isfile(users_path):
        print("No users.json found, skipping migration.")
        return

    with open(users_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    users = data.get("users", [])
    if not users:
        print("No users to migrate.")
        return

    db: Session = SessionLocal()
    migrated = 0

    try:
        for u in users:
            user_id = u.get("id", "")
            if not user_id:
                continue

            # Skip if already migrated
            existing = db.query(User).filter(User.id == user_id).first()
            if existing:
                continue

            # Create user
            user = User(
                id=user_id,
                username=user_id,
                name=u.get("name", "User"),
                password_hash=hash_password(DEFAULT_PASSWORD),
                created_at=u.get("created_at", ""),
                last_login=u.get("progress", {}).get("last_login"),
            )
            db.add(user)

            # Create progress summary
            progress_data = u.get("progress", {})
            progress = UserProgress(
                user_id=user_id,
                lessons_completed=progress_data.get("lessons_completed", 0),
                vocabulary_mastered=progress_data.get("vocabulary_mastered", 0),
                grammar_points_learned=progress_data.get("grammar_points_learned", 0),
            )
            db.add(progress)

            # Migrate lesson progress
            for lesson_id, lesson_info in progress_data.get("lessons", {}).items():
                lp = LessonProgress(
                    user_id=user_id,
                    lesson_id=lesson_id,
                    status=lesson_info.get("status", "in_progress"),
                    updated_at=lesson_info.get("updated_at", ""),
                )
                db.add(lp)

            # Migrate vocabulary progress
            for word_id, vocab_info in progress_data.get("vocabulary", {}).items():
                vp = VocabularyProgress(
                    user_id=user_id,
                    word_id=word_id,
                    attempts=vocab_info.get("attempts", 0),
                    correct=vocab_info.get("correct", 0),
                    last_practiced=vocab_info.get("last_practiced"),
                    next_review=vocab_info.get("next_review"),
                )
                db.add(vp)

            migrated += 1

        db.commit()
        print(f"Migration complete: {migrated} user(s) migrated.")
        if migrated > 0:
            print(f"WARNING: Migrated users have default password '{DEFAULT_PASSWORD}'. Please change it.")
    except Exception as e:
        db.rollback()
        print(f"Migration failed: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    migrate_users()
