const { auth, splitAuthHeader } = require("../logic/AuthLogic.js");

/**
 * This module handles the /auth route
 * @param {*} req 
 * @param {*} res 
 */
module.exports = function(req, res) {
    // if (res.setHeader("Authorization", `Bearer ${token}`);)
    console.log(req.headers);
    if (!req.header["authorization"]) {
        res.status(403).end();
        return;
    }

    // console.log(req.header);

    const { authorization } = req.header;

    const t_array = splitAuthHeader(authorization);

    switch (t_array.type) {
        case "Bearer":
            let data = auth(t_array[TOKEN_INDEX]);
            // console.log(data);
            if (data) {
                res.status(200).end();
                break;
            }
        default:
            res.status(403).end();
            return;
    }
}