import { TestBed } from '@angular/core/testing';
import { UiService } from './ui.service';

describe('UiService', () => {
  let service: UiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially set showAddText to false', () => {
    expect(service['showAddText']).toBeFalse();
  });

  it('should toggle showAddText when toggleAddTask is called', () => {
    expect(service['showAddText']).toBeFalse();
    service.toggleAddTask();
    expect(service['showAddText']).toBeTrue();
    service.toggleAddTask();
    expect(service['showAddText']).toBeFalse();
  });

  it('should emit a value through the subject when toggleAddTask is called', (done: DoneFn) => {
    service.onToggle().subscribe((value: boolean) => {
      expect(value).toBeTrue();
      done();
    });
    service.toggleAddTask();
  });
});
