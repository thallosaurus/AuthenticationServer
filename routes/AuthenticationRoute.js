const { verify, splitAuthHeader } = require("../logic/AuthLogic.js");

/**
 * This module handles the /auth route
 * @param {*} req 
 * @param {*} res 
 */
module.exports = function (req, res) {
    // if (res.setHeader("Authorization", `Bearer ${token}`);)
    console.log(req.cookies);
    if (!req.cookies.auth) {
        res.status(403).end();
        return;
    }

    // console.log(req.header);

    const token = req.cookies.auth;

    let data = verify(token);
    // console.log(data);
    if (data) {
        res.status(200).end();
        // break;
    } else {

        // default:
        res.status(403).end();
        return;
    }
    // }
}