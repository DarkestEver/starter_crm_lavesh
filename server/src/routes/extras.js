import { BlockGuide, Newsletter } from "../models/Extras.js"
import { blockGuideSchema, newsletterSchema } from "../validation/extrasValidation.js";

import express from "express";
import validation from "../middleware/validationMiddleware.js";

const router = express.Router();
// Create a new block guide (POST request)
router.post('/blockguide/save', validation(blockGuideSchema) ,async (req, res) => {
  try {
    const newBlockGuide = new BlockGuide(req.body);
    const savedBlockGuide = await newBlockGuide.save();
    res.status(201).json(savedBlockGuide);
  } catch (error) {
    res.status(400).json({ error: 'Could not create the block guide.' });
  }
});

router.put('/blockguide/edit', async (req, res) => {
  try {
    const updatedBlockGuide = await BlockGuide.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (!updatedBlockGuide) {
      res.status(404).json({ error: 'BlockGuide not found.' });
    } else {
      res.status(200).json(updatedBlockGuide);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not update the newsletter.' });
  }
});

// Get all block guides (GET request)
router.get('/blockguide', async (req, res) => {
  try {
    const blockGuides = await BlockGuide.findOne();
    res.status(200).json(blockGuides);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve block guides.' });
  }
});


// Create a new newsletter (POST request)
router.post('/newsletter/save', validation(newsletterSchema) ,async (req, res) => {
  try {
    const newNewsletter = new Newsletter(req.body);
    const savedNewsletter = await newNewsletter.save();
    res.status(201).json(savedNewsletter);
  } catch (error) {
    res.status(400).json({ error: 'Could not create the newsletter.' });
  }
});

router.put('/newsletter/edit', async (req, res) => {
  try {
    const updatedNewsletter = await Newsletter.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (!updatedNewsletter) {
      res.status(404).json({ error: 'Newsletter not found.' });
    } else {
      res.status(200).json(updatedNewsletter);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not update the newsletter.' });
  }
});

router.get('/newsletter', async (req, res) => {
  try {
    const newsletters = await Newsletter.findOne();
    res.status(200).json(newsletters);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve newsletters.' });
  }
});

router.delete('/newsletter/delete/:id', async (req, res) => {
  try {
    await Newsletter.findByIdAndDelete(req.params.id);
    res.status(200).json("Newsletter deleted successfully!");
  } catch (error) {
    res.status(500).json({ error: 'Could not delete newsletter.' });
  }
});

export default router;