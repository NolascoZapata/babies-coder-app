require('dotenv').config()
module.exports={
    mongo:{
        uri:`mongodb+srv://NolascoZapata:${process.env.DB_PASSWORD}@backend-coderhouse.0dkdf.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
        name: `${process.env.DATABASE}`
    },
    mongo_sessions :{
        connectTo: (database) => `mongodb+srv://NolascoZapata:${process.env.DB_PASSWORD}@backend-coderhouse.0dkdf.mongodb.net/${database}?retryWrites=true&w=majority`,
        
    }
}