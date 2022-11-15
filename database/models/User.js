const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
UserSchema.pre("save", function (next) {
    const user = this;
    bycrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted;
        next();
    });
});

module.exports = mongoose.model("User", UserSchema);