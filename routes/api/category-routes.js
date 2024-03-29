const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all categories and include associated Products
    const categories = await Category.findAll({ include: Product });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find one category by its id and include associated Products
    const category = await Category.findByPk(req.params.id, { include: Product });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/', async (req, res) => {
  try {
    // Create a new category
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(400).json({ error: 'Bad request' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update a category by its id
    const [updatedRows] = await Category.update(req.body, {
      where: { id: req.params.id }
    });
    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(400).json({ error: 'Bad request' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its id
    const deletedRowCount = await Category.destroy({ where: { id: req.params.id } });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
