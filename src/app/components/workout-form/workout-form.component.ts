import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class WorkoutFormComponent {
  username = '';
  type = '';
  minutes = 0;

  constructor(private workoutService: WorkoutService) {}

  addWorkout(): void {
    this.workoutService.addWorkout({
      id: 0,
      username: this.username,
      type: this.type,
      minutes: this.minutes,
    });
    this.username = '';
    this.type = '';
    this.minutes = 0;
  }
}
