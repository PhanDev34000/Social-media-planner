import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(false);
  public isDarkMode$: Observable<boolean> = this.isDarkMode.asObservable();

  constructor() {
    // Charger la préférence sauvegardée
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme === 'dark';
    
    this.setTheme(prefersDark);
  }

  toggleTheme(): void {
    const newTheme = !this.isDarkMode.value;
    this.setTheme(newTheme);
  }

  private setTheme(isDark: boolean): void {
    this.isDarkMode.next(isDark);
    
    // Appliquer la classe sur le body
    if (isDark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }

  getCurrentTheme(): boolean {
    return this.isDarkMode.value;
  }
}