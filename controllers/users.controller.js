const { logger } = require("../log/logger");
const AccountsDao = require("../models/daos/Account.dao");
const Accounts= new AccountsDao()
const CartsDao = require("../models/daos/Cart.dao");
const Carts = new CartsDao()
const UsersDao = require("../models/daos/Users.dao");
const Users = new UsersDao()



const getUserController = async (req, res, next) => {
    try {
        const users = await Users.getAll()
        logger.log('info', '[GET]==> Get Users')
        res.json(users)
    } catch (error) {
        logger.log('error',error.message)
        next(error)
    }
}
const getUserByEmailController = async (req, res, next) => {
    try {
        const {
            email
        } = req.params
        const user = await Users.getByEmail(email)
        logger.log('info', '[GET]==> Get User By Email')
        res.json(user)
    } catch (error) {
        logger.log('error',error.message)
        next(error)
    }
}
const updateUserController = async (req, res, next) => {
    try {
        const {
            id
        } = req.params.id
        await Users.model.findOne({
                id
            })
            .then((user) => {
                user.name = req.body.name;
                user.email = req.body.price;
                user.password = req.body.size;
                user.isAdmin = req.body.imgDir;
                user.userAvatar = req.body.category;
                user.updatedAt = Date.now()
                user.save()
                    .then(() => {
                        logger.log('info', '[PUT]==> User updated')
                        res.json({
                            user
                        })

                    })
            })
    } catch (error) {
        logger.log('error',error.message)
        next(error)
    }
}
const deleteUserController = async (req, res, next) => {
    try {
        const {id} = req.params.id
        const deletedUser = await Users.model.deleteOne({id: +id})
        // await Carts.model.deleteOne({owner:+id})
        // await Accounts.model.deleteOne({owner:+id})
        logger.log('info', `[DELETE]==> User with id ${+id}`)
        res.json(deletedUser)
    } catch (error) {
        logger.log('error',error.message)
        next(error)
    }
}

module.exports = {
    getUserByEmailController,
    getUserController,
    updateUserController,
    deleteUserController,
    Users
}