from pydantic import BaseModel, ConfigDict, field_validator


# --- Auth ---

class SignupRequest(BaseModel):
    username: str
    name: str
    password: str

    @field_validator("username")
    @classmethod
    def validate_username(cls, v: str) -> str:
        if len(v) < 3 or len(v) > 50:
            raise ValueError("username must be 3-50 characters")
        if not v.replace("_", "").isalnum():
            raise ValueError("username must be alphanumeric (underscores allowed)")
        return v

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("password must be at least 8 characters")
        return v


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


# --- User Profile ---

class UserProgressSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    lessons_completed: int = 0
    vocabulary_mastered: int = 0
    grammar_points_learned: int = 0


class UserProfile(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    username: str
    name: str
    created_at: str
    last_login: str | None = None
    progress: UserProgressSummary | None = None


class UserUpdateRequest(BaseModel):
    name: str | None = None


# --- Lesson Progress ---

class LessonProgressUpdate(BaseModel):
    lesson_id: str
    status: str

    @field_validator("status")
    @classmethod
    def validate_status(cls, v: str) -> str:
        if v not in ("in_progress", "completed"):
            raise ValueError("status must be 'in_progress' or 'completed'")
        return v


class LessonProgressResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    lesson_id: str
    status: str
    updated_at: str


# --- Vocabulary Practice ---

class VocabularyPracticeRecord(BaseModel):
    word_id: str
    correct: bool


class VocabularyProgressResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    word_id: str
    attempts: int
    correct: int
    last_practiced: str | None = None
    next_review: str | None = None
    mastered: bool = False


# --- Review ---

class ReviewWordResponse(BaseModel):
    word_id: str
    korean: str
    romanized: str
    english: str
    category: str
    attempts: int
    correct: int
    success_rate: float
