var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Blog from "../models/Blog";
import express from "express";
const router = express.Router();
// Create a new blog (POST request)
router.post('/blogs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBlog = new Blog(req.body);
        const savedBlog = yield newBlog.save();
        res.status(201).json(savedBlog);
    }
    catch (error) {
        res.status(400).json({ error: 'Could not create the blog.' });
    }
}));
// Get all blogs (GET request)
router.get('/blogs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield Blog.find();
        res.status(200).json(blogs);
    }
    catch (error) {
        res.status(500).json({ error: 'Could not retrieve blogs.' });
    }
}));
// Get a specific blog by ID (GET request)
router.get('/blogs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blog.findById(req.params.id);
        if (!blog) {
            res.status(404).json({ error: 'Blog not found.' });
        }
        else {
            res.status(200).json(blog);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Could not retrieve the blog.' });
    }
}));
// Update a blog by ID (PUT request)
router.put('/blogs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBlog = yield Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBlog) {
            res.status(404).json({ error: 'Blog not found.' });
        }
        else {
            res.status(200).json(updatedBlog);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Could not update the blog.' });
    }
}));
// Delete a blog by ID (DELETE request)
router.delete('/blogs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBlog = yield Blog.findByIdAndRemove(req.params.id);
        if (!deletedBlog) {
            res.status(404).json({ error: 'Blog not found.' });
        }
        else {
            res.status(204).send();
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Could not delete the blog.' });
    }
}));
export default router;
