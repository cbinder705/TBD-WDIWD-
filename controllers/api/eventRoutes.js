const router = require("express").Router();
const { Event } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
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

router.get("/attend/:id", async (req, res) => {
  try {
    let result = await doThing();
    console.log(results);
  } catch (err) {
    console.log(err);
  }

  /*
  // old promise thenables
  doThing()
    .then(() => {})
    .then(() => {})
    .then(() => {})
    .catch(() => {})
  */
});
// links use GET requests
router.get("/delete/:id", withAuth, async (req, res) => {
  try {
    const EventData = await Event.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!EventData) {
      res.status(404).json({ message: "Nothing to delete!" });
      return;
    }

    res.status(200).json(EventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
