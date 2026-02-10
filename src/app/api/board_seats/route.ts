import { createNextHandler } from "@/api/next-handler";
import {
  createBoardSeat,
  getAllBoardSeats
} from "@/api/controllers/board_seats_controller";

export const runtime = "nodejs";

export const GET = createNextHandler(getAllBoardSeats);
export const POST = createNextHandler(createBoardSeat);
