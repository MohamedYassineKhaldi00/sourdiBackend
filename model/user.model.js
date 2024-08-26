// user.model.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const { Schema } = mongoose;

const userSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isMerchant: {
        type: Boolean,
        default : false,
    },
    merchantName: {
        type: String,
        required: false,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function () {
    try {
        var user = this;
        user.userId = user._id;
        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(user.password, salt);
        user.password = hashpass;
    } catch (error) {
        throw error;
    }
});

userSchema.methods.comparePassword = async function (userPassword) {
    try {
        const isMatch = await bcrypt.compare(userPassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

userSchema.methods.updatePassword = async function(newPassword) {
    try {
        this.password = newPassword;
        return await this.save();
    } catch (error) {
        throw error;
    }
};




const UserModel = db.model('user', userSchema);

module.exports = UserModel;