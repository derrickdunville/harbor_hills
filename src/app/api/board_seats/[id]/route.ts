import { createNextHandler } from "@/api/next-handler";
import {
  deleteBoardSeat,
  getBoardSeatById,
  updateBoardSeat
} from "@/api/controllers/board_seats_controller";

export const runtime = "nodejs";

export const GET = createNextHandler(getBoardSeatById);
export const PUT = createNextHandler(updateBoardSeat);
export const DELETE = createNextHandler(deleteBoardSeat);
