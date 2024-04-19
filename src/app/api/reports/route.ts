import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://jsonplaceholder.typicode.com"; // This is a dummy API

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pgNumber = searchParams.get("pgNumber");
  const pgSize = searchParams.get("pgSize");

  const res = await fetch(
    BASE_URL + `/posts?_page=${pgNumber}&_limit=${pgSize}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const reportDetails = await res.json();

  return NextResponse.json({ reportDetails });
}
