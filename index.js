(function () {
    const AuthenticationRoute = require("./routes/AuthenticationRoute.js");
    const LoginRoute = require("./routes/LoginRoute.js");

    const cookieParser = require("cookie-parser");
    const LogoutRoute = require("./routes/LogoutRoute.js");

    const Home = require("./UserArea/Home.js");

    const isAuthenticated = require("./middleware/isAuthenticated.js");

    const express = require("express");
    const static = require("express-static");

    const app = express();

    app.use(cookieParser());

    app.get("/", (req, res) => {
        res.send("<p><a href='/signin'>Sign In</a><br></a><a href='/signup'>Sign up</a></p>")
    })

    app.use("/user", isAuthenticated, Home);

    app.post("/login",
        express.json(),
        express.urlencoded(),
        LoginRoute);

    app.get("/logout", LogoutRoute);

    app.post("/auth", AuthenticationRoute);

    app.get("/signin", (req, res) => {
        res.sendFile(__dirname + "/static/index.html");
    })

    app.listen(9000, () => {
        console.log("Server is running on 9000");
    });
})()