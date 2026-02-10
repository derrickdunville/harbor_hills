import { createNextHandler } from "@/api/next-handler";
import { createHome, getAllHomes } from "@/api/controllers/homes_controller";

export const runtime = "nodejs";

export const GET = createNextHandler(getAllHomes);
export const POST = createNextHandler(createHome);
