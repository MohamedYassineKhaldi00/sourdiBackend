const router = require('express').Router();
const loyaltyCardsController = require('../controller/loyaltyCards.controller');

// Update stampsCollected for a specific loyalty card
// Route for updating stamps and possibly adding a coupon
router.post('/updateStamps', loyaltyCardsController.updateStamps);

router.post('/storeLoyaltyCard', loyaltyCardsController.createLoyaltyCard);

router.post('/getLoyaltyCardList', loyaltyCardsController.getLoyaltyCardData);

router.post('/checkIdExists', loyaltyCardsController.checkIdExists);

router.post('/getCardDataById', loyaltyCardsController.getCardData);

router.post('/getLoyaltyCardPathList', loyaltyCardsController.getLoyaltyCardImage);

router.post('/deleteLoyaltyCard', loyaltyCardsController.deleteLoyaltydCard); // New route for deleting a card

router.post('/getCoupons', loyaltyCardsController.getCouponsByUserId);

router.post('/getCouponsById', loyaltyCardsController.getCouponsById);

router.post('/isCouponValid', loyaltyCardsController.checkIfCouponsExists);

router.post('/deleteCoupon', loyaltyCardsController.deleteCoupon);



module.exports = router;


