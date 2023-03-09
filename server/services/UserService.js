const User = require("../models/users");
class UserService{

    async createUser(userPayload){
        const user = new User(userPayload);
        return await user.save();
    }

    async getUser(user_id){
        return await User.find({ 'user_id' : user_id}).exec();
    }

    async deleteUser(user_id){
        return await User.deleteOne({ 'user_id' : user_id}).exec();
    }

    async patchUser(payload){
        return await User.findOneAndUpdate({...payload});
    }

}

module.exports = UserService;