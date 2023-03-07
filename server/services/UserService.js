const User = require("../models/users");

class UserService{

    async createUser(userPayload){
        return await User.create(userPayload);
    }

}

module.exports = UserService;