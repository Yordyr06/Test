import { Fighter } from './fighters/fighters.model';

export function getFighterRecord(fighter: Fighter): string {
  return `${fighter.wins}-${fighter.losses}-${fighter.draws}`;
}

export function getStatusLabel(fighter: Fighter): string {
  return fighter.active ? 'Active' : 'Inactive';
}
