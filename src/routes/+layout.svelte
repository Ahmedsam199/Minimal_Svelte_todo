<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<nav>
	<Button href="/">Home</Button>
	<Button href="/about">About</Button>
</nav>
{@render children?.()}

<style>
	nav {
		display: flex;
		gap: 1rem;
		justify-content: center;
		border-radius: 10px;
		margin: 1rem;
		width: 50%;
		right: 50%;
		margin: auto;
		margin-top: 1rem;
		padding: 1rem;
		background-color: #eee;
	}
	a {
		padding: 1rem;
		border-radius: 10px;
		transition: all 0.5s;
	}
	a:hover {
		background-color: #fff;
	}
</style>
