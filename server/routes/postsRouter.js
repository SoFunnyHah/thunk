const express = require('express');
const { Post, Restaurant } = require('../db/models');

const router = express.Router();

// fixed
router.post('/', async (req, res) => {
  const {
    name, address, about, image,
  } = req.body.input;
  const newPost = await Restaurant.create({
    name, address, about, image,
  });
  res.json(newPost);
});
router.get('/', async (req, res) => {
  const resalt = await Restaurant.findAll();
  res.json(resalt);
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Restaurant.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  try {
    console.log('---SERVER BODY---:', req.body);
    await Restaurant.update(req.body.input, { where: { id: req.params.id } });
    const result = await Restaurant.findAll();
    res.json(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
