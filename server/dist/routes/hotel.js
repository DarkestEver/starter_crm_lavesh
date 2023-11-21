var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Hotel from "../models/Hotel";
import express from "express";
const router = express.Router();
// Create a new hotel (POST request)
router('/hotels', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newHotel = new Hotel(req.body);
        const savedHotel = yield newHotel.save();
        res.status(201).json(savedHotel);
    }
    catch (error) {
        res.status(400).json({ error: 'Could not create the hotel.' });
    }
}));
// Get all hotels (GET request)
router('/hotels', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotels = yield Hotel.find();
        res.status(200).json(hotels);
    }
    catch (error) {
        res.status(500).json({ error: 'Could not retrieve hotels.' });
    }
}));
// Get a specific hotel by ID (GET request)
router('/hotels/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotel = yield Hotel.findById(req.params.id);
        if (!hotel) {
            res.status(404).json({ error: 'Hotel not found.' });
        }
        else {
            res.status(200).json(hotel);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Could not retrieve the hotel.' });
    }
}));
// Update a hotel by ID (PUT request)
router('/hotels/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedHotel = yield Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedHotel) {
            res.status(404).json({ error: 'Hotel not found.' });
        }
        else {
            res.status(200).json(updatedHotel);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Could not update the hotel.' });
    }
}));
// Delete a hotel by ID (DELETE request)
router('/hotels/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedHotel = yield Hotel.findByIdAndRemove(req.params.id);
        if (!deletedHotel) {
            res.status(404).json({ error: 'Hotel not found.' });
        }
        else {
            res.status(204).send();
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Could not delete the hotel.' });
    }
}));
export default router;
