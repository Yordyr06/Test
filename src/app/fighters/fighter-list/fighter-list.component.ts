import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FightersService } from '../fighters.services';
import { FighterCardComponent } from '../fighter-card/fighter-card.component';

@Component({
  selector: 'fighter-list',
  imports: [CommonModule, RouterLink, FighterCardComponent],
  templateUrl: './fighter-list.component.html',
})
export class FighterListComponent {
  constructor(protected fightersService: FightersService) {}

  onDisable(id: string): void {
    this.fightersService.disable(id);
  }

  onEnable(id: string): void {
    this.fightersService.enable(id);
  }
}
