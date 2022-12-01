const router = require("express").Router();
const { Event, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const EventData = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
          //attributes: ["name", "description", "date", "time", "location"],
        },
      ],
    });
 
    res.render("login", { layout: "login.handlebars" });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/event/:id", async (req, res) => {
  try {
    const EventData = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
          //attributes: ["name", "description", "date", "time", "location"],
        },
      ],
    });

    const events = EventData.map((event) => event.get({ plain: true }));

    res.render("event", {
      events,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: User }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route

  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login", { layout: "login.handlebars" });
});

module.exports = router;
