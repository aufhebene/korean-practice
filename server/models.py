from sqlalchemy import Column, String, Integer, ForeignKey, Text
from sqlalchemy.orm import relationship

from server.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)
    username = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(String, nullable=False)
    last_login = Column(String)

    progress = relationship(
        "UserProgress", back_populates="user", uselist=False,
        cascade="all, delete-orphan",
    )
    lesson_progress = relationship(
        "LessonProgress", back_populates="user",
        cascade="all, delete-orphan",
    )
    vocabulary_progress = relationship(
        "VocabularyProgress", back_populates="user",
        cascade="all, delete-orphan",
    )
    study_sessions = relationship(
        "StudySession", back_populates="user",
        cascade="all, delete-orphan",
    )


class UserProgress(Base):
    __tablename__ = "user_progress"

    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    lessons_completed = Column(Integer, nullable=False, default=0)
    vocabulary_mastered = Column(Integer, nullable=False, default=0)
    grammar_points_learned = Column(Integer, nullable=False, default=0)

    user = relationship("User", back_populates="progress")


class LessonProgress(Base):
    __tablename__ = "lesson_progress"

    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    lesson_id = Column(String, primary_key=True)
    status = Column(String, nullable=False, default="in_progress")
    updated_at = Column(String, nullable=False)

    user = relationship("User", back_populates="lesson_progress")


class VocabularyProgress(Base):
    __tablename__ = "vocabulary_progress"

    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    word_id = Column(String, primary_key=True)
    attempts = Column(Integer, nullable=False, default=0)
    correct = Column(Integer, nullable=False, default=0)
    last_practiced = Column(String)
    next_review = Column(String)

    user = relationship("User", back_populates="vocabulary_progress")


class StudySession(Base):
    __tablename__ = "study_sessions"

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    quiz_type = Column(String, nullable=False)
    score = Column(Integer, nullable=False)
    total = Column(Integer, nullable=False)
    completed_at = Column(String, nullable=False)

    user = relationship("User", back_populates="study_sessions")
