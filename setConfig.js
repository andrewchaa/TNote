module.exports = function() {

  try {
    config = require('./config');

    process.env.AUTH_JWT_SECRET = config.env.AUTH_JWT_SECRET;
    process.env.AZURE_STORAGE_ACCOUNT = config.env.AZURE_STORAGE_ACCOUNT;
    process.env.AZURE_STORAGE_ACCESS_KEY = config.env.AZURE_STORAGE_ACCESS_KEY;
    process.env.AUTH_CLIENT_ID = config.env.AUTH_CLIENT_ID;
    process.env.AUTH_CLIENT_SECRET = config.env.AUTH_CLIENT_SECRET;
    process.env.AUTH_CALLBACK_URL = config.env.AUTH_CALLBACK_URL;

  } catch (e) {
    console.log("config doesn't exist. It's production.");
  } 

}