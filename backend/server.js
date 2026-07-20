const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Models for seeding
const User = require('./models/User');
const Item = require('./models/Item');
const Video = require('./models/Video');
const Stats = require('./models/Stats');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '100mb' })); // Support base64 image strings
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Middleware to ensure DB connection is ready before processing API requests
app.use(async (req, res, next) => {
  // Allow root requests and static uploads
  if (req.path === '/' || req.path.startsWith('/uploads')) {
    return next();
  }
  
  // In serverless environments, ensure we re-attempt connection if the previous check failed
  try {
    await connectDB();
  } catch (err) {
    console.error('Failed to trigger connectDB in request middleware:', err.message);
  }

  const state = mongoose.connection.readyState;
  if (state !== 1 && state !== 2) {
    return res.status(503).json({
      message: 'Database connection is offline. Please check your MongoDB Atlas IP Whitelist settings or local database instance.'
    });
  }
  next();
});

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));
app.use('/api/video', require('./routes/video'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/enquiries', require('./routes/enquiries'));

// Serve frontend build static files in production if needed,
// but for development, we will run the React Vite app on its own port.
app.get('/', (req, res) => {
  res.send('VelvetVows API is running...');
});

// Seed admin and default data if they don't exist
const seedData = async () => {
  try {
    // 1. Seed Admin User
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'kartiksharma2026';
    
    const adminExists = await User.findOne({ username: adminUsername });
    if (!adminExists) {
      console.log('Seeding default Admin user...');
      const admin = new User({
        username: adminUsername,
        password: adminPassword, // Password will be hashed in the pre-save hook
      });
      await admin.save();
      console.log('Admin user seeded successfully!');
    }

    // 2. Curate descriptions for existing services items in database
    const servicesItems = await Item.find({ type: 'services' });
    const defaultDescriptions = {
      "wedding planning": "From layout designing and budget tracking to vendor agreements, we shape your dream celebration from the ground up with absolute detail and care.",
      "wedding curation": "From architectural floor plans and visual curation to custom vendor agreements, we design your milestone celebrations with meticulous attention to detail.",
      "social & corporate events": "Bespoke styling and execution for high-profile social galas, birthdays, anniversaries, and corporate events with luxury hospitality and soundscapes.",
      "social & corporate galas": "Bespoke spatial design and execution for high-profile anniversaries, luxury birthdays, and corporate galas with premium hospitality.",
      "hospitality desk management": "Dedicated coordinators managing 24/7 guest check-in desks, key card handovers, room itinerary bags, and personal host supports at the hotel.",
      "hospitality desk curation": "Dedicated coordinators managing 24/7 guest check-in desks, key card handovers, custom itinerary bags, and personal host supports.",
      "guest coordination": "Handling digital RSVPs, family travel schedules, luggage tagging, and arranging welcome hampers and cards for every guest.",
      "guest curation & rsvp logs": "Handling digital RSVPs, family travel schedules, luggage tagging, and arranging welcome hampers and cards for every guest.",
      "venue & decor management": "Scouting heritage palaces and crafting grand floral avenues, cascading chandeliers, luxury mandaps, and high-fidelity stage designs.",
      "venue & spatial design": "Scouting historic heritage locations and crafting grand floral avenues, cascading chandeliers, luxury mandaps, and high-fidelity stage designs.",
      "guest transportation support": "Seamless airport and railway pickups with premium vehicle routing, chauffeured arrivals, and shuttle operations for guests.",
      "guest logistics support": "Seamless airport and railway pickups with premium vehicle routing, chauffeured arrivals, and shuttle operations for guests."
    };

    for (const item of servicesItems) {
      if (!item.description) {
        const key = (item.label || '').toLowerCase().trim();
        item.description = defaultDescriptions[key] || "Custom curated services designed and executed by our expert hospitality professionals.";
        await item.save();
        console.log(`Curated description for service: ${item.label}`);
      }
    }

    // 3. Seed default YouTube video if none exists
    const videoCount = await Video.countDocuments();
    if (videoCount === 0) {
      console.log('Seeding default YouTube video URL...');
      const defaultVideo = new Video({
        url: 'https://youtu.be/PehgmzwIYKw?si=Iu0oSAhYE2VRfphF',
      });
      await defaultVideo.save();
      console.log('Default video URL seeded!');
    }

    // 4. Seed default stats if none exist
    const statsCount = await Stats.countDocuments();
    if (statsCount === 0) {
      console.log('Seeding default stats values...');
      const defaultStats = new Stats({
        yearsOfGrace: '2+',
        eventsCrafted: '150+',
        happyClients: '99%',
        citiesServed: '12+'
      });
      await defaultStats.save();
      console.log('Default stats seeded!');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

mongoose.connection.once('open', () => {
  console.log('MongoDB connection established. Seeding default data...');
  seedData();
});

const PORT = process.env.PORT || 5000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running in development mode on port ${PORT}`);
  });
}

module.exports = app;
