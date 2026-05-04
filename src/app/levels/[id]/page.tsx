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

  const prev = levels.find((l) => l.id === level.id - 1);
  const next = levels.find((l) => l.id === level.id + 1);

  return (
    <LevelPageClient
      level={level}
      prevLevel={prev ? { id: prev.id, title: prev.title } : null}
      nextLevel={next ? { id: next.id, title: next.title } : null}
    />
  );
}
