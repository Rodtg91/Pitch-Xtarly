import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generatePitchSlides } from "@/lib/ai-generate";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id: pitchId } = await params;
	const body = await req.json();
	const { nicheName, customInstructions } = body as {
		nicheName: string;
		customInstructions?: string;
	};

	if (!nicheName) {
		return NextResponse.json({ error: "nicheName requerido" }, { status: 400 });
	}

	// Delete existing slides first
	await prisma.pitchSlide.deleteMany({ where: { pitchId } });

	const generated = await generatePitchSlides(nicheName, customInstructions);

	const slides = await prisma.$transaction(
		generated.map((s) =>
			prisma.pitchSlide.create({
				data: {
					pitchId,
					type: s.type,
					order: s.order,
					content: s.content as object,
				},
			}),
		),
	);

	return NextResponse.json(slides);
}
