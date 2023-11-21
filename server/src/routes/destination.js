import Destination from "../models/Destination.js"
import Seo from '../models/Seo.js';
import destinationSchema from "../validation/destinationValidation.js";
import express from "express";
import validation from "../middleware/validationMiddleware.js";

const router = express.Router();


router.post('/save', validation(destinationSchema), async (req, res) => {
  try {
    const newDestination = new Destination(req.body);
    const savedDestination = await newDestination.save();
    res.status(201).json(savedDestination);
  } catch (error) {
    res.status(400).json({ error: 'Could not create the destination.' });
  }
});
  
router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find().populate('seo');
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve destinations.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id).populate('seo');
    if (!destination) {
      res.status(404).json({ error: 'Destination not found.' });
    } else {
      res.status(200).json(destination);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve the destination.' });
  }
});

router.put('/edit/:id', async (req, res) => {
  try {
    const updatedDestination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDestination) {
      res.status(404).json({ error: 'Destination not found.' });
    } else {
      res.status(200).json(updatedDestination);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not update the destination.' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedDestination = await Destination.findByIdAndRemove(req.params.id);
    if (!deletedDestination) {
      res.status(404).json({ error: 'Destination not found.' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not delete the destination.' });
  }
});


// SEO
router.put('/seo/:id', async (req, res) => {
  const destinationId = req.params.id;

  try {
    const destination = await Destination.findById(destinationId);

    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    if (Destination.seo) {
      const updatedSeo = await Seo.findByIdAndUpdate(
        Destination.seo,
        { $set: req.body },
        { new: true }
      );

      if (!updatedSeo) {
        return res.status(404).json({ error: 'Seo not found' });
      }

      const updatedDestination = await Destination.findByIdAndUpdate(
        destinationId,
        { $set: { seo: updatedSeo._id } },
        { new: true }
      ).populate('seo');

      if (!updatedDestination) {
        return res.status(404).json({ error: 'Destination not found' });
      }

      res.status(200).json(updatedDestination.seo);
    } else {
      const newSeo = new Seo(req.body);
      const savedSeo = await newSeo.save();

      const updatedDestination = await Destination.findByIdAndUpdate(
        destinationId,
        { $set: { seo: savedSeo._id } },
        { new: true }
      ).populate('seo');

      if (!updatedDestination) {
        return res.status(404).json({ error: 'Destination not found' });
      }

      res.status(200).json(updatedDestination.seo);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Could not save/update SEO content.' });
  }

});
  
export default router;