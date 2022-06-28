const MongoDBContainer = require('../containers/Mongodb.container');
const ChatSchema = require('../schemas/Chat.schema');

const collection = 'chats';

class ChatsDao extends MongoDBContainer {
    static instance;
    constructor() {
        if (!ChatsDao.instance) {
            super(collection, ChatSchema);
            ChatsDao.instance = this;
            return this;
        } else {
            return ChatsDao.instance;
        }
    }

    async createChat(chatItem) {
        try {
            const chat = await this.createItem(chatItem);
            await chat.save();
            return chat;
        } catch (error) {
            throw new Error(error);
        }

    };

    async getById(id) {
        try {
            const document = await this.model.find({id:id})
            if (!document) {
                const errorMessage = `Resource with id ${id} does not exist in our records`;
                throw new Error(JSON.stringify(errorMessage));
            } else {
                return document;
            }
        } catch (error) {
            throw new Error(JSON.stringify(error));
        }
    }

    async getByEmail(email) {
        try {
            const document = await this.model.findOne({email})
            if (!document) {
                throw new Error(JSON.stringify(errorMessage));
            } else {
                return document;
            }
        } catch (error) {
            throw new Error(JSON.stringify(error));
        }
    }
};

module.exports = ChatsDao;