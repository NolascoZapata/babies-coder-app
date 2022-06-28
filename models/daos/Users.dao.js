const { generateAccount } = require('../../utils/accounts.utils');
const { generateCart } = require('./../../utils/cart.utils')
const MongoDBContainer = require('./../containers/Mongodb.container');
const UserSchema = require('./../schemas/User.schema');
const AccountDao = require ('./Account.dao');
const CartsDao = require('./Cart.dao');

const collection = 'users';
const Account = new AccountDao()
const Cart = new CartsDao()

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
            cartItem.owner = user._id;
            accountItem.owner = user._id;
            const cart = await Cart.createItem(cartItem);
            const account = await Account.createItem(accountItem);
            user.cart = [cart._id]
            user.accounts = [account._id];
            await user.save();
            return user;
        } catch (error) {
            throw new Error(error.message);
        }

    };

    // async getById(id) {
    //     try {
    //         const document = await this.model
    //             .findById(id, {
    //                 __v: 0
    //             })
    //             .populate('accounts').lean();
    //         if (!document) {
    //             const errorMessage = `Resource with id ${id} does not exist in our records`;
    //             throw new Error(JSON.stringify(errorMessage));
    //         } else {
    //             return document;
    //         }
    //     } catch (error) {
    //         throw new Error(JSON.stringify(error));
    //     }
    // }

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
            throw new Error(JSON.stringify(error));
        }
    }
}
module.exports = UsersDao