const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'iCloud', // You can also use other email providers
    secure: false,
    auth: {
      user: 'tn.sourdi@icloud.com', // Your email address
      pass: 'hjbs-vvkz-vqpp-mphh' // Your email password or app-specific password
    }
  });




// Set up email data
// Function to generate a random 6-digit code
function generateConfirmationCode() {
    return Math.floor(10000 + Math.random() * 90000).toString();
}

// Generate the random code and format it with dashes (e.g., "123-456")
let confirmationCode = generateConfirmationCode();

let mailOptions = {
    from: '"Sourdi - Fidélité" <tn.sourdi@icloud.com>', // Sender address
    to: 'recipient@mail.com', // List of recipients
    subject: 'Vérifiez votre adresse e-mail', // Subject line
    html: `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vérification de l'adresse e-mail</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                text-align: center;
            }
            .container {
                max-width: 600px;
                margin: 50px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .logo img {
                width: 150px;
                margin-bottom: 20px;
            }
            h1 {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
            }
            .subtitle {
                font-size: 16px;
                margin-bottom: 30px;
            }
            .confirmation-code {
                font-size: 30px;
                font-weight: bold;
                margin-bottom: 30px;
            }
            .small-text {
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
                <img src="https://firebasestorage.googleapis.com/v0/b/sourdi.appspot.com/o/assets%2Flogo1.png?alt=media&token=7670b4ab-74fd-45b0-9ec3-d2534004cf5c" alt="Logo">
            </div>
            <h1>Vérifier votre adresse e-mail</h1>
            <p class="subtitle">Veuillez saisir le code de confirmation ci-dessous pour terminer la configuration de votre compte</p>
            <p class="confirmation-code">${confirmationCode}</p>
            <p class="small-text">Si vous estimez qu'il s'agit d'une erreur et que vous n'avez pas initié cette demande de création de compte, veuillez ignorer ce courriel.</p>
        </div>
    </body>
    </html>
    ` // HTML body
};





  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });


  