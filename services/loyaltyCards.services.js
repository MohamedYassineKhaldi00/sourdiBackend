const loyaltyCardModel = require('../model/loyaltyCards.model');


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

class LoyaltyService {
    static async createLoyaltyCard(userId, storeName, storeLogo, loyaltyCardName, barCode, loyaltyCardImage, hasStampFeature, couponValue, stampsCollected, stampsGroupsof10, stampDate) {
        try {
            const createLoyaltyCard = new loyaltyCardModel({userId, storeName, storeLogo, loyaltyCardName, barCode, loyaltyCardImage, hasStampFeature, couponValue, stampsCollected, stampsGroupsof10, stampDate });
            return await createLoyaltyCard.save();
        } catch (error) {
            throw error;
        }
    }

    static async getLoyaltyCardData(userId) {
        try {
            const loyaltyCardData = await withTimeout(loyaltyCardModel.find({ userId }));
            return loyaltyCardData;
        } catch (error) {
            throw error;
        }
    }

    static async getLoyaltyCardDataById(id) {
        try {
            const loyaltyCardData = await withTimeout(loyaltyCardModel.findById(id));
            return loyaltyCardData;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async checkIdExists(id) {
        try {
            const card = await withTimeout(loyaltyCardModel.findById(id));
            return card ? true : false;
        } catch (error) {
            throw error;
        }
    }

    static async getLoyaltyCardImage(userId) {
        try {
            const loyaltyCardImage = await withTimeout(loyaltyCardModel.find({ userId }, { loyaltyCardImage: 1, _id: 0 }));
            return loyaltyCardImage;
        } catch (error) {
            throw error;
        }
    }

    static async deleteLoyaltyCard(id) {
        try {
            const deletedLoyalty = await loyaltyCardModel.findOneAndDelete({ _id: id });
            return deletedLoyalty;
        } catch (error) {
            throw error;
        }
    }

    static async updateStamps(id, stampsToAdd) {
        try {
            const card = await withTimeout(loyaltyCardModel.findById(id));
            if (!card) {
                throw new Error('Card not found');
            }
    
            const fourHours = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
            const lastUpdateString = card.stampDate[card.stampDate.length - 1] || 0;
            const lastUpdate = new Date(lastUpdateString).getTime();
            const currentTime = Date.now();
    
            if (currentTime - lastUpdate < fourHours) {
                return { status: false, message: 'You can only update stamps once every 4 hours' };
            }
    
            card.stampsCollected += stampsToAdd;
            card.stampDate.push(currentTime);
    
            if (card.stampsCollected >= 10) {
                const excessStamps = card.stampsCollected - 10; // Calculate excess
                const couponValue = getCouponValueForStore(card.storeName);
    
                card.coupons.push({
                    couponStore: card.storeName,
                    value: couponValue,
                    createdAt: currentTime
                });
    
                card.stampsGroupsof10 += 1;
                card.stampsCollected = excessStamps;
            }
    
            await card.save(); // Save only if all updates are valid and complete
            return { status: true, success: card };
        } catch (error) {
            console.error(`Error updating stamps: ${error.message}`);
            throw error; // Rethrow error for external handling
        }
    
        function getCouponValueForStore(storeName) {
            const couponValues = {
                "Klitch": "40%",
                "Parad'Ice": "50%",
                "Biscotti": "x2",
                "Munchies": "Séléction gratuite",
                "Cosmito": "1 acheté, 1 offert",
                "Nom de l'enseigne": "1 acheté, 1 offert"
            };
            return couponValues[storeName] || "No Coupon";
        }
    }
    

    static async getCouponsByUserId(userId) {
        try {
            const coupons = await withTimeout(loyaltyCardModel.find({ userId }, { coupons: 1, _id: 0 }));
            return coupons.map(card => card.coupons).flat();
        } catch (error) {
            throw error;
        }
    }

    static async getCouponsById(id) {
        try {
            const coupons = await withTimeout(loyaltyCardModel.find({ _id: id }, { coupons: 1, _id: 0 }));
            return coupons.map(card => card.coupons).flat();
        } catch (error) {
            throw error;
        }
    }

    static async verifyCoupon(id) {
        try {
            const coupon = await withTimeout(loyaltyCardModel.findOne({ 'coupons._id': id }, { 'coupons.$': 1 }));
            return coupon ? coupon.coupons[0] : null;
        } catch (error) {
            throw error;
        }
    }

    static async deleteCouponById(id) {
        try {
            const card = await loyaltyCardModel.findOneAndUpdate(
                { 'coupons._id': id },
                { $pull: { coupons: { _id: id } } },
                { new: true }
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

module.exports = LoyaltyService;
