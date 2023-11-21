import Hotel from "../models/Hotel.js"
import Seo from "../models/Seo.js";
import express from "express";
import hotelSchema from './../validation/hotelValidation.js';
import validation from "../middleware/validationMiddleware.js";

const router = express.Router();

// Create a new hotel (POST request)
router.post('/save', validation(hotelSchema) , async (req, res) => {
    try {
      const newHotel = new Hotel(req.body);
      const savedHotel = await newHotel.save();
      res.status(201).json(savedHotel);
    } catch (error) {
      res.status(400).json({ error: 'Could not create the hotel.' });
    }
  });
  
  // Get all hotels (GET request)
  router.get('/', async (req, res) => {
    try {
      const hotels = await Hotel.find().populate('seo');
      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json({ error: 'Could not retrieve hotels.' });
    }
  });
  
  // Get a specific hotel by ID (GET request)
  router.get('/:id', async (req, res) => {
    try {
      const hotel = await Hotel.findById(req.params.id).populate('seo');
      if (!hotel) {
        res.status(404).json({ error: 'Hotel not found.' });
      } else {
        res.status(200).json(hotel);
      }
    } catch (error) {
      res.status(500).json({ error: 'Could not retrieve the hotel.' });
    }
  });
  
  // Update a hotel by ID (PUT request)
  router.put('/edit/:id', async (req, res) => {
    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedHotel) {
        res.status(404).json({ error: 'Hotel not found.' });
      } else {
        res.status(200).json(updatedHotel);
      }
    } catch (error) {
      res.status(500).json({ error: 'Could not update the hotel.' });
    }
  });
  
  // Delete a hotel by ID (DELETE request)
  router.delete('/delete/:id', async (req, res) => {
    try {
      const deletedHotel = await Hotel.findByIdAndRemove(req.params.id);
      if (!deletedHotel) {
        res.status(404).json({ error: 'Hotel not found.' });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ error: 'Could not delete the hotel.' });
    }
  });

  
// SEO
router.put('/seo/:id', async (req, res) => {
  const hotelId = req.params.id;

  try {
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    if (hotel.seo) {
      const updatedSeo = await Seo.findByIdAndUpdate(
        hotel.seo,
        { $set: req.body },
        { new: true }
      );

      if (!updatedSeo) {
        return res.status(404).json({ error: 'Seo not found' });
      }

      const updatedHotel = await Hotel.findByIdAndUpdate(
        hotelId,
        { $set: { seo: updatedSeo._id } },
        { new: true }
      ).populate('seo');

      if (!updatedHotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      }

      res.status(200).json(updatedHotel.seo);
    } else {
      const newSeo = new Seo(req.body);
      const savedSeo = await newSeo.save();

      const updatedHotel = await Hotel.findByIdAndUpdate(
        hotelId,
        { $set: { seo: savedSeo._id } },
        { new: true }
      ).populate('seo');

      if (!updatedHotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      }

      res.status(200).json(updatedHotel.seo);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Could not save/update SEO content.' });
  }

});
  

  
  export default router;