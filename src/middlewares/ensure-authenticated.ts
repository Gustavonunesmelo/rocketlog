import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";

interface TokenPayload {
  sub: string;
  role: string;
}

// Add the "export" keyword here
export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub, role } = verify(token, authConfig.jwt.secret) as TokenPayload;

    req.user = {
      id: sub,
      role,
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT token", 401);
  }
}
