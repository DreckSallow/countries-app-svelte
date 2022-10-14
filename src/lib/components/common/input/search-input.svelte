<script lang="ts">
	import Search from '$lib/components/svg/search.svelte';

	export let includeSearchIcon = true;
	export let handleKeydown = (e: KeyboardEvent) => {};
	export let placeholder = 'Search';
	export let value = '';
	export let handleInput = (e: Event) => {};
</script>

<div class="search-container relative grid overflow-hidden rounded-sm">
	{#if includeSearchIcon}
		<div class="bg-blue-400 py-1 px-1">
			<Search />
		</div>
	{/if}
	<input
		class="text-slate-500 py-1 px-2"
		{placeholder}
		on:input={handleInput}
		bind:value
		on:keydown={(e) => {
			handleKeydown(e);
		}}
	/>
</div>

<style>
	.search-container {
		grid-template-columns: 30px 1fr;
	}
	.search-container input {
		outline: none;
	}
</style>
