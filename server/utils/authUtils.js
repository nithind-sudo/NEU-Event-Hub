const bcrypt = require("bcrypt");

const saltRounds = 10;

async function comparePassword(enteredPassword, hash){
    return await bcrypt.compare(enteredPassword, hash);
}

async function generateHash(userPassword){
    return await bcrypt.hash(userPassword, saltRounds);
}

module.exports = {
    comparePassword,
    generateHash
};