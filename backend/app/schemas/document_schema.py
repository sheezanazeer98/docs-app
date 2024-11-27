from marshmallow import Schema, fields

class DocumentSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    content = fields.Str(required=True)
    created_at = fields.DateTime(dump_only=True)
    size = fields.Int(dump_only=True)
