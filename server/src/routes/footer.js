import Footer from "../models/Footer.js"
import express from "express";
import footerSchema from './../validation/footerValidation.js';
import validation from "../middleware/validationMiddleware.js";

const router = express.Router();
// Create a new footer (POST request)
router.post('/save', validation(footerSchema), async (req, res) => {
  try {
    const newFooter = new Footer(req.body);
    const savedFooter = await newFooter.save();
    res.status(201).json(savedFooter);
  } catch (error) {
    res.status(400).json({ error: 'Could not create the footer.' });
  }
});

// Get all footers (GET request)
router.get('/', async (req, res) => {
  try {
    const footers = await Footer.find();
    res.status(200).json(footers);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve footers.' });
  }
});

// Get a specific footer by ID (GET request)
router.get('/:id', async (req, res) => {
  try {
    const footer = await Footer.findById(req.params.id);
    if (!footer) {
      res.status(404).json({ error: 'Footer not found.' });
    } else {
      res.status(200).json(footer);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve the footer.' });
  }
});

// Update a footer by ID (PUT request)
router.put('/edit', async (req, res) => {
  try {
    const updatedFooter = await Footer.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (!updatedFooter) {
      res.status(404).json({ error: 'Footer not found.' });
    } else {
      res.status(200).json(updatedFooter);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not update the footer.' });
  }
});

export default router;