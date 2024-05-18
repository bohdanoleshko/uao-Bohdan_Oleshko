const DateService = require('../services/DateService');

async function createRecord(req, res) {
  try {
    const newRecord = await DateService.createRecord(req.body)
    res.json(newRecord)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function getRecords(req, res) {
  try {
    const records = await DateService.getRecords()
    res.json(records)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function updateRecord(req, res) {
  try {
    const result = await DateService.updateRecord(req.params.id, req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function deleteRecord(req, res) {
  try {
    const result = await DateService.deleteRecord(req.params.id)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
}
