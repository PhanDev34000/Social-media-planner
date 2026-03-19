import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post-card',
  imports: [CommonModule],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss'
})
export class PostCardComponent {
  @Input() post!: Post;
  @Output() delete = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<{id: string, status: 'brouillon' | 'planifié' | 'publié'}>();
  @Output() edit = new EventEmitter<Post>();

  onEdit(): void {
    this.edit.emit(this.post);
  }

  onDelete(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      this.delete.emit(this.post.id);
    }
  }

  onStatusChange(newStatus: 'brouillon' | 'planifié' | 'publié'): void {
    this.statusChange.emit({ id: this.post.id, status: newStatus });
  }

  getStatusBadgeClass(): string {
    return `badge-${this.post.status}`;
  }

  getStatusLabel(): string {
    const labels = {
      'brouillon': 'Brouillon',
      'planifié': 'Planifié',
      'publié': 'Publié'
    };
    return labels[this.post.status];
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}