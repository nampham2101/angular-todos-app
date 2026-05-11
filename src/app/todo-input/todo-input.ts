import { Component, signal } from '@angular/core';
import { TodoService } from '../todo-service';

@Component({
  selector: 'app-todo-input',
  imports: [],
  templateUrl: './todo-input.html',
  styleUrl: './todo-input.css',
})
export class TodoInput {
  placeholder = signal('What do you want to do?');
  buttonText = signal('Add');
  newTodo = signal('');

  constructor(private todoService: TodoService) {}

  protected save() {
    if (this.newTodo() === '') {
      alert('error');
      return;
    }

    this.todoService.addTodo(this.newTodo()).subscribe({
      next: () => {
        this.newTodo.set("");
      },
      error: (err) => {
        console.error('Error adding todo:', err);
      }
    });
  }

  protected onChanged(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.newTodo.set(value);
  }
}
