from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi.middleware.cors import CORSMiddleware

from dependencies import get_current_user
from database import engine, Base, get_db
import models
import schemas
from auth import (
    hash_password,
    verify_password,
    create_access_token
)

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DoubtSense API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------- HOME ----------------

@app.get("/")
def home():
    return {
        "message": "DoubtSense Backend Running"
    }


# ---------------- REGISTER ----------------

@app.post("/register")
def register_user(
    user: schemas.UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = models.User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }


# ---------------- LOGIN ----------------

@app.post("/login")
def login_user(
    user: schemas.UserLogin,
    db: Session = Depends(get_db)
):

    db_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(
        user.password,
        db_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {"sub": db_user.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": db_user.role,
        "name": db_user.name
    }


# ---------------- SUBMIT DOUBT ----------------

@app.post("/doubts")
def create_doubt(
    doubt: schemas.DoubtCreate,
    student_id: int,
    db: Session = Depends(get_db)
):

    student = db.query(models.User).filter(
        models.User.id == student_id
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    new_doubt = models.Doubt(
        subject=doubt.subject,
        topic=doubt.topic,
        description=doubt.description,
        difficulty=doubt.difficulty,
        student_id=student_id
    )

    db.add(new_doubt)
    db.commit()
    db.refresh(new_doubt)

    return {
        "message": "Doubt submitted successfully"
    }


# ---------------- VIEW ALL DOUBTS ----------------

@app.get("/doubts")
def get_all_doubts(
    db: Session = Depends(get_db)
):

    doubts = db.query(models.Doubt).all()

    return doubts

# ---------------- Temporary Endpoints for Testing------------
@app.get("/debug-users")
def debug_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users
# ---------------- STUDENT DOUBTS ----------------

@app.get("/student/{student_id}/doubts")
def get_student_doubts(
    student_id: int,
    db: Session = Depends(get_db)
):

    doubts = db.query(models.Doubt).filter(
        models.Doubt.student_id == student_id
    ).all()

    return doubts

# ---------------- STUDENT DASHBOARD ----------------

@app.get("/student/dashboard")
def student_dashboard(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    student = db.query(models.User).filter(
        models.User.email == current_user
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    total_doubts = db.query(models.Doubt).filter(
        models.Doubt.student_id == student.id
    ).count()

    pending_doubts = db.query(models.Doubt).filter(
        models.Doubt.student_id == student.id,
        models.Doubt.status == "pending"
    ).count()

    resolved_doubts = db.query(models.Doubt).filter(
        models.Doubt.student_id == student.id,
        models.Doubt.status == "resolved"
    ).count()

    return {
        "total_doubts": total_doubts,
        "pending_doubts": pending_doubts,
        "resolved_doubts": resolved_doubts
    }


# ---------------- TEACHER DASHBOARD ----------------

@app.get("/teacher/dashboard")
def teacher_dashboard(
    db: Session = Depends(get_db),
    
):

    total_students = db.query(models.User).filter(
        models.User.role == "student"
    ).count()

    total_doubts = db.query(models.Doubt).count()

    pending_doubts = db.query(models.Doubt).filter(
        models.Doubt.status == "pending"
    ).count()

    resolved_doubts = db.query(models.Doubt).filter(
        models.Doubt.status == "resolved"
    ).count()

    return {
        "total_students": total_students,
        "total_doubts": total_doubts,
        "pending_doubts": pending_doubts,
        "resolved_doubts": resolved_doubts
    }


# ---------------- TOP CONFUSING TOPICS ----------------

@app.get("/teacher/top-topics")
def top_topics(db: Session = Depends(get_db)):

    results = (
        db.query(
            models.Doubt.topic.label("topic"),
            func.count(models.Doubt.id).label("count")
        )
        .group_by(models.Doubt.topic)
        .all()
    )

    return [
        {
            "topic": row.topic,
            "count": row.count
        }
        for row in results
    ]


# ---------------- SUBJECT ANALYTICS ----------------

@app.get("/teacher/subjects")
def subject_analytics(
    db: Session = Depends(get_db)
):

    results = (
        db.query(
            models.Doubt.subject,
            func.count(models.Doubt.id)
        )
        .group_by(models.Doubt.subject)
        .all()
    )

@app.get("/test-topics")
def test_topics(db: Session = Depends(get_db)):
    doubts = db.query(models.Doubt).all()

    return [
        {
            "id": d.id,
            "topic": d.topic
        }
        for d in doubts
    ]
@app.put("/teacher/resolve/{doubt_id}")
def resolve_doubt(
    doubt_id: int,
    data: schemas.ResolveDoubt,
    db: Session = Depends(get_db)
):

    doubt = db.query(models.Doubt).filter(
        models.Doubt.id == doubt_id
    ).first()

    if not doubt:
        raise HTTPException(
            status_code=404,
            detail="Doubt not found"
        )

    doubt.status = "resolved"
    doubt.teacher_response = data.teacher_response
    doubt.resource_link = data.resource_link

    db.commit()

    return {
        "message": "Doubt resolved successfully"
    }

    return results