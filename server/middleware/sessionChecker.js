const sessionChecker = (req, res, next) => {
  if (!req.session) {
    res.json({ success: false });
  } else if (req.session.username && req.cookies.sid) {
    next();
  } else {
    res.json({ success: false });
  }
};
module.exports = sessionChecker;
