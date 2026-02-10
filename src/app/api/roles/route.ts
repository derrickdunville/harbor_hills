import { createNextHandler } from "@/api/next-handler";
import { createRole, getAllRoles } from "@/api/controllers/roles_controller";

export const runtime = "nodejs";

export const GET = createNextHandler(getAllRoles);
export const POST = createNextHandler(createRole);
