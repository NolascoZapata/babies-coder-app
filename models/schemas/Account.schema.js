const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    number: { type: String, required: true, unique: true, length: 10 },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    }
);

module.exports = AccountSchema;