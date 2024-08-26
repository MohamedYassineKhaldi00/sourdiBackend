const UserService = require('../services/user.services');


exports.register = async (req, res, next) => {
    try {
        const { phoneNumber, password, isMerchant, merchantName ,createdAt } = req.body;

         await UserService.registerUser(phoneNumber, password, isMerchant, merchantName, createdAt);

        res.json({ status: true, success: "User Registered Successfully" })
    } catch (error) {
        throw error
    }

}

exports.login = async (req, res, next) => {
    try {
        const { phoneNumber, password } = req.body;

        const user = await UserService.checkuser(phoneNumber);

        if (!user) {
            throw new Error("Invalid phone number or password");
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            throw new Error("Invalid phone number or password");
        }

        let tokenData = { _id: user._id, phoneNumber: user.phoneNumber, userId: user.userId, isMerchant: user.isMerchant, merchantName: user.merchantName};

        const token = await UserService.generateToken(tokenData, 'secretKey', '1h')

        res.status(200).json({ status: true, token: token })

    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
}


exports.userList = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
}

exports.logout = async (req, res) => {
    try {
        const user = await UserService.logout();
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

exports.checkNumber = async (req, res) => {
    try {
        const phoneNumber = req.body.phoneNumber; // Correctly access phoneNumber from the request body
        const userExists = await UserService.checkNumberUniqueness(phoneNumber);
        if (userExists) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { phoneNumber, newPassword } = req.body;
        const result = await UserService.changePassword(phoneNumber, newPassword);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
}

exports.fidelityList = async (res) => {
    
}




