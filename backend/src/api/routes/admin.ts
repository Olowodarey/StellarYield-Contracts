import { Router } from "express";
import { getAdminStats } from "../controllers/admin.js";

export const adminRouter = Router();

adminRouter.get("/stats", getAdminStats);
