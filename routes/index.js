const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);
router.use((req, res) => {
  res.status(400).json({ message: "Route not found." });
});

module.exports = router;
