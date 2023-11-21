import Blog from "../models/Blog.js"
import Seo from "../models/Seo.js";
import blogSchema from "../validation/blogValidation.js";
import express from "express";
import validation from "../middleware/validationMiddleware.js";

const router = express.Router();

// Create a new blog (POST request)
router.post('/save', validation(blogSchema), async (req, res) => {
  try {    
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ error: 'Could not create the blog.' });
  }
});

// Get all blogs (GET request)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('seo');
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve blogs.' });
  }
});

// Get a specific blog by ID (GET request)
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('seo');
    if (!blog) {
      res.status(404).json({ error: 'Blog not found.' });
    } else {
      res.status(200).json(blog);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve the blog.' });
  }
});

// Update a blog by ID (PUT request)
router.put('/edit/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) {
      res.status(404).json({ error: 'Blog not found.' });
    } else {
      res.status(200).json(updatedBlog);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not update the blog.' });
  }
});

// Delete a blog by ID (DELETE request)
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndRemove(req.params.id);
    if (!deletedBlog) {
      res.status(404).json({ error: 'Blog not found.' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not delete the blog.' });
  }
});


// SEO
router.put('/seo/:id', async (req, res) => {
  const bogId = req.params.id;

  try {
    const blog = await Blog.findById(bogId);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    if (blog.seo) {
      const updatedSeo = await Seo.findByIdAndUpdate(
        blog.seo,
        { $set: req.body },
        { new: true }
      );

      if (!updatedSeo) {
        return res.status(404).json({ error: 'Seo not found' });
      }

      const updatedBlog = await Blog.findByIdAndUpdate(
        bogId,
        { $set: { seo: updatedSeo._id } },
        { new: true }
      ).populate('seo');

      if (!updatedBlog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      res.status(200).json(updatedBlog.seo);
    } else {
      const newSeo = new Seo(req.body);
      const savedSeo = await newSeo.save();

      const updatedBlog = await Blog.findByIdAndUpdate(
        bogId,
        { $set: { seo: savedSeo._id } },
        { new: true }
      ).populate('seo');

      if (!updatedBlog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      res.status(200).json(updatedBlog.seo);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Could not save/update SEO content.' });
  }

});
  
export default router;