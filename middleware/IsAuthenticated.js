const { verify } = require("../logic/AuthLogic.js");
const { getSession } = require("../logic/SessionLogic.js");

module.exports = function(req, res, next) {
    // console.log(req);
    if (req.headers["authorization"]) {
        // console.log();
        let s = req.headers["authorization"].split(" ");
        const type = s[0];
        const token = s[1];
        if (type === "Bearer") {
            try {
                verify(token);
                next();
            } catch (e) {
                res.status(403).end();
            }
        } else {
            res.status(400).end();
        }
    } else {

        if (req.cookies["auth"]) {
            try {
                let tokenData = verify(req.cookies["auth"]);
                req.session = getSession(tokenData["sessionId"]);
                next();
            } catch (e) {
                res.redirect("/logout?invalid_session");
                return;
            }
            
        } else res.redirect("/signin?signin_required=true&to=" + req.url);
    }
}