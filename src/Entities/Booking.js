 export const Booking={
  "name": "Booking",
  "type": "object",
  "properties": {
    "room_id": {
      "type": "string",
      "description": "Reference to room"
    },
    "student_email": {
      "type": "string"
    },
    "student_name": {
      "type": "string"
    },
    "check_in_date": {
      "type": "string",
      "format": "date"
    },
    "check_out_date": {
      "type": "string",
      "format": "date"
    },
    "booking_type": {
      "type": "string",
      "enum": [
        "monthly",
        "hourly"
      ],
      "default": "monthly"
    },
    "number_of_people": {
      "type": "number"
    },
    "total_cost": {
      "type": "number"
    },
    "booking_status": {
      "type": "string",
      "enum": [
        "pending",
        "confirmed",
        "completed",
        "cancelled"
      ],
      "default": "pending"
    },
    "student_phone": {
      "type": "string"
    },
    "special_requests": {
      "type": "string"
    },
    "purpose": {
      "type": "string",
      "enum": [
        "exam",
        "college_visit",
        "interview",
        "other"
      ]
    }
  },
  "required": [
    "room_id",
    "student_email",
    "check_in_date",
    "check_out_date",
    "number_of_people"
  ]
};