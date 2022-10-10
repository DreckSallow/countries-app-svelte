<script lang="ts">
	import CountryCard from '$lib/components/specific/country/country-card.svelte';
	import { ContextKeys } from '$lib/context/keys';
	import type { CountryData } from '$lib/types/country';
	import type { LinkedNode } from '$lib/types/list';
	import type { NodeList } from '$lib/utils/structures/linked-list/linked-list';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	const countryStore = getContext<
		Writable<{
			countries: CountryData[];
			countriesPage: NodeList<CountryData[]>;
			currentPage: LinkedNode<CountryData[]> | null;
		}>
	>(ContextKeys.countries);
	$: countriesRender = $countryStore.currentPage?.content ?? [];
</script>

<section class="flex flex-row flex-wrap gap-8 justify-center align-center">
	{#each countriesRender as { name, image, capital, id, region }}
		<CountryCard {name} src={image} {id} {capital} {region} />
	{/each}
</section>
