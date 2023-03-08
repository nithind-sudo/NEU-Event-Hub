const User = require("../models/users");
class UserService{

    async createUser(userPayload){
        console.log("Payload being used to create : ", userPayload);
        const user = new User(userPayload);
        return await user.save();
    }

}

module.exports = UserService;