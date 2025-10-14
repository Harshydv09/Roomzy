export const Room={
  "name": "Room",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "Room title"
    },
    "description": {
      "type": "string",
      "description": "Detailed room description"
    },
    "location": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "area": {
          "type": "string"
        },
        "full_address": {
          "type": "string"
        }
      }
    },
    "price_per_month": {
      "type": "number",
      "description": "Monthly rent in rupees"
    },
    "hourly_stay_available": {
      "type": "boolean",
      "default": false,
      "description": "Whether hourly booking is available"
    },
    "capacity": {
      "type": "number",
      "description": "Maximum number of students"
    },
    "available_beds": {
      "type": "number",
      "description": "Number of beds available"
    },
    "room_type": {
      "type": "string",
      "enum": [
        "shared",
        "single",
        "double"
      ],
      "description": "Type of room"
    },
    "amenities": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Available facilities"
    },
    "near_exam_centers": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "distance_km": {
            "type": "number"
          }
        }
      }
    },
    "images": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Room photos URLs"
    },
    "host_email": {
      "type": "string",
      "description": "Email of the host/provider"
    },
    "host_name": {
      "type": "string"
    },
    "host_contact": {
      "type": "string"
    },
    "rules": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "rating": {
      "type": "number",
      "minimum": 0,
      "maximum": 5
    },
    "total_reviews": {
      "type": "number",
      "default": 0
    },
    "is_available": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "title",
    "location",
    "price_per_month",
    "capacity",
    "room_type",
    "host_email"
  ]
};