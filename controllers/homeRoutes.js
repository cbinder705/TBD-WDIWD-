const router = require("express").Router();
const { Event, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/events", async (req, res) => {
  try {
    const EventData = await Event.findAll({
      include: [
        {
          model: Event,
          attributes: ["name", "description", "date", "time"],
        },
      ],
    });

    // Serialize data so the template can read it
    const events = EventData.map((event) => event.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("events", {
      events,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const UserData = await User.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name", "email", "password", "age"],
        },
      ],
    });

    const users = UserData.get({ plain: true });

    res.render(users, {
      ...user,
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

  res.render("login", { layout: "main.handlebars" });
});

module.exports = router;
