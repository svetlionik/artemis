import { Skill } from 'dexie/models/Skill';
import { getAll } from 'dexie/repositories/skills.repository';

const loadSavedSkills = async (): Promise<Skill[] | null> => {
  const username = localStorage.getItem('username');

  let savedSkills: Skill[] | null = null;

  if (username) {
    savedSkills = await getAll(username);
  }

  return savedSkills;
};

export default loadSavedSkills;
