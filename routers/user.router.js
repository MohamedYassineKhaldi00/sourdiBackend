const router = require('express').Router();
const UserController = require('../controller/user.controller');
const User = require('../model/user.model'); // Update with your User model path


router.post('/registration',UserController.register);
router.post('/login',UserController.login);
router.get('/userList', UserController.userList)
router.post('/logout', UserController.logout); // Add logout route
router.delete('/deleteAccount', UserController.deleteAccount); // Add delete account route
router.post('/checkNumberUniqueness',UserController.checkNumber);
router.post('/changePassword', UserController.changePassword);

router.patch('/updateUser', async (req, res) => {
  const { userId, isMerchant, merchantName } = req.body;

  try {
    // Find the user by userId
    const user = await User.findOne({ _id: userId }); // Adjust as needed for your user identification

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isMerchant = isMerchant;
    user.merchantName = merchantName;
    await user.save();

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});




module.exports = router;