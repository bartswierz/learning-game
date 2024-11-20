const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  return res.send("auth working!");
});

module.exports = router;
