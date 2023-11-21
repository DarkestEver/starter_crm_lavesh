import Testimonial from "../models/Testimonial.js"
import express from "express";
import testimonialSchema from './../validation/testimonialValidation.js';
import validation from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post('/save', validation(testimonialSchema) , async (req, res) => {
  try {
    const newTestimonial = new Testimonial(req.body);
    const savedTestimonial = await newTestimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (error) {
    res.status(400).json({ error: 'Could not create the testimonial.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      res.status(404).json({ error: 'Testimonial not found.' });
    } else {
      res.status(200).json(testimonial);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve the Testimonial.' });
  }
});


router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve testimonials.' });
  }
});

router.put('/edit/:id', async (req, res) => {
  try {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTestimonial) {
      res.status(404).json({ error: 'Testimonial not found.' });
    } else {
      res.status(200).json(updatedTestimonial);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not update the testimonial.' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndRemove(req.params.id);
    if (!deletedTestimonial) {
      res.status(404).json({ error: 'Testimonial not found.' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not delete the testimonial.' });
  }
});

export default router;