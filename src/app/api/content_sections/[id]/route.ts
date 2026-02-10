import { createNextHandler } from "@/api/next-handler";
import {
  deleteContentSection,
  getContentSectionById,
  updateContentSection
} from "@/api/controllers/content_sections_controller";

export const runtime = "nodejs";

export const GET = createNextHandler(getContentSectionById);
export const PUT = createNextHandler(updateContentSection);
export const DELETE = createNextHandler(deleteContentSection);
