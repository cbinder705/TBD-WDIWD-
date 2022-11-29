const router = require("express").Router();
const { Event } = require("../../models");
const withAuth = require("../../utils/auth");
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
router.post("/events", withAuth, async (req, res) => {
  try {
    const newEvent = await Event.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
