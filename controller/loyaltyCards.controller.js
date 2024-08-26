const LoyaltyService = require('../services/loyaltyCards.services');

// Controller function to register a new card
exports.createLoyaltyCard = async (req, res, next) => {
    try {
        const { userId, storeName, storeLogo, loyaltyCardName, barCode, loyaltyCardImage, hasStampFeature, stampsCollected, stampsGroupsof10, stampDate, cardCreatedAt } = req.body;

        let card = await LoyaltyService.createLoyaltyCard(userId, storeName, storeLogo, loyaltyCardName, barCode, loyaltyCardImage, hasStampFeature, stampsCollected, stampsGroupsof10, stampDate, cardCreatedAt);

        res.json({ status: true, success: card })
    } catch (error) {
        next(error);
    }
};

exports.getLoyaltyCardData = async (req, res, next) => {
    try {
        const { userId } = req.body;


        res.json(await LoyaltyService.getLoyaltyCardData(userId))
    } catch (error) {
        next(error);
    }
};

exports.checkIdExists = async (req, res, next) => {
    try {
      const { id } = req.body;
  
      // Check ID existence
      const result = await LoyaltyService.checkIdExists(id);
  
      // Respond with the result
      res.json(result);
    } catch (error) {
      // Pass the error to the next middleware (error handler)
      next(error);
    }
  };

  exports.getCardData = async (req, res, next) => {
    try {
        const { id } = req.body;


        res.json(await LoyaltyService.getLoyaltyCardDataById(id))
    } catch (error) {
        next(error);
    }
};

exports.getLoyaltyCardImage = async (req, res, next) => {
    try {
        const { userId } = req.body;

        res.json(await LoyaltyService.getLoyaltyCardImage(userId))
    } catch (error) {
        next(error);
    }
};

exports.deleteLoyaltydCard = async (req, res, next) => {
    try {
        const {id} = req.body; // Assuming you'll send the cardId to delete

        await LoyaltyService.getLoyaltyCardData(id);
        let deleted = await LoyaltyService.deleteLoyaltydCard(id);

        res.json({status: true, success:deleted});
    } catch (error) {
        next(error);
    }
};

exports.updateStamps = async (req, res, next) => {
    try {
        const { id, stampsToAdd } = req.body;

        if (!id || stampsToAdd === undefined) {
            return res.status(400).send('ID and stampsToAdd are required');
        }

        const updatedCard = await LoyaltyService.updateStamps(id, stampsToAdd);

        res.json({ status: true, success: updatedCard });
    } catch (error) {
        next(error);
    }
    
};


exports.getCouponsByUserId = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const coupons = await LoyaltyService.getCouponsByUserId(userId);
        res.json({ status: true, success: coupons });
    } catch (error) {
        next(error);
    }
};

exports.getCouponsById = async (req, res, next) => {
    try {
        const { id } = req.body; // Ensure 'id' is sent in the request body
        const coupons = await LoyaltyService.getCouponsById(id);
        res.json({ status: true, success: coupons });
    } catch (error) {
        next(error);
    }
};

exports.checkIfCouponsExists = async (req, res, next) => {
    try {
        const { id } = req.body;  // Extract the coupon _id from the request body

        const couponExists = await LoyaltyService.verifyCoupon(id);

        if (couponExists) {
            return res.status(200).json({ message: 'Coupon exists.', coupon: couponExists });
        } else {
            return res.status(404).json({ message: 'Coupon not found.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

exports.deleteCoupon = async (req, res, next) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).send('Coupon ID is required');
        }

        await LoyaltyService.deleteCouponById(id);

        res.json({ status: true});
    } catch (error) {
        next(error);
    }
};
