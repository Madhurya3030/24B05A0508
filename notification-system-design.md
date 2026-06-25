# Notification System Design
# Stage 1 – Notification System REST API Design

## Objective

Design a REST API for a Campus Notification System that enables authenticated users to receive notifications. The API follows REST principles, uses JSON for request/response payloads, and supports real-time notification delivery.

---

# Authentication

All endpoints require authentication.

### Headers

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

# 1. Create Notification

**Endpoint**

```
POST /api/notifications
```

### Description

Creates a new notification.

### Request Body

```json
{
  "title": "Placement Drive",
  "message": "Amazon recruitment starts tomorrow.",
  "notificationType": "Placement",
  "targetAudience": "Students"
}
```

### Response (201 Created)

```json
{
  "id": "64ab1234",
  "title": "Placement Drive",
  "message": "Amazon recruitment starts tomorrow.",
  "notificationType": "Placement",
  "targetAudience": "Students",
  "isRead": false,
  "createdAt": "2026-06-25T10:30:00Z"
}
```

---

# 2. Get All Notifications

**Endpoint**

```
GET /api/notifications
```

### Description

Returns all notifications for the authenticated user.

### Response (200 OK)

```json
[
  {
    "id": "64ab1234",
    "title": "Placement Drive",
    "message": "Amazon recruitment starts tomorrow.",
    "notificationType": "Placement",
    "isRead": false,
    "createdAt": "2026-06-25T10:30:00Z"
  }
]
```

---

# 3. Get Notification by ID

**Endpoint**

```
GET /api/notifications/{notificationId}
```

### Description

Returns a specific notification.

### Response (200 OK)

```json
{
  "id": "64ab1234",
  "title": "Placement Drive",
  "message": "Amazon recruitment starts tomorrow.",
  "notificationType": "Placement",
  "isRead": false,
  "createdAt": "2026-06-25T10:30:00Z"
}
```

---

# 4. Mark Notification as Read

**Endpoint**

```
PATCH /api/notifications/{notificationId}/read
```

### Description

Marks a notification as read.

### Response (200 OK)

```json
{
  "message": "Notification marked as read."
}
```

---

# 5. Delete Notification

**Endpoint**

```
DELETE /api/notifications/{notificationId}
```

### Description

Deletes a notification.

### Response (200 OK)

```json
{
  "message": "Notification deleted successfully."
}
```

---

# 6. Get Unread Notifications

**Endpoint**

```
GET /api/notifications/unread
```

### Description

Returns only unread notifications.

### Response (200 OK)

```json
[
  {
    "id": "64ab1234",
    "title": "Placement Drive",
    "message": "Amazon recruitment starts tomorrow.",
    "notificationType": "Placement",
    "isRead": false,
    "createdAt": "2026-06-25T10:30:00Z"
  }
]
```

---

# Common Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Notification Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Notification Not Found |
| 500 | Internal Server Error |

---

# Real-Time Notification Design

The system will use **WebSockets (Socket.IO)** to provide instant notifications.

### Flow

```
User Login
      │
      ▼
Client establishes WebSocket connection
      │
      ▼
Server stores active socket connection
      │
      ▼
Admin creates notification
      │
      ▼
Notification saved to database
      │
      ▼
Server pushes notification through WebSocket
      │
      ▼
User receives notification instantly
```

### Advantages

- Real-time delivery without polling
- Reduced server load
- Faster user experience
- Supports multiple concurrent users