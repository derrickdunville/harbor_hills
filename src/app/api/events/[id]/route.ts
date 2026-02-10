import { createNextHandler } from "@/api/next-handler";
import {
  deleteEvent,
  getEventById,
  updateEvent
} from "@/api/controllers/events_controller";

export const runtime = "nodejs";

export const GET = createNextHandler(getEventById);
export const PUT = createNextHandler(updateEvent);
export const DELETE = createNextHandler(deleteEvent);
