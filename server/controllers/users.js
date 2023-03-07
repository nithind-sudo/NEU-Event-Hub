const UserService = require('../services/UserService');
const authUtils = require("../utils/authUtils");

const userService = new UserService();

exports.createUser = (req, res) => {
    console.log("Inside create User POST API");
    const {first_name, last_name, password, username} = req.body;
    authUtils.generateHash(password)
    .then(hash => {
        console.log("Hash : ", hash);
        const payload = { password : hash, first_name, last_name, username};
        userService.createUser(payload)
        .then(result =>{
            res.status(201).send({
                result
            });
        })
        .catch((error) => {
            res.status(400).send({"message" : "400 Bad Request", error : error.message});
        })

    })
};


