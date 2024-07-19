import { Injectable } from '@angular/core';

export interface Workout {
  id: number;
  username: string;
  type: string;
  minutes: number;
}


@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workouts: Workout[] = [];

  constructor() {
    this.loadWorkouts();
  }

  getWorkouts(): Workout[] {
    return this.workouts;
  }


  addWorkout(workout: Workout): void {
    workout.id = this.workouts.length ? Math.max(...this.workouts.map(w => w.id)) + 1 : 1;
    this.workouts.push(workout);
    this.saveWorkouts();
  }

  searchWorkouts(username: string): Workout[] {
    return this.workouts.filter(w => w.username.toLowerCase().includes(username.toLowerCase()));
  }

  filterWorkouts(type: string): Workout[] {
    return type ? this.workouts.filter(w => w.type === type) : this.workouts;
  }

  private saveWorkouts(): void {
    localStorage.setItem('workouts', JSON.stringify(this.workouts));
  }

  private loadWorkouts(): void {
    const workouts = localStorage.getItem('workouts');
    if (workouts) {
      this.workouts = JSON.parse(workouts);
    }
  }
  getPaginatedWorkouts(workouts: Workout[], page: number, pageSize: number): Workout[] {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return workouts.slice(start, end);
  }
  getWorkoutProgress(username: string): { date: string; minutes: number }[] {
    // Example data, replace with your logic
    return [
      { date: '2023-07-01', minutes: 30 },
      { date: '2023-07-02', minutes: 45 },
      { date: '2023-07-03', minutes: 60 },
    ];
  }
}
