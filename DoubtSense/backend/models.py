from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship
from datetime import datetime

from database import Base


# ---------------- USERS ----------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    email = Column(String(255), unique=True, nullable=False)

    password = Column(String(255), nullable=False)

    role = Column(String(20), default="student")

    created_at = Column(DateTime, default=datetime.utcnow)

    doubts = relationship("Doubt", back_populates="student")


# ---------------- DOUBTS ----------------
class Doubt(Base):
    __tablename__ = "doubts"

    id = Column(Integer, primary_key=True, index=True)

    subject = Column(String(100), nullable=False)

    topic = Column(String(200), nullable=False)

    description = Column(Text, nullable=False)

    difficulty = Column(Integer, nullable=False)

    status = Column(String(20), default="pending")

    teacher_response = Column(String, nullable=True)

    resource_link = Column(String, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    student_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    student = relationship(
        "User",
        back_populates="doubts"
    )

    attachments = relationship(
        "Attachment",
        back_populates="doubt",
        cascade="all, delete"
    )


# ---------------- ATTACHMENTS ----------------
class Attachment(Base):
    __tablename__ = "attachments"

    id = Column(Integer, primary_key=True, index=True)

    file_url = Column(String(500))

    doubt_id = Column(
        Integer,
        ForeignKey("doubts.id")
    )

    doubt = relationship(
        "Doubt",
        back_populates="attachments"
    )


# ---------------- TEACHER NOTES ----------------
class TeacherNote(Base):
    __tablename__ = "teacher_notes"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200))

    message = Column(Text)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )