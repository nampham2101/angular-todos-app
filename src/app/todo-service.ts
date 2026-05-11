import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Todo } from './todo-interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();

  private getNewId(): number {
    return Math.floor(Math.random() * 1000);
  }

  addTodo(text: string): Observable<Todo> {
    const newTodo: Todo = {
      id: this.getNewId(),
      text: text,
      completed: false
    };

    return of(newTodo).pipe(
      delay(500), // Giả lập latency của server
      map(todo => {
        this.todosSubject.next([...this.todosSubject.value, todo]);
        return todo;
      })
    );
  }

  markAsDone(todoId: number): Observable<Todo> {
    return of(todoId).pipe(
      delay(300),
      map(id => {
        const updatedTodos = this.todosSubject.value.map(_todo =>
          _todo.id === id ? { ..._todo, completed: true } : _todo
        );
        this.todosSubject.next(updatedTodos);
        return updatedTodos.find(t => t.id === id)!;
      })
    );
  }

  updateTodo(id: number, newText: string): Observable<Todo> {
    return of({ id, newText }).pipe(
      delay(300),
      map(({ id, newText }) => {
        const updatedTodos = this.todosSubject.value.map(_todo =>
          _todo.id === id ? { ..._todo, text: newText } : _todo
        );
        this.todosSubject.next(updatedTodos);
        return updatedTodos.find(t => t.id === id)!;
      })
    );
  }
}
