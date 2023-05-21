import { db } from 'dexie/db';
import { Skill } from 'dexie/models/Skill';

export async function bulkAdd(skills: Skill[]): Promise<string[]> {
  const ids = await db.skills.bulkAdd(skills, { allKeys: true });

  return ids.map((id) => id.toString());
}

export async function add({
  key,
  level,
  years,
  username,
  isAdditional,
}: Skill): Promise<string> {
  const id = await db.skills.add({
    key,
    level,
    years,
    username,
    isAdditional,
  });

  return id.toString();
}

export async function bulkUpsert(
  skills: Skill[],
  keys: string[],
): Promise<string[]> {
  const ids = await db.skills.bulkPut(skills, keys, { allKeys: true });

  return ids.map((id) => id.toString());
}

export async function upsert(skill: Skill, key: string): Promise<string> {
  const id = await db.skills.put(skill, key);

  return id.toString();
}

export async function get(id: string): Promise<Skill | undefined> {
  const skill = await db.skills.get(id);

  return skill;
}

export async function getAll(username: string): Promise<Skill[]> {
  const skills = await db.skills.where('username').equals(username).toArray();

  return skills;
}

export async function deleteOne(key: string): Promise<void> {
  await db.skills.delete(key);
}

export async function deleteAll(username: string): Promise<void> {
  const skills = await db.skills.where('username').equals(username).toArray();
  const keys = skills.map(skill => skill.key);
  await db.skills.bulkDelete(keys);
}

export async function count(username: string): Promise<number> {
  const number = await db.skills.count();
  return number;
}
