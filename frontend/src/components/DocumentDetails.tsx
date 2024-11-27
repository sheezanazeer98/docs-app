import React, { useState, useEffect } from "react";
import { getDocument, Document } from "../services/api";

interface DocumentDetailsProps {
    id: number;
    onBack: () => void;
}

const DocumentDetails: React.FC<DocumentDetailsProps> = ({ id, onBack }) => {
    const [document, setDocument] = useState<Document | null>(null);

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const response = await getDocument(id);
                setDocument(response.data);
            } catch (err) {
                alert("Failed to fetch document details");
            }
        };

        fetchDocument();
    }, [id]);

    if (!document) {
        return (
            <p
                style={{
                    textAlign: "center",
                    fontSize: "16px",
                    color: "#666",
                    marginTop: "20px",
                }}
            >
                Loading...
            </p>
        );
    }

    return (
        <div
            style={{
                padding: "20px",
                maxWidth: "600px",
                margin: "auto",
                fontFamily: "Arial, sans-serif",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f9f9f9",
            }}
        >
            <h1
                style={{
                    textAlign: "center",
                    color: "#333",
                    marginBottom: "20px",
                    fontSize: "24px",
                }}
            >
                Document Details
            </h1>
            <p
                style={{
                    fontSize: "16px",
                    marginBottom: "10px",
                    color: "#555",
                }}
            >
                <strong>Name:</strong> {document.name}
            </p>
            <p
                style={{
                    fontSize: "16px",
                    marginBottom: "10px",
                    color: "#555",
                }}
            >
                <strong>Created At:</strong> {new Date(document.created_at).toLocaleString()}
            </p>
            <p
                style={{
                    fontSize: "16px",
                    marginBottom: "20px",
                    color: "#555",
                }}
            >
                <strong>Content:</strong> {document.content}
            </p>
            <button
                onClick={onBack}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "14px",
                }}
            >
                Back to List
            </button>
        </div>
    );
};

export default DocumentDetails;
