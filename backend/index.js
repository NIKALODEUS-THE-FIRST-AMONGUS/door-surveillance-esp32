const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const EVENTS_FILE = path.join(__dirname, 'events.json');

const app = express();
app.use(cors());
app.use(express.json());

// Health / status
app.get('/api/status', (req, res) => {
  res.json({
    online: true,
    camera: 'mock',
    lastEvent: null,
    timestamp: new Date().toISOString()
  });
});

// Load events from file if exists
let events = [];
try {
  if (fs.existsSync(EVENTS_FILE)) {
    const raw = fs.readFileSync(EVENTS_FILE, 'utf8');
    events = JSON.parse(raw);
  } else {
    events = [
      {
        id: 1,
        type: 'motion',
        source: 'simulator',
        time: '2025-12-16T10:00:00Z'
      },
      {
        id: 2,
        type: 'door',
        source: 'simulator',
        time: '2025-12-16T10:05:00Z'
      }
    ];
  }
} catch (err) {
  console.error('Failed to load events file:', err);
  events = [];
}

// Helper to save events to file
function saveEvents() {
  fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2));
}

// Get all events
app.get('/api/events', (req, res) => {
  res.json(events);
});

// Create new event (device → backend)
app.post('/api/events', (req, res) => {
  const { type, source, confidence } = req.body;

  const newEvent = {
    id: events.length + 1,
    type: type || 'unknown',
    source: source || 'simulator',
    confidence: typeof confidence === 'number' ? confidence : undefined,
    time: new Date().toISOString()
  };

  events.unshift(newEvent); // newest first
  saveEvents();
  res.status(201).json(newEvent);
});

// Snapshot endpoint (placeholder for camera image)
app.get('/api/snapshot', (req, res) => {
  res.json({
    url: 'https://via.placeholder.com/400x220.png?text=Camera+Snapshot'
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
