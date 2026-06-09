import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/token.js";

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
      };
    }
  }
}

/**
 * Authentication middleware that verifies JWT token from HTTP-only cookie
 * Extracts token from req.cookies.token and validates it
 * Attaches decoded user info to req.user for downstream route handlers
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    // Extract token from HTTP-only cookie
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    // Verify token using existing utility function
    const decoded = verifyAccessToken(token);

    // Attach user info to request object for use in route handlers
    req.user = {
      id: decoded.id,
    };

    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }
};
