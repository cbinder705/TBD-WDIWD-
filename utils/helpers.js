const { format, parse } = require("date-fns");
module.exports = {
  formatted_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  formatted_time: (time) => {
    return format(
      parse(time.split(":", 2).join(":"), "HH:mm", new Date()),
      "hh:mm a"
    );
  },
};
