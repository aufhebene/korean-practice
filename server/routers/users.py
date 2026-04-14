from sqlalchemy import func

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from server.auth import get_current_user
from server.database import get_db
from server.models import User, VocabularyProgress, StudySession
from server.schemas import UserProfile, UserUpdateRequest

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserProfile)
def get_my_profile(current_user: User = Depends(get_current_user)):
    return current_user


@router.get("/me/stats")
def get_my_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # Total unique items studied
    total_studied = (
        db.query(func.count(VocabularyProgress.word_id))
        .filter(VocabularyProgress.user_id == current_user.id)
        .scalar() or 0
    )

    # Total attempts and correct
    totals = (
        db.query(
            func.sum(VocabularyProgress.attempts),
            func.sum(VocabularyProgress.correct),
        )
        .filter(VocabularyProgress.user_id == current_user.id)
        .first()
    )
    total_attempts = totals[0] or 0
    total_correct = totals[1] or 0
    accuracy = round((total_correct / total_attempts * 100)) if total_attempts > 0 else 0

    # Mastered count
    mastered = current_user.progress.vocabulary_mastered if current_user.progress else 0

    # Session count and streak calculation
    session_dates = (
        db.query(func.substr(StudySession.completed_at, 1, 10))
        .filter(StudySession.user_id == current_user.id)
        .distinct()
        .all()
    )
    unique_dates = sorted([d[0] for d in session_dates], reverse=True)

    streak = 0
    if unique_dates:
        from datetime import datetime, timedelta, timezone
        today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        # Allow streak to include today or yesterday
        expected = today
        for date_str in unique_dates:
            if date_str == expected:
                streak += 1
                prev = datetime.strptime(expected, "%Y-%m-%d") - timedelta(days=1)
                expected = prev.strftime("%Y-%m-%d")
            elif date_str < expected:
                # Check if yesterday counts as start
                if streak == 0:
                    yesterday = (datetime.now(timezone.utc) - timedelta(days=1)).strftime("%Y-%m-%d")
                    if date_str == yesterday:
                        streak += 1
                        prev = datetime.strptime(yesterday, "%Y-%m-%d") - timedelta(days=1)
                        expected = prev.strftime("%Y-%m-%d")
                        continue
                break

    return {
        "total_studied": total_studied,
        "mastered": mastered,
        "accuracy": accuracy,
        "streak": streak,
        "total_sessions": len(unique_dates),
    }


@router.put("/me", response_model=UserProfile)
def update_my_profile(
    req: UserUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if req.name is not None:
        current_user.name = req.name
    db.commit()
    db.refresh(current_user)
    return current_user


@router.delete("/me")
def delete_my_account(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    db.delete(current_user)
    db.commit()
    return {"message": "Account deleted"}
