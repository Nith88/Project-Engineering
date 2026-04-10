const express = require('express')
const router = express.Router()

const {
  createConfession,
  getAllConfessions,
  getConfessionById,
  getConfessionsByCategory,
  deleteConfession
} = require('../controllers/confessionController')

router.post('/', createConfession)
router.get('/', getAllConfessions)
router.get('/category/:category', getConfessionsByCategory)
router.get('/:id', getConfessionById)
router.delete('/:id', deleteConfession)

module.exports = router