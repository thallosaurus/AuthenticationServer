const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const fs = require("fs");
const { createNewSession } = require("./SessionLogic.js");

const EXPIRATION_IN_SECONDS = 900000;
module.exports.EXPIRATION_IN_SECONDS = EXPIRATION_IN_SECONDS;

let privateKey, publicKey;

try {
    privateKey = fs.readFileSync("/certs/privkey.pem");
    publicKey = fs.readFileSync("/certs/pubkey.pem");
} catch (e) {
    let keys = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: 'top secret'
        }
    });
    privateKey = keys.privateKey;
    publicKey = keys.publicKey;
}

module.exports.login = function (username, password) {
    if (username === "root" && password === "root") {
        const sessionId = createNewSession(EXPIRATION_IN_SECONDS);
        return jwt.sign({
            sessionId: sessionId
        }, { key: privateKey, passphrase: "top secret" }, {
            algorithm: "RS512",
            expiresIn: EXPIRATION_IN_SECONDS,
            subject: "root@all"
        });
    }
}

module.exports.verify = function (token) {
    return jwt.verify(token, publicKey);
}