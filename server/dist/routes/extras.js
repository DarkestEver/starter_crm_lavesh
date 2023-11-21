var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BlockGuide, Newsletter } from "../models/Extras";
import express from "express";
const router = express.Router();
// Create a new block guide (POST request)
router.post('/blockguide/save', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBlockGuide = new BlockGuide(req.body);
        const savedBlockGuide = yield newBlockGuide.save();
        res.status(201).json(savedBlockGuide);
    }
    catch (error) {
        res.status(400).json({ error: 'Could not create the block guide.' });
    }
}));
// Get all block guides (GET request)
router.get('/blockguide', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blockGuides = yield BlockGuide.find();
        res.status(200).json(blockGuides);
    }
    catch (error) {
        res.status(500).json({ error: 'Could not retrieve block guides.' });
    }
}));
// Create a new newsletter (POST request)
router.post('/newsletter/save', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newNewsletter = new Newsletter(req.body);
        const savedNewsletter = yield newNewsletter.save();
        res.status(201).json(savedNewsletter);
    }
    catch (error) {
        res.status(400).json({ error: 'Could not create the newsletter.' });
    }
}));
// Get all newsletters (GET request)
router.get('/newsletter', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newsletters = yield Newsletter.find();
        res.status(200).json(newsletters);
    }
    catch (error) {
        res.status(500).json({ error: 'Could not retrieve newsletters.' });
    }
}));
export default router;
