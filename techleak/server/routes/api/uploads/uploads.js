const { Router } = require("express");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
router = Router();

router.post("/", async (req, res) => {
  res.json("in");
});

module.exports = router;
