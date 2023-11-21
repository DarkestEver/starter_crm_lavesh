var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Destination from "../models/Destination";
import express from "express";
const router = express.Router();
router.post('/save', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDestination = new Destination(req.body);
        const savedDestination = yield newDestination.save();
        res.status(201).json(savedDestination);
    }
    catch (error) {
        res.status(400).json({ error: 'Could not create the destination.' });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const destinations = yield Destination.find();
        res.status(200).json(destinations);
    }
    catch (error) {
        res.status(500).json({ error: 'Could not retrieve destinations.' });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const destination = yield Destination.findById(req.params.id);
        if (!destination) {
            res.status(404).json({ error: 'Destination not found.' });
        }
        else {
            res.status(200).json(destination);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Could not retrieve the destination.' });
    }
}));
router.put('/edit/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedDestination = yield Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDestination) {
            res.status(404).json({ error: 'Destination not found.' });
        }
        else {
            res.status(200).json(updatedDestination);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Could not update the destination.' });
    }
}));
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedDestination = yield Destination.findByIdAndRemove(req.params.id);
        if (!deletedDestination) {
            res.status(404).json({ error: 'Destination not found.' });
        }
        else {
            res.status(204).send();
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Could not delete the destination.' });
    }
}));
export default router;
