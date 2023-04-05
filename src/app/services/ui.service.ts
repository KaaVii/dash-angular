import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UiService {

  private showAddText: boolean = false;
  private subject: Subject<any> = new Subject<any>

  constructor() {}
  toggleAddTask(): void { 
    this.showAddText = !this.showAddText;
    this.subject.next(this.showAddText)
  }

  onToggle(): Observable<any> { 
    return this.subject.asObservable();
  }

}
