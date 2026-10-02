import { readFile } from "fs/promises";
import path from "path";

// Serves the static recruiter-facing page public/architecture.html at /architecture
export async function GET() {
  const html = await readFile(path.join(process.cwd(), "public", "architecture.html"), "utf8");

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
