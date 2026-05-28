import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ id: string; slideId: string }> },
) {
	const { slideId } = await params;
	const body = await req.json();

	const slide = await prisma.pitchSlide.update({
		where: { id: slideId },
		data: { content: body.content as object, type: body.type },
	});
	return NextResponse.json(slide);
}

export async function DELETE(
	_req: Request,
	{ params }: { params: Promise<{ id: string; slideId: string }> },
) {
	const { slideId } = await params;
	await prisma.pitchSlide.delete({ where: { id: slideId } });
	return new NextResponse(null, { status: 204 });
}
