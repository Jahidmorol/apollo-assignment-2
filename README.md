# Mongoose Express CRUD Mastery

## Overview

This project is a Node.js Express application developed in TypeScript. It integrates MongoDB with Mongoose for user data and order management. The application focuses on achieving CRUD operations with data integrity through validation using Joi/Zod.

## Prerequisites

Before you begin, ensure you have the following requirements:

- Node.js installed
- MongoDB installed and running
- TypeScript knowledge

## Getting Started

To run this project locally, follow these steps:

1. _Clone the repository:_

   bash
   git clone https://github.com/mehedihasan8/nextLevel2.git

2. _Navigate to the project directory:_

   typescript
   cd nextLevele2

3. _Install dependencies:_

   typescript
   npm install

4. _Run the server_

   typescript
   npm run start:prod

then access the API, make requests to `http://localhost:5000` your local server.

# API Endpoints

### Create new User

- _Method:_ `POST`
- _URL:_ `http://localhost:5000/api/users`
- _Description:_ Create new User

### Get User by ID

- _Method:_ `GET`
- _URL:_ `http://localhost:5000/users/{userId}`
- _Description:_ Get User by ID

### Update User by ID

- _Method:_ `PUT`
- _URL:_ `http://localhost:5000/api/{userId}`
- _Description:_ Update User by ID

### Delete User by ID

- _Method:_ `DELETE`
- _URL:_ `http://localhost:5000/api/{userId}`
- _Description:_ Delete User by ID

### Get All Users

- _Method:_ `GET`
- _URL:_ `http://localhost:5000/api/users`
- _Description:_ Get All Users

## host on vercel

- [Vercel lInk](https://assignment-2-pied-eight.vercel.app/)
