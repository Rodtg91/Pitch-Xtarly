import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id: pitchId } = await params;
	const slides = await prisma.pitchSlide.findMany({
		where: { pitchId },
		orderBy: { order: "asc" },
	});
	return NextResponse.json(slides);
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id: pitchId } = await params;
	const body = await req.json();

	// Reorder: array of { id, order }
	if (Array.isArray(body.reorder)) {
		await Promise.all(
			(body.reorder as { id: string; order: number }[]).map(({ id, order }) =>
				prisma.pitchSlide.update({ where: { id }, data: { order } }),
			),
		);
		const slides = await prisma.pitchSlide.findMany({
			where: { pitchId },
			orderBy: { order: "asc" },
		});
		return NextResponse.json(slides);
	}

	// Create new slide
	const { type, content, order } = body as {
		type: string;
		content: unknown;
		order?: number;
	};

	const maxOrder = await prisma.pitchSlide.aggregate({
		where: { pitchId },
		_max: { order: true },
	});

	const slide = await prisma.pitchSlide.create({
		data: {
			pitchId,
			type,
			content: content as object,
			order: order ?? (maxOrder._max.order ?? 0) + 1,
		},
	});
	return NextResponse.json(slide, { status: 201 });
}
