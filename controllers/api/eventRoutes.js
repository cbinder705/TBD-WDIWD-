const router = require("express").Router();
const { Event, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  // Find the logged in user based on the session ID
  const userData = await Event.findAll({
    include: [
      {
        model: User,
        attributes: ["name", "id", "email", "age"],
      },
    ],
  });

  //const users = userData.map((project) => project.get({ plain: true }));
  const users = await userData.map((event) => event.get({ plain: true }));

  console.log(17, users);
  res.json(users);
});

module.exports = router;
