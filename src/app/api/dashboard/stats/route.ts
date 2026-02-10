import { createNextHandler } from "@/api/next-handler";
import { getDashboardStats } from "@/api/controllers/dashboard_controller";

export const runtime = "nodejs";

export const GET = createNextHandler(getDashboardStats);
