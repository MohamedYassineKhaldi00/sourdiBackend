const loyaltyCardModel = require('../model/loyaltyCards.model');


class LoyaltyService {
    // Function to register a new card
    static async createLoyaltyCard(userId, storeName, storeLogo, loyaltyCardName, barCode, loyaltyCardImage, hasStampFeature, stampsCollected, stampsGroupsof10, stampDate ,cardCreatedAt) {
        try {
            const createLoyaltyCard = new loyaltyCardModel({ userId, storeName, storeLogo, loyaltyCardName, barCode, loyaltyCardImage, hasStampFeature, stampsCollected, stampsGroupsof10, stampDate ,cardCreatedAt });
            return await createLoyaltyCard.save();
        } catch (error) {
            throw error;
        }
    }
    static async getLoyaltyCardData(userId) {
        try {
            const loyaltyCardData = await loyaltyCardModel.find({ userId });
            return loyaltyCardData;
        } catch (error) {
            throw error;
        }
    }

    static async getLoyaltyCardDataById(id) {
        try {
            // Fetch loyalty card data based on the ID
            const loyaltyCardData = await loyaltyCardModel.findById(id);
            return loyaltyCardData;
        } catch (error) {
            // Handle error, throw it to be caught by the controller
            throw new Error(error.message);
        }
    }
    
        static async checkIdExists(id) {
            try {
                const card = await loyaltyCardModel.findById(id);
                return card ? true : false;
            } catch (error) {
                throw error;
            }
        }
    

    static async getLoyaltyCardImage(userId) {
        try {
            const loyaltyCardImage = await loyaltyCardModel.find({ userId }, { loyaltyCardImage: 1, _id: 0 });
            return loyaltyCardImage;
        } catch (error) {
            throw error;
        }
    }

    static async deleteLoyaltydCard(id) {
        const deletedLoyalty = await loyaltyCardModel.findOneAndDelete({ _id: id });

        return deletedLoyalty;
    }
    
    static async updateStamps(id, stampsToAdd) {
        try {
            const card = await loyaltyCardModel.findById(id);

            if (!card) {
                throw new Error('Card not found');
            }

            card.stampsCollected += stampsToAdd;

            // Check if stampsCollected is a multiple of 10
            if (card.stampsCollected >= 10) {
                // Create a new coupon
                const couponValue = getCouponValueForStore(card.storeName); // Function to get coupon value
                card.coupons.push({
                    couponStore: card.storeName, // Add store name to coupon
                    value: couponValue,
                    createdAt: Date.now()
                });
                card.stampsGroupsof10 += 1; // Increment the count of stamp groups
                card.stampsCollected = 0;

            }

            await card.save();
            return card;
        } catch (error) {
            throw error;
        }

        function getCouponValueForStore(storeName) {
            const couponValues = {
                "Klitch": "40%",
                "Parad'Ice": "50%",
                // Add other stores with coupon values here
            };
        
            return couponValues[storeName] || "No Coupon";
        
        }
    }

     static async getCouponsByUserId(userId) {
        try {
            const coupons = await loyaltyCardModel.find({ userId }, { coupons: 1, _id: 0 });
            return coupons.map(card => card.coupons).flat(); // Flatten the array of coupons
        } catch (error) {
            throw error;
        }
    }

    static async getCouponsById(id) {
        try {
            const coupons = await loyaltyCardModel.find({ _id: id }, { coupons: 1, _id: 0 });
            return coupons.map(card => card.coupons).flat(); // Flatten the array of coupons
        } catch (error) {
            throw error;
        }
    }
    
    
        static async verifyCoupon(id) {
            try {
                const coupon = await loyaltyCardModel.findOne({ 'coupons._id': id }, { 'coupons.$': 1 });
                return coupon ? coupon.coupons[0] : null;
            } catch (error) {
                throw error;
            }
        }

        static async deleteCouponById(id) {
            try {
                const card = await loyaltyCardModel.findOneAndUpdate(
                    { 'coupons._id': id }, // Find the card with the specific coupon _id
                    { $pull: { coupons: { _id: id } } }, // Remove the coupon from the array
                    { new: true } // Return the updated card
                );
        
                if (!card) {
                    throw new Error('Coupon not found');
                }
        
                return card;
            } catch (error) {
                throw error;
            }
        }
        
    
}

// Function to return coupon value based on store name


module.exports = LoyaltyService;
