import React, { useState } from "react";
import DocumentList from "./components/DocumentList";
import DocumentForm from "./components/DocumentForm";
import DocumentDetails from "./components/DocumentDetails";

const App: React.FC = () => {
    const [view, setView] = useState<"list" | "add" | "details">("list");
    const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(null);

    const handleView = (id: number) => {
        setSelectedDocumentId(id);
        setView("details");
    };

    const handleAdd = () => {
        setView("add");
    };

    const handleBack = () => {
        setView("list");
        setSelectedDocumentId(null);
    };

    return (
        <div>
            {view === "list" && <DocumentList onView={handleView} onAdd={handleAdd} />}
            {view === "add" && <DocumentForm onSuccess={handleBack} onBack={handleBack} />}
            {view === "details" && selectedDocumentId && (
                <DocumentDetails id={selectedDocumentId} onBack={handleBack} />
            )}
        </div>
    );
};

export default App;
