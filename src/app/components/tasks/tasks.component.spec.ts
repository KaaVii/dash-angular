import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';
import { of } from 'rxjs';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let taskService: TaskService;  
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksComponent, TaskItemComponent, AddTaskComponent ],
      imports: [HttpClientTestingModule], // Add to imports array
      providers: [TaskService]
    })
    .compileComponents();
    taskService = TestBed.inject(TaskService);

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call taskService.getTasks on component initialization', () => {
    httpClientSpy.get.and.returnValue(of([]));
    const getTasksSpy = spyOn(taskService, 'getTasks').and.returnValue(httpClientSpy.get());

    component.ngOnInit();

    expect(getTasksSpy).toHaveBeenCalled();
  });

  it('should set tasks property with the response of taskService.getTasks', () => {
    const tasks: Task[] = [
      { id: 1, text: 'Task 1', day: '2023-04-05', reminder: true },
      { id: 2, text: 'Task 2', day: '2023-04-06', reminder: false },
    ];
    httpClientSpy.get.and.returnValue(of(tasks));
    spyOn(taskService, 'getTasks').and.returnValue(httpClientSpy.get());

    component.ngOnInit();

    expect(component.tasks).toEqual(tasks);
  });

  it('should call taskService.deleteTask when deleteTask is called', () => {
    const task: Task = { id: 1, text: 'Task 1', day: '2023-04-05', reminder: true };
    const deleteTaskSpy = spyOn(taskService, 'deleteTask').and.returnValue(of(task));
    component.tasks = [task];

    component.deleteTask(task);

    expect(deleteTaskSpy).toHaveBeenCalledWith(task);
  });

  it('should remove the deleted task from tasks array when deleteTask is called', () => {
    const task: Task = { id: 1, text: 'Task 1', day: '2023-04-05', reminder: true };
    spyOn(taskService, 'deleteTask').and.returnValue(of(task));
    component.tasks = [task];

    component.deleteTask(task);

    expect(component.tasks).not.toContain(task);
  });

  it('should call taskService.updateTaskReminder when toggleReminder is called', () => {
    const task: Task = { id: 1, text: 'Task 1', day: '2023-04-05', reminder: true };
    const updateTaskReminderSpy = spyOn(taskService, 'updateTaskReminder').and.returnValue(of(task));

    component.toggleReminder(task);

    expect(updateTaskReminderSpy).toHaveBeenCalledWith(task);
  });

  it('should update the task reminder when toggleReminder is called', () => {
    const task: Task = { id: 1, text: 'Task 1', day: '2023-04-05', reminder: true };
    spyOn(taskService, 'updateTaskReminder').and.returnValue(of(task));

    component.toggleReminder(task);

    expect(task.reminder).toBeFalse();
  });

  it('should call taskService.addTask when addTask is called', () => {
    const task: Task = { id: 1, text: 'Task 1', day: '2023-04-05', reminder: true };
    const addTaskSpy = spyOn(taskService, 'addTask').and.returnValue(of(task));
    
    component.addTask(task);
    
    expect(addTaskSpy).toHaveBeenCalled();
  });
  
  it('should add the task to the tasks array when addTask is called', () => {
    const task: Task = { id: 1, text: 'Task 1', day: '2023-04-05', reminder: true };
    spyOn(taskService, 'addTask').and.returnValue(of(task));
    
    component.addTask(task);
    
    expect(component.tasks).toContain(task);
  });
  
  
});
