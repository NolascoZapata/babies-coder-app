const mongoose = require('mongoose')
const Schema = mongoose.Schema


const chatSchema = new Schema({
    id: {type:String},
    mensajes:{type:String}
})


module.exports=chatSchema