<script lang="ts">
	import { ContextKeys } from '$lib/context/keys';
	import type { Writable } from 'svelte/store';
	import { getContext } from 'svelte';
	import SearchInput from '../input/search-input.svelte';
	import type { NodeList } from '$lib/utils/structures/linked-list/linked-list';
	import type { CountryData } from '$lib/types/country';
	import type { LinkedNode } from '$lib/types/list';
	import { clickOutside } from '$lib/utils/clicks/click-outside';
	export let handleEnter = (v: string) => {};
	export let value = '';
	export let showList = false;
	export let indexSelect = -1;
	const countrieStore: Writable<{
		countries: CountryData[];
		countriesPage: NodeList<CountryData[]>;
		currentPage: LinkedNode<CountryData[]> | null;
		currentIndexPage: number;
	}> = getContext(ContextKeys.countries);
	$: items = $countrieStore.countries.slice(0, 5);

	const handleInput = (e: Event) => {
		if (!e.target) return;
		const input = e.target as HTMLInputElement;
		if (input.value.length <= 0) {
			showList = false;
			return;
		}
		let maxLength = 5;
		items = $countrieStore.countries
			.filter(({ name }) => name.toLowerCase().includes(value.trim().toLowerCase()))
			.slice(0, maxLength);
		if (!showList) showList = true;
	};
</script>

<div
	class="relative"
	use:clickOutside={() => {
		if (showList) showList = false;
	}}
>
	<SearchInput
		handleKeydown={(e) => {
			if (e.key === 'ArrowDown' && value.length > 0) {
				e.preventDefault();
				if (indexSelect < items.length - 1) indexSelect += 1;
				else indexSelect = 0;
				return;
			} else if (e.key === 'ArrowUp' && value.length > 0) {
				e.preventDefault();
				if (indexSelect > 0) indexSelect -= 1;
				else if (indexSelect === 0) indexSelect = -1;
				return;
			}

			if (e.key === 'Enter' && indexSelect !== -1) {
				handleEnter(items[indexSelect].name);
				showList = false;
				indexSelect = -1;
				value = '';
				return;
			} else if (e.key === 'Enter') {
				handleEnter(value);
				showList = false;
				indexSelect = -1;
				value = '';

				return;
			}
		}}
		bind:value
		{handleInput}
	/>
	{#if showList}
		<ul
			class="results-list bg-blue-400 absolute bottom-0 w-full max-h-40 overflow-hidden flex flex-col items-start"
		>
			{#each items as { name }, i}
				<li
					class="hover:bg-blue-300 {i === indexSelect
						? 'bg-blue-300'
						: ''} max-h-8 p-2 w-full text-sm cursor-pointer"
					on:click={() => {
						value = '';
						handleEnter(name);
						showList = false;
						indexSelect = -1;
					}}
				>
					{name}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.results-list {
		transform: translateY(100.5%);
	}
</style>
