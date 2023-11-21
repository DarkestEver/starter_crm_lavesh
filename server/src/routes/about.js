import About from '../models/About.js';
import Seo from '../models/Seo.js';
import aboutValidation from './../validation/aboutValidation.js';
import express from "express";
import validation from './../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/save', validation(aboutValidation), async (req, res) => {
  try {
    const newAbout = new About(req.body);
    const savedAbout = await newAbout.save();
    res.status(201).json(savedAbout);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Could not create the about section.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const about = await About.findOne().populate('seo');
    if (!about) {
      res.status(404).json({ error: 'About section not found.' });
    } else {
      res.status(200).json(about);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve the about section.' });
  }
});

router.put('/edit', async (req,res) => {
  try {
    const updatedAbout = await About.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (!updatedAbout) {
      res.status(404).json({ error: 'About section not found.' });
    } else {
      res.status(200).json(updatedAbout);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not update the about section.' });
  }
});


// SEO
router.put('/seo/:id', async (req, res) => {
  const aboutId = req.params.id;

  try {
    const about = await About.findById(aboutId);

    if (!about) {
      return res.status(404).json({ error: 'About not found' });
    }

    if (about.seo) {
      const updatedSeo = await Seo.findByIdAndUpdate(
        about.seo,
        { $set: req.body },
        { new: true }
      );

      if (!updatedSeo) {
        return res.status(404).json({ error: 'Seo not found' });
      }

      const updatedAbout = await About.findByIdAndUpdate(
        aboutId,
        { $set: { seo: updatedSeo._id } },
        { new: true }
      ).populate('seo');

      if (!updatedAbout) {
        return res.status(404).json({ error: 'About not found' });
      }

      res.status(200).json(updatedAbout.seo);
    } else {
      const newSeo = new Seo(req.body);
      const savedSeo = await newSeo.save();

      const updatedAbout = await About.findByIdAndUpdate(
        aboutId,
        { $set: { seo: savedSeo._id } },
        { new: true }
      ).populate('seo');

      if (!updatedAbout) {
        return res.status(404).json({ error: 'About not found' });
      }

      res.status(200).json(updatedAbout.seo);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Could not save/update SEO content.' });
  }

});

export default router;