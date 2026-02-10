import { createNextHandler } from "@/api/next-handler";
import {
  deleteUser,
  getUserById,
  updateUser
} from "@/api/controllers/users_controller";

export const runtime = "nodejs";

export const GET = createNextHandler(getUserById);
export const PUT = createNextHandler(updateUser);
export const DELETE = createNextHandler(deleteUser);
