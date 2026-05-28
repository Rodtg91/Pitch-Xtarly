import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
	const niches = await prisma.pitchNiche.findMany({
		include: { _count: { select: { pitches: true } } },
		orderBy: { createdAt: "asc" },
	});
	return NextResponse.json(niches);
}

export async function POST(req: Request) {
	const body = await req.json();
	const { name, description, icon, color } = body as {
		name: string;
		description?: string;
		icon?: string;
		color?: string;
	};

	if (!name?.trim()) {
		return NextResponse.json({ error: "Nombre requerido" }, { status: 400 });
	}

	const niche = await prisma.pitchNiche.create({
		data: { name: name.trim(), description, icon, color },
	});
	return NextResponse.json(niche, { status: 201 });
}
