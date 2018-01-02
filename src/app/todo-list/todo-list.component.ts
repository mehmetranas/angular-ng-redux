import { Component } from '@angular/core';
import {NgRedux, select} from 'ng2-redux';
import {IAppState} from '../store';
import {ADD, REMOVE, TOGGLE} from "../actions";
import {tassign} from 'tassign';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  @select((state: IAppState) => state.todos) todos;

  // Read the comment in TodoService
  constructor(private ngRedux: NgRedux<IAppState>) {
  }

  addTodo(input) {
    if (!input.value) { return; }
    this.ngRedux.dispatch({type: ADD, todo: {title: input.value} });

    input.value = '';
  }

  toggleTodo(todo) {
    this.ngRedux.dispatch({ type: TOGGLE, todo: todo })
  }

  removeTodo(todo) {
    this.ngRedux.dispatch({ type: REMOVE, todo: todo })
  }
}
