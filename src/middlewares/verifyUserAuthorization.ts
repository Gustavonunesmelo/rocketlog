import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

function verifyUserAuthorization(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      throw new AppError("User not authenticated", 401);
    }

    if (!roles.includes(user.role)) {
      throw new AppError("User does not have permission to perform this action", 403);
    }

    return next();
  };
}

export { verifyUserAuthorization };