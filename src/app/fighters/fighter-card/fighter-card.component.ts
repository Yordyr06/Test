import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Fighter } from '../fighters.model';
import { getFighterRecord, getStatusLabel } from '../../utils';

@Component({
  selector: 'fighter-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './fighter-card.component.html',
})
export class FighterCardComponent {
  fighter = input.required<Fighter>();
  disable = output<string>();
  enable = output<string>();

  getRecord(): string {
    return getFighterRecord(this.fighter());
  }

  getStatus(): string {
    return getStatusLabel(this.fighter());
  }

  onDisable(): void {
    this.disable.emit(this.fighter().id);
  }

  onEnable(): void {
    this.enable.emit(this.fighter().id);
  }
}
