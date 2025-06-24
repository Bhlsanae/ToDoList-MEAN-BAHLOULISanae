import 'zone.js';
import { Component, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  template: `
    <h1>✅ Ma ToDo Liste (connectée)</h1>

    <input [(ngModel)]="newTask" placeholder="Nouvelle tâche" />
    <button (click)="addTask()">➕ Ajouter</button>

    <ul>
      <li *ngFor="let task of tasks">
        {{ task.title }}
        <button (click)="removeTask(task._id)">🗑️</button>
      </li>
    </ul>
  `
})
export class AppComponent {
  tasks: any[] = [];
  newTask: string = '';

  http = inject(HttpClient);

  constructor() {
    this.loadTasks();
  }

  loadTasks() {
    this.http.get<any[]>('https://f60b3598-8e44-4698-a170-25f2091a76f4-00-la65kzgdw6bh.picard.replit.dev/api/tasks')
      .subscribe(data => {
        this.tasks = data;
      });
  }

  addTask() {
    const title = this.newTask.trim();
    if (!title) return;

    const newTodo = { title, completed: false };

    this.http.post<any>('https://f60b3598-8e44-4698-a170-25f2091a76f4-00-la65kzgdw6bh.picard.replit.dev/api/tasks', newTodo)
      .subscribe(() => {
        this.newTask = '';
        this.loadTasks(); // recharge après ajout
      });
  }

  removeTask(id: string) {
    this.http.delete(`https://f60b3598-8e44-4698-a170-25f2091a76f4-00-la65kzgdw6bh.picard.replit.dev/api/tasks/${id}`)
      .subscribe(() => {
        this.loadTasks(); // recharge après suppression
      });
  }
}

bootstrapApplication(AppComponent);
