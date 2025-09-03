import { Router } from "express";

import { DeliveryLogsController } from "@/controllers/deliveries-logs-controller";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const deliveryLogsRoutes = Router();
const deliveryLogsController = new DeliveryLogsController();

deliveryLogsRoutes.post("/",
  ensureAuthenticated,
  verifyUserAuthorization(["sales"]),
  deliveryLogsController.create);

  deliveryLogsRoutes.get("/:delivery_id",
  ensureAuthenticated,
  verifyUserAuthorization(["sales", "customer"]),
  deliveryLogsController.show);

export { deliveryLogsRoutes };