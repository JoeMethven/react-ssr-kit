require("@babel/register");
// precompiles ES6 syntax
global.__CLIENT__ = false; // global server-side variable
require("./config/hooks"); // webpack hooks
require("./src/server"); // start server
