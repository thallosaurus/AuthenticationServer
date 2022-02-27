module.exports.createNewSession = function(timeoutInSeconds) {
    //create a session here (in redis or whereever)

    //return session id here
    return "aaaa";
}

//create object which proxies the session object
module.exports.getSession = function(sessionId) {
    return {
        msg: "Hello World"
    }
}