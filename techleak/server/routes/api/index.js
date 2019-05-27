const express = require("express");
const router = express.Router();

router.use("/posts", require("./posts/posts"));
router.use("/users", require("./users/users"));
router.use("/contact", require("./contact/contact"));

module.exports = router;
