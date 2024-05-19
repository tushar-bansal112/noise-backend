const express = require("express"); // Importing Express.js framework
const bodyParser = require("body-parser"); // Importing body-parser middleware
const sleepRoutes = require("./routes/sleep"); // Importing sleep routes

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/sleep", sleepRoutes); // Mounting sleep routes at /sleep endpoint

// Starting the server to listen on specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
