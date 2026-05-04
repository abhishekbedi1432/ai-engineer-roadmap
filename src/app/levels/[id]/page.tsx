import { levels, getLevelById } from "@/content/levels";
import { notFound } from "next/navigation";
import { LevelPageClient } from "./LevelPageClient";

export function generateStaticParams() {
  return levels.map((l) => ({ id: String(l.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const level = getLevelById(Number(id));
  return {
    title: level ? `Level ${level.id}: ${level.title}` : "Level Not Found",
  };
}

export default async function LevelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const level = getLevelById(Number(id));
  if (!level) notFound();
  return <LevelPageClient level={level} />;
}
