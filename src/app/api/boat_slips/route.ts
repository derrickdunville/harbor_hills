import { createNextHandler } from "@/api/next-handler";
import {
  createBoatSlip,
  getAllBoatSlips
} from "@/api/controllers/boat_slips_controller";

export const runtime = "nodejs";

export const GET = createNextHandler(getAllBoatSlips);
export const POST = createNextHandler(createBoatSlip);
