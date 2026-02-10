import { createNextHandler } from "@/api/next-handler";
import { getContentSectionByKey } from "@/api/controllers/content_sections_controller";

export const runtime = "nodejs";

export const GET = createNextHandler(getContentSectionByKey);
