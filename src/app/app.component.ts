import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, WorkoutFormComponent, WorkoutListComponent],
})
export class AppComponent {}
