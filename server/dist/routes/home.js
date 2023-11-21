var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Extras, MiddleSection, TopSection } from "../models/Home";
import express from "express";
const router = express.Router();
// APIs for TopSection
router.post('/topsection/save', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTopSection = new TopSection(req.body);
        const savedTopSection = yield newTopSection.save();
        res.status(201).json(savedTopSection);
    }
    catch (error) {
        res.status(400).json({ error: 'Could not create the TopSection.' });
    }
}));
router.get('/topsection', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topSection = yield TopSection.findOne();
        res.status(200).json(topSection);
    }
    catch (error) {
        res.status(500).json({ error: 'Could not retrieve TopSection.' });
    }
}));
// APIs for MiddleSection
router.post('/middlesection/save', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newMiddleSection = new MiddleSection(req.body);
        const savedMiddleSection = yield newMiddleSection.save();
        res.status(201).json(savedMiddleSection);
    }
    catch (error) {
        res.status(400).json({ error: 'Could not create the MiddleSection.' });
    }
}));
router.get('/middlesection', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const middleSection = yield MiddleSection.findOne();
        res.status(200).json(middleSection);
    }
    catch (error) {
        res.status(500).json({ error: 'Could not retrieve MiddleSection.' });
    }
}));
// APIs for Extras
router.post('/extras/save', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newExtras = new Extras(req.body);
        const savedExtras = yield newExtras.save();
        res.status(201).json(savedExtras);
    }
    catch (error) {
        res.status(400).json({ error: 'Could not create the Extras.' });
    }
}));
router.get('/extras', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const extras = yield Extras.findOne();
        res.status(200).json(extras);
    }
    catch (error) {
        res.status(500).json({ error: 'Could not retrieve Extras.' });
    }
}));
export default router;
