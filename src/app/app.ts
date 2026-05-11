import { Component, signal } from '@angular/core';
import { TodoInput } from './todo-input/todo-input';
import { TodoList } from './todo-list/todo-list';

@Component({
  selector: 'app-root',
  imports: [
    TodoInput,
    TodoList
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-todos');
}
