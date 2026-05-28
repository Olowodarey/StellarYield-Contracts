import type { Request, Response, NextFunction } from "express";
import { UserService } from "../../services/user.js";

const userService = new UserService();

export async function getAdminStats(_req: Request, res: Response, next: NextFunction) {
  try {
    const totalUsers = await userService.countUsers();
    res.json({ totalUsers });
  } catch (err) {
    next(err);
  }
}
