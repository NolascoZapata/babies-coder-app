
const mongoose = require('mongoose');


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
      throw new Error(JSON.stringify(error));
    }
  }

  async getById(id) {
    try {
      const document = await this.model.findById(id, { __v: 0 }).lean();
      if (!document) {
        const errorMessage = `Resource with id ${id} does not exist in our records`;
        throw new Error(JSON.stringify(errorMessage));
      } else {
        return document;
      }
    }
    catch(error) {
      console.log(error.message);
      throw new Error(JSON.stringify(error));
    }
  }

  async createItem(resourceItem) {
    try {
      const newItem = new this.model(resourceItem);
      newItem.timestamp = new Date()
      await newItem.save();
      return newItem;
    }
    catch (err) {
      throw new Error(JSON.stringify(err));
    }
  }

}
module.exports = MongoDBContainer;
