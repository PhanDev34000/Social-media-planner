import { Component, OnInit } from '@angular/core';
import { PostFormComponent } from './components/post-form/post-form';
import { PostListComponent } from './components/post-list/post-list';
import { CalendarViewComponent } from './components/calendar-view/calendar-view';
import { NotificationService } from './services/notification.service';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle';
import { DashboardComponent } from './components/dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [PostListComponent, CalendarViewComponent, ThemeToggleComponent, DashboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit {
  title = 'Social Planner';

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // Démarrer le monitoring des notifications
    this.notificationService.startMonitoring();
  }
}