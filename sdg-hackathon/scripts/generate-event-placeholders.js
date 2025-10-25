// This is a simple script to generate placeholder images for events
// In a real application, you would use actual images

const fs = require('fs');
const path = require('path');

// Create the events directory if it doesn't exist
const eventsDir = path.join(__dirname, '../public/events');
if (!fs.existsSync(eventsDir)) {
  fs.mkdirSync(eventsDir, { recursive: true });
}

// Generate placeholder SVG for event images
function generateEventSvg(id, title) {
  // Generate a color based on the id
  const hue = parseInt(id) * 40 % 360;
  const bgColor = `hsl(${hue}, 70%, 85%)`;
  const textColor = '#333';
  
  return `<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="400" fill="${bgColor}" />
    <text x="400" y="180" font-family="Arial" font-size="32" text-anchor="middle" fill="${textColor}">Event ${id}</text>
    <text x="400" y="220" font-family="Arial" font-size="24" text-anchor="middle" fill="${textColor}">${title}</text>
  </svg>`;
}

// Generate placeholder SVG for gallery images
function generateGallerySvg(eventId, galleryId) {
  // Generate a color based on the ids
  const hue = (parseInt(eventId) * 40 + parseInt(galleryId) * 20) % 360;
  const bgColor = `hsl(${hue}, 60%, 80%)`;
  const textColor = '#333';
  
  return `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" fill="${bgColor}" />
    <text x="200" y="180" font-family="Arial" font-size="24" text-anchor="middle" fill="${textColor}">Gallery Image</text>
    <text x="200" y="220" font-family="Arial" font-size="20" text-anchor="middle" fill="${textColor}">Event ${eventId} - ${galleryId}</text>
  </svg>`;
}

// Generate placeholder SVG for speaker images
function generateSpeakerSvg(eventId, speakerId, name) {
  // Generate a color based on the ids
  const hue = (parseInt(eventId) * 40 + parseInt(speakerId) * 30) % 360;
  const bgColor = `hsl(${hue}, 50%, 75%)`;
  const textColor = '#333';
  
  return `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" fill="${bgColor}" />
    <circle cx="100" cy="70" r="40" fill="#FFFFFF" />
    <circle cx="100" cy="60" r="20" fill="#333333" />
    <rect x="60" y="90" width="80" height="60" rx="10" fill="#FFFFFF" />
    <text x="100" y="170" font-family="Arial" font-size="16" text-anchor="middle" fill="${textColor}">${name}</text>
  </svg>`;
}

// Event data
const events = [
  { id: 1, title: 'Contemporary Art Exhibition' },
  { id: 2, title: 'Chinese Painting Workshop' },
  { id: 3, title: 'Digital Art Symposium' },
  { id: 4, title: 'Photography Exhibition' },
  { id: 5, title: 'Art Basel Hong Kong' },
  { id: 6, title: 'Ink Art Masterclass' }
];

// Speaker data
const speakers = [
  { eventId: 1, id: 1, name: 'Sarah Wong' },
  { eventId: 1, id: 2, name: 'Michael Chen' },
  { eventId: 2, id: 3, name: 'Mei Lin' },
  { eventId: 3, id: 4, name: 'Dr. James Wong' },
  { eventId: 3, id: 5, name: 'Lisa Nakamura' },
  { eventId: 3, id: 6, name: 'David Kim' },
  { eventId: 4, id: 7, name: 'Thomas Chan' },
  { eventId: 6, id: 8, name: 'Wong Fei' }
];

// Generate event images
events.forEach(event => {
  const svg = generateEventSvg(event.id, event.title);
  fs.writeFileSync(path.join(eventsDir, `event${event.id}.jpg`), svg);
  
  // Generate gallery images for each event
  for (let i = 1; i <= 3; i++) {
    if (i <= (event.id % 3) + 1) { // Vary the number of gallery images
      const gallerySvg = generateGallerySvg(event.id, i);
      fs.writeFileSync(path.join(eventsDir, `gallery${event.id}-${i}.jpg`), gallerySvg);
    }
  }
});

// Generate speaker images
speakers.forEach(speaker => {
  const svg = generateSpeakerSvg(speaker.eventId, speaker.id, speaker.name);
  fs.writeFileSync(path.join(eventsDir, `speaker${speaker.id}.jpg`), svg);
});

console.log('Placeholder images generated successfully!');
