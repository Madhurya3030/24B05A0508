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



# Stage 2

## Suggested Database

I recommend **MongoDB (NoSQL)** because it provides:
- Flexible schema
- Easy JSON document storage
- High scalability
- Fast read/write performance
- Suitable for notification systems

---

## Database Schema

```javascript
{
  _id: ObjectId,
  studentId: ObjectId,
  title: String,
  message: String,
  notificationType: String,
  targetAudience: String,
  isRead: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Problems as Data Volume Increases

- Slow query performance
- Increased storage usage
- Higher database load
- Longer response time

---

## Solutions

- Create indexes
- Use pagination
- Archive old notifications
- Redis caching
- Database sharding

---

## MongoDB Queries

### Create Notification

```javascript
db.notifications.insertOne({
  studentId,
  title,
  message,
  notificationType,
  targetAudience,
  isRead: false,
  createdAt: new Date()
});
```

### Get All Notifications

```javascript
db.notifications.find({ studentId });
```

### Get Notification by ID

```javascript
db.notifications.findOne({ _id: ObjectId(id) });
```

### Get Unread Notifications

```javascript
db.notifications.find({
  studentId,
  isRead: false
});
```

### Mark Notification as Read

```javascript
db.notifications.updateOne(
  { _id: ObjectId(id) },
  { $set: { isRead: true } }
);
```

### Delete Notification

```javascript
db.notifications.deleteOne({
  _id: ObjectId(id)
});
```




# Stage 3

## Is the Query Accurate?

Yes, the query is correct because it fetches unread notifications for a specific student.



---

## Why is it Slow?

- Large table (5,000,000 notifications)
- Full table scan without proper indexing
- Sorting a large number of records

---

## Improvements

Create a composite index:

```sql
CREATE INDEX idx_student_read_created
ON notifications(studentID, isRead, createdAt);
```

### Likely Computational Cost

- **Without Index:** O(n)
- **With Index:** O(log n)

---

## Should We Add Indexes on Every Column?

**No.**

Adding indexes on every column:
- Increases storage usage
- Slows INSERT, UPDATE, and DELETE operations
- Is unnecessary for columns that are rarely searched

Indexes should only be created on frequently queried columns.

---

## Query to Find Students Who Got Placement Notifications in the Last 7 Days

```sql
SELECT DISTINCT studentID
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL 7 DAY;
```



# Stage 4

## Problem

Fetching notifications from the database on every page load increases database load and slows down the application.

---

## Solutions

### Redis Cache
Store frequently accessed notifications in Redis.

**Tradeoff**
- Faster response
- Extra memory required

---

### Pagination
Fetch notifications in small batches instead of all at once.

**Tradeoff**
- Reduces database load
- Multiple requests for older notifications

---

### WebSockets
Push new notifications in real time instead of fetching repeatedly.

**Tradeoff**
- Instant updates
- More complex implementation

---

### Database Indexing
Create indexes on `studentId`, `isRead`, and `createdAt`.

**Tradeoff**
- Faster queries
- Slightly slower INSERT and UPDATE operations

---

## Recommended Solution

Use:
- Redis Cache
- Pagination
- WebSockets
- Database Indexing

This combination reduces database load, improves response time, and provides real-time notification delivery.




# Stage 5

## Shortcomings

- Notifications are processed one by one, making the process slow.
- If email sending fails, the remaining students will not receive notifications.
- Database save and email sending are tightly coupled.
- Poor scalability for 50,000 students.

---

## What if 200 Emails Fail?

- Retry sending emails for failed students.
- Store failed requests in a retry queue.
- Continue processing remaining students.

---

## Improved Design

- Save notification to the database first.
- Add email and push notification jobs to a message queue.
- Worker services process the queue asynchronously.
- Retry failed jobs automatically.

---

## Should DB Save and Email Sending Happen Together?

**No.**

- Save to the database first to ensure data is not lost.
- Email and push notifications should run asynchronously.
- This improves reliability and performance.

---

## Revised Pseudocode

```text
function notify_all(student_ids, message):

    for student_id in student_ids:

        save_to_db(student_id, message)

        enqueue_email(student_id, message)

        enqueue_push(student_id, message)
```

### Worker

```text
while(queue not empty):

    job = dequeue()

    send_email(job)

    push_to_app(job)

    if failed:
        retry(job)
```