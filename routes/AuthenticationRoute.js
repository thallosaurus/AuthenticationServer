const { auth } = require("../logic/AuthLogic.js");

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

    const TYPE_INDEX = 0;
    const TOKEN_INDEX = 1;

    const t_array = authorization.split(" ");

    switch (t_array[TYPE_INDEX]) {
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