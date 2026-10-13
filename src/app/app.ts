import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';

type FileId = 'home' | 'projects' | 'contact';
type Language = 'es' | 'en';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly names: Record<FileId, Record<Language, string>> = {
    home: { es: 'Inicio.jada', en: 'Home.jada' },
    projects: { es: 'Proyectos.jada', en: 'Projects.jada' },
    contact: { es: 'Contacto.jada', en: 'Contact.jada' },
  };

  readonly language = signal<Language>('es');
  readonly translations = {
    es: {
      languageButton: 'English',
      languageLabel: 'Cambiar idioma a inglés',
      cvDownload: 'Descargar CV',
      cvDownloadLabel: 'Descargar mi currículum en PDF',
      explorer: 'EXPLORADOR',
      portfolioFolder: 'JOAO-PORTAFOLIO',
      components: 'Componentes',
      portfolio: 'PORTAFOLIO / 2026',
      role: 'DESARROLLADOR FULL STACK',
      introduction: 'Convierto ideas en productos digitales funcionales, claros y con personalidad.',
      developer: 'desarrollador',
      name: 'nombre',
      goal: 'objetivo',
      create: 'crear',
      aboutTitle: 'Sobre mí',
      about: 'Soy Joao, desarrollador apasionado por la programación y el diseño.',
      creativity: 'Creatividad',
      code: 'Código',
      technologies: 'Mis tecnologías',
      projectsTitle: 'Proyectos',
      taskApp: 'App de tareas',
      taskDescription: 'Gestión de tareas con autenticación y datos en tiempo real.',
      businessSite: 'Sitio para negocio',
      businessDescription: 'Sitio web moderno y adaptable para un negocio.',
      inventory: 'Sistema de inventario',
      inventoryDescription: 'Panel para controlar productos, existencias y ventas.',
      contactTitle: '¡HABLEMOS!',
      email: 'Correo',
      empty: 'Abre un archivo desde el explorador',
      branch: 'rama principal',
      errors: '0 errores',
      line: 'Línea',
      column: 'Col.',
      loading: 'Cargando portafolio',
    },
    en: {
      languageButton: 'Español',
      languageLabel: 'Switch language to Spanish',
      cvDownload: 'Download CV',
      cvDownloadLabel: 'Download my résumé as a PDF',
      explorer: 'EXPLORER',
      portfolioFolder: 'JOAO-PORTFOLIO',
      components: 'Components',
      portfolio: 'PORTFOLIO / 2026',
      role: 'FULL STACK DEVELOPER',
      introduction: 'I turn ideas into functional, clear digital products with personality.',
      developer: 'developer',
      name: 'name',
      goal: 'goal',
      create: 'build',
      aboutTitle: 'About me',
      about: 'I am Joao, a developer passionate about programming and design.',
      creativity: 'Creativity',
      code: 'Code',
      technologies: 'My technologies',
      projectsTitle: 'Projects',
      taskApp: 'Task app',
      taskDescription: 'Task management with authentication and real-time data.',
      businessSite: 'Business website',
      businessDescription: 'A modern, responsive website for a business.',
      inventory: 'Inventory system',
      inventoryDescription: 'A dashboard to manage products, stock, and sales.',
      contactTitle: 'LET’S TALK!',
      email: 'Email',
      empty: 'Open a file from the explorer',
      branch: 'main branch',
      errors: '0 errors',
      line: 'Line',
      column: 'Col.',
      loading: 'Loading portfolio',
    },
  };

  get text() {
    return this.translations[this.language()];
  }

  toggleLanguage(): void {
    this.language.update((current) => current === 'es' ? 'en' : 'es');
  }

  openTabs = signal<FileId[]>([]);
  activeTab = signal<FileId | null>(null);
  collapsed = signal<string[]>([]);
  readonly isLoading = signal(true);

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.open('home');

    afterNextRender(() => {
      const timeoutId = setTimeout(() => this.isLoading.set(false), 1600);
      this.destroyRef.onDestroy(() => clearTimeout(timeoutId));
    });
  }

  open(id: FileId): void {
    if (!this.openTabs().includes(id)) {
      this.openTabs.update((tabs) => [...tabs, id]);
    }
    this.activeTab.set(id);
  }

  close(id: FileId): void {
    const tabs = this.openTabs();
    const index = tabs.indexOf(id);
    const rest = tabs.filter((t) => t !== id);
    this.openTabs.set(rest);
    if (this.activeTab() === id) {
      this.activeTab.set(rest[Math.min(index, rest.length - 1)] ?? null);
    }
  }

  toggle(folder: string): void {
    this.collapsed.update((list) =>
      list.includes(folder) ? list.filter((f) => f !== folder) : [...list, folder]
    );
  }

  isCollapsed(folder: string): boolean {
    return this.collapsed().includes(folder);
  }
}