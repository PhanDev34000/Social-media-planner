export interface Post {
  id: string;
  content: string;
  scheduledDate: Date;
  status: 'brouillon' | 'planifié' | 'publié';
  imagePreview?: string; // Optionnel
  createdAt: Date;
  updatedAt: Date;
}