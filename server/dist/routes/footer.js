var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Footer from "../models/Footer";
import express from "express";
const router = express.Router();
// Create a new footer (POST request)
router.post('/save', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newFooter = new Footer(req.body);
        const savedFooter = yield newFooter.save();
        res.status(201).json(savedFooter);
    }
    catch (error) {
        res.status(400).json({ error: 'Could not create the footer.' });
    }
}));
// Get all footers (GET request)
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const footers = yield Footer.find();
        res.status(200).json(footers);
    }
    catch (error) {
        res.status(500).json({ error: 'Could not retrieve footers.' });
    }
}));
// Get a specific footer by ID (GET request)
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const footer = yield Footer.findById(req.params.id);
        if (!footer) {
            res.status(404).json({ error: 'Footer not found.' });
        }
        else {
            res.status(200).json(footer);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Could not retrieve the footer.' });
    }
}));
// Update a footer by ID (PUT request)
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedFooter = yield Footer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFooter) {
            res.status(404).json({ error: 'Footer not found.' });
        }
        else {
            res.status(200).json(updatedFooter);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Could not update the footer.' });
    }
}));
// Delete a footer by ID (DELETE request)
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedFooter = yield Footer.findByIdAndRemove(req.params.id);
        if (!deletedFooter) {
            res.status(404).json({ error: 'Footer not found.' });
        }
        else {
            res.status(204).send();
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Could not delete the footer.' });
    }
}));
export default router;
