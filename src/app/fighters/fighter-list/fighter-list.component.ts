import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Fighter } from '../fighters.model';
import { FightersService } from '../fighters.services';
import { FighterCardComponent } from '../fighter-card/fighter-card.component';

@Component({
  selector: 'fighter-list',
  imports: [CommonModule, RouterLink, FighterCardComponent],
  templateUrl: './fighter-list.component.html',
})
export class FighterListComponent implements OnInit {
  fighters: Fighter[] = [];

  constructor(private fightersService: FightersService) {}

  ngOnInit(): void {
    this.loadFighters();
  }

  loadFighters(): void {
    this.fighters = this.fightersService.list();
  }

  onDisable(id: string): void {
    this.fightersService.disable(id);
    this.loadFighters();
  }

  onEnable(id: string): void {
    this.fightersService.enable(id);
    this.loadFighters();
  }
}
