const UserModel = require('../model/user.model');
const jwt = require('jsonwebtoken')

class UserService {
    static async registerUser(phoneNumber, password, isMerchant, merchantName, createdAt) {
        try {
            const createUser = new UserModel({ phoneNumber, password, isMerchant, merchantName, createdAt });
            return await createUser.save();
        } catch (err) {
            throw err;
        }
    }
    

    static async checkuser(phoneNumber) {
        try {
            return await UserModel.findOne({ phoneNumber });
        } catch (error) {
            throw err;

        }
    }

    static async generateToken(data, secretKey, expiresIn) {
        try {
            return jwt.sign(data, secretKey, { expiresIn });
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

    static async checkNumberUniqueness(phoneNumber) {
        try {
            const user = await UserModel.findOne({ phoneNumber }); // Query database to find user by phoneNumber
            return !!user; // Return true if user exists, false otherwise
        } catch (error) {
            throw error; // Throw error if database query fails
        }
    }

    static async changePassword(phoneNumber, newPassword) {
        try {
            const user = await UserModel.findOne({ phoneNumber });
            if (!user) {
                throw new Error("User not found");
            }
            await user.updatePassword(newPassword);
            return { status: true, message: "Password updated successfully" };
        } catch (error) {
            throw error;
        }
    }
    
    

}

module.exports = UserService;