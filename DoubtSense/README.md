# DoubtSense

DoubtSense is a full-stack academic doubt management system designed to connect students and teachers.

Students can submit their academic doubts with details such as subject, topic, description, and difficulty level. Teachers can view submitted doubts, provide explanations, add learning resources, and resolve doubts.

## 1. Project Information

### Technology Stack

- **Frontend:** React + Vite
- **Backend:** FastAPI
- **Database:** SQLite
- **ORM:** SQLAlchemy
- **Authentication:** JWT
- **Password Security:** Bcrypt
- **API Communication:** Axios

---

## 2. Completed Modules and Functions

### Authentication

- Student registration
- Teacher registration
- Student login
- Teacher login
- JWT-based authentication
- Role-based navigation
- Logout functionality

### Student Module

- Student dashboard
- Submit academic doubts
- Select subject
- Enter topic
- Enter doubt description
- Set difficulty level
- View submitted doubts
- Check doubt status
- View pending doubts
- View resolved doubts
- View teacher explanations
- Open learning/resource links provided by teachers

### Teacher Module

- Teacher dashboard
- View total students
- View total doubts
- View pending doubts
- View resolved doubts
- View student doubts
- Resolve doubts
- Add teacher explanation
- Add learning/resource links

### Analytics

- Teacher dashboard statistics
- Subject Analytics page
- Top confusing topics section
- Teacher insights section
- HeatMap Analytics section/navigation

### Backend

- FastAPI backend
- SQLite database
- SQLAlchemy database models
- User management
- Doubt management
- Authentication system
- JWT token handling
- Password hashing
- Pydantic schemas
- API endpoints
- Student and teacher role handling

### User Interface

- Glassmorphism-based design
- Student dashboard
- Teacher dashboard
- Navigation bar
- Statistics cards
- Page navigation
- Login page
- Registration page
- Student doubt pages
- Teacher doubt management pages

---

## 3. How to Run the Project

The project contains two main parts:

```text
DoubtSense
├── frontend
└── backend
```
Clone the project to your own environment like VS code
**For Frontend**
Go inside the frontend folder and run **npm run dev**

Before going inside Backend
make sure you have installed the requirements in the requirements.txt
by running the following command:
**pip install -r requirements.txt**

**For Backend**
Go inside the backend folder and run **python -m uvicorn main:app --reload**

If you have established both frontend and backend the application will successfully load and displays 