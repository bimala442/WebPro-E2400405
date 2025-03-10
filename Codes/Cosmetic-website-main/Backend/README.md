# Backend for Cosmetic Website

This is the backend server for the Cosmetic Website built with Node.js, Express.js, Mongoose, and MongoDB.

## Setup Instructions

1. Navigate to the Backend directory:
   ```
   cd Backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Make sure the MongoDB connection string is correctly set in the `.env` file:
   ```
   MongoDB=your_mongodb_connection_string
   ```

4. Install the required packages if npm install doesn't work:
   ```
   npm install express mongoose cors dotenv nodemon
   ```

## Running the Server

To start the development server, run:
```
npm run dev
```

The server will start on port 5000 (or the port specified in your environment variables).

You should see the following messages:
- "Server started on port 5000"
- "Database connected successfully"

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `GET /api/products/:id` - Get a single product by ID
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

## Project Structure

```
Backend/
│
├── controllers/    # Route controllers
│   └── productController.js
│
├── models/         # Database models
│   └── Product.js
│
├── routes/         # API routes
│   └── productRoutes.js
│
├── .env            # Environment variables
├── index.js        # Main application file
└── package.json    # Dependencies and scripts
``` 