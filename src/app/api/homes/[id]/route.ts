import { createNextHandler } from "@/api/next-handler";
import {
  deleteHome,
  getHomeById,
  updateHome
} from "@/api/controllers/homes_controller";

export const runtime = "nodejs";

export const GET = createNextHandler(getHomeById);
export const PUT = createNextHandler(updateHome);
export const DELETE = createNextHandler(deleteHome);
