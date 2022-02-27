const { verify } = require("../logic/AuthLogic.js");
const { getSession } = require("../logic/SessionLogic.js");

module.exports = function(req, res, next) {
    // console.log(req);
    if (req.cookies["auth"]) {
        try {
            let tokenData = verify(req.cookies["auth"]);
            // req.headers["authorization"] = tokenData.toString();
            req.session = getSession(tokenData["sessionId"]);
            next();
        } catch (e) {
            // console.error(e);
            res.redirect("/logout?invalid_session");
            return;
        }

    } else res.redirect("/signin?signin_required=true&to=" + req.url);
}