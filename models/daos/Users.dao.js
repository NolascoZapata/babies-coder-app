const { logger } = require('../../log/logger');
const { generateAccount } = require('../../utils/accounts.utils');
const notifMailAdmin = require('../../utils/gmail.utils');
const { generateOrder } = require('../../utils/order.utils ');
const { generateCart } = require('./../../utils/cart.utils')
const MongoDBContainer = require('./../containers/Mongodb.container');
const UserSchema = require('./../schemas/User.schema');
const AccountDao = require ('./Account.dao');
const CartsDao = require('./Cart.dao');
const OrderDao = require('./Order.dao');

const collection = 'users';
const Account = new AccountDao()
const Cart = new CartsDao()
const Order = new OrderDao()

class UsersDao extends MongoDBContainer {
    static instance;
    constructor() {
        if (!UsersDao.instance) {
            super(collection, UserSchema);
            UsersDao.instance = this;
            return this;
        } else {
            return UsersDao.instance;
        }
    }

    async createUser(userItem) {
        try {
            const user = await this.createItem(userItem);
            const cartItem = generateCart()
            const accountItem = generateAccount() ;
            const orderItem = generateOrder()
            cartItem.owner = user._id;
            accountItem.owner = user._id;
            orderItem.owner = user._id;
            orderItem.owner_email = user.email;
            const cart = await Cart.createItem(cartItem);
            const account = await Account.createItem(accountItem);
            const order = await Order.createItem(orderItem)
            user.cart = [cart._id];
            user.accounts = [account._id];
            user.orders=[order._id];
            await user.save();
            notifMailAdmin(`user`, `${user.email} just registed !`)
            return user;
        } catch (error) {
            logger.log('error',error.message)
        }

    };

    async getByEmail(email) {
        try {
            const document = await this.model.findOne({ email }, { __v: 0 });
            if (!document) {
                const errorMessage = `Wrong username`;
                throw new Error(JSON.stringify(errorMessage));
            } else {
                return document;
            }
        } catch (error) {
            logger.log('error',error.message)
        }
    }
}
module.exports = UsersDao