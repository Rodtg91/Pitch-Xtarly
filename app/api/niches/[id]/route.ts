import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const niche = await prisma.pitchNiche.findUnique({
		where: { id },
		include: {
			pitches: {
				orderBy: { createdAt: "desc" },
				include: { _count: { select: { slides: true } } },
			},
		},
	});
	if (!niche) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
	return NextResponse.json(niche);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const body = await req.json();
	const niche = await prisma.pitchNiche.update({
		where: { id },
		data: {
			name: body.name,
			description: body.description,
			icon: body.icon,
			color: body.color,
		},
	});
	return NextResponse.json(niche);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	await prisma.pitchNiche.delete({ where: { id } });
	return new NextResponse(null, { status: 204 });
}
