(function () {
    const express = require("express");
    const static = require("express-static");

    const jwt = require("jsonwebtoken");
    const app = express();

    function getJwtSecret() {
        return process.env.SECRET ?? "secret"
    }

    app.use(express.urlencoded());

    app.post("/login", (req, res) => {
        const { username, password } = req.body;

        if (username === "root" && password === "root") {
            //login correct
            const token = jwt.sign({
                "valid": true,
                "id": 0,
                "username": "root",
            }, getJwtSecret());

            res.cookie("token", token);

            if (req.query.goto != null) {
                res.redirect(req.query.goto);
            } else {
                res.end();
            }
        } else {
            //login incorrect
            res.redirect("..");
        }
    });

    app.get("/auth", (req, res) => {
        const token = req.query.token;

        if (!token) {
            return jwt.verify(token, getJwtSecret());
        } else return {
            valid: false
        }
    })

    app.post("/logout", (req, res) => {
        res.clearCookie("token");

        if (req.query.goto != null) {
            res.redirect(req.query.goto);
        } else {
            res.end();
        }
    });

    app.get("/home", (req, res) => {
        console.log(res.cookies);
        // validate(res.cookies.token);
        res.send("You are logged in!");
    })

    app.use("/", static("static"));


    app.listen(9000, () => {
        console.log("Server is running on 9000");
    });
})()