const mongoose = require('mongoose');
const db = require('../config/db');


const { Schema } = mongoose;


const emailVerificationSchema = new Schema({
    email: { type: String, required: true, unique: true },
    confirmationCode: { type: String, required: true },
    codeExpiresAt: { type: Date, required: true }
});


 const EmailVerificationModel = db.model('EmailVerification', emailVerificationSchema);

 module.exports = EmailVerificationModel;


