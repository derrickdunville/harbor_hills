import { createNextHandler } from "@/api/next-handler";
import { createUser, getAllUsers } from "@/api/controllers/users_controller";

export const runtime = "nodejs";

export const GET = createNextHandler(getAllUsers);
export const POST = createNextHandler(createUser);
