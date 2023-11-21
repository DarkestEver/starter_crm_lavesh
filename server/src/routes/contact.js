import Contact from "../models/Contact.js"
import Seo from "../models/Seo.js";
import contactSchema from "../validation/contactValidation.js";
import express from "express";
import validation from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post('/save', validation(contactSchema), async (req, res) => {
  try {
    const newContact = new Contact(req.body);

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ error: 'Could not create the contact.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const contact = await Contact.findOne().populate('seo');
    if (!contact) {
      res.status(404).json({ error: 'Contact details not found.' });
    } else {
      res.status(200).json(contact);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve contact details.' });
  }
});

router.put('/edit', async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate( req.body._id, req.body, { new: true });
    if (!updatedContact) {
      res.status(404).json({ error: 'Contact details not found.' });
    } else {
      res.status(200).json(updatedContact);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not update contact details.' });
  }
});

// SEO
router.put('/seo/:id', async (req, res) => {
  const contactId = req.params.id;

  try {
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    if (contact.seo) {
      const updatedSeo = await Seo.findByIdAndUpdate(
        contact.seo,
        { $set: req.body },
        { new: true }
      );

      if (!updatedSeo) {
        return res.status(404).json({ error: 'Seo not found' });
      }

      const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        { $set: { seo: updatedSeo._id } },
        { new: true }
      ).populate('seo');

      if (!updatedContact) {
        return res.status(404).json({ error: 'Contact data not found' });
      }

      res.status(200).json(updatedContact.seo);
    } else {
      const newSeo = new Seo(req.body);
      const savedSeo = await newSeo.save();

      const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        { $set: { seo: savedSeo._id } },
        { new: true }
      ).populate('seo');

      if (!updatedContact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      res.status(200).json(updatedContact.seo);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Could not save/update SEO content.' });
  }

});

export default router;