const express = require("express");
const router = express.Router();

// controllers
const {
    viewBlogs,
    addBlog,
    updateBlog,
    deleteBlog
} = require("../../../controllers/blogs_controller");
// middlewares
const { catchErrors } = require("../../../config/errorHandlers");
const { blogValidation } = require("../../../middlewares/validations");

// Get Blogs
router.get("/", catchErrors(viewBlogs));
// Add Blog
router.post("/", blogValidation, catchErrors(addBlog));
// Update Blog
router.put("/:id", blogValidation, catchErrors(updateBlog));
// Delete Blog
router.delete("/:id", catchErrors(deleteBlog));

// export router
module.exports = router;
