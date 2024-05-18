const DateModel = require('../models/Date');

async function createRecord(data) {
  try {
    const newRecord = new DateModel(data)
    const result = await newRecord.save()
    return result
  } catch (error) {
    throw error
  }
}

async function getRecords() {
  try {
    const records = await DateModel.find({})
    return records
  } catch (error) {
    throw error
  }
}

async function updateRecord(recordId, newData) {
  try {
    const result = await DateModel.updateOne({ _id: recordId }, newData)
    return result
  } catch (error) {
    throw error
  }
}

async function deleteRecord(recordId) {
  try {
    const result = await DateModel.deleteOne({ _id: recordId })
    return result
  } catch (error) {
    throw error
  }
}

module.exports = {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
}
