const MongoDBContainer = require('../containers/Mongodb.container');
const AccountSchema = require('../schemas/Account.schema');

const collection = 'accounts';

class AccountsDao extends MongoDBContainer {
    static instance;
    constructor() {
        super(collection, AccountSchema);
        if (!AccountsDao.instance) {
            AccountsDao.instance = this;
            return this;
        } else {
            return AccountsDao.instance;
        }
    }
};

module.exports = AccountsDao;