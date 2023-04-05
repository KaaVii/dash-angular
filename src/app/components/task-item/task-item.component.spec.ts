import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Task } from 'src/app/Task';
import { TaskItemComponent } from './task-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  const sampleTask: Task = {
    id: 1,
    text: 'Sample Task',
    day: 'Monday',
    reminder: true
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskItemComponent ],
      imports: [FontAwesomeModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = sampleTask;  
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onDeleteTask when onDelete is called', () => {
    const task: Task = { id: 1, text: 'Test task', day: '2022-01-01', reminder: false };
    spyOn(component.onDeleteTask, 'emit');
    component.onDelete(task);
    expect(component.onDeleteTask.emit).toHaveBeenCalledWith(task);
  });

  it('should emit onToggleReminder when onToggle is called', () => {
    const task: Task = { id: 1, text: 'Test task', day: '2022-01-01', reminder: false };
    spyOn(component.onToggleReminder, 'emit');
    component.onToggle(task);
    expect(component.onToggleReminder.emit).toHaveBeenCalledWith(task);
  });

  it('should display task properties', () => {
    const task: Task = { id: 1, text: 'Test task', day: '2022-01-01', reminder: false };
    component.task = task;
    fixture.detectChanges();
    const taskElement: HTMLElement = fixture.nativeElement.querySelector('.task');
    expect(taskElement.textContent).toContain(task.text);
    expect(taskElement.textContent).toContain(task.day);
  });

  it('should display reminder icon if task has reminder', () => {
    const task: Task = { id: 1, text: 'Test task', day: '2022-01-01', reminder: true };
    component.task = task;
    fixture.detectChanges();
    const reminderElement: HTMLElement = fixture.nativeElement.querySelector('.reminder');
    expect(reminderElement).toBeTruthy();
  });

  it('should not display reminder icon if task does not have reminder', () => {
    const task: Task = { id: 1, text: 'Test task', day: '2022-01-01', reminder: false };
    component.task = task;
    fixture.detectChanges();
    const reminderElement: HTMLElement = fixture.nativeElement.querySelector('.reminder');
    expect(reminderElement).toBeFalsy();
  });
});