const router = require("express").Router();

router.use("/auth", require("./auth.route"))
router.use("/challenges", require("./challenge.route"))

module.exports = router;