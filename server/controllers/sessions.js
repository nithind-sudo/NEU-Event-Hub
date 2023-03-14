exports.getSessionInfo = async (req, res) => {

};

exports.generateSession = async (req, res) =>{
    console.log("Inside generate Session of Session Controller");
    req.session.user = req.username;
    req.session.authorized = true;
    res.status(201).send({message : `Session Created for User : ${req.username}`});
};

exports.deleteSession = async (req, res) => {
    const username = req.session.user;
    req.session.destroy();
    res.json({username});
};
