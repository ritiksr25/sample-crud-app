const mongoose = require("mongoose");

require("dotenv").config();

// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
const dburl = process.env.MONGO_URI;

connectDb = async () => {
    try {
        await mongoose.connect(dburl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected");
    } catch (err) {
        console.log(`Error in DB Connectivity: ${err}`);
    }
};
connectDb();
