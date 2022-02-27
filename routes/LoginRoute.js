/*
    This route processes the input from the /login route and sets the authorization header
*/

const { login, EXPIRATION_IN_SECONDS } = require("../logic/AuthLogic.js");

module.exports = function(req, res) {
    let token;
    const { username, password } = req.body;
    token = login(username, password);

    console.log(req.headers["content-type"]);

    switch (req.headers["content-type"]) {
        case "application/x-www-form-urlencoded":
            if (!token) {
                res.status(403).redirect("/signin?cred_wrong=true")
                return;
            }
            res.cookie("auth", token, { maxAge: EXPIRATION_IN_SECONDS, httpOnly: true });

            if (req.query.to) {
                res.redirect(req.query.to);
            } else {
                res.end();
            }
            break;
        case "application/json":
            if (!token) {
                res.status(403);
                return;
            }

            res.send({
                "token": token
            });
            break;
        default:
            res.status(400).end();
            break;
    }
}