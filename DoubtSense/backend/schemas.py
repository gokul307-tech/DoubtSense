from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


# ---------------- USER SCHEMAS ----------------

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "student"


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str

    class Config:
        from_attributes = True


# ---------------- DOUBT SCHEMAS ----------------

class DoubtCreate(BaseModel):
    subject: str
    topic: str
    description: str
    difficulty: int

class ResolveDoubt(BaseModel):
    teacher_response: str
    resource_link: str


class DoubtResponse(BaseModel):
    id: int
    subject: str
    topic: str
    description: str
    difficulty: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# ---------------- ATTACHMENT SCHEMAS ----------------

class AttachmentCreate(BaseModel):
    file_url: str


class AttachmentResponse(BaseModel):
    id: int
    file_url: str

    class Config:
        from_attributes = True


# ---------------- TEACHER NOTE SCHEMAS ----------------

class TeacherNoteCreate(BaseModel):
    title: str
    message: str


class TeacherNoteResponse(BaseModel):
    id: int
    title: str
    message: str
    created_at: datetime

    class Config:
        from_attributes = True


# ---------------- TOKEN SCHEMAS ----------------

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None