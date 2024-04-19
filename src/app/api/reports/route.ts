import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://jsonplaceholder.typicode.com"; // This is a dummy API
const CACHE_EXPIRATION = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

// In-memory cache for place details
const cache = new Map<string, any>();

function isValidPageNumber(pgNumber: string | null): boolean {
  // Validate pgNumber (e.g., ensure it's a positive integer)
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

    const cacheKey = `${pgNumber}-${pgSize}`;

    // Check if the data is present in the cache
    if (cache.has(cacheKey)) {
      return NextResponse.json({ reportDetails: cache.get(cacheKey) });
    }

    // Fetch data if not in cache
    const reportDetails = await fetchData(pgNumber, pgSize);

    // Store the fetched data in the cache
    cache.set(cacheKey, reportDetails);
    setTimeout(() => cache.delete(cacheKey), CACHE_EXPIRATION); // Cache expiration

    return NextResponse.json({ reportDetails });
  } catch (error) {
    console.error("Error:", (error as Error).message);
    return NextResponse.error();
  }
}
