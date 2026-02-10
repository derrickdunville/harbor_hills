import { createNextHandler } from "@/api/next-handler";
import {
  createContentSection,
  getAllContentSections
} from "@/api/controllers/content_sections_controller";

export const runtime = "nodejs";

export const GET = createNextHandler(getAllContentSections);
export const POST = createNextHandler(createContentSection);
