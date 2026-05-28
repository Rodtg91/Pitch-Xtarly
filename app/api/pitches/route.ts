import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const nicheId = searchParams.get("nicheId");

	const pitches = await prisma.pitch.findMany({
		where: nicheId ? { nicheId } : undefined,
		include: {
			niche: { select: { id: true, name: true, icon: true, color: true } },
			_count: { select: { slides: true } },
		},
		orderBy: { createdAt: "desc" },
	});
	return NextResponse.json(pitches);
}

export async function POST(req: Request) {
	const body = await req.json();
	const { title, nicheId } = body as { title: string; nicheId: string };

	if (!title?.trim() || !nicheId) {
		return NextResponse.json({ error: "Título y nicho requeridos" }, { status: 400 });
	}

	const pitch = await prisma.pitch.create({
		data: { title: title.trim(), nicheId },
		include: { niche: true },
	});
	return NextResponse.json(pitch, { status: 201 });
}
