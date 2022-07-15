const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    owner_email:{type:String},
    items:{type : Array},
    order_number: { type: String, required: true, unique: true, length: 10 },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    status:{type: String}
    }
)

module.exports = OrderSchema;