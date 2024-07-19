import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);
interface WorkoutData {
  date: string;
  minutes: number;
}

@Component({
  selector: 'app-workout-progress',
  templateUrl: './workout-progress.component.html',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
})
export class WorkoutProgressComponent implements OnInit {
  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Minutes',
        borderColor: '#3e95cd',
        fill: false,
      },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  constructor(
    public dialogRef: MatDialogRef<WorkoutProgressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { username: string; workoutData: { date: string; minutes: number }[] }
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.workoutData) {
      this.lineChartData.labels = this.data.workoutData.map(data => data.date);
      this.lineChartData.datasets[0].data = this.data.workoutData.map(data => data.minutes);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
