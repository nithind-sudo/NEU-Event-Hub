const User = require("../models/users");
class UserService{

    async createUser(userPayload){
        const user = new User(userPayload);
        return await user.save();
    }

}

module.exports = UserService;