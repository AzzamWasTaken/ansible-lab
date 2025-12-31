import { NextResponse } from "next/server";
import os from "os";

export async function GET() {
  const hostname = process.env.SERVER_ID || os.hostname();

  return NextResponse.json({
    server: hostname,
    timestamp: new Date().toISOString(),
  });
}
