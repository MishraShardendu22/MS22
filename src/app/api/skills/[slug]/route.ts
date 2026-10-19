import { type NextRequest, NextResponse } from "next/server";
import { fetchSkillRunbook } from "@/lib/agentSkills";

export const revalidate = 3600;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: "Missing skill slug" }, { status: 400 });
  }

  const runbook = await fetchSkillRunbook(slug);

  if (!runbook) {
    return NextResponse.json(
      { error: `Skill runbook not found for ${slug}` },
      { status: 404 },
    );
  }

  const isRaw =
    _req.nextUrl.searchParams.get("raw") === "true" ||
    _req.nextUrl.searchParams.get("format") === "raw" ||
    _req.nextUrl.searchParams.get("format") === "markdown";

  if (isRaw) {
    return new NextResponse(runbook.markdown, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  }

  return NextResponse.json(runbook, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
