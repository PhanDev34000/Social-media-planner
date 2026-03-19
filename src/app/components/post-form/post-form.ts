import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './post-form.html',
  styleUrl: './post-form.scss'
})
export class PostFormComponent implements OnChanges {
  @Input() postToEdit?: Post; // Post à éditer (optionnel)
  @Output() editComplete = new EventEmitter<void>();

  content: string = '';
  scheduledDate: string = '';
  scheduledTime: string = '';
  imagePreview: string = '';
  isEditMode: boolean = false;

  constructor(private postService: PostService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['postToEdit'] && this.postToEdit) {
      this.loadPostData(this.postToEdit);
    }
  }

  loadPostData(post: Post): void {
    this.isEditMode = true;
    this.content = post.content;
    this.imagePreview = post.imagePreview || '';

    // Convertir la date en format yyyy-MM-dd
    const date = new Date(post.scheduledDate);
    this.scheduledDate = date.toISOString().split('T')[0];
    
    // Convertir l'heure en format HH:mm
    this.scheduledTime = date.toTimeString().slice(0, 5);
  }

  onSubmit(): void {
    if (!this.content || !this.scheduledDate || !this.scheduledTime) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Combiner date et heure
    const dateTime = new Date(`${this.scheduledDate}T${this.scheduledTime}`);

    if (this.isEditMode && this.postToEdit) {
      // MODE ÉDITION
      this.postService.updatePost(this.postToEdit.id, {
        content: this.content,
        scheduledDate: dateTime,
        imagePreview: this.imagePreview || undefined
      });
      alert('Post modifié avec succès !');
      this.cancelEdit();
    } else {
      // MODE CRÉATION
      this.postService.createPost(
        this.content,
        dateTime,
        this.imagePreview || undefined
      );
      alert('Post créé avec succès !');
      this.resetForm();
    }
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.resetForm();
    this.editComplete.emit();
  }

  resetForm(): void {
    this.content = '';
    this.scheduledDate = '';
    this.scheduledTime = '';
    this.imagePreview = '';
  }
}