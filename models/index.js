const User = require("./User");
const Event = require("./Event");

User.hasMany(Event, {
  foreignKey: "id",
  onDelete: "CASCADE",
});

Event.belongsTo(User, {
  foreignKey: "id",
});

module.exports = { User, Event };
