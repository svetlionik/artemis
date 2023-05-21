import { deleteAll } from 'dexie/repositories/skills.repository';

const deleteSavedSkills = async (): Promise<void> => {
  const username = localStorage.getItem('username');

  if (username) {
    await deleteAll(username);
  }
};

export default deleteSavedSkills;
