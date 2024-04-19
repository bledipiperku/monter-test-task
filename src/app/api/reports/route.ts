import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://jsonplaceholder.typicode.com"; // This is a dummy API

function isValidPageNumber(pgNumber: string | null): boolean {
  // Validate pgNumber is a positive integer
  return pgNumber !== null && /^\d+$/.test(pgNumber) && parseInt(pgNumber) > 0;
}

async function fetchData(pgNumber: string, pgSize: string): Promise<any> {
  const res = await fetch(
    `${BASE_URL}/posts?_page=${pgNumber}&_limit=${pgSize}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
  }

  return await res.json();
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let pgNumber = searchParams.get("pgNumber");
    let pgSize = searchParams.get("pgSize");

    // Input validation and default values
    pgNumber = isValidPageNumber(pgNumber) ? pgNumber : "1";
    pgNumber = pgNumber ?? "1";
    pgSize = pgSize && /^\d+$/.test(pgSize) ? pgSize : "10";

    const reportDetails = await fetchData(pgNumber, pgSize);

    return NextResponse.json({ reportDetails });
  } catch (error) {
    console.error("Error:", (error as Error).message);
    return NextResponse.error();
  }
}
