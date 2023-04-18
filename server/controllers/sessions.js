exports.getSessionInfo = async (req, res) => {
  console.log("Inside *** GET Session info ***** ")
  console.log("Cookies : ", req.cookies);
  const sessionId = req.cookies.sid;
  console.log("Session Id from req.cookies : ", sessionId);
  if (!sessionId) {
    res.status(404).json({
      status: "error",
      message: "No session found",
    });
  } else {
    const sessionId = req.cookies.sid.split("s:")[1].split(".")[0];
    req.sessionStore.get(sessionId, (err, session) => {
      console.log("Session inside get : ", session);
      if (err) {
        res.status(500).json({
          status: "error",
          message: "Error retrieving session data",
        });
      } else if (!session) {
        res.status(404).json({
          status: "error",
          message: "Session not found",
        });
      } else {
        const sessionData = session.sessionData;
        res.json({
          success: true,
          ...sessionData,
        });
      }
    });
  }
};

exports.generateSession = async (req, res) => {
  console.log("Inside generate Session of Session Controller");
  const userInfo = req.userInfo;
  req.session.authorized = true;
  const sessionData = {
    username: userInfo.username,
    role: userInfo.role,
    user_id: userInfo.user_id,
    events_booked: userInfo.events_booked,
    favorites: userInfo.favorites,
    listings: userInfo.listings,
    isActivated: userInfo.isActivated,
    isVerified: userInfo.isVerified,
    sid: req.sessionID,
  };
  req.session.user_id = userInfo.user_id;
  req.session.sessionData = sessionData;

  res.clearCookie("sid");
  res.cookie("sid", req.sessionID, {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
  });

  console.log("Session being saved to MongoStore : ", req.session);
  req.session.save((err) => {
    if (err) {
      res.status(500).json({
        status: "error",
        message: "Error creating session",
      });
    } else {
      res.status(201).send({
        message: `Session Created for User: ${userInfo.username}`,
        success: true,
        sessionData,
      });
    }
  });
};

exports.deleteSession = async (req, res) => {
  const username = req.session.user;
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({
        status: "error",
        message: "Error deleting session",
      });
    } else {
      res.json({ username, success: true, message: "Session deleted" });
    }
  });
};
