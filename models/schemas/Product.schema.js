const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProductSchema = new Schema({
    name: {type:String , required: true},
    price: {type:Number , required: true },
    size: {type:String , required: true},
    stock: {type:Number , required: true },
    timestamp: {type:String , required: true},
    category: {type:String , required: true},
    imgDir:{type:String , required: true, unique: true },
})
module.exports=ProductSchema

