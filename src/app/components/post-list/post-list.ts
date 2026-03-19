import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { PostCardComponent } from '../post-card/post-card';
import { PostFormComponent } from '../post-form/post-form';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule, PostCardComponent, PostFormComponent, FormsModule],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss'
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private subscription?: Subscription;

  constructor(
    private postService: PostService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  // S'abonner aux changements de posts
  this.subscription = this.postService.posts$.subscribe(
    posts => {
      console.log('🔄 PostList reçoit de nouveaux posts:', posts.length);
      this.posts = [...posts].sort((a, b) => 
        new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
      );
      this.applyFilters(); // Appliquer les filtres
      this.cdr.detectChanges();
    }
  );
}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onDeletePost(id: string): void {
    this.postService.deletePost(id);
  }

  onStatusChange(event: {id: string, status: 'brouillon' | 'planifié' | 'publié'}): void {
    this.postService.changeStatus(event.id, event.status);
  }

  postToEdit?: Post;
  // Filtres
    filters = {
      brouillon: true,
      planifie: true,
      publie: true
    };

    filteredPosts: Post[] = [];

  onEditPost(post: Post): void {
    this.postToEdit = post;
    // Scroll vers le haut pour voir le formulaire
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onEditComplete(): void {
    this.postToEdit = undefined;
  }

  applyFilters(): void {
  // Si aucun filtre actif, n'afficher RIEN
  const hasActiveFilter = this.filters.brouillon || this.filters.planifie || this.filters.publie;
  
  if (!hasActiveFilter) {
    this.filteredPosts = [];  // ← Changé ici : liste vide au lieu de tout afficher
    return;
  }

  // Filtrer selon les cases cochées
  this.filteredPosts = this.posts.filter(post => {
    // Mapper le statut avec accent vers la clé sans accent
    const statusKey = post.status === 'planifié' ? 'planifie' : 
                      post.status === 'publié' ? 'publie' : 
                      'brouillon';
    return this.filters[statusKey];
    });
  }

  onFilterChange(): void {
    this.applyFilters();
  }
}