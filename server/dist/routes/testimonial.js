var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Testimonial from "../models/Testimonial";
import express from "express";
const router = express.Router();
// Create a new testimonial (POST request)
router.post('/save', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTestimonial = new Testimonial(req.body);
        const savedTestimonial = yield newTestimonial.save();
        res.status(201).json(savedTestimonial);
    }
    catch (error) {
        res.status(400).json({ error: 'Could not create the testimonial.' });
    }
}));
// Get all testimonials (GET request)
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testimonials = yield Testimonial.find();
        res.status(200).json(testimonials);
    }
    catch (error) {
        res.status(500).json({ error: 'Could not retrieve testimonials.' });
    }
}));
// Update a testimonial by ID (PUT request)
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTestimonial = yield Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTestimonial) {
            res.status(404).json({ error: 'Testimonial not found.' });
        }
        else {
            res.status(200).json(updatedTestimonial);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Could not update the testimonial.' });
    }
}));
// Delete a testimonial by ID (DELETE request)
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTestimonial = yield Testimonial.findByIdAndRemove(req.params.id);
        if (!deletedTestimonial) {
            res.status(404).json({ error: 'Testimonial not found.' });
        }
        else {
            res.status(204).send();
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Could not delete the testimonial.' });
    }
}));
export default router;
