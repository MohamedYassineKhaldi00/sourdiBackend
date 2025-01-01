const UserModel = require('../model/user.model');
const EmailVerificationModel = require('../model/emailVerification.model');

const nodemailer = require('nodemailer');

const TIMEOUT_DURATION = 12000; // 12 seconds

const withTimeout = (promise) => {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error('Request timed out after 12 seconds'));
        }, TIMEOUT_DURATION);

        promise.then((result) => {
            clearTimeout(timeout);
            resolve(result);
        }).catch((err) => {
            clearTimeout(timeout);
            reject(err);
        });
    });
}



class UserService {
    static async registerUser(email, userName, password, isMerchant, merchantName, createdAt) {
        try {
            const createUser = new UserModel({ email, userName, password, isMerchant, merchantName, createdAt });
            return await createUser.save();
        } catch (err) {
            throw err;
        }
    }
    

    static async checkuser(email) {
        try {
            return await withTimeout(UserModel.findOne({ email }));
        } catch (error) {
            throw error;

        }
    }

    static async generateAccessToken(tokenData, secretKey) {
        try {
            return jwt.sign(tokenData, secretKey);
        } catch (error) {
            throw error;
        }
    }


    static async getAllUsers() {
        try {
            return await UserModel.find(); // Corrected from 'users.find()' to 'UserModel.find()'
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(userId) {
        try {
            return await UserModel.findByIdAndDelete(userId);
        } catch (error) {
            throw error;
        }
    }

    static async checkEmailUniqueness(email) {
        try {
            const user = await withTimeout(UserModel.findOne({ email })); // Query database to find user by email
            return !!user; // Return true if user exists, false otherwise
        } catch (error) {
            throw error; // Throw error if database query fails
        }
    }

    static async verifyAccount(email, password) {
        try {
            const user = await withTimeout(UserModel.findOne({ email }));

            if (!user) {
                return null;
            }

            const isMatch = await withTimeout(user.comparePassword(password));

            if (!isMatch) {
                return null;
            }

            return user;
        } catch (err) {
            throw err;
        }
    }

    static async changePassword(email, newPassword) {
        try {
            const user = await withTimeout(UserModel.findOne({ email }));
            if (!user) {
                throw new Error("User not found");
            }
            await user.updatePassword(newPassword);
            return { status: true, message: "Password updated successfully" };
        } catch (error) {
            throw error;
        }
    }
    
    static async sendVerificationEmail(email) {
        try {
            let transporter = nodemailer.createTransport({
                service: 'iCloud',
                secure: false,
                auth: {
                    user: 'tn.sourdi@icloud.com',
                    pass: process.env.AppSpecificPassword // Use your app-specific password
                }
            });

            function generateConfirmationCode() {
                return Math.floor(10000 + Math.random() * 90000).toString();
            }

            let confirmationCode = generateConfirmationCode();

            let mailOptions = {
                from: '"Sourdi - Fidélité" <tn.sourdi@icloud.com>',
                to: email,
                subject: 'Vérifiez votre adresse e-mail',
                html: `
                <!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vérification de l'adresse e-mail</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            text-align: center;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 15px; /* Rounded corners */
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border: 2px solid #ddd; /* White background border */
        }
        .logo img {
            width: 150px;
            margin-bottom: 20px;
        }
        h1 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .subtitle {
            font-size: 16px;
            margin-bottom: 30px;
        }
        .confirmation-code {
            font-size: 30px;
            font-weight: bold;
            margin-bottom: 30px;
        }
        .small-text {
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://firebasestorage.googleapis.com/v0/b/sourdi.appspot.com/o/assets%2Flogo1.png?alt=media&token=7670b4ab-74fd-45b0-9ec3-d2534004cf5c" alt="Logo">
        </div>
        <h1>Vérifiez votre adresse e-mail</h1>
        <p class="subtitle">Veuillez saisir le code de confirmation ci-dessous pour terminer la configuration de votre compte</p>
        <p class="confirmation-code">${confirmationCode}</p>
        <p class="small-text">Si vous estimez qu'il s'agit d'une erreur et que vous n'avez pas initié cette demande de création de compte, veuillez ignorer ce courriel.</p>
    </div>
</body>
</html>
                `,
            };
             
       
                const emailVerification = new EmailVerificationModel({
                    email,
                    confirmationCode,
                    codeExpiresAt: Date.now() + 15 * 60 * 1000 // Code expires in 15 minutes
                });
                await emailVerification.save();
            
                await transporter.sendMail(mailOptions);

        } catch (error) {

            if (error.code === 11000) { // Duplicate key error code
                return { success: false, message: 'Duplicate' };
            }

            throw error;
        }
    
    }
    
    static async verifyConfirmationCode(email, code) {
        try {
            const emailVerification = await EmailVerificationModel.findOne({ email });
            if (!emailVerification) {throw new Error('Email verification record not found')}

           else if (emailVerification.confirmationCode !== code) {
                throw new Error('Invalid confirmation code');
            }

           else if (Date.now() > emailVerification.codeExpiresAt) {
                await EmailVerificationModel.deleteOne({ email });
                throw new Error('Confirmation code has expired');
            } else {
                await EmailVerificationModel.deleteOne({ email });
                return true;

            }

        } catch (error) {
            throw error;
        }
    }



}

module.exports = UserService;