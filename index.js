const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");

const app = express();

require("dotenv").config();
require("./config/dbConnection");

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(cors());
app.use(compression());

// load models
const Blog = require("./models/Blog");

// routes
app.use("/api/v1", require("./routes/api/v1/index"));
app.use("/api/v1/blogs", require("./routes/api/v1/blogs"));

// not found route and error handlers
const { notFound, sendErrors } = require("./config/errorHandlers");
app.use("*", notFound);
app.use(sendErrors);

// start server
startServer = async () => {
    try {
        await app.listen(process.env.PORT);
        console.log(`Server is up and running on Port ${process.env.PORT}`);
    } catch (err) {
        console.log("Error in starting server.");
    }
};
startServer();
