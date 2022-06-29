const mongoose = require('mongoose');
const { logger } = require('../../log/logger');

class MongoDBContainer {
  static instance;
  constructor(collection, Schema) {
    this.model = mongoose.model(collection, Schema);
  };

  async getAll(filter = {}) {
    try{
      const documents = await this.model.find(filter,{ __v: 0 }).lean();
      return documents;
    }
    catch(error) {
      logger.log('error',error.message)
    }
  }

  async getById(id) {
    try {
      const document = await this.model.findById(id, { __v: 0 }).lean();
      if (!document) {
        const error = `Resource with id ${id} does not exist in our records`;
        logger.log('error',error)
        
      } else {
        return document;
      }
    }
    catch(error) {
      logger.log('error',error.message)
      
    }
  }

  async createItem(resourceItem) {
    try {
      const newItem = new this.model(resourceItem);
      newItem.timestamp = new Date()
      await newItem.save();
      return newItem;
    }
    catch (error) {
      logger.log('error',error.message)
    }
  }

}
module.exports = MongoDBContainer;
