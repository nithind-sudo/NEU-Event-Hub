const UserService = require('../services/UserService');
const authUtils = require("../utils/authUtils");

const userService = new UserService();

exports.createUser = async (req, res) => {
    console.log("Inside create User POST API");
    const {first_name, last_name, password, username} = req.body;
    try{
        const hash = await authUtils.generateHash(password);
        console.log("Hash created : ", hash);
        const payload = { password : hash, first_name, last_name, username};
        userService.createUser(payload)
        .then(userRow => {
            res.status(201).send({
                userRow
            });
        })
        .catch(e => {
            res.status(500).send({ message : "Internal Server Error", 
                 error : e.message});
        })

    }catch(e){
        res.status(400).send({"message" : "400 Bad Request", error : error.message});
    }
};


