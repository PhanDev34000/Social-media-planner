import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  totalPosts: number = 0;
  brouillonCount: number = 0;
  planifieCount: number = 0;
  publieCount: number = 0;
  
  postsThisWeek: number = 0;
  lastPost?: Post;
  nextPost?: Post;
  
  private subscription?: Subscription;
  private posts: Post[] = [];

  constructor(
    private postService: PostService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.postService.posts$.subscribe(
      posts => {
        this.posts = posts;
        this.calculateStats();
        this.cdr.detectChanges();
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private calculateStats(): void {
    this.totalPosts = this.posts.length;
    
    // Compter par statut
    this.brouillonCount = this.posts.filter(p => p.status === 'brouillon').length;
    this.planifieCount = this.posts.filter(p => p.status === 'planifié').length;
    this.publieCount = this.posts.filter(p => p.status === 'publié').length;
    
    // Posts planifiés cette semaine
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    this.postsThisWeek = this.posts.filter(post => {
      const scheduledDate = new Date(post.scheduledDate);
      return post.status === 'planifié' && 
             scheduledDate >= now && 
             scheduledDate <= weekFromNow;
    }).length;
    
    // Dernier post créé
    const sortedByCreation = [...this.posts].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    this.lastPost = sortedByCreation[0];
    
    // Prochain post planifié
    const futurePosts = this.posts
      .filter(p => p.status === 'planifié' && new Date(p.scheduledDate) > now)
      .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
    
    this.nextPost = futurePosts[0];
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return "à l'instant";
    if (minutes < 60) return `il y a ${minutes} min`;
    if (hours < 24) return `il y a ${hours}h`;
    return `il y a ${days}j`;
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (d.toDateString() === now.toDateString()) {
      return `Aujourd'hui à ${d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
    }
    if (d.toDateString() === tomorrow.toDateString()) {
      return `Demain à ${d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
    }
    return d.toLocaleString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
}