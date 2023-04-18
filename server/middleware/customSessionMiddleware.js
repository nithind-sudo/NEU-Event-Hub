const customSessionMiddleware = (sessionMiddleware) => {
  return (req, res, next) => {
    sessionMiddleware(req, res, () => {
      next();
    });
  };
};

module.exports = customSessionMiddleware;
