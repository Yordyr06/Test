import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FightersService } from '../fighters.services';

@Component({
  selector: 'fighters-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fighters-form.component.html',
})
export class FightersFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = signal(false);
  fighterId = signal<string | null>(null);
  isActive = signal(true);
  pageTitle = computed(() => (this.isEditMode() ? 'Edit fighter' : 'Add fighter'));

  constructor(
    private fb: FormBuilder,
    private fightersService: FightersService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.fb.group({
      name: '',
      nickname: '',
      weightDivision: '',
      country: '',
      wins: 0,
      losses: 0,
      draws: 0,
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.fighterId.set(id);
    if (id) {
      this.isEditMode.set(true);
      const fighter = this.fightersService.getById(id);
      if (fighter) {
        this.form.patchValue(fighter);
        this.isActive.set(fighter.active);
      }
    }
  }

  onSubmit(): void {
    const value = { ...this.form.value, active: this.isActive() };
    const id = this.fighterId();

    if (this.isEditMode() && id) {
      this.fightersService.update(id, value);
    } else {
      this.fightersService.add(value);
    }

    this.router.navigate(['/fighters']);
  }

  onDisable(): void {
    const id = this.fighterId();
    if (!id) {
      return;
    }
    this.fightersService.disable(id);
    this.router.navigate(['/fighters']);
  }

  onEnable(): void {
    const id = this.fighterId();
    if (!id) {
      return;
    }
    this.fightersService.enable(id);
    this.router.navigate(['/fighters']);
  }

  cancel(): void {
    this.router.navigate(['/fighters']);
  }
}
