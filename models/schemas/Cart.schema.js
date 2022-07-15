const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    items:{type : Array},
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    }
);

module.exports = CartSchema;