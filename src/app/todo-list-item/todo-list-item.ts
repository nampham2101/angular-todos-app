import { Component, input, output, signal } from '@angular/core';
import { Todo } from '../todo-interface';

@Component({
  selector: 'app-todo-list-item',
  imports: [],
  templateUrl: './todo-list-item.html',
  styleUrl: './todo-list-item.css',
})
export class TodoListItem {
  todo = input.required<Todo>();
  editMode = signal(false);
  newTodo = signal("");

  markAsDone = output();
  onTodoChanged = output<string>();

  protected editModeOn() {
    this.editMode.set(true);
  }

  protected saveTodo() {
    this.editMode.set(false);
    this.onTodoChanged.emit(this.newTodo());
  }

  protected onChanged(event: Event) {
    this.newTodo.set((event.target as HTMLInputElement).value);
  }
}
