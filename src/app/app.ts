import { Component, signal } from '@angular/core';

type FileId = 'home' | 'projects' | 'contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly names: Record<FileId, string> = {
    home: 'Home.jada',
    projects: 'Projects.jada',
    contact: 'Contact.jada',
  };

  openTabs = signal<FileId[]>([]);
  activeTab = signal<FileId | null>(null);
  collapsed = signal<string[]>([]);

  constructor() {
    this.open('home');
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