const { logger } = require('../../log/logger');
const MongoDBContainer = require('./../containers/Mongodb.container');
const ProductSchema = require('./../schemas/Product.schema');
const collection = 'products';

class ProductsDao extends MongoDBContainer {
    static instance;
    constructor() {
        if (!ProductsDao.instance) {
            super(collection, ProductSchema);
            ProductsDao.instance = this;
            return this;
        } else {
            return ProductsDao.instance;
        }
    }
    async createProduct(prodItem) {
        try {
            const prod = await this.createItem(prodItem);
            await prod.save()
            return prod;
        } catch (error) {
            logger.log('error',error.message)
            logger.log('error',`Error creating product`)
        }
    }
    async getProdByCategory(category){
        try {
            const document = await this.getAll({category:category})
            if (!document) {
                const errorMessage = `Category does not exists`;
                throw new Error(JSON.stringify(errorMessage));
            } else {
                return document;
            }
        } catch (error) {
            logger.log('error',error.message)
        }
    }
};

module.exports = ProductsDao;