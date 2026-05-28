import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const pitch = await prisma.pitch.findUnique({
		where: { publicSlug: slug },
		include: {
			niche: { select: { name: true, icon: true, color: true } },
			slides: { orderBy: { order: "asc" } },
		},
	});
	if (!pitch) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
	return NextResponse.json(pitch);
}
