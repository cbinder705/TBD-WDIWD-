const router = require("express").Router();
const homeRoutes = require(".//homeRoutes");

const apiRoutes = require("./api");
//const api = require("./api/index.js");

router.use("/", homeRoutes);
//router.use("/api", api);
router.use("/api", apiRoutes);

module.exports = router;
