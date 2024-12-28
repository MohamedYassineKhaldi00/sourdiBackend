require('dotenv').config();

const UserService = require('../services/user.services');
const EmailVerificationModel = require('../model/emailVerification.model');
const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, tokenData) => {
        if (err) return res.sendStatus(403)
            req.tokenData = tokenData
        next()
     })   
}
exports.authenticateToken = authenticateToken; // Export middleware


exports.register = async (req, res, next) => {
    try {
        const { email, userName, password, isMerchant, merchantName ,createdAt } = req.body;

         await UserService.registerUser(email, userName, password, isMerchant, merchantName, createdAt);

        res.json({ status: true, success: "User Registered Successfully" })
    } catch (error) {
        throw error
    }

}
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Logging the email input for debugging

        const user = await UserService.checkuser(email);

        if (!user) {
            throw new Error("Invalid email");
        }

    
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            throw new Error("Invalid password");
        }

        let tokenData = { 
            _id: user._id, 
            email: user.email, 
            userName: user.userName,  
            userId: user.userId, 
            isMerchant: user.isMerchant, 
            merchantName: user.merchantName
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY);
       
        res.status(200).json({ status: true, token: token });

    } catch (error) {
        console.error('Login Error:', error); // Log error details to the console
        res.status(500).json({ status: false, error: error.message });
    }
};


exports.userList = async (req, res) => {
    try {
        const users =await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
}

exports.logout = async (req, res) => {
    try {
        const user = await  UserService.logout();
        res.status(200).json({ status: true, message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.user._id;
        await UserService.deleteUser(userId);
        res.status(200).json({ status: true, message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
}

exports.checkEmail = async (req, res) => {
    try {
        const email = req.body.email; // Correctly access email from the request body
        const userExists = await UserService.checkEmailUniqueness(email);
        if (userExists) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.verifyAccount = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await  UserService.verifyAccount(email, password);

        if (!user) {
            return res.status(404).json({ status: false, message: 'Invalid email or password' });
        }

        res.status(200).json({ status: true, message: 'Account verified successfully' });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const result = await UserService.changePassword(email, newPassword);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
}

exports.sendVerificationEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ status: false, error: "Email is required" });
        }

        console.log('Attempting to send email to:', email);

        await UserService.sendVerificationEmail(email);
        
        console.log('Success');
        
        res.json({ status: true, success: "Verification email sent successfully" });
    } catch (error) {
        next(error); // Ensure to pass errors to the error handler
    }
};

exports.verifyCode = async (req, res, next) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({ status: false, error: "Email and code are required" });
        }

        const isValid =  await  UserService.verifyConfirmationCode(email, code);

        if (isValid) {
            res.json({ status: true, success: "Code verified successfully" });
        } else {
            res.status(400).json({ status: false, error: "Invalid or expired code" });
        }
    } catch (error) {
        next(error); // Ensure to pass errors to the error handler
    }
};

exports.deleteVerification = async (req, res, next) => {
            try {
                const { email } = req.body;

                await EmailVerificationModel.deleteOne({ email });

            } catch (error) {
                next(error); // Ensure to pass errors to the error handler
            }
        };

exports.fidelityList = async (res) => {
    
}




