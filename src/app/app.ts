import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoInput } from './todo-input/todo-input';
import { TodoList } from './todo-list/todo-list';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TodoInput,
    TodoList
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-todos');
}
