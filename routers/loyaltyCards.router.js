const router = require('express').Router();
const loyaltyCardsController = require('../controller/loyaltyCards.controller');
const { authenticateToken } = require('../controller/user.controller'); // Import authentication middleware


router.get('/fetchFidelity', authenticateToken, loyaltyCardsController.fetchFidelity);

// Update stampsCollected for a specific loyalty card
// Route for updating stamps and possibly adding a coupon
router.post('/updateStamps', authenticateToken, loyaltyCardsController.updateStamps);

router.post('/storeLoyaltyCard', authenticateToken, loyaltyCardsController.createLoyaltyCard);

router.post('/getLoyaltyCardList', authenticateToken, loyaltyCardsController.getLoyaltyCardData);

router.post('/checkIdExists', authenticateToken, loyaltyCardsController.checkIdExists);

router.post('/getCardDataById', authenticateToken, loyaltyCardsController.getCardData);

router.post('/getLoyaltyCardPathList', authenticateToken, loyaltyCardsController.getLoyaltyCardImage);

router.post('/deleteLoyaltyCard', authenticateToken, loyaltyCardsController.deleteLoyaltydCard); // New route for deleting a card

router.post('/getCoupons', authenticateToken, loyaltyCardsController.getCouponsByUserId);

router.post('/getCouponsById', authenticateToken, loyaltyCardsController.getCouponsById);

router.post('/isCouponValid', authenticateToken, loyaltyCardsController.checkIfCouponsExists);

router.post('/deleteCoupon', authenticateToken, loyaltyCardsController.deleteCoupon);

router.post('/validateCode', authenticateToken, loyaltyCardsController.validateCode);







module.exports = router;


