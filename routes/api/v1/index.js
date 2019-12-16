const express = require("express");
const router = express.Router();

// controllers
const { catchErrors } = require("../../../config/errorHandlers");
const { index } = require("../../../controllers/index_controller");

// index route
router.get("/", catchErrors(index));

// export router
module.exports = router;
