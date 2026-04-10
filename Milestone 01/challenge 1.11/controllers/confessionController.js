const confessionService = require('../services/confessionService')

function createConfession(req, res) {
  const result = confessionService.createConfession(req.body)

  if (result.error) {
    return res.status(400).json({ error: result.error })
  }

  res.status(201).json(result)
}

function getAllConfessions(req, res) {
  const data = confessionService.getAllConfessions()
  res.json(data)
}

function getConfessionById(req, res) {
  const confessionId = parseInt(req.params.id)
  const result = confessionService.getConfessionById(confessionId)

  if (!result) {
    return res.status(404).json({ msg: 'not found' })
  }

  res.json(result)
}

function getConfessionsByCategory(req, res) {
  const category = req.params.category
  const result = confessionService.getConfessionsByCategory(category)

  if (result.error) {
    return res.status(400).json({ msg: result.error })
  }

  res.json(result)
}

function deleteConfession(req, res) {
  const token = req.headers['x-delete-token']

  if (token !== process.env.DELETE_TOKEN) {
    return res.status(403).json({ msg: 'no permission' })
  }

  const confessionId = parseInt(req.params.id)
  const result = confessionService.deleteConfession(confessionId)

  if (!result) {
    return res.status(404).json({ msg: 'not found' })
  }

  res.json({ msg: 'ok', item: result })
}

module.exports = {
  createConfession,
  getAllConfessions,
  getConfessionById,
  getConfessionsByCategory,
  deleteConfession
}