exports.getSessionInfo = async (req, res) => {
  console.log("Session info : ", req.session);
  if (req.session) {
    const sessionId = req.session.id;
    req.sessionStore.get(sessionId, (err, session) => {
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
  } else {
    res.status(404).json({
      status: "error",
      message: "No session found",
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
  };
  req.session.user_id = userInfo.user_id;
  req.session.sessionData = sessionData;

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
