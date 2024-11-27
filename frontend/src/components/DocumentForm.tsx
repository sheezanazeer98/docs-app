import React, { useState } from "react";
import { createDocument } from "../services/api";

interface DocumentFormProps {
    onSuccess: () => void;
    onBack: () => void;
}

const DocumentForm: React.FC<DocumentFormProps> = ({ onSuccess, onBack }) => {
    const [name, setName] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createDocument({ name, content });
            alert("Document added successfully!");
            onSuccess();
        } catch (err) {
            alert("Failed to add document");
        }
    };

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
                Add Document
            </h1>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                        style={{
                            fontWeight: "bold",
                            marginBottom: "5px",
                            fontSize: "14px",
                            color: "#555",
                        }}
                    >
                        Document Name:
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{
                            padding: "10px",
                            fontSize: "14px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            outline: "none",
                        }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                        style={{
                            fontWeight: "bold",
                            marginBottom: "5px",
                            fontSize: "14px",
                            color: "#555",
                        }}
                    >
                        Content:
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        style={{
                            padding: "10px",
                            fontSize: "14px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            outline: "none",
                            minHeight: "120px",
                        }}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px",
                    }}
                >
                    <button
                        type="submit"
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
                        Add Document
                    </button>
                    <button
                        type="button"
                        onClick={onBack}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#6c757d",
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
            </form>
        </div>
    );
};

export default DocumentForm;
