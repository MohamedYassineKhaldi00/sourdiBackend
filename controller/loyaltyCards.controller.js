const LoyaltyService = require('../services/loyaltyCards.services');

// Controller function to register a new card
exports.createLoyaltyCard = async (req, res, next) => {
    try {
        const { userId, storeName, storeLogo, loyaltyCardName, barCode, loyaltyCardImage, hasStampFeature, couponValue, stampsCollected, stampsGroupsof10, stampDate } = req.body;

        let card = await LoyaltyService.createLoyaltyCard(userId, storeName, storeLogo, loyaltyCardName, barCode, loyaltyCardImage, hasStampFeature, couponValue, stampsCollected, stampsGroupsof10, stampDate);

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
        let deleted = await LoyaltyService.deleteLoyaltyCard(id);

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


exports.validateCode = async (req, res, next) => {
    try {
        const { code } = req.body;

        const codesData = {
            'Z289238N5629836N2589N2365928N7': { storeName: 'Klitch'},
            '79SL39GGJ20FKALM73HV84JNHD9011': { storeName: "Parad'Ice"},
            'HV74HJMNW927186DGCB72498NNZKJ1': { storeName: "Biscotti"},
            '927GHDN39X62MPQ84NDH4610CCT589': { storeName: "Munchies"},
            'AJV910QQIRJ5738NV848N9283NFN23': { storeName: 'Cosmito'},
            'OF5H220XOR58WNAMGGG49A7K4KK31P': { storeName: "Nom de l'enseigne"}
          };
  
    if (codesData.hasOwnProperty(code)) {
      res.status(200).json({ valid: true, data: codesData[code] });
    } else {
      res.status(403).json({ valid: false });
    }

    } catch (error) {
        next(error);
    }
};

exports.fetchFidelity = async (req, res, next) => {
    try {
        
      
        const fidelityList = [
            { name: "KIABI", carte: "CarteKiabi", hasStampFeature: false },
            { name: "Géant", carte: "CarteGéant", hasStampFeature: false },
            { name: "Baguette_&_Baguette", carte: "CarteBaguette", hasStampFeature: false },
            { name : "Biscotti", carte: "CarteBiscotti", hasStampFeature: true},
            { name : "Game_World", carte: "CarteGame_World", hasStampFeature: true},
            { name : "Cosmitto", carte: "CarteCosmitto", hasStampFeature: true},
            { name: "Carrefour", carte: "CarteCarrefour", hasStampFeature: false },
            { name: "Maison_Gourmandise", carte: "CarteMaison_Gourmandise", hasStampFeature: false },
            { name : "Barista's", carte: "CarteBarista's", hasStampFeature: true},
            { name: "Monoprix", carte: "CarteMonoprix",  hasStampFeature: false },
            { name: "Yves_Rocher", carte: "CarteYves_Rocher", hasStampFeature: false },
            { name: "MG", carte: "CarteMG", hasStampFeature: false },
            { name : "Klitch", carte: "CarteKlitch", hasStampFeature: true},
            { name : "Parad'Ice", carte: "CarteParad'Ice", hasStampFeature: true},
            { name : "Munchies", carte: "CarteMunchies", hasStampFeature: true},

          ];

          fidelityList.forEach(item => {
            item.imageUrl = `https://raw.githubusercontent.com/sourdi/images/main/images/magasins/${item.name}.png`;
            item.carteUrl = `https://raw.githubusercontent.com/sourdi/images/main/images/cartes/${item.carte}.png`;
            
          
          });
        
         
          res.json(fidelityList)

    } catch (error) {
        next(error);
    }
};
