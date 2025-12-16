# Door Surveillance (ESP32-CAM + Web)

Small door surveillance system with:

- ESP32-CAM at the door
- Node.js/Express backend (`/api/events`, JSON file storage)
- React web dashboard for live view + recent events

## Tech stack

- Frontend: React + fetch API
- Backend: Node.js, Express, file-based `events.json`
- Device: ESP32-CAM (planned), HTTP POST to backend

## Run locally

backend
cd backend
npm install
node index.js

frontend
cd web-frontend
npm install
npm start


App runs at `http://localhost:3000`, API at `http://localhost:3001`.
