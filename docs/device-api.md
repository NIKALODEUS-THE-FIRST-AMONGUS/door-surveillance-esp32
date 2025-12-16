# Device → Backend API Contract (ESP32)

This is the fixed contract that every door camera device must follow.

## 1. Create event

**Method:** POST  
**URL:** `http://<server-ip>:3001/api/events`

### Request body (JSON)

{
  "type": "motion",
  "source": "door-esp32-1",
  "confidence": 0.87
}

- `type` (string, required): `"motion"`, `"door"`, `"tamper"`, `"offline"`, etc.
- `source` (string, required): device id, e.g. `"door-esp32-1"`.
- `confidence` (number, optional): 0–1 from AI model when available.

### Response body (JSON)

{
  "id": 3,
  "type": "motion",
  "source": "door-esp32-1",
  "time": "2025-12-16T11:06:44.375Z"
}

- `id`: auto-increment event id (assigned by backend).  
- `time`: ISO timestamp from server.

If `type` is missing, backend will save it as `"unknown"`.  
If `source` is missing, backend will save it as `"simulator"`.
