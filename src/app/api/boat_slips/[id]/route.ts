import { createNextHandler } from "@/api/next-handler";
import {
  deleteBoatSlip,
  getBoatSlipById,
  updateBoatSlip
} from "@/api/controllers/boat_slips_controller";

export const runtime = "nodejs";

export const GET = createNextHandler(getBoatSlipById);
export const PUT = createNextHandler(updateBoatSlip);
export const DELETE = createNextHandler(deleteBoatSlip);
