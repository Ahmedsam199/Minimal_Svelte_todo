import axios from 'axios';
import type { Todo } from './todo.types';

export const fetchTodos = async (): Promise<Todo[]> => {
	const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
	return response.data;
};
export const getFilterdTodos = (todos: Todo[], search: string): Todo[] => {
	return todos.filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()));
};
