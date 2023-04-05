import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title: string = 'Task Tracker';
  showAddTask!: boolean;
  subscription!: Subscription;

  constructor(private uiServices: UiService) {
    this.subscription = this.uiServices.onToggle().subscribe((
      value => this.showAddTask = value
    ));

  }

  ngOnInit(): void {

  }

  toggleAddTask() {
    this.uiServices.toggleAddTask();
  }

}
