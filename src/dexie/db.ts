import Dexie, { Table } from 'dexie';
import { Skill } from './models/Skill';

export class ArtemisDB extends Dexie {
  skills!: Table<Skill>;

  constructor() {
    super('artemisDB');

    this.version(1).stores({
      skills: '++, key, level, years, username, isAdditional',
    });
  }
}

export const db = new ArtemisDB();
