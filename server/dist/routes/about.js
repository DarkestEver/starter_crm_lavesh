var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import About from '../models/About';
const router = express.Router();
// Create a new about section (POST request)
router.post('/save', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAbout = new About(req.body);
        const savedAbout = yield newAbout.save();
        res.status(201).json(savedAbout);
    }
    catch (error) {
        res.status(400).json({ error: 'Could not create the about section.' });
    }
}));
// Get the about section (GET request)
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const about = yield About.findOne();
        if (!about) {
            res.status(404).json({ error: 'About section not found.' });
        }
        else {
            res.status(200).json(about);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Could not retrieve the about section.' });
    }
}));
// Update the about section (PUT request)
router.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedAbout = yield About.findOneAndUpdate({}, req.body, { new: true });
        if (!updatedAbout) {
            res.status(404).json({ error: 'About section not found.' });
        }
        else {
            res.status(200).json(updatedAbout);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Could not update the about section.' });
    }
}));
export default router;
