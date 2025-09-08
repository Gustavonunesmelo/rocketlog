import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../utils/AppError";
import { hash } from "bcrypt";
import { z } from "zod";

class UsersController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().min(2).max(50).trim(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = bodySchema.parse(req.body);

    const userWithSameEmail = await prisma.user.findFirst({
      where: { email }
    });

    if (userWithSameEmail) {
      throw new AppError("User with this email already exists");
    }

    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json(userWithoutPassword);
  }
}

export { UsersController };