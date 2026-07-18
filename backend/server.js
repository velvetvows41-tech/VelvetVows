const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Models for seeding
const User = require('./models/User');
const Item = require('./models/Item');
const Video = require('./models/Video');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Support base64 image strings
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));
app.use('/api/video', require('./routes/video'));
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

    // 2. Seed default items if collection is empty
    const itemsCount = await Item.countDocuments();
    if (itemsCount === 0) {
      console.log('Seeding default images...');
      const defaultItems = [
        // Hero Slider
        { id: 'h1', type: 'hero', src: '/images/hero1.jpg', label: 'Ancient India Wedding' },
        { id: 'h2', type: 'hero', src: '/images/hero2.jpg', label: 'Traditional Indian Wedding' },
        { id: 'h3', type: 'hero', src: '/images/hero3.jpg', label: 'Bollywood Story Wedding' },
        { id: 'h4', type: 'hero', src: '/images/hero4.jpg', label: 'Modern Dream Wedding' },
        
        // Gallery
        { id: 'g1', type: 'gallery', src: '/images/gallery1.jpg', label: 'Royal Mandap Setup' },
        { id: 'g2', type: 'gallery', src: '/images/gallery2.jpg', label: 'Bridal Floral Walkway' },
        { id: 'g3', type: 'gallery', src: '/images/gallery3.jpg', label: 'Bollywood Aisle Stage' },
        { id: 'g4', type: 'gallery', src: '/images/gallery4.jpg', label: 'Mehndi Garden Theme' },

        // Services (default placeholding images)
        { id: 's1', type: 'services', src: '/images/ancient.jpg', label: 'Royal Heritage Planning' },
        { id: 's2', type: 'services', src: '/images/traditional.jpg', label: 'Custom Traditional Decor' },
        { id: 's3', type: 'services', src: '/images/bollywood.jpg', label: 'Filmy Sangeet Choreography' },
      ];
      await Item.insertMany(defaultItems);
      console.log('Default images seeded successfully!');
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
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});
