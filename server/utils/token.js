// Will use bcrypt to hash passwords and jsonwebtoken to create JWTs for authentication
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

// Get the user id, grab the user from the database, and then create a token with that user id as the payload
async function generateAccessToken(user_id) {
  console.log("inside generateAccessToken, user_id:", user_id);
  const payload = { id: user_id }; // Payload containing the user ID
  const secretKey = process.env.JWT_SECRET; // Secret key for signing the token
  const options = { expiresIn: "1h" }; // Token expiration time
  return jwt.sign(payload, secretKey, options);
}

// Function to verify a JWT and return the decoded payload
function verifyAccessToken(token) {
  const secret = process.env.JWT_SECRET; // Secret key for verifying the token (should be set in .env)

  try {
    return jwt.verify(token, secret); // Returns the decoded payload if token is valid
  } catch (err) {
    console.error("Token verification error:", err);
    throw new Error("Invalid Token");
  }
}

export { generateAccessToken, verifyAccessToken };
