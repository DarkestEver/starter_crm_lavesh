const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog')
const Category = require('../models/category');


router.get('/', async (req, res) => {
    try {
        const blog = await Blog.find({ deleted: 0 }).populate('category','name');
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/', async (req,res) => {
    const { title, description, category } = req.body;
    try{
        const existingBlog = await Blog.findOne({ title });

        if (existingBlog) {
            res.status(409).json({ message: 'Blog with this title already exists.' });
        } else {
            const newBlog = new Blog({
                title,
                description,
                category
            });

            const savedBlog = await newBlog.save();
            res.status(201).json(savedBlog);
        }

    }catch(err){
        res.status(500).json({"Error": err});
    }
})

router.put('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBlog = await Blog.findByIdAndUpdate(id, { deleted: 1 }, { new: true });

        if (deletedBlog) {
            res.status(201).json({ "Updated": deletedBlog });
        } else {
            res.status(404).json({ "Message": "Blog not found" });
        }
    } catch (err) {
        res.status(500).json({ "Error": err.message });
    }
});



router.get('/category', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/category', async (req, res) => {
    const { name, description } = req.body;

    try {
        const category = await Category.findOne({name});
        if(category){
            res.status(403).json("Category with this name already exits");
        }else{

            const newCategory = new Category({
                name,
                description
            });
            
            const savedCategory = await newCategory.save();
            res.status(201).json(savedCategory);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

  
module.exports = router;