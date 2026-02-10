import { createNextHandler } from "@/api/next-handler";
import { createEvent, getAllEvents } from "@/api/controllers/events_controller";

export const runtime = "nodejs";

export const GET = createNextHandler(getAllEvents);
export const POST = createNextHandler(createEvent);
