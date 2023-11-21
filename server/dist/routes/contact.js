var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Contact from "../models/Contact";
import express from "express";
const router = express.Router();
// Create a new contact (POST request)
router.post('/save', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newContact = new Contact(req.body);
        const savedContact = yield newContact.save();
        res.status(201).json(savedContact);
    }
    catch (error) {
        res.status(400).json({ error: 'Could not create the contact.' });
    }
}));
// Get the contact details (GET request)
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = yield Contact.findOne();
        if (!contact) {
            res.status(404).json({ error: 'Contact details not found.' });
        }
        else {
            res.status(200).json(contact);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Could not retrieve contact details.' });
    }
}));
// Update contact details (PUT request)
router.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedContact = yield Contact.findOneAndUpdate({}, req.body, { new: true });
        if (!updatedContact) {
            res.status(404).json({ error: 'Contact details not found.' });
        }
        else {
            res.status(200).json(updatedContact);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Could not update contact details.' });
    }
}));
export default router;
