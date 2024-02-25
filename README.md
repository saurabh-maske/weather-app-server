# Weather App Server

This project serves as a backend server for a weather application. It provides APIs to manage locations and retrieve weather information. The application is built using the Nest.js framework, TypeScript, PostgreSQL, Redis, and Swagger UI Express for API documentation.

## Prerequisites

- Node.js (v14.x or higher)
- PostgreSQL (v12.x or higher)
- Redis (v5.x or higher)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/saurabh-maske/weather-app-server.git
   ```
2. Navigate to the project directory:
   ```
   cd weather-app-server
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory of the project and configure the environment variables as needed. You can use the `.env` file as a template.

## Running the Application

1. Start the application:
   ```
   npm run start
   ```
   The application will start on the port specified in the `.env` file (default is  3000).

## Swagger UI

The application uses Swagger UI Express for API documentation. You can access the Swagger UI by navigating to `http://localhost:3000/api` in your web browser.

## Testing

To run the tests, execute:
```
npm run test
```
