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
                "ttl": 3600,    //Time to live in seconds - standart are 5 minutes
                "username": "root",
            }, getJwtSecret());

            res.setHeader("Authorization", `Bearer ${token}`);

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
            const decodedToken = jwt.verify(token, getJwtSecret());
            return {
                validUntil: (decodedToken.ttl * 1000) + Date.now(),
                valid: Date.now() < this.validUntil
            }
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
    });

    app.use("/signin", static("static"));

    app.listen(9000, () => {
        console.log("Server is running on 9000");
    });
})()