module.exports = function(req, res) {
    res.cookie("auth", "", { maxAge: 0, httpOnly: true });
    res.redirect("/");
}