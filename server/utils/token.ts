import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

// Get the user id, grab the user from the database, and then create a token with that user id as the payload
async function generateAccessToken(user_id: number): Promise<string> {
  const payload = { id: user_id };
  const secretKey: string = process.env.JWT_SECRET!; // Secret key for signing the token
  const options: SignOptions = { expiresIn: "1h" }; // Token expiration time
  return jwt.sign(payload, secretKey, options);
}

// Function to verify a JWT and return the decoded payload
function verifyAccessToken(token: string): any {
  const secret: string = process.env.JWT_SECRET!; // Secret key for verifying the token (should be set in .env)

  try {
    return jwt.verify(token, secret); // Returns the decoded payload if token is valid
  } catch (err) {
    console.error("Token verification error:", err);
    throw new Error("Invalid Token");
  }
}

export { generateAccessToken, verifyAccessToken };
