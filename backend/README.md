
# Document Management API

This API allows you to manage text-based documents. You can perform operations such as retrieving, creating, and deleting documents.

## Base URL
```
http://127.0.0.1:5000/api/documents
```

## Endpoints

### 1. Get All Documents
Retrieve a list of all documents. Supports optional search by name.

**URL:**
```
GET /
```

**Query Parameters:**
- **search** (optional): A string to filter documents by name.

**Response:**
```json
{
    "documents": [
        {
            "id": 1,
            "name": "Example Document",
            "content": "This is an example document.",
            "created_at": "2024-11-27T10:00:00Z",
            "size": 1024
        }
    ]
}
```

---

### 2. Get a Single Document
Retrieve a specific document by its ID.

**URL:**
```
GET /<id>
```

**Path Parameters:**
- **id** (required): The ID of the document to retrieve.

**Response:**
```json
{
    "id": 1,
    "name": "Example Document",
    "content": "This is an example document.",
    "created_at": "2024-11-27T10:00:00Z",
    "size": 1024
}
```

**Error Response:**
```json
{
    "message": "Document not found"
}
```

---

### 3. Create a New Document
Create a new document by providing its name and content.

**URL:**
```
POST /add
```

**Request Body:**
```json
{
    "name": "New Document",
    "content": "This is the content of the new document."
}
```

**Response:**
```json
{
    "id": 2,
    "name": "New Document",
    "content": "This is the content of the new document.",
    "created_at": "2024-11-27T12:00:00Z",
    "size": 32
}
```

**Error Response:**
```json
{
    "error": "Both 'name' and 'content' fields are required"
}
```

---

### 4. Delete a Document
Delete a document by its ID.

**URL:**
```
DELETE /<id>
```

**Path Parameters:**
- **id** (required): The ID of the document to delete.

**Response:**
```json
{
    "message": "Document deleted"
}
```

**Error Response:**
```json
{
    "message": "Document not found"
}
```

---

## Example cURL Requests

**Get All Documents:**
```bash
curl -X GET "http://127.0.0.1:5000/api/documents"
```

**Search for Documents:**
```bash
curl -X GET "http://127.0.0.1:5000/api/documents?search=example"
```

**Get a Single Document:**
```bash
curl -X GET "http://127.0.0.1:5000/api/documents/1"
```

**Create a Document:**
```bash
curl -X POST "http://127.0.0.1:5000/api/documents/add" \
-H "Content-Type: application/json" \
-d '{
  "name": "New Document",
  "content": "This is the content of the new document."
}'
```

**Delete a Document:**
```bash
curl -X DELETE "http://127.0.0.1:5000/api/documents/1"
```

---

## Notes
- Ensure the backend is running and accessible via the specified base URL.
- Input validation is handled for creating documents; both name and content fields are required.
- All endpoints return 404 Not Found if the requested document does not exist.
