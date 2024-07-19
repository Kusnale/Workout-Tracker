import { TestBed } from '@angular/core/testing';
import { WorkoutService, Workout } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty workouts if no data in localStorage', () => {
    expect(service.getWorkouts()).toEqual([]);
  });

  it('should add a new workout and assign an ID', () => {
    const workout: Workout = { id: 0, username: 'John Doe', type: 'Running', minutes: 30 };
    service.addWorkout(workout);
    
    const workouts = service.getWorkouts();
    expect(workouts.length).toBe(1);
    expect(workouts[0].username).toBe('John Doe');
    expect(workouts[0].id).toBe(1); // ID should be 1 as it is the first workout added
  });

  it('should search workouts by username', () => {
    const workout1: Workout = { id: 1, username: 'John Doe', type: 'Running', minutes: 30 };
    const workout2: Workout = { id: 2, username: 'Jane Smith', type: 'Yoga', minutes: 45 };
    service.addWorkout(workout1);
    service.addWorkout(workout2);
    
    const result = service.searchWorkouts('john');
    expect(result.length).toBe(1);
    expect(result[0].username).toBe('John Doe');
  });

  it('should filter workouts by type', () => {
    const workout1: Workout = { id: 1, username: 'John Doe', type: 'Running', minutes: 30 };
    const workout2: Workout = { id: 2, username: 'Jane Smith', type: 'Yoga', minutes: 45 };
    service.addWorkout(workout1);
    service.addWorkout(workout2);
    
    const result = service.filterWorkouts('Yoga');
    expect(result.length).toBe(1);
    expect(result[0].type).toBe('Yoga');
  });

  it('should paginate workouts correctly', () => {
    for (let i = 1; i <= 15; i++) {
      service.addWorkout({ id: i, username: `User${i}`, type: 'Type', minutes: i });
    }
    
    const result = service.getPaginatedWorkouts(service.getWorkouts(), 2, 5);
    expect(result.length).toBe(5);
    expect(result[0].id).toBe(6); // Page 2, 1st item should be ID 6
  });

  it('should return workout progress data', () => {
    const progress = service.getWorkoutProgress('John Doe');
    expect(progress).toEqual([
      { date: '2023-07-01', minutes: 30 },
      { date: '2023-07-02', minutes: 45 },
      { date: '2023-07-03', minutes: 60 }
    ]);
  });
});
