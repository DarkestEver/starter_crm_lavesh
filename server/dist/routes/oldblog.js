var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Category from "../models/category";
import express from "express";
import oldBlog from "../models/oldBlog";
const router = express.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Blog = yield oldBlog.find({ deleted: 0 }).populate('category', 'name');
        res.status(200).json(Blog);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, category } = req.body;
    try {
        const existingoldBlog = yield oldBlog.findOne({ title });
        if (existingoldBlog) {
            res.status(409).json({ message: 'oldBlog with this title already exists.' });
        }
        else {
            const newoldBlog = new oldBlog({
                title,
                description,
                category
            });
            const savedoldBlog = yield newoldBlog.save();
            res.status(201).json(savedoldBlog);
        }
    }
    catch (err) {
        res.status(500).json({ "Error": err });
    }
}));
router.put('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedoldBlog = yield oldBlog.findByIdAndUpdate(id, { deleted: 1 }, { new: true });
        if (deletedoldBlog) {
            res.status(201).json({ "Updated": deletedoldBlog });
        }
        else {
            res.status(404).json({ "Message": "oldBlog not found" });
        }
    }
    catch (err) {
        res.status(500).json({ "Error": err.message });
    }
}));
router.get('/category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category.find();
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.post('/category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    try {
        const category = yield Category.findOne({ name });
        if (category) {
            res.status(403).json("Category with this name already exits");
        }
        else {
            const newCategory = new Category({
                name,
                description
            });
            const savedCategory = yield newCategory.save();
            res.status(201).json(savedCategory);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
export default router;
