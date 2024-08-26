const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routers/user.router');
const loyaltyCardsRouter = require ('./routers/loyaltyCards.router');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

    app.get('/', (req, res) => {
      res.send('Jawi behi');
    });

    app.listen(port, () => {
      console.log(`Server is listening on port http://localhost:${port}`);
    });

  
    
    app.use(bodyParser.json());
    app.use(cors()); // Apply CORS middleware
    app.use('/', userRouter); // Mount userRouter at '/users'
    app.use('/', loyaltyCardsRouter); 
    
    
    app.get('/fetchFidelity', (req, res) => {
      const fidelityList = [
        { name: "EXIST", carte: "CarteExist", hasStampFeature: false },
        { name: "Carrefour", carte: "CarteCarrefour", hasStampFeature: false },
        { name: "Gourmandise", carte: "CarteGourmandise", hasStampFeature: false },
        { name: "Monoprix", carte: "CarteMonoprix",  hasStampFeature: false },
        { name: "Yves_Rocher", carte: "CarteYves_Rocher", hasStampFeature: false },
        { name: "MG", carte: "CarteMG", hasStampFeature: false },
        { name : "Klitch", carte: "CarteKlitch", hasStampFeature: true},
        { name : "Parad'Ice", carte: "CarteParad'Ice", hasStampFeature: true},
    
    
      ];
    
      fidelityList.forEach(item => {
        item.imageUrl = `https://raw.githubusercontent.com/sourdi/images/main/images/magasins/${item.name}.png`;
        item.carteUrl = `https://raw.githubusercontent.com/sourdi/images/main/images/cartes/${item.carte}.png`;
        
        if (item.hasStampFeature) {
          item.couponValue = getCouponValueForStore(item.name);
          item.couponStore = item.name; // Function to get coupon value based on store name
        }
      });
    
      res.json(fidelityList);
    });
    
    function getCouponValueForStore(storeName) {
      const couponValues = {
        "Klitch": "40%",
        "Parad'Ice": "80%",
        // Add other stores with coupon values here
      };
    
      return couponValues[storeName] || "No Coupon"; // Default value if storeName is not found
    }
    
    const codesData = {
      'Z289238N5629836N2589N2365928N7': { storeName: 'Klitch'},
      '79SL39GGJ20FKALM73HV84JNHD9011': { storeName: "Parad'Ice"},
      'AJV910QQIRJ5738NV848N9283NFN23': { storeName: 'Cosmito'}
    };
    
    app.post('/validateCode', (req, res) => {
      const { code } = req.body;
    
      if (codesData.hasOwnProperty(code)) {
        res.status(200).json({ valid: true, data: codesData[code] });
      } else {
        res.status(403).json({ valid: false });
      }
    });
    
    
    
    module.exports = app;
    