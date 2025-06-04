import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { ObjectId } from 'mongodb';

const app = express();
app.use(cors());
// Increase JSON payload limit to 10MB (default is 100kb)
app.use(express.json({ limit: '10mb' }));

// Connect to MongoDB (use 'afa' database)
mongoose.connect('mongodb://localhost:27017/argentina_db');

// Gallery schema/model (if still needed, adjust as appropriate)
const gallerySchema = new mongoose.Schema({
  imageUrl: String,
  // ... add other fields if needed
});
const Gallery = mongoose.model('Gallery', gallerySchema, 'gallery');

// User schema/model (use 'users' collection)
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true }, // enforce unique email
  password: String,
  name: String,
  admin: { type: String, default: "No" }, // <-- Add admin field
  // ... add other fields if needed
});
const User = mongoose.model('User', userSchema, 'users');

// API endpoint to get gallery images
app.get('/api/gallery', async (req, res) => {
  try {
    const images = await Gallery.find({});
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
});

// API endpoint to get match tickets
app.get('/api/matchtickets', async (req, res) => {
  try {
    const tickets = await mongoose.connection.collection('matchtickets').find({}).toArray();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch match tickets' });
  }
});

// API endpoint to get merchandise
app.get('/api/merchandise', async (req, res) => {
  try {
    const merchandise = await mongoose.connection.collection('merchandise').find({}).toArray();
    res.json(merchandise);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch merchandise' });
  }
});

// Sign in endpoint
app.post('/api/signin', async (req, res) => {
  let { email, password } = req.body;
  try {
    // Normalize email and trim password
    const originalEmail = email;
    const originalPassword = password;
    email = email ? email.trim().toLowerCase() : '';
    password = password ? password.trim() : '';

    // Debug: Show all users for troubleshooting
    const allUsers = await User.find({});
    console.log('All users in DB:', allUsers);

    console.log('Sign-in attempt:');
    console.log('  Original email:', originalEmail);
    console.log('  Normalized email:', email);
    console.log('  Original password:', originalPassword);
    console.log('  Trimmed password:', password);

    // Find user in 'users' collection
    const user = await User.findOne({ email }); // <-- this was missing

    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log('User found:', user.email);
    console.log('Password provided:', password);
    console.log('Password in DB:', user.password);
    console.log('Password comparison result:', user.password === password);

    // Plain text password check (no bcrypt)
    const valid = user.password === password;
    if (!valid) {
      console.log('Password mismatch!');
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Sign in successful', user: { email: user.email, admin: user.admin } });
  } catch (err) {
    console.error('Sign-in error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    let { email, password, name } = req.body;
    email = email ? email.trim().toLowerCase() : '';
    password = password ? password.trim() : '';
    name = name ? name.trim() : '';

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists with this email' });
    }

    // Create and save new user with admin: "No"
    const newUser = new User({ email, password, name, admin: "No" });
    await newUser.save();

    res.json({ message: 'Registration successful', user: { email, name, admin: "No" } });
  } catch (err) {
    // Handle duplicate key error (in case of race condition)
    if (err.code === 11000) {
      return res.status(409).json({ error: 'User already exists with this email' });
    }
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new gallery image (admin)
app.post('/api/admin/gallery', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ error: 'Image URL required' });
    const newImg = new Gallery({ imageUrl });
    await newImg.save();
    res.json({ message: 'Gallery image added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add gallery image' });
  }
});

// Add new match ticket (admin)
app.post('/api/admin/matchtickets', async (req, res) => {
  try {
    const { title, price, image } = req.body;
    if (!title || !price) return res.status(400).json({ error: 'Title and price required' });
    await mongoose.connection.collection('matchtickets').insertOne({ title, price, image });
    res.json({ message: 'Match ticket added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add match ticket' });
  }
});

// Add new merchandise (admin)
app.post('/api/admin/merchandise', async (req, res) => {
  try {
    const { title, price, image } = req.body;
    if (!title || !price) return res.status(400).json({ error: 'Title and price required' });
    await mongoose.connection.collection('merchandise').insertOne({ title, price, image });
    res.json({ message: 'Merchandise added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add merchandise' });
  }
});

// Delete gallery image by id
app.delete('/api/admin/gallery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await mongoose.connection.collection('gallery').deleteOne({ _id: new ObjectId(id) });
    res.json({ message: 'Gallery image deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete gallery image' });
  }
});

// Delete match ticket by id
app.delete('/api/admin/matchtickets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await mongoose.connection.collection('matchtickets').deleteOne({ _id: new ObjectId(id) });
    res.json({ message: 'Match ticket deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete match ticket' });
  }
});

// Delete merchandise by id
app.delete('/api/admin/merchandise/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await mongoose.connection.collection('merchandise').deleteOne({ _id: new ObjectId(id) });
    res.json({ message: 'Merchandise deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete merchandise' });
  }
});

// Serve static files in Express
app.use('/images', express.static('images'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));