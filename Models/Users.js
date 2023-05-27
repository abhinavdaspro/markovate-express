const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
    },
    primaryNumber: {
        type: String,
        required: true,
    },
    secondaryNumber: {
        type: String,
        required: false,
    },
    companySize: {
        type: String,
        required: true,
    },
    companyRevenue: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    subscribe: {
        type: Boolean,
        default: false,
        enum: [true, false]
    },
},
    { versionKey: false });

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel