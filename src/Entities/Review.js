 export const Review ={
  "name": "Review",
  "type": "object",
  "properties": {
    "room_id": {
      "type": "string"
    },
    "student_email": {
      "type": "string"
    },
    "student_name": {
      "type": "string"
    },
    "rating": {
      "type": "number",
      "minimum": 1,
      "maximum": 5
    },
    "comment": {
      "type": "string"
    },
    "cleanliness_rating": {
      "type": "number",
      "minimum": 1,
      "maximum": 5
    },
    "host_rating": {
      "type": "number",
      "minimum": 1,
      "maximum": 5
    },
    "value_rating": {
      "type": "number",
      "minimum": 1,
      "maximum": 5
    },
    "images": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "required": [
    "room_id",
    "student_email",
    "rating"
  ]
};