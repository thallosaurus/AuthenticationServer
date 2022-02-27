# AuthenticationServer

This server generates jwt tokens.

Supply your own keys by mounting ```/certs/privkey.pem``` and ```/certs/pubkey.pem```. If you dont mount your own keys the script will create its own keys on every startup.

Login with username ```root``` and password ```root```