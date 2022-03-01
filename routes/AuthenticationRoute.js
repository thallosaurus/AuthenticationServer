const { auth, splitAuthHeader } = require("../logic/AuthLogic.js");

/**
 * This module handles the /auth route
 * @param {*} req 
 * @param {*} res 
 */
module.exports = function(req, res) {
    // if (res.setHeader("Authorization", `Bearer ${token}`);)
    if (!req.header["authorization"]) {
        res.status(400).end();
        return;
    }

    const { authorization } = req.header;

    const t_array = splitAuthHeader(authorization);

    console.log(req.header);
    console.log(req.header["x-forwarded-uri"]);

    switch (t_array.type) {
        case "Bearer":
            let data = auth(t_array[TOKEN_INDEX]);
            // console.log(data);
            res.status(200).end();
            break;
        default:
            res.status(400).end();
            return;
    }
}