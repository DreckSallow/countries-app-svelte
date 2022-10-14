<script lang="ts">
	import CountryContainer from '$lib/components/specific/country/country-container.svelte';
	import type { PageData } from './$types';
	import ModalFilter from '$lib/components/specific/modals/modal-filter.svelte';
	import { SortFilter, TypeInput } from '$lib/types/filters';
	import { setContext } from 'svelte';
	import { ContextKeys } from '$lib/context/keys';
	import { createFilterStore } from '$lib/stores/filters/filter-store';
	import { writable } from 'svelte/store';
	import { LinkedHelper } from '$lib/utils/structures/linked-list/linked-list';
	import type { Country, CountryData, CountryResponse } from '$lib/types/country';
	import SearchComplete from '$lib/components/common/search/search-complete.svelte';
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
	let nodeList = LinkedHelper.arrayToList<Country>(data?.countries ?? [], 8);
	let countriesStore = writable({
		countries: data?.countries ?? [],
		countriesPage: nodeList,
		currentPage: nodeList.head,
		currentIndexPage: 1
	});
	setContext(ContextKeys.countries, countriesStore);

	const handleEnter = (v: string) => {
		const filterCountries = $countriesStore.countries.filter(({ name }) =>
			name.toLowerCase().includes(v.toLowerCase())
		);
		let nodeList = LinkedHelper.arrayToList(filterCountries, 8);
		countriesStore.update((p) => {
			return {
				...p,
				countriesPage: nodeList,
				currentPage: nodeList.head,
				currentIndexPage: 1
			};
		});
	};
</script>

<main class="grid justify-items-center gap-5 md:gap-2 items-center">
	<header class="flex flex-row gap-5 items-center flex-wrap justify-center mt-3.5">
		<div class="rounded border-white">
			<ModalFilter />
		</div>
		<SearchComplete {handleEnter} />
		<div>
			<button
				class="bg-blue-400 py-2 px-3 rounded border-none hover:bg-blue-400/75"
				on:click={() => {
					if ($countriesStore.currentPage?.prev) {
						countriesStore.update((v) => {
							return {
								...v,
								currentPage: v.currentPage?.prev ?? null,
								currentIndexPage: v.currentIndexPage - 1
							};
						});
					}
				}}
			>
				Back
			</button>
			<span>
				{$countriesStore.currentIndexPage} / {$countriesStore.countriesPage.size}
			</span>
			<button
				class="bg-blue-400 py-2 px-3 rounded border-none hover:bg-blue-400/75"
				on:click={() => {
					if ($countriesStore.currentPage?.next) {
						countriesStore.update((v) => {
							return {
								...v,
								currentPage: v.currentPage?.next ?? null,
								currentIndexPage: v.currentIndexPage + 1
							};
						});
					}
				}}
			>
				Next
			</button>
		</div>
	</header>
	<CountryContainer />
</main>

<style>
	.rounded {
		border-width: 1px;
	}
	main {
		height: calc(100% - 3.5rem);
		grid-template-columns: 1fr;
		grid-template-rows: 0.1fr 1fr;
	}
</style>
