const router = require("express").Router();
const userRoutes = require("./userRoutes");
const eventRoutes = require("./eventRoutes");
const homeRoutes = require("./homeRoutes");
router.use("/", homeRoutes);
router.use("/users", userRoutes);
router.use("/events", eventRoutes);

module.exports = router;
