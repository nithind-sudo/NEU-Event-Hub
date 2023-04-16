const basicAuth = require("basic-auth");
const authUtils = require("../utils/authUtils");
const UserService = require("../services/UserService");

const authMiddleWare = async (req, res, next) => {
  console.log("********* Inside AUTH MIDDLEWARE ********* ");
  const user = basicAuth(req);
  console.log("User Info after using basicAuth : ", user);
  if (!user || !user.name || !user.pass) {
    res
      .status(401)
      .send({ message: "401 Unauthorized - Invalid username/password" });
    return;
  } else {
    try {
      let userService = new UserService();
      const userInfo = await userService.findUserByUserName(user.name);
      if (userInfo.length === 0) {
        res.status(401).send({ message: "Invalid Username or Password" });
      } else {
        const userInfoRow = userInfo[0];
        // console.log("userInfoRow : ", userInfoRow);
        if (userInfoRow.username === user.name) {
          const cmpPass = await authUtils.comparePassword(
            user.pass,
            userInfoRow.password
          );
          if (cmpPass) {
            console.log(" **** Authorized User **** ");
            req.userInfo = userInfoRow;
            next();
          } else {
            res.status(401).send({ message: "401 Unauthorized " });
          }
        } else {
          res.status(401).send({ message: "401 Unauthorized - Invalid User" });
        }
      }
    } catch (err) {
      res
        .status(500)
        .send({ message: "500 Internal Server Error", error: err.message });
      console.error(err);
    }
  }
};

module.exports = authMiddleWare;
