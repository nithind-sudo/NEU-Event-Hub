const basicAuth = require('basic-auth');
const authUtils = require("../utils/authUtils");
const UserService = require("../services/UserService");

const authMiddleWare =  async (req, res, next) =>{
    console.log("********* Inside AUTH MIDDLEWARE ********* ")
    const user = basicAuth(req);
    if (!user || !user.name || !user.pass) {
        res.status(401).send({"message" : "401 Unauthorized - Invalid username/password"});
        return;
    }else{
        try{
            let userService = new UserService();
            const userInfo = await userService.findUserByUserName(user.name);
            const userInfoRow = userInfo[0]
            if(userInfoRow.username === user.name){
                const cmpPass =  await authUtils.comparePassword(user.pass, userInfoRow.password);
                if(cmpPass){
                    console.log(" **** Authorized User **** ");
                    req.username = user.name
                    next();
                }else{
                    res.status(401).send({message : "401 Unauthorized "});
                }
            }else{
                res.status(401).send({"message" : "401 Unauthorized - Invalid User"});    
            }
        }catch(err){
            res.status(500).send({"message" : "500 Internal Server Error", error : err.message});
            console.error(err);
        }
    }


}

module.exports = authMiddleWare;
