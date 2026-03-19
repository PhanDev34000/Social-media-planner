import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';


interface CalendarDay {
  date: Date;
  posts: Post[];
  isCurrentMonth: boolean;
  isToday: boolean;
}

@Component({
  selector: 'app-calendar-view',
  imports: [CommonModule],
  templateUrl: './calendar-view.html',
  styleUrl: './calendar-view.scss'
})
export class CalendarViewComponent implements OnInit, OnDestroy {
  currentDate: Date = new Date();
  calendarDays: CalendarDay[] = [];
  weekDays: string[] = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  
  private subscription?: Subscription;
  private posts: Post[] = [];

  constructor(private postService: PostService,
               private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
  this.subscription = this.postService.posts$.subscribe(
    posts => {
      console.log('📅 Calendar reçoit de nouveaux posts:', posts.length);
      this.posts = posts;
      this.generateCalendar();
      this.cdr.detectChanges(); // ← Ajouter cette ligne
    }
  );
  this.generateCalendar();
}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Jour de la semaine du 1er (0 = dimanche, 1 = lundi, etc.)
    let startDayOfWeek = firstDay.getDay();
    // Convertir pour que lundi = 0
    startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    
    this.calendarDays = [];
    
    // Jours du mois précédent
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      this.calendarDays.push({
        date,
        posts: this.getPostsForDate(date),
        isCurrentMonth: false,
        isToday: this.isToday(date)
      });
    }
    
    // Jours du mois actuel
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      this.calendarDays.push({
        date,
        posts: this.getPostsForDate(date),
        isCurrentMonth: true,
        isToday: this.isToday(date)
      });
    }
    
    // Jours du mois suivant
    const remainingDays = 42 - this.calendarDays.length; // 6 semaines
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      this.calendarDays.push({
        date,
        posts: this.getPostsForDate(date),
        isCurrentMonth: false,
        isToday: this.isToday(date)
      });
    }
  }

  getPostsForDate(date: Date): Post[] {
    return this.posts.filter(post => {
      const postDate = new Date(post.scheduledDate);
      return postDate.getDate() === date.getDate() &&
             postDate.getMonth() === date.getMonth() &&
             postDate.getFullYear() === date.getFullYear();
    });
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  previousMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  getMonthYear(): string {
    return this.currentDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
  }

  getStatusClass(status: 'brouillon' | 'planifié' | 'publié'): string {
    return `status-${status}`;
  }

  showPostDetails(post: Post): void {
    alert(`📱 ${post.content}\n\n📅 ${new Date(post.scheduledDate).toLocaleString('fr-FR')}\n\n📊 Statut: ${this.getStatusLabel(post.status)}`);
  }

  getStatusLabel(status: 'brouillon' | 'planifié' | 'publié'): string {
    const labels = {
      'brouillon': 'Brouillon',
      'planifié': 'Planifié',
      'publié': 'Publié'
    };
    return labels[status];
  }
}