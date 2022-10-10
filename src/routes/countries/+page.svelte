<script lang="ts">
	import CountryContainer from '$lib/components/specific/country/country-container.svelte';
	import type { PageData } from './$types';
	import ModalFilter from '$lib/components/specific/modals/modal-filter.svelte';
	import { SortFilter, TypeInput } from '$lib/types/filters';
	import { setContext } from 'svelte';
	import { ContextKeys } from '$lib/context/keys';
	import { createFilterStore } from '$lib/stores/filters/filter-store';
	export let data: PageData;
	let filterData = {
		filters: {
			Languages: {
				type: TypeInput.checkBoxInput,
				childs: data.languages.map((language) => {
					return {
						selected: true,
						text: language.name,
						value: language.name
					};
				})
			},
			Continent: {
				type: TypeInput.checkBoxInput,
				childs: data.regions.map((region) => {
					return {
						selected: true,
						text: region.name,
						value: region.name
					};
				})
			}
		},
		sort: {
			[SortFilter.alpha]: true,
			[SortFilter.population]: false,
			[SortFilter.area]: false
		}
	};
	setContext(
		ContextKeys.filterCountries,
		createFilterStore(filterData, (prev) => prev)
	);
</script>

<main class="grid justify-items-center gap-5">
	<header class="flex flex-row gap-5 items-center">
		<div class="rounded border-white">
			<ModalFilter />
		</div>
		<input type="text" placeholder="search countries...." />
	</header>
	<CountryContainer countries={data?.countries ?? []} />
	<div class="flex flex-row gap-5 items-center">BOTONS</div>
</main>

<style>
	.rounded {
		border-width: 1px;
	}
	main {
		grid-template-columns: 1fr;
		grid-template-rows: 50px 1fr 50px;
	}
</style>
