const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routers/user.router');
const loyaltyCardsRouter = require ('./routers/loyaltyCards.router');
const cors = require('cors');
const app = express();
const rateLimit = require('express-rate-limit');
const connection = require('./config/db');



const port = process.env.PORT;


// setInterval(() => {
//   const memoryUsage = process.memoryUsage();
//   const cpuUsage = process.cpuUsage();

//   console.log('Memory Usage:', memoryUsage);
//   console.log('CPU Usage:', cpuUsage);
// }, 5000);  // Logs every 5 seconds


//Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: "Limite de requêtes dépassée. Réessayez plus tard.",
})
app.use(limiter)
app.set('trust proxy', 1)


app.use(bodyParser.json());
app.use(cors()); // Apply CORS middleware




app.use('/', userRouter); // Mount userRouter at '/users'
app.use('/', loyaltyCardsRouter); 

    app.get('/', (req, res) => {
      res.send('Jawi behi');
    });

    app.listen(port, () => {
      console.log(`Server is listening on port http://localhost:${port}`);
    });

  

// Graceful Shutdown
const gracefulShutdown = (signal) => {
  console.log(`${signal} signal received: closing HTTP server`);

  server.close(() => {
    console.log('HTTP server closed');
    
    // Close MongoDB connection
    connection.close(false, () => {
      console.log('MongoDB connection closed');
      Child.kill(signal);
      process.exit(0);
    });
  });
};

// Handle termination signals
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    
    

    
    module.exports = app;
    