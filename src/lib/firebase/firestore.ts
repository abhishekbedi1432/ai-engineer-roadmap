import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./config";
import { LevelProgress, LevelNotes } from "@/types/user";

export async function getProgress(uid: string, levelId: number): Promise<LevelProgress | null> {
  const ref = doc(db, "users", uid, "progress", String(levelId));
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as LevelProgress) : null;
}

export async function getAllProgress(uid: string): Promise<LevelProgress[]> {
  const ref = collection(db, "users", uid, "progress");
  const snap = await getDocs(ref);
  return snap.docs.map((d) => d.data() as LevelProgress);
}

export async function saveProgress(uid: string, progress: LevelProgress): Promise<void> {
  const ref = doc(db, "users", uid, "progress", String(progress.levelId));
  await setDoc(ref, progress, { merge: true });
}

export async function getNotes(uid: string, levelId: number): Promise<LevelNotes | null> {
  const ref = doc(db, "users", uid, "notes", String(levelId));
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as LevelNotes) : null;
}

export async function saveNotes(uid: string, notes: LevelNotes): Promise<void> {
  const ref = doc(db, "users", uid, "notes", String(notes.levelId));
  await setDoc(ref, { ...notes, updatedAt: new Date() }, { merge: true });
}
