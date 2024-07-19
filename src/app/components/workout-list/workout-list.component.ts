import { Component, OnInit } from '@angular/core';
import { WorkoutService, Workout } from '../../services/workout.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WorkoutProgressComponent } from '../../workout-progress/workout-progress.component';

interface DemoUser {
  id: number;
  username: string;
  type: string;
  minutes: number;
}

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule
  ],
})
export class WorkoutListComponent implements OnInit {
  workouts: Workout[] = [];
  filteredWorkouts: Workout[] = [];
  search = '';
  filter = '';
  currentPage = 1;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 15];

  constructor(private workoutService: WorkoutService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.workouts.push(...this.getDemoUsers());
    this.workouts = this.workouts.concat(this.workoutService.getWorkouts());
    this.applyFilters();
  }

  getDemoUsers(): DemoUser[] {
    return [
      { id:1, username: 'John Doe', type: 'Running', minutes: 30 },
      { id:2, username: 'Jane Smith', type: 'Yoga', minutes: 45 },
      { id:3, username: 'Michael Brown', type: 'Strength Training', minutes: 60 },
    ];
  }

  searchWorkouts(): void {
    this.applyFilters();
  }

  filterWorkouts(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = this.workoutService.searchWorkouts(this.search);
    filtered = this.workoutService.filterWorkouts(this.filter);
    this.filteredWorkouts = this.workoutService.getPaginatedWorkouts(filtered, this.currentPage, this.pageSize);
  }

  handlePageEvent(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.applyFilters();
  }
  showWorkoutProgress(username: string): void {
    const workoutData = this.workoutService.getWorkoutProgress(username);
    this.dialog.open(WorkoutProgressComponent, {
      data: { username, workoutData }
    });
  }
}
