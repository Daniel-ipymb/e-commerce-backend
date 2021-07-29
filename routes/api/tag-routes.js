const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: "tags_products"}]
    })
    res.status(200).json(tagData)
  } catch (error) {
    res.status(500).json(error)
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: "tags_products"}]
    })
    if (!tagData) {
      res.status(404).json({ message: 'No such tag available'})
      return;
    };
    res.status(200).json(tagData)
  } catch (error) {
    res.status(500).json(error)
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body)
    
    res.status(200).json(tagData)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!tagData[0]) {
      res.status(404).json({ message: "This tag doesn't exist!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error)
  }
});
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!deleteTag) {
      res.status(404).json({ message: "No tag exists with the id"});
      return;
    }
    res.status(200).json(deleteTag);
  } catch (error) {
    res.status(500).json(error)
    
  }
});

module.exports = router;
