import aboutRoute from './routes/about.js';
import blogRoute from './routes/blog.js';
import contactRoute from './routes/contact.js';
import cors from 'cors';
import destinationRoute from './routes/destination.js';
import dotenv from 'dotenv';
import express from 'express';
import extrasRoute from './routes/extras.js';
import footerRoute from './routes/footer.js';
import homeRoute from './routes/home.js';
import hotelRoute from './routes/hotel.js';
import mongoose from 'mongoose';
import testimonialRoute from './routes/testimonial.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ credentials:true, origin: process.env.ORIGIN_URL}));
mongoose.connect("mongodb+srv://admin-lavesh:admin123@cluster0.agz64.mongodb.net/testingRBAC")
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  
app.use('/api/blog', blogRoute);
app.use('/api/destination', destinationRoute);
app.use('/api/hotel', hotelRoute);
app.use('/api/footer', footerRoute);
app.use('/api/about', aboutRoute);
app.use('/api/contact', contactRoute);
app.use('/api/testimonial', testimonialRoute);
app.use('/api/extras', extrasRoute); 
app.use('/api/home', homeRoute); 

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000!");
})
