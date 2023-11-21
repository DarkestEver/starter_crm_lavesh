import {Extras, HeroSection, Home, MiddleSection} from "../models/Home.js"

import Seo from "../models/Seo.js";
import express from "express";
import homeSchema from './../validation/homeValidation.js';
import validation from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const home = await Home.findOne()
      .populate('heroSection')
      .populate('middleSection')
      .populate('extras')
      .populate('seo');

    res.status(200).json(home);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve Home.' });
  }
});

router.post('/save', validation(homeSchema) ,async (req, res) => {
  try {
    const newHome = new Home(req.body);
    const savedHome = await newHome.save();
    res.status(201).json(savedHome);
  } catch (error) {
    res.status(400).json({ error: 'Could not create the Home.' });
  }
});


// Put request for HeroSection
router.put('/heroSection/:id', async (req, res) => {
  const homeId = req.params.id;

  try {
    const home = await Home.findById(homeId);

    if (!home) {
      return res.status(404).json({ error: 'Home not found' });
    }

    if (home.heroSection) {
      const updatedHeroSection = await HeroSection.findByIdAndUpdate(
        home.heroSection,
        { $set: req.body },
        { new: true }
      );

      if (!updatedHeroSection) {
        return res.status(404).json({ error: 'HeroSection not found' });
      }

      const updatedHome = await Home.findByIdAndUpdate(
        homeId,
        { $set: { heroSection: updatedHeroSection._id } },
        { new: true }
      ).populate('heroSection');

      if (!updatedHome) {
        return res.status(404).json({ error: 'Home not found' });
      }

      res.status(200).json(updatedHome.heroSection);
    } else {
      const newHeroSection = new HeroSection(req.body);
      const savedHeroSection = await newHeroSection.save();

      const updatedHome = await Home.findByIdAndUpdate(
        homeId,
        { $set: { heroSection: savedHeroSection._id } },
        { new: true }
      ).populate('heroSection');

      if (!updatedHome) {
        return res.status(404).json({ error: 'Home not found' });
      }

      res.status(200).json(updatedHome.heroSection);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Could not save/update HeroSection content.' });
  }
});


// Put request for MiddleSection
router.put('/middlesection/:id', async (req, res) => {
  const homeId = req.params.id;

  try {
    const home = await Home.findById(homeId);

    if (!home) {
      return res.status(404).json({ error: 'Home not found' });
    }

    if (home.middleSection) {
      const updatedMiddleSection = await MiddleSection.findByIdAndUpdate(
        home.middleSection,
        { $set: req.body },
        { new: true }
      );

      if (!updatedMiddleSection) {
        return res.status(404).json({ error: 'MiddleSection not found' });
      }

      const updatedHome = await Home.findByIdAndUpdate(
        homeId,
        { $set: { middleSection: updatedMiddleSection._id } },
        { new: true }
      ).populate('middleSection');

      if (!updatedHome) {
        return res.status(404).json({ error: 'Home not found' });
      }

      res.status(200).json(updatedHome.middleSection);
    } else {
      const newMiddleSection = new MiddleSection(req.body);
      const savedMiddleSection = await newMiddleSection.save();

      const updatedHome = await Home.findByIdAndUpdate(
        homeId,
        { $set: { middleSection: savedMiddleSection._id } },
        { new: true }
      ).populate('middleSection');

      if (!updatedHome) {
        return res.status(404).json({ error: 'Home not found' });
      }

      res.status(200).json(updatedHome.middleSection);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Could not save/update MiddleSection content.' });
  }
});

// Put request for Extras
router.put('/extras/:id', async (req, res) => {
  const homeId = req.params.id;

  try {
    const home = await Home.findById(homeId);

    if (!home) {
      return res.status(404).json({ error: 'Home not found' });
    }

    if (home.extras) {
      const updatedExtras = await Extras.findByIdAndUpdate(
        home.extras,
        { $set: req.body },
        { new: true }
      );

      if (!updatedExtras) {
        return res.status(404).json({ error: 'Extras not found' });
      }

      const updatedHome = await Home.findByIdAndUpdate(
        homeId,
        { $set: { extras: updatedExtras._id } },
        { new: true }
      ).populate('extras');

      if (!updatedHome) {
        return res.status(404).json({ error: 'Home not found' });
      }

      res.status(200).json(updatedHome.extras);
    } else {
      const newExtras = new Extras(req.body);
      const savedExtras = await newExtras.save();

      const updatedHome = await Home.findByIdAndUpdate(
        homeId,
        { $set: { extras: savedExtras._id } },
        { new: true }
      ).populate('extras');

      if (!updatedHome) {
        return res.status(404).json({ error: 'Home not found' });
      }

      res.status(200).json(updatedHome.extras);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Could not save/update Extras content.' });
  }
});



// SEO
router.put('/seo/:id', async (req, res) => {
  const homeId = req.params.id;

  try {
    const about = await Home.findById(homeId);

    if (!about) {
      return res.status(404).json({ error: 'About not found' });
    }

    if (about.seo) {
      const updatedSeo = await Seo.findByIdAndUpdate(
        about.seo,
        { $set: req.body },
        { new: true }
      );

      if (!updatedSeo) {
        return res.status(404).json({ error: 'Seo not found' });
      }

      const updatedAbout = await Home.findByIdAndUpdate(
        homeId,
        { $set: { seo: updatedSeo._id } },
        { new: true }
      ).populate('seo');

      if (!updatedAbout) {
        return res.status(404).json({ error: 'About not found' });
      }

      res.status(200).json(updatedAbout.seo);
    } else {
      const newSeo = new Seo(req.body);
      const savedSeo = await newSeo.save();

      const updatedAbout = await Home.findByIdAndUpdate(
        homeId,
        { $set: { seo: savedSeo._id } },
        { new: true }
      ).populate('seo');

      if (!updatedAbout) {
        return res.status(404).json({ error: 'About not found' });
      }

      res.status(200).json(updatedAbout.seo);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Could not save/update SEO content.' });
  }

});










// // APIs for TopSection
// router.post('/topsection/save', async (req, res) => {
//   try {
//     const newTopSection = new TopSection(req.body);
//     const savedTopSection = await newTopSection.save();
//     res.status(201).json(savedTopSection);
//   } catch (error) {
//     res.status(400).json({ error: 'Could not create the TopSection.' });
//   }
// });

// router.put('/topsection/edit', async (req, res) => {
//   try {
//     const updatedTopSection = await TopSection.findByIdAndUpdate(req.body._id, req.body, { new: true });
//     res.status(200).json(updatedTopSection);
//   } catch (error) {
//     res.status(500).json({ error: 'Could not update TopSection.' });
//   }
// });

// router.get('/topsection', async (req, res) => {
//   try {
//     const topSection = await TopSection.findOne();
//     res.status(200).json(topSection);
//   } catch (error) {
//     res.status(500).json({ error: 'Could not retrieve TopSection.' });
//   }
// });

// // APIs for MiddleSection
// router.post('/middlesection/save', async (req, res) => {
//   try {
//     const newMiddleSection = new MiddleSection(req.body);
//     const savedMiddleSection = await newMiddleSection.save();
//     res.status(201).json(savedMiddleSection);
//   } catch (error) {
//     res.status(400).json({ error: 'Could not create the MiddleSection.' });
//   }
// });

// router.put('/middlesection/edit', async (req, res) => {
//   try {
//     const updatedMiddleSection = await MiddleSection.findByIdAndUpdate(req.body._id, req.body, { new: true });
//     res.status(200).json(updatedMiddleSection);
//   } catch (error) {
//     res.status(500).json({ error: 'Could not update MiddleSection.' });
//   }
// });

// router.get('/middlesection', async (req, res) => {
//   try {
//     const middleSection = await MiddleSection.findOne();
//     res.status(200).json(middleSection);
//   } catch (error) {
//     res.status(500).json({ error: 'Could not retrieve MiddleSection.' });
//   }
// });

// // APIs for Extras
// router.post('/extras/save', async (req, res) => {
//   try {
//     const newExtras = new Extras(req.body);
//     const savedExtras = await newExtras.save();
//     res.status(201).json(savedExtras);
//   } catch (error) {
//     res.status(400).json({ error: 'Could not create the Extras.' });
//   }
// });

// router.put('/extras/edit', async (req, res) => {
//   try {
//     const updatedExtras = await Extras.findByIdAndUpdate(req.body._id, req.body, { new: true });
    
//     if (!updatedExtras) {
//       return res.status(404).json({ error: 'Extras not found.' });
//     }

//     res.status(200).json(updatedExtras);
//   } catch (error) {
//     res.status(500).json({ error: 'Could not update Extras.' });
//   }
// });

// router.get('/extras', async (req, res) => {
//   try {
//     const extras = await Extras.findOne();
//     res.status(200).json(extras);
//   } catch (error) {
//     res.status(500).json({ error: 'Could not retrieve Extras.' });
//   }
// });

// router.get('/seo', async(req,res) => {
//   try {
//     const seo = await Extras.findOne();
//     res.status(200).json(seo);
//   } catch (error) {
//     res.status(500).json({ error: 'Could not retrieve seo.' });
//   }
// })

export default router;