import { LevelContent } from "@/types/content";
import { level0 } from "./level-0";
import { level1 } from "./level-1";
import { level2 } from "./level-2";
import { level3 } from "./level-3";
import { level4 } from "./level-4";
import { level5 } from "./level-5";
import { level6 } from "./level-6";
import { level7 } from "./level-7";
import { level8 } from "./level-8";
import { level9 } from "./level-9";

export const levels: LevelContent[] = [
  level0, level1, level2, level3, level4,
  level5, level6, level7, level8, level9,
];

export function getLevelById(id: number): LevelContent | undefined {
  return levels.find((l) => l.id === id);
}
