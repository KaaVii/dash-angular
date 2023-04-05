import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddTaskComponent } from '../add-task/add-task.component';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksComponent, TaskItemComponent, AddTaskComponent ],
      imports: [HttpClientTestingModule], // Add to imports array
    })
    .compileComponents();
    

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
