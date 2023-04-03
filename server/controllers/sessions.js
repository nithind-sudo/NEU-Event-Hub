exports.getSessionInfo = async (req, res) => {
  if (req.session) {
    res.json({
      status: 'success',
      message: 'Session information retrieved',
      data: req.session,
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'No session found',
    });
  }
};

exports.generateSession = async (req, res) => {
  console.log('Inside generate Session of Session Controller');
  console.log("Req.session : ", req.session)
  console.log("Session ID : ", req.sessionID);
  req.session.user = req.username;
  req.session.authorized = true;
  res.status(201).send({ message: `Session Created for User: ${req.username}`, success : true });
};

exports.deleteSession = async (req, res) => {
  const username = req.session.user;
  req.session.destroy(err => {
    if (err) {
      res.status(500).json({
        status: 'error',
        message: 'Error deleting session',
      });
    } else {
      res.json({ username, message: 'Session deleted' });
    }
  });
};
