import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'fighters', pathMatch: 'full' },
  {
    path: 'fighters',
    loadComponent: () =>
      import('./fighters/fighter-list/fighter-list.component').then((m) => m.FighterListComponent),
  },
];
