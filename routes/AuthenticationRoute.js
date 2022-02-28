const { verify, splitAuthHeader } = require("../logic/AuthLogic.js");

/**
 * This module handles the /auth route
 * @param {*} req 
 * @param {*} res 
 */
module.exports = function (req, res) {
    // if (res.setHeader("Authorization", `Bearer ${token}`);)
    console.log(req.headers);
    const { onfail } = req.query;
    if (!req.cookies.auth) {
        res.status(403).end();
        return;
    }

    // console.log(req.header);

    const token = req.cookies.auth;

    try {
        let data = verify(token);
        // console.log(data);
        if (data) {
            res.status(200).end();
        }
            // break;
/*         } else {
    res.cookie("auth", token, { maxAge: EXPIRATION_IN_SECONDS, httpOnly: true });
    // res.status(301).end();
    // return;
} */
} catch (e) {
        //token is expired or invalid, remove from cookies
        res.cookie("auth", token, { maxAge: 0, httpOnly: true });
    }
    // }
}