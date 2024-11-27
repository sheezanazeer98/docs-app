import React, { CSSProperties, useState, useEffect } from "react";
import { getDocuments, deleteDocument, Document } from "../services/api";

interface DocumentListProps {
    onView: (id: number) => void;
    onAdd: () => void;
}

const ITEMS_PER_PAGE = 5; // Items per page

const DocumentList: React.FC<DocumentListProps> = ({ onView, onAdd }) => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Sorting state
    const [sortField, setSortField] = useState<"name" | "created_at">("created_at");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // Default: Show latest first

    const fetchDocuments = async () => {
        setLoading(true);
        try {
            const response = await getDocuments(search);
            setDocuments(response.data.documents);
            setError(null);
        } catch (err) {
            setError("Failed to fetch documents");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, [search]);

    // Sorting logic
    const sortedDocuments = [...documents].sort((a, b) => {
        const valueA = a[sortField];
        const valueB = b[sortField];

        if (sortField === "name") {
            // String comparison for "name"
            return sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else if (sortField === "created_at") {
            // Date comparison for "created_at"
            const dateA = new Date(valueA).getTime();
            const dateB = new Date(valueB).getTime();
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        }
        return 0;
    });

    // Pagination logic
    const paginatedDocuments = sortedDocuments.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil(sortedDocuments.length / ITEMS_PER_PAGE);

    // Handle sort toggling
    const toggleSort = (field: "name" | "created_at") => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Document List</h1>
            <div style={{ display: "flex", marginBottom: "20px", justifyContent: "space-between" }}>
                <input
                    type="text"
                    placeholder="Search documents"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        flex: 1,
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        marginRight: "10px",
                    }}
                />
                <button
                    onClick={onAdd}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Add Document
                </button>
            </div>
            {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
            {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                <thead>
                    <tr>
                        <th style={headerCellStyle}>
                            <button
                                onClick={() => toggleSort("name")}
                                style={headerButtonStyle(sortField === "name")}
                            >
                                Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                            </button>
                        </th>
                        <th style={headerCellStyle}>
                            <button
                                onClick={() => toggleSort("created_at")}
                                style={headerButtonStyle(sortField === "created_at")}
                            >
                                Created At {sortField === "created_at" && (sortOrder === "asc" ? "↑" : "↓")}
                            </button>
                        </th>
                        <th style={headerCellStyle}>Size</th>
                        <th style={headerCellStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedDocuments.map((doc) => (
                        <tr key={doc.id} style={rowStyle}>
                            <td style={cellStyle}>{doc.name}</td>
                            <td style={cellStyle}>{new Date(doc.created_at).toLocaleString()}</td>
                            <td style={cellStyle}>{doc.size} bytes</td>
                            <td style={cellStyle}>
                                <button
                                    onClick={() => onView(doc.id)}
                                    style={{
                                        padding: "5px 10px",
                                        marginRight: "10px",
                                        backgroundColor: "#28a745",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "3px",
                                        cursor: "pointer",
                                    }}
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => deleteDocument(doc.id).then(fetchDocuments)}
                                    style={{
                                        padding: "5px 10px",
                                        backgroundColor: "#dc3545",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "3px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    style={{
                        padding: "10px",
                        marginRight: "10px",
                        backgroundColor: currentPage === 1 ? "#ccc" : "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    }}
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    style={{
                        padding: "10px",
                        backgroundColor: currentPage === totalPages ? "#ccc" : "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DocumentList;

// Common inline styles
const headerCellStyle: CSSProperties = {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "left",
    fontWeight: "bold",
    backgroundColor: "#f8f9fa",
};

const headerButtonStyle = (isActive: boolean): CSSProperties => ({
    background: "none",
    border: "none",
    color: isActive ? "#007BFF" : "#333",
    cursor: "pointer",
    fontWeight: isActive ? "bold" : "normal",
});

const cellStyle: CSSProperties = {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "left",
};

const rowStyle: CSSProperties = {
    backgroundColor: "#fff",
    textAlign: "left",
};
