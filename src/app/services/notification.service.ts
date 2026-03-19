import { Injectable, OnDestroy, NgZone } from '@angular/core';
import { PostService } from './post.service';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnDestroy {
  private checkInterval?: any;
  private notifiedPosts = new Set<string>();

  constructor(
    private postService: PostService,
    private ngZone: NgZone
  ) {}

  startMonitoring(): void {
    // Vérifier toutes les minutes
    this.checkInterval = setInterval(() => {
      this.ngZone.run(() => {  // ← Ajout de ngZone.run()
        this.checkScheduledPosts();
      });
    }, 60000);

    // Vérifier immédiatement au démarrage
    this.checkScheduledPosts();
  }

  // ... reste du code inchangé

  stopMonitoring(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }

  private checkScheduledPosts(): void {
    const now = new Date();
    const posts = this.postService.getAllPosts();

    posts.forEach(post => {
      // Si le post est planifié et que l'heure est passée
      if (post.status === 'planifié' && !this.notifiedPosts.has(post.id)) {
        const scheduledTime = new Date(post.scheduledDate);
        
        // Si la date programmée est dans les 5 dernières minutes
        const timeDiff = now.getTime() - scheduledTime.getTime();
        const fiveMinutesInMs = 5 * 60 * 1000;

        if (timeDiff >= 0 && timeDiff <= fiveMinutesInMs) {
          this.notifyPost(post);
          this.notifiedPosts.add(post.id);
        }
      }
    });
  }

 private notifyPost(post: Post): void {
  console.log('📢 Notification pour le post:', post);
  
  const message = `⏰ C'est l'heure de publier !\n\n📱 "${post.content}"\n\n✅ Cliquez sur OK pour marquer comme publié, ou Annuler pour ignorer.`;
  
  if (confirm(message)) {
    console.log('🔄 Changement de statut demandé pour:', post.id);
    
    // Marquer comme publié DANS la zone Angular
    this.ngZone.run(() => {
      const success = this.postService.changeStatus(post.id, 'publié');
      
      console.log('✅ Résultat du changement:', success);
      
      if (success) {
        alert('✅ Post marqué comme publié !');
      } else {
        alert('❌ Erreur lors de la mise à jour du statut');
      }
    });
  }
}

  // Réinitialiser les notifications (utile pour le développement)
  resetNotifications(): void {
    this.notifiedPosts.clear();
  }

  ngOnDestroy(): void {
    this.stopMonitoring();
  }
}