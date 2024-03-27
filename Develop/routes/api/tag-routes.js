const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // Find all tags and include associated Product data
  Tag.findAll({
    include: [{
      model: Product,
      as: 'products'
    }]
  })
  .then(tags => {
    res.json(tags);
  })
  .catch(error => {
    console.error('Error retrieving tags:', error);
    res.status(500).json({ message: error.message });
  });
});

router.get('/:id', (req, res) => {
  // Find a single tag by its `id`
  const { id } = req.params;

  Tag.findOne({
    where: { id },
    include: [{
      model: Product,
      through: ProductTag,
      as: 'products'
    }]
  })
  .then(tag => {
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.json(tag);
  })
  .catch(error => {
    console.error('Error retrieving tag:', error);
    res.status(500).json({ message: 'Server error' });
  });
});

router.post('/', (req, res) => {
  // Create a new tag
  const { name } = req.body;

  Tag.create({ name })
  .then(newTag => {
    res.status(201).json({ message: 'Tag created successfully', tag: newTag });
  })
  .catch(error => {
    console.error('Error creating tag:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  });
});

router.put('/:id', (req, res) => {
  // Update a tag's name by its `id` value
  const { name } = req.body;
  const tagId = req.params.id;

  Tag.update({ name }, {
    where: { id: tagId }
  })
  .then(rowsUpdated => {
    if (rowsUpdated[0] === 0) {
      res.status(404).json({ message: 'Tag not found' });
    } else {
      res.status(200).json({ message: 'Tag updated successfully' });
    }
  })
  .catch(error => {
    console.error('Error updating tag:', error);
    res.status(500).json({ message: 'Internal Server error' });
  });
});

router.delete('/:id', (req, res) => {
  // Delete a tag by its id
  const tagId = req.params.id;

  Tag.destroy({ where: { id: tagId } })
  .then(rowsDeleted => {
    if (rowsDeleted === 0) {
      res.status(404).json({ message: 'Tag not found' });
    } else {
      res.status(200).json({ message: 'Tag deleted successfully' });
    }
  })
  .catch(error => {
    console.error('Error deleting tag:', error);
    res.status(500).json({ message: 'Internal server error' });
  });
});

module.exports = router;
