
// returning the status code 200 for the healthz api
exports.healthz = (req, res) => {
    res.status(200).send({});
};

exports.login = (req, res) => {

}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

exports.welcome = (req, res) => {
    res.status(200).send({"message" : "Application is running"});
};