import axios from "axios";

// Document interface for type safety
export interface Document {
    id: number;
    name: string;
    content: string;
    created_at: string;
    size: number;
}

// Use environment variable for API base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5000/api/documents";

// Get all documents
export const getDocuments = (search = "") => {
    return axios.get<{ documents: Document[] }>(`${API_BASE_URL}?search=${search}`);
};

// Get a single document by ID
export const getDocument = (id: number) => {
    return axios.get<Document>(`${API_BASE_URL}/${id}`);
};

// Create a new document
export const createDocument = (data: Pick<Document, "name" | "content">) => {
    return axios.post<Document>(`${API_BASE_URL}/add`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// Delete a document by ID
export const deleteDocument = (id: number) => {
    return axios.delete(`${API_BASE_URL}/${id}`);
};
