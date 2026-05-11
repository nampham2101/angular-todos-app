import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { TodoService } from '../todo-service';
import { TodoListItem } from '../todo-list-item/todo-list-item';
import { Todo } from '../todo-interface';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, TodoListItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList implements OnInit {
  todos$: Observable<Todo[]>;
  completedTodos$: Observable<Todo[]>;

  constructor(protected todoService: TodoService) {
    this.todos$ = this.todoService.todos$.pipe(
      map(todos => todos.filter(todo => !todo.completed))
    );
    this.completedTodos$ = this.todoService.todos$.pipe(
      map(todos => todos.filter(todo => todo.completed))
    );
  }

  ngOnInit() {}

  protected markAsDone(todoId: number) {
    this.todoService.markAsDone(todoId).subscribe();
  }

  protected updateTodo(newTodo: string, todoId: number) {
    this.todoService.updateTodo(todoId, newTodo).subscribe();
  }

  trackByFn(index: number, item: Todo): number {
    return item.id;
  }
}
