# REST API for a Sleep Tracker App

This is a simple RESTful API that allows to store and retrieve user sleep data, built with Node.js and Express.

## Installation

1. Clone this repository:

    ```bash
    https://github.com/tushar-bansal112/noise-backend.git
    ```

2. Navigate to the project directory:

    ```bash
    cd noise-backend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Usage

### Running the Server 

To start the server, run:

```bash
npm start
```


To test the application, run:

```bash
npm test
```

## API Endpoints

### POST `/sleep`
- **Description:** Allows users to submit their sleep duration along with a timestamp.
- **Request Body:** JSON object containing `userId`, `hours`, and `timestamp`.
- **Response:** The created sleep record.

### GET `/sleep/:userId`
- **Description:** Retrieve all sleep records for a given user, sorted by date.
- **Response:** Array of sleep records.

### DELETE `/sleep/:recordId`
- **Description:** Delete a specific sleep record by its ID.
- **Response:** Deleted the record success message.
