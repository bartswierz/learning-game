const { config } = require("dotenv");
config();

module.exports = {
  PORT: process.env.PORT || 8080,
  SERVER_URL: process.env.SERVER_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  // SERVER_URL: process.env.SERVER_URL || "http://localhost",
  // CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  SECRET: process.env.SECRET,
};
