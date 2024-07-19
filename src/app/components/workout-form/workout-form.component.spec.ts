import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutFormComponent } from './workout-form.component';
import { WorkoutService } from '../../services/workout.service';
import { of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let workoutService: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
    const workoutServiceSpy = jasmine.createSpyObj('WorkoutService', ['addWorkout']);

    await TestBed.configureTestingModule({
      declarations: [WorkoutFormComponent],
      imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
      ],
      providers: [
        { provide: WorkoutService, useValue: workoutServiceSpy }
      ]
    }).compileComponents();

    workoutService = TestBed.inject(WorkoutService) as jasmine.SpyObj<WorkoutService>;

    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addWorkout on WorkoutService and reset form fields', () => {
    // Arrange
    component.username = 'John Doe';
    component.type = 'Running';
    component.minutes = 30;

    // Act
    component.addWorkout();

    // Assert
    expect(workoutService.addWorkout).toHaveBeenCalledWith({
      id: 0,
      username: 'John Doe',
      type: 'Running',
      minutes: 30
    });
    expect(component.username).toBe('');
    expect(component.type).toBe('');
    expect(component.minutes).toBe(0);
  });
});
