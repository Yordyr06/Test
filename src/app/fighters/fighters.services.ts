import { Injectable } from '@angular/core';
import { Fighter } from './fighters.model';
import { FIGHTERS_SEED } from './fighters.seed';

const STORAGE_KEY = 'ufc-fighters';

@Injectable({
  providedIn: 'root',
})
export class FightersService {
  constructor() {
    this.initStorage();
  }

  private initStorage(): void {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(FIGHTERS_SEED));
    }
  }

  private getAll(): Fighter[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveAll(fighters: Fighter[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fighters));
  }

  list(): Fighter[] {
    return this.getAll();
  }

  getById(id: string): Fighter | undefined {
    return this.getAll().find((f) => f.id === id);
  }

  add(fighter: Omit<Fighter, 'id'>): void {
    const fighters = this.getAll();
    const newFighter: Fighter = {
      ...fighter,
      id: (fighters.length + 1).toString(),
    };
    fighters.push(newFighter);
    this.saveAll(fighters);
  }

  update(id: string, changes: Omit<Fighter, 'id'>): void {
    const fighters = this.getAll();
    const index = fighters.findIndex((f) => f.id === id);
    if (index < 0) {
      return;
    }
    fighters[index] = { ...changes, id };
    this.saveAll(fighters);
  }

  disable(id: string): void {
    const fighters = this.getAll();
    const index = fighters.findIndex((f) => f.id === id);
    if (index < 0) {
      return;
    }
    fighters[index].active = false;
    this.saveAll(fighters);
  }

  enable(id: string): void {
    const fighters = this.getAll();
    const index = fighters.findIndex((f) => f.id === id);
    if (index < 0) {
      return;
    }
    fighters[index].active = true;
    this.saveAll(fighters);
  }
}
