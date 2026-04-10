let confessions = []
let confessionIdCounter = 0

const VALID_CATEGORIES = ["bug", "deadline", "imposter", "vibe-code"]

// create confession
function createConfession(data) {
  if (!data || !data.text) {
    return { error: 'Text is required' }
  }

  if (data.text.length === 0) {
    return { error: 'Text too short' }
  }

  if (data.text.length > 500) {
    return { error: 'Text must be less than 500 characters' }
  }

  if (!VALID_CATEGORIES.includes(data.category)) {
    return { error: 'Invalid category' }
  }

  const newConfession = {
    id: ++confessionIdCounter,
    text: data.text,
    category: data.category,
    created_at: new Date()
  }

  confessions.push(newConfession)

  console.log(`Added confession ${newConfession.id}`)

  return newConfession
}

// get all confessions
function getAllConfessions() {
  const sortedConfessions = [...confessions].sort(
    (a, b) => b.created_at - a.created_at
  )

  return {
    data: sortedConfessions,
    count: sortedConfessions.length
  }
}

// get one confession
function getConfessionById(id) {
  return confessions.find(confession => confession.id === id)
}

// get by category
function getConfessionsByCategory(category) {
  if (!VALID_CATEGORIES.includes(category)) {
    return { error: 'invalid category' }
  }

  return confessions
    .filter(confession => confession.category === category)
    .reverse()
}

// delete confession
function deleteConfession(id) {
  const index = confessions.findIndex(item => item.id === id)

  if (index === -1) return null

  const deletedItem = confessions.splice(index, 1)

  console.log('Deleted confession')

  return deletedItem[0]
}

module.exports = {
  createConfession,
  getAllConfessions,
  getConfessionById,
  getConfessionsByCategory,
  deleteConfession
}