const express = require("express")

const router = express.Router();

(function () {
    router.get("/", function (req, res) {
        console.log(req.session);
        res.send("You are logged in!<a href='/logout'>Logout</a><br><p>Your Session:</p><pre>" + JSON.stringify(req.session) + "</pre>");
    });
})();

module.exports = router;