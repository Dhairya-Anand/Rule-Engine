# Rule Engine Project

## Overview

The Rule Engine Project is a web application designed to create, evaluate, and combine rules based on specified conditions. It leverages a MongoDB database to store rules and uses a frontend built with React to provide a user-friendly interface for rule management.

## Features

- **Create Rules**: Users can define rules with a name and a condition string.
- **Evaluate Rules**: Users can evaluate rules against a JSON dataset to see if the conditions hold true.
- **Combine Rules**: Combine multiple rules for complex evaluations.

## Technologies Used

- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Frontend**: React, Tailwind CSS

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or higher)
- MongoDB (for local development) or access to a MongoDB Atlas cluster
- npm (Node Package Manager)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Dhairya-Anand/Rule-Engine.git
   cd Rule-Engine

2. **Install backend dependencies:**
    ```bash
    cd backend
    npm install

3. **Install frontend dependencies:**
    ```bash
    cd backend
    npm install

### Configuration

1. **Database Connection**:

- Update the MongoDB connection string in backend/index.js with your own credentials or use a local MongoDB instance.Environment Variables:
- Create a .env file in the backend directory and add your environment variables as needed.

### Running the Application

1. **Running the Application**:
    ```bash
    cd backend
    npm run server

2. **Start the frontend development server**:
    ```bash
    cd frontend
    npm run dev

3. **Access the application**:

- Open your browser and navigate to http://localhost:5173 to see the application in action.

### API Endpoints
- POST /api/create-rule: Create a new rule with a name and condition string.
- POST /api/evaluate-rule: Evaluate a specified rule against provided data in JSON format.
- POST /api/combine-rule: Combine multiple rules for evaluation.

### Contributing
- If you'd like to contribute to the project, please fork the repository and submit a pull request with your changes. Ensure that your code adheres to the project's style guidelines.