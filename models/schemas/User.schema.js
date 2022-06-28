const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "Invalid email",
        ],
    },
    password: { type: String, required: true },
    isAdmin:{ type: String, required:true},
    userAvatar:{ type: String, required:true},
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    accounts: { type: Schema.Types.ObjectId, ref: "Account" },
    cart : { type: Schema.Types.ObjectId, ref: "Cart" },
    }
);
UserSchema.index({ email: 1 });
module.exports = UserSchema;