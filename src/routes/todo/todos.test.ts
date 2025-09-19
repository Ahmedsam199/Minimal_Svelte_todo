import { describe, expect, it, test, vi } from 'vitest';
import axios from 'axios';
import type { Todo } from './todo.types';
import { fetchTodos, getFilterdTodos } from './todos.service';

vi.mock('axios');
describe('fetchTodos', () => {
	it('should fetch todos and update the state', async () => {
		const mockTodos: Todo[] = [{ userId: 1, id: 1, title: 'Test Todo', completed: false }];
		(axios.get as any).mockResolvedValue({ data: mockTodos });

		const todos = await fetchTodos();
		expect(todos).toEqual(mockTodos);
	});

	it('should handle errors', async () => {
		(axios.get as any).mockRejectedValue(new Error('Network error'));

		await expect(fetchTodos()).rejects.toThrow('Network error');
	});
});
describe('filterdTodos', () => {
	it('should filter todos based on search query', () => {
		const todos: Todo[] = [
			{ userId: 1, id: 1, title: 'Learn Svelte', completed: false },
			{ userId: 1, id: 2, title: 'Build a Todo App', completed: true },
			{ userId: 1, id: 3, title: 'Write Tests', completed: false }
		];
		const searchQuery = 'svelte';
		const filtered = getFilterdTodos(todos, searchQuery);
		expect(filtered).toEqual([{ userId: 1, id: 1, title: 'Learn Svelte', completed: false }]);
	});
});
