const express = require("express");
const affiliateController = require("../controller/affiliate.controller");
const router = express.Router()

router.post("/", affiliateController.create)
router.put("/:email", affiliateController.update)

module.exports = router;