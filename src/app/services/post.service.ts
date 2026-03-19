import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postsSubject = new BehaviorSubject<Post[]>([]);
  public posts$: Observable<Post[]> = this.postsSubject.asObservable();

  constructor() {
    // Charger les posts depuis localStorage au démarrage
    this.loadPostsFromStorage();
  }

  // CREATE - Créer un nouveau post
  createPost(content: string, scheduledDate: Date, imagePreview?: string): Post {
    const newPost: Post = {
      id: this.generateId(),
      content,
      scheduledDate,
      status: 'brouillon',
      imagePreview,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.posts.push(newPost);
    this.saveToStorage();
    this.postsSubject.next([...this.posts]);;
    return newPost;
  }

  // READ - Récupérer tous les posts
  getAllPosts(): Post[] {
    return [...this.posts];
  }

  // READ - Récupérer un post par ID
  getPostById(id: string): Post | undefined {
    return this.posts.find(post => post.id === id);
  }

  // UPDATE - Mettre à jour un post
  updatePost(id: string, updates: Partial<Post>): boolean {
    const index = this.posts.findIndex(post => post.id === id);
    if (index !== -1) {
      this.posts[index] = {
        ...this.posts[index],
        ...updates,
        updatedAt: new Date()
      };
      this.saveToStorage();
      console.log('💾 Post mis à jour, émission de:', this.posts.length, 'posts');
      this.postsSubject.next([...this.posts]);
      return true;
    }
    return false;
  }

  // DELETE - Supprimer un post
  deletePost(id: string): boolean {
    const initialLength = this.posts.length;
    this.posts = this.posts.filter(post => post.id !== id);
    
    if (this.posts.length < initialLength) {
      this.saveToStorage();
      this.postsSubject.next([...this.posts]);
      return true;
    }
    return false;
  }

  // Changer le statut d'un post
  changeStatus(id: string, status: 'brouillon' | 'planifié' | 'publié'): boolean {
  const result = this.updatePost(id, { status });
  
  if (result) {
    // Forcer l'émission avec un nouveau tableau
    this.posts = [...this.posts];
    this.postsSubject.next(this.posts);
  }
  
  return result;
}

  // Sauvegarder dans localStorage
  private saveToStorage(): void {
    localStorage.setItem('social-planner-posts', JSON.stringify(this.posts));
  }

  // Charger depuis localStorage
  private loadPostsFromStorage(): void {
    const stored = localStorage.getItem('social-planner-posts');
    if (stored) {
      this.posts = JSON.parse(stored);
      // Convertir les dates string en Date
      this.posts.forEach(post => {
        post.scheduledDate = new Date(post.scheduledDate);
        post.createdAt = new Date(post.createdAt);
        post.updatedAt = new Date(post.updatedAt);
      });
      this.postsSubject.next([...this.posts]);
    }
  }

  // Générer un ID unique
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}