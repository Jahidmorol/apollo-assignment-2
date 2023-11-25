# Mongoose Express CRUD Mastery

## Overview

This project is a Node.js Express application developed in TypeScript. It integrates MongoDB with Mongoose for user data and order management. The application focuses on achieving CRUD operations with data integrity through validation using Zod.

## Prerequisites

Before you begin, ensure you have the following requirements:

- Node.js installed
- MongoDB installed and running
- TypeScript knowledge

## Getting Started

To run this project locally, follow these steps:

1. _Clone the repository:_

   bash
   git clone https://github.com/Jahidmorol/apollo-assignment-2.git

2. _Navigate to the project directory:_

   typescript
   cd apollo-assignment-2

3. _Install dependencies:_

   typescript
   npm install

4. _Run the server_

   typescript
   npm run start:prod

then access the API, make requests to `http://localhost:5000` your local server.

# API Endpoints

### Create a new user

-_Endpoint:_ **POST /api/users**

- _Method:_ `POST`
- _URL:_ `http://localhost:5000/api/users`

### Retrieve a list of all users

-_Endpoint:_ **GET /api/users**

- _Method:_ `GET`
- _URL:_ `http://localhost:5000/api/users`

### Retrieve a specific user by ID

-_Endpoint:_ **GET /api/users/:userId**

- _Method:_ `GET`
- _URL:_ `http://localhost:5000/users/{userId}`

### Update user information

-_Endpoint:_ **PUT /api/users/:userId**

- _Method:_ `PUT`
- _URL:_ `http://localhost:5000/api/users/{userId}`

### Delete a user

-_Endpoint:_ **DELETE /api/users/:userId**

- _Method:_ `DELETE`
- _URL:_ `http://localhost:5000/api/{userId}`

### Add New Product in Order

-_Endpoint:_ **PUT /api/users/:userId/orders**

- _Method:_ `PUT`
- _URL:_ `http://localhost:5000/api/users/{userId}/orders`

### Retrieve all orders for a specific user

-_Endpoint:_ **GET /api/users/:userId/orders**

- _Method:_ `GET`
- _URL:_ `http://localhost:5000/api/users/{userId}/orders`

### Calculate Total Price of Orders for a Specific User

-_Endpoint:_ **GET /api/users/:userId/orders/total-price**

- _Method:_ `GET`
- _URL:_ `http://localhost:5000/api/users/{userId}/orders/total-price`

## host on vercel

- [Vercel lInk](https://assignment-2-two-theta.vercel.app/)
