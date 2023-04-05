import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Task } from 'src/app/Task';
import { TaskItemComponent } from './task-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
});
