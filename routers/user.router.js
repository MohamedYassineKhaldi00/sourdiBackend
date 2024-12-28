const router = require('express').Router();
const UserController = require('../controller/user.controller');
const User = require('../model/user.model'); // Update with your User model path
const jwt = require('jsonwebtoken');
require('dotenv').config();


router.post('/registration',UserController.register);
router.post('/login', UserController.login);
router.get('/userList', UserController.userList)
router.post('/logout', UserController.logout); // Add logout route
router.delete('/deleteAccount', UserController.authenticateToken, UserController.deleteAccount); // Add delete account route
router.post('/checkEmailUniqueness',UserController.checkEmail);
router.post('/changePassword', UserController.changePassword);
router.post('/sendEmail', UserController.sendVerificationEmail);
router.post('/verifyOTPCode', UserController.verifyCode);
router.post('/verifyAccount', UserController.authenticateToken, UserController.verifyAccount);
router.post('/deleteVerification', UserController.deleteVerification);



router.patch('/updateUser', UserController.authenticateToken,  async (req, res) => {
  const { userId, isMerchant, merchantName } = req.body;
  const oldToken = req.headers.authorization.split(' ')[1]; // Extract the existing token

  try {
    // Find the user by userId
    const user = await User.findOne({ _id: userId }); // Adjust as needed for your user identification

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isMerchant = isMerchant;
    user.merchantName = merchantName;
    await user.save();

    const decoded = jwt.verify(oldToken, process.env.JWT_SECRET_KEY);
    decoded.isMerchant = isMerchant;
    decoded.merchantName = merchantName;

    const updatedToken = jwt.sign(decoded, process.env.JWT_SECRET_KEY);

    res.status(200).json({ message: 'User updated successfully', token: updatedToken });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});




module.exports = router;