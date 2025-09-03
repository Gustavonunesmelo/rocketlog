import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { AppError } from "@/utils/AppError";

class DeliveryLogsController {
  async create(req: Request, res: Response) {
     const bodySchema = z.object({
      description: z.string(),
      delivery_id: z.string().uuid(),
    });

    const { delivery_id, description } = bodySchema.parse(req.body);

    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
    });

    if (!delivery) {
      throw new AppError("Delivery not found", 404);
    }

    if(delivery.status === "PENDING") {
      throw new AppError("change status to shipped");
    } 

    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description,
      },
    });

    return res.status(201).json();
  }

  async show(req: Request, res: Response) {
    const paramsSchema = z.object({
      delivery_id: z.string().uuid(),
    });
    const { delivery_id } = paramsSchema.parse(req.params);

    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
      include: { 
        DeliveryLog: true,
        user: true
      },
    });

    if (req.user?.role === "customer" && req.user.id !== delivery?.userId) {
      throw new AppError("the user can only view their own deliveries", 401);
    }

    return res.json(delivery);
  }
}

export { DeliveryLogsController };