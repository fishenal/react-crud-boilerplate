// demo mock player api
import { NextResponse } from "next/server";
import { promises as fs } from "fs";

export async function GET(request: Request) {
  const file = await fs.readFile(
    process.cwd() + "/src/data/squadsData.json",
    "utf8"
  );
  return NextResponse.json(JSON.parse(file));
}

export async function POST(request: Request) {
  return {
    req: "post",
  };
}

export async function PUT(request: Request) {
  return {
    req: "put",
  };
}

export async function DELETE(request: Request) {
  return {
    req: "delete",
  };
}
