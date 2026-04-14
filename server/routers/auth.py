import hashlib
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from server.auth import hash_password, verify_password, create_access_token
from server.database import get_db
from server.models import User, UserProgress
from server.schemas import SignupRequest, LoginRequest, TokenResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup", response_model=TokenResponse)
def signup(req: SignupRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.username == req.username).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken",
        )

    now = datetime.now(timezone.utc).isoformat()
    user_id = hashlib.sha256(
        f"{req.username}:{now}".encode()
    ).hexdigest()[:16]

    user = User(
        id=user_id,
        username=req.username,
        name=req.name,
        password_hash=hash_password(req.password),
        created_at=now,
        last_login=now,
    )
    progress = UserProgress(user_id=user_id)

    db.add(user)
    db.add(progress)
    db.commit()

    token = create_access_token(user.id)
    return TokenResponse(access_token=token)


@router.post("/login", response_model=TokenResponse)
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == req.username).first()
    if not user or not verify_password(req.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )

    user.last_login = datetime.now(timezone.utc).isoformat()
    db.commit()

    token = create_access_token(user.id)
    return TokenResponse(access_token=token)
