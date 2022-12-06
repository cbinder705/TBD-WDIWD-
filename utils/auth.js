const withAuth = (req, res, next) => {
  // insures that user is logged in
  if (!req.session.logged_in) {
    res.redirect("/member");
  } else {
    next();
  }
};

module.exports = withAuth;
