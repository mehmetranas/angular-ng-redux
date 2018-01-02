import {ADD, CLEAR_ALL, REMOVE, TOGGLE} from './actions';
import {tassign} from 'tassign';

export interface IAppState {
    count: number;
    todos?: {title: string,
      id: number,
      isDone: boolean}[];
    lastUpdate?: Date;
}

export const INITIAL_STATE = { count: 0, todos: [] };

export function rootReducer(state: IAppState, action): IAppState {
  switch (action.type) {
    case ADD: return {
      count: state.count + 1,
      lastUpdate: new Date(),
      todos: state.todos.concat({title: action.todo.title, isDone: false, id: state.todos.length + 1}) };
    case TOGGLE:
      const item = state.todos.find(i => i.id === action.todo.id);
      const index = state.todos.indexOf(item);

      const beforeItems = state.todos.slice(0, index);
      const afterItems = state.todos.slice(index + 1);

      const updatedItem = tassign(item, {isDone: !item.isDone});
      const updatedTodos = [...beforeItems, updatedItem, ...afterItems];
      return {
      count: state.count,
      lastUpdate: new Date(),
      todos: updatedTodos };
    case REMOVE: return {
      count: state.count - 1,
      lastUpdate: new Date(),
      todos: state.todos.filter(i => {
        return i.id !== action.todo.id;
      })};
    case CLEAR_ALL: return { count: 0 }
  }

  return state;
}

