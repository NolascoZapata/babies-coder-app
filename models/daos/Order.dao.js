const MongoDBContainer = require('../containers/Mongodb.container');
const OrderSchema = require('../schemas/Order.schema');

const collection = 'order';

class OrderDao extends MongoDBContainer {
    static instance;
    constructor() {
        super(collection, OrderSchema);
        if (!OrderDao.instance) {
            OrderDao.instance = this;
            return this;
        } else {
            return OrderDao.instance;
        }
    }
    async getOrderUserByEmail(email) {
        try {
            const document = await this.model.findOne({ email }, { __v: 0 });
            if (!document) {
                const errorMessage = `No orders from this user`;
                throw new Error(JSON.stringify(errorMessage));
            } else {
                return document;
            }
        } catch (error) {
            logger.log('error',error.message)
        }
    }
    async saveOrder(items) {
        try {
            const document = await this.model.save(items);
            if (!document) {
                const errorMessage = `Cant save orders from this user`;
                throw new Error(JSON.stringify(errorMessage));
            } else {
                return document;
            }
        } catch (error) {
            logger.log('error',error.message)
        }
    } 
};

module.exports = OrderDao;