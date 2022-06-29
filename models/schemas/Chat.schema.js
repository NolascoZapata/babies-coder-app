const mongoose = require('mongoose')
const Schema = mongoose.Schema


const chatSchema = new Schema({
    id: {type:String},
    mensajes:{type:String}
    // email:{type:String ,require:true},
    // date: {type:Date, require : true},
    // text: {type:String}
})


module.exports=chatSchema