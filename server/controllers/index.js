
// returning the status code 200 for the healthz api
exports.healthz = (req, res) => {
    res.status(200).send({});
};
  
exports.welcome = (req, res) => {
    res.status(200).send({"message" : "Application is running"});
};