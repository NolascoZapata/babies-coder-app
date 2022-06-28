const UsersDao = require("../models/daos/Users.dao");
// const {
//     formatUserForDB
// } = require("../utils/users.utils");
const Users = new UsersDao()



const getUserController = async (req, res, next) => {
    try {
        const users = await Users.getAll()
        console.log('info', '[GET]==> Get Users')
        res.json(users)
    } catch (error) {
        console.log('error', error.message)
        next(error)
    }
}
const getUserByEmailController = async (req, res, next) => {
    try {
        const {
            email
        } = req.params
        const user = await Users.getByEmail(email)
        console.log('info', '[GET]==> Get User By Email')
        res.json(user)
    } catch (error) {
        console.log('error', error.message)
        next(error)
    }
}
// const saveUserController = async (req, res, next) => {
//     try {
//         //antes de passport
//         const userObject = {
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password,
//             isAdmin: req.body.isAdmin,
//             userAvatar: req.body.userAvatar,
//         }

//         const newUser = formatUserForDB(userObject)
//         await Users.createUser(newUser)
//         console.log('info', '[POST]==> User saved')
//         res.json(newUser)
//     } catch (error) {
//         console.log('error', error.message)
//         next(error)
//     }
// }
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
                        console.log('info', '[PUT]==> User updated')
                        res.json({
                            user
                        })

                    })
            })
    } catch (error) {
        console.log('error', error.message)
        next(error)
    }
}
const deleteUserController = async (req, res, next) => {
    try {
        const {
            id
        } = req.params.id
        const deletedUser = await Users.model.deleteOne({
            id: +id
        })
        console.log('info', `[DELETE]==> User with id ${+id}`)
        res.json(deletedUser)
    } catch (error) {
        console.log('error', error.message)
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