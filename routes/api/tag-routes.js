const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // Find all tags and include associated Product data
  try {
    // find all categories with its associated Products
    const categoryData = await Tag.findAll({
      include: [
        {model: Product}
      ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }  
});


router.get('/:id', async (req, res) => {
  // Find a single tag by its `id`
  try{
    const catergoryData = await Tag.findByPk(req.params.id, {
      include:[
        {model:Product}
      ]
    })
    if(!tagData){
      res.status(400).json({message:'No tag found with that ID.'});
      return;
    }
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});



router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id, }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json('Tag has been deleted..!!');
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
