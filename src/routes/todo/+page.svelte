<script lang="ts">
	import axios from 'axios';
	import { onMount } from 'svelte';

	interface Todo {
		userId: number;
		id: number;
		title: string;
		completed: boolean;
	}

	let todos: Todo[] = $state([]);
	let searchQuery = $state('');
	let isLoading = $state(false);
	let error = $state<string | null>(null);

	const filteredTodos = $derived(
		todos.filter((todo) => todo.title.toLowerCase().includes(searchQuery.toLowerCase()))
	);

	const fetchTodos = async (): Promise<void> => {
		try {
			isLoading = true;
			error = null;
			const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
			todos = response.data;
		} catch (err) {
			error = 'Failed to fetch todos';
			console.error('Error fetching todos:', err);
		} finally {
			isLoading = false;
		}
	};

	onMount(() => {
		fetchTodos();
	});
</script>

<div class="container">
	<div class="search-container">
		<input
			type="text"
			placeholder="Search todos..."
			bind:value={searchQuery}
			class="search-input"
		/>
	</div>

	{#if isLoading}
		<div class="loading">Loading todos...</div>
	{:else if error}
		<div class="error">{error}</div>
	{:else if filteredTodos.length === 0}
		<div class="no-results">
			{searchQuery ? 'No todos match your search.' : 'No todos found.'}
		</div>
	{:else}
		<div class="todo-list">
			{#each filteredTodos as todo (todo.id)}
				<div class="todo-item" class:completed={todo.completed}>
					<span class="todo-title">{todo.title}</span>
					<label class="checkbox-container">
						<input type="checkbox" bind:checked={todo.completed} />
						<span class="checkmark"></span>
						Task Completed
					</label>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.container {
		max-width: 600px;
		margin: 0 auto;
		padding: 1rem;
	}

	.search-container {
		margin-bottom: 1.5rem;
	}

	.search-input {
		width: 100%;
		padding: 0.75rem;
		border: 2px solid #e2e8f0;
		border-radius: 8px;
		font-size: 1rem;
		transition: border-color 0.2s;
	}

	.search-input:focus {
		outline: none;
		border-color: #3b82f6;
	}
	/* Hide the default checkbox */
	.checkbox-container input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	/* Custom checkbox */
	.checkmark {
		position: relative;
		height: 20px;
		width: 20px;
		background-color: #eee;
		border-radius: 4px;
		display: inline-block;
		vertical-align: middle;
		margin-right: 8px;
		transition: background-color 0.2s;
	}

	/* When checkbox is checked */
	.checkbox-container input:checked + .checkmark {
		background-color: #4caf50;
	}

	/* Create the checkmark/indicator */
	.checkmark::after {
		content: '';
		position: absolute;
		display: none;
		left: 6px;
		top: 2px;
		width: 6px;
		height: 12px;
		border: solid white;
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}

	/* Show the checkmark when checked */
	.checkbox-container input:checked + .checkmark::after {
		display: block;
	}

	.todo-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.todo-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		background: #f8fafc;
		border-radius: 8px;
		border-left: 4px solid #3b82f6;
		transition: background-color 0.2s;
	}

	.todo-item:hover {
		background: #f1f5f9;
	}

	.todo-item.completed {
		background: #f0f9ff;
		border-left-color: #10b981;
	}

	.todo-item.completed .todo-title {
		text-decoration: line-through;
		color: #6b7280;
	}

	.todo-title {
		flex: 1;
		font-weight: 500;
		text-transform: capitalize;
	}

	.loading,
	.error,
	.no-results {
		text-align: center;
		padding: 2rem;
		font-size: 1.1rem;
	}

	.error {
		color: #dc2626;
		background: #fef2f2;
		border-radius: 8px;
	}

	.loading {
		color: #6b7280;
	}

	.no-results {
		color: #6b7280;
	}
</style>
