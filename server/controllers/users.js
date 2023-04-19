const UserService = require("../services/UserService");
const authUtils = require("../utils/authUtils");

const userService = new UserService();

exports.createUser = async (req, res) => {
  const { first_name, last_name, password, username, phone_number, role, isVerified } =
    req.body;
  try {
    const hash = await authUtils.generateHash(password);
    const payload = {
      password: hash,
      first_name,
      last_name,
      username,
      phone_number,
      role, isVerified
    };
    console.log(payload);
    userService
      .createUser(payload)
      .then((userRow) => {
        res.status(201).send({
          userRow, success : true
        });
      })
      .catch((e) => {
        console.log(e.message);
        res
          .status(500)
          .send({ message: "500 Internal Server Error", error: e.message });
      });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ message: "400 Bad Request", error: error.message });
  }
};

exports.getUserInfo = async (req, res) => {
  const { user_id } = req.params;
  try {
    const userInfo = await userService.getUser(user_id);
    res.status(200).send(userInfo);
  } catch (e) {
    res.status(400).send({ message: "400 Bad Request", error: e.message });
  }
};

exports.deleteUserInfo = async (req, res) => {
  const { user_id } = req.params;
  console.log("User -id input : ", user_id);
  try {
    const deletedCnt = await userService.deleteUser(user_id);
    // Sample successful o/p : { acknowledged: true, deletedCount: 1 }
    console.log("Deleted Row count : ", deletedCnt);
    if (deletedCnt.deletedCount === 1) {
      res.status(204).send({});
    } else {
      res.status(400).send({ message: "400 Bad Request" });
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: "500 Internal Server Error", message: e.message });
  }
};

exports.patchUserInfo = async (req, res) => {
  const { user_id } = req.params;
  const { first_name, last_name, password, username } = req.body;
  const patchInfo = {
    ...(first_name && { first_name }),
    ...(last_name && { last_name }),
    ...(username && { username }),
    account_updated: new Date(),
  };
  if (!password) {
    // password field is not present
    try {
      const updatedInfo = await userService.patchUser(user_id, patchInfo);
      res.status(200).send(updatedInfo);
    } catch (e) {
      res.status(400).send({ message: "400 Bad Request", error: e.message });
    }
  } else {
    // password field is present
    try {
      const hash = await authUtils.generateHash(password);
      const updatedPatchPayload = { password: hash, ...patchInfo };
      const updatedInfo = await userService.patchUser(user_id, patchInfo);
      res.status(200).send(updatedInfo);
    } catch (e) {
      res.status(400).send({ message: "400 Bad Request", error: e.message });
    }
  }
};
