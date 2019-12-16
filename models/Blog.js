const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
}, { timestamps: true });

module.exports = Blog = mongoose.model("Blog", BlogSchema);