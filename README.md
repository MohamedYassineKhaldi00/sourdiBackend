# Loyalty App Backend

This Node.js application serves as the backend for a loyalty mobile app. The backend manages the loyalty cards, customer interactions, and rewards for various stores, providing essential functionalities such as user authentication, managing loyalty cards, handling stamps, generating coupons, and more.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Secure user registration and login using JSON Web Tokens (JWT).
- **Loyalty Card Management:** Add, update, and remove loyalty cards for customers.
- **Stamps Tracking:** Automatically track and update stamps for each loyalty card.
- **Coupon Generation:** Generate and manage coupons based on predefined criteria (e.g., 10 stamps collected).
- **QR Code Scanning:** Handle QR code scanning to interact with loyalty cards.
- **Push Notifications:** Send notifications for promotions, new rewards, and other updates.

## Technologies Used

- **Node.js:** Server-side JavaScript runtime.
- **Express.js:** Web framework for building RESTful APIs.
- **MongoDB:** NoSQL database for storing data.
- **JWT:** JSON Web Tokens for user authentication and authorization.
- **Mongoose:** MongoDB object modeling for Node.js.
- **dotenv:** Module for loading environment variables from a `.env` file.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/loyalty-app-backend.git
   cd loyalty-app-backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:

   Create a `.env` file in the root directory and add the necessary environment variables:

   ```plaintext
   PORT=3000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   ```

## Configuration

Ensure that you configure the following in your `.env` file:

- `PORT`: The port on which the server will run.
- `MONGO_URI`: The MongoDB connection string.
- `JWT_SECRET`: The secret key used for signing JWT tokens.

## Usage

To start the server, run:

```bash
npm start
```

The server will be running on `http://localhost:3000` by default.

## API Endpoints

### Authentication

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Login a user and return a JWT.

### Loyalty Cards

- **GET** `/api/cards`: Retrieve all loyalty cards for the authenticated user.
- **POST** `/api/cards`: Add a new loyalty card.
- **PUT** `/api/cards/:id`: Update a loyalty card.
- **DELETE** `/api/cards/:id`: Remove a loyalty card.

### Stamps

- **POST** `/api/stamps/add`: Add a stamp to a loyalty card.
- **GET** `/api/stamps/:cardId`: Get the number of stamps for a specific loyalty card.

### Coupons

- **GET** `/api/coupons`: Retrieve all coupons for the authenticated user.
- **POST** `/api/coupons/redeem`: Redeem a coupon.

### QR Code

- **POST** `/api/qr/scan`: Handle QR code scanning to interact with loyalty cards.

## Security

The backend follows best practices for security:

- **JWT Authentication:** Securely manage user sessions with JWT.
- **Environment Variables:** Sensitive data is stored in environment variables.
- **Input Validation:** Input data is validated to prevent common security vulnerabilities.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss potential improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
