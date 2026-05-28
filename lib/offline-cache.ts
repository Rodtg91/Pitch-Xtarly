"use client";

import { openDB, type DBSchema, type IDBPDatabase } from "idb";

interface PitchDB extends DBSchema {
	pitches: {
		key: string;
		value: {
			id: string;
			title: string;
			nicheId: string;
			publicSlug: string;
			isPublished: boolean;
			slides: {
				id: string;
				order: number;
				type: string;
				content: unknown;
			}[];
			cachedAt: number;
		};
	};
}

let dbPromise: Promise<IDBPDatabase<PitchDB>> | null = null;

function getDB() {
	if (!dbPromise) {
		dbPromise = openDB<PitchDB>("xtarly-pitch", 1, {
			upgrade(db) {
				db.createObjectStore("pitches", { keyPath: "id" });
			},
		});
	}
	return dbPromise;
}

export async function cachePitch(pitchId: string): Promise<void> {
	const [pitchRes, slidesRes] = await Promise.all([
		fetch(`/api/pitches/${pitchId}`),
		fetch(`/api/pitches/${pitchId}/slides`),
	]);

	if (!pitchRes.ok || !slidesRes.ok) {
		throw new Error("No se pudo obtener la presentación");
	}

	const pitch = await pitchRes.json();
	const slides = await slidesRes.json();

	const db = await getDB();
	await db.put("pitches", { ...pitch, slides, cachedAt: Date.now() });
}

export async function getCachedPitch(pitchId: string) {
	const db = await getDB();
	return db.get("pitches", pitchId);
}

export async function getCachedPitchBySlug(slug: string) {
	const db = await getDB();
	const all = await db.getAll("pitches");
	return all.find((p) => p.publicSlug === slug) ?? null;
}

export async function removeCachedPitch(pitchId: string) {
	const db = await getDB();
	await db.delete("pitches", pitchId);
}

export async function listCachedPitches() {
	const db = await getDB();
	return db.getAll("pitches");
}
