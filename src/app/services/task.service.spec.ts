import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task } from '../Task';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTasks', () => {
    it('should return an Observable of Task[]', () => {
      const dummyTasks: Task[] = [
        { id: 1, text: 'Task 1', day: 'test', reminder: false },
        { id: 2, text: 'Task 2', day: 'test', reminder: true }
      ];

      service.getTasks().subscribe(tasks => {
        expect(tasks.length).toBe(2);
        expect(tasks).toEqual(dummyTasks);
      });

      const req = httpMock.expectOne(service.apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(dummyTasks);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task and return an Observable of Task', () => {
      const dummyTask: Task = { id: 1, text: 'Task 1', day: 'test', reminder: false };

      service.deleteTask(dummyTask).subscribe(task => {
        expect(task).toEqual(dummyTask);
      });

      const req = httpMock.expectOne(`${service.apiUrl}/${dummyTask.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(dummyTask);
    });
  });

  describe('updateTaskReminder', () => {
    it('should update a task reminder and return an Observable of Task', () => {
      const dummyTask: Task = { id: 1, text: 'Task 1', day: 'test', reminder: false };

      service.updateTaskReminder(dummyTask).subscribe(task => {
        expect(task.reminder).toBe(false);
      });

      const req = httpMock.expectOne(`${service.apiUrl}/${dummyTask.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush({ ...dummyTask, reminder: false });
    });
  });

  describe('addTask', () => {
    it('should add a task and return an Observable of Task', () => {
      const dummyTask: Task = { id: 1, text: 'Task 1', day: 'test', reminder: false };

      service.addTask(dummyTask).subscribe(task => {
        expect(task.id).toBeDefined();
        expect(task.text).toBe(dummyTask.text);
        expect(task.day).toBe(dummyTask.day);
        expect(task.reminder).toBe(dummyTask.reminder);
      });

      const req = httpMock.expectOne(service.apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush({ ...dummyTask, id: 1 });
    });
  });

});
