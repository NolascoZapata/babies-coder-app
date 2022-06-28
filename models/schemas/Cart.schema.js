const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    items:{type : Array},
    // number: { type: String, required: true, unique: true, length: 10 },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    }
);

module.exports = CartSchema;