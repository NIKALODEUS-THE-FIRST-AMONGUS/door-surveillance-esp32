# ESP32-CAM Firmware Plan

## Goals

- Connect ESP32-CAM to Wi-Fi.
- Stream video at `http://<esp32-ip>/stream`.
- Send motion events to backend `POST http://<server-ip>:3001/api/events`.

## Tasks

1. Start from Arduino `ESP32-CAM CameraWebServer` example.
2. Change Wi-Fi SSID/PASSWORD.
3. Add HTTP client code:
   - On motion (later from PIR), send:
     { "type": "motion", "source": "door-esp32-1" }
   - Expect JSON response with `id` and `time`.
4. Test by:
   - Opening stream in browser.
   - Watching events appear in web dashboard.
