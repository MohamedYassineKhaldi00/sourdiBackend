const mongoose = require('mongoose');
const db = require('../config/db');
const UserModel = require('../model/user.model');
const { Schema } = mongoose;

const Coupons = new Schema({
    couponStore: {
        type: String,
    },
    value: {                                                           
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
   
});


const loyaltyCardSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName
    },
    storeName: {
        type: String,
        required: true,
        unique: false
    },
    storeLogo: {
        type: String,
        required: false,
        unique: false
    },
    loyaltyCardName: {
        type: String,
        required: false,
        unique: false
    },
    barCode: {
        type: String,
        required: false,
        unique: false
    },
    loyaltyCardImage: {
        type: String,
        required: true
    },
    hasStampFeature: {
        type: Boolean,
        required : false,
    },
    stampsCollected: { 
        type: Number,
        default: '0'
    },
    stampsGroupsof10: {
        type:Number,
        default: '0' // or any default value you prefer
    },
    stampDate: [Date],
    coupons: [Coupons], // Array of coupons

    cardCreatedAt: {
        type: Date,
        default: Date.now
    }
});

// Virtual field to count the number of coupons
loyaltyCardSchema.virtual('couponCount').get(function() {
    return this.coupons.length;
});

// Include the virtual fields in the JSON output
loyaltyCardSchema.set('toJSON', { virtuals: true });
loyaltyCardSchema.set('toObject', { virtuals: true });


const loyaltyCardModel = db.model('fidelity', loyaltyCardSchema);

module.exports = loyaltyCardModel;
