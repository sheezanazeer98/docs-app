# Document Management Application

This project is a simple document management application that allows users to manage text-based documents. The application consists of a backend built with Flask and a frontend built with React (TypeScript). The project demonstrates clean and functional code, focusing on both backend API functionality and a user-friendly frontend interface.

---

## Demo Video

Watch the [Demo Video](https://jmp.sh/88zCin1u) to see the application in action.

---

## Features

### Backend Features
- **Get All Documents**: Retrieve all documents, with optional search functionality.
- **Get a Single Document**: Retrieve details of a specific document by its ID.
- **Create a Document**: Add a new document by providing its name and content.
- **Delete a Document**: Delete a document by its ID.

### Frontend Features
- **Document List View**: Displays a list of documents with search, pagination, and sorting.
- **Document Details View**: View detailed information about a single document.
- **Add Document**: Add a new document using a simple form.
- **Delete Document**: Delete a document with a confirmation.
- **Pagination (Frontend)**: View documents in paginated form with sorting capabilities.
- **Sorting**: Sort documents by name or creation date.

---

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js (v16+ recommended)
- PostgreSQL
- Docker (optional)

### Backend Setup

1. **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd <repository-directory>/backend
    ```

2. **Set up a Python Virtual Environment**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\\Scripts\\activate
    ```

3. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Set up Environment Variables**:
    Create a `.env` file in the `backend` directory with the following content:
    ```env
    DATABASE_URI=postgresql://<username>:<password>@localhost:5432/documents
    ```

5. **Run Migrations**:
    ```bash
    flask db init
    flask db migrate
    flask db upgrade
    ```

6. **Start the Backend Server**:
    ```bash
     python run.py
    ```
    The backend will be running at `http://127.0.0.1:5000`.

---

### Frontend Setup

1. **Navigate to the Frontend Directory**:
    ```bash
    cd ../frontend
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set up Environment Variables**:
    Create a `.env` file in the `frontend` directory with the following content:
    ```env
    REACT_APP_API_BASE_URL=http://127.0.0.1:5000/api/documents
    ```

4. **Start the Frontend Development Server**:
    ```bash
    npm start
    ```
    The frontend will be running at `http://localhost:3000`.

---

## Notable Technical Decisions

1. **Environment Variables**:
    - Used `.env` files in both backend and frontend to manage sensitive configurations (e.g., database URI and API base URL).

2. **Pagination**:
    - Implemented pagination on the frontend to handle large datasets and ensure scalability.

3. **Sorting**:
    - Added sorting functionality (by name and creation date) directly in the frontend for better UX.

4. **Separation of Concerns**:
    - Kept backend and frontend codebases modular to allow independent development and testing.

5. **TypeScript**:
    - Used TypeScript in the frontend for better type safety and maintainability.

