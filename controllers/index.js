const router = require("express").Router();

//const apiRoutes = require("./api");
const api = require("./api/index.js");

router.use("/api", api);
//router.use("/api", apiRoutes);

module.exports = router;
