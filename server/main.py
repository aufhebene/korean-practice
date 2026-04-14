from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server.database import init_db
from server.migration import migrate_users
from server.routers import auth, users, progress, review


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: initialize DB and run migration
    init_db()
    migrate_users()
    yield


app = FastAPI(
    title="KoreanEdu API",
    description="Korean Language Learning App - User Profile Management Server",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(progress.router)
app.include_router(review.router)


@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server.main:app", host="0.0.0.0", port=8000, reload=True)
