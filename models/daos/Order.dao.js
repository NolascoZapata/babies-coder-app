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
};

module.exports = OrderDao;