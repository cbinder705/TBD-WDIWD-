const sequelize = require("../config/connection");
const { User, Event } = require("../models");

const userData = require("./userData.json");
const EventData = require("./EventData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const events of EventData) {
    await Event.create({
      ...events,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
