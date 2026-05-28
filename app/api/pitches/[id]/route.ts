import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const pitch = await prisma.pitch.findUnique({
		where: { id },
		include: { niche: true },
	});
	if (!pitch) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
	return NextResponse.json(pitch);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const body = await req.json();

	const pitch = await prisma.pitch.update({
		where: { id },
		data: {
			title: body.title,
			isPublished: body.isPublished,
		},
		include: { niche: true },
	});
	return NextResponse.json(pitch);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	await prisma.pitch.delete({ where: { id } });
	return new NextResponse(null, { status: 204 });
}
