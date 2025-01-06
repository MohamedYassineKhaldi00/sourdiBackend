// user.model.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

const { Schema } = mongoose;

const userSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
    },
    userName: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    unreadNotifs : {
        typee: Number,
        required: false,
        unique: false
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

userSchema.pre('save', async function (next) {
    try {
        var user = this;
        user.userId = user._id;

        // Only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) {
            return next();
        }

        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(user.password, salt);
        user.password = hashpass;

        next();
    } catch (error) {
        return next(error);
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
        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(newPassword, salt);
        this.password = hashpass;
        return await this.save();
    } catch (error) {
        throw error; // You can also log the error if needed
    }
};




const UserModel = db.model('user', userSchema);

module.exports = UserModel;