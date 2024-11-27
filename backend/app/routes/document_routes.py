from flask import Blueprint, request, jsonify
from app.models.document import Document
from app.schemas.document_schema import DocumentSchema
from app import db


document_blueprint = Blueprint("documents", __name__)
document_schema = DocumentSchema()
documents_schema = DocumentSchema(many=True)

# Get all documents with optional search
@document_blueprint.route("/", methods=["GET"])
def get_documents():
    search = request.args.get("search", "")
    documents = Document.query.filter(Document.name.ilike(f"%{search}%")).all()
    serialized_documents = documents_schema.dump(documents)
    return jsonify({"documents": serialized_documents})

# Get a single document by ID
@document_blueprint.route("/<int:id>", methods=["GET"])
def get_document(id):
    document = Document.query.get_or_404(id)
    serialized_document = document_schema.dump(document)
    return jsonify(serialized_document)

# Create a new document
@document_blueprint.route("/add", methods=["POST"])
def create_document():
    data = request.json

    # Validate input fields
    if not data.get("name") or not data.get("content"):
        return jsonify({"error": "Both 'name' and 'content' fields are required"}), 400

    new_document = Document(
        name=data["name"],
        content=data["content"],
        size=len(data["content"])
    )
    db.session.add(new_document)
    db.session.commit()

    serialized_document = document_schema.dump(new_document)
    return jsonify(serialized_document), 201

# Delete a document by ID
@document_blueprint.route("/<int:id>", methods=["DELETE"])
def delete_document(id):
    document = Document.query.get_or_404(id)
    db.session.delete(document)
    db.session.commit()
    return jsonify({"message": "Document deleted"}), 200

