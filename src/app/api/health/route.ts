import { NextResponse } from "next/server";

export const runtime = "nodejs";

export const GET = async () => {
  return NextResponse.json({ status: "OK", message: "Server is healthy" });
};
