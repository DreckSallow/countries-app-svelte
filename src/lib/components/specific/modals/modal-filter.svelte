<script lang="ts">
	import LeftModal from '$lib/components/common/modals/left-modal.svelte';
	import FilterIcon from '$lib/components/svg/filters.svelte';
	import Filter from '$lib/components/specific/filters/filter.svelte';
	import type { createFilterReturn } from '$lib/stores/filters/filter-store';
	import {
		SortFilter,
		type FilterCheckInput,
		type FilterContent,
		type FilterStore
	} from '$lib/types/filters';
	import Switch from '$lib/components/common/input/switch.svelte';
	import { getContext } from 'svelte';
	import { ContextKeys } from '$lib/context/keys';
	import { filterFetch } from '$lib/utils/helpers/filter-fetch';
	import type { CountryData } from '$lib/types/country';
	import { LinkedHelper, NodeList } from '$lib/utils/structures/linked-list/linked-list';
	import type { Writable } from 'svelte/store';
	import type { LinkedNode } from '$lib/types/list';
	type Param = { value: string; selected: boolean };

	type FilterStoreContext = {
		filters: FilterStore;
		sort: {
			[k in SortFilter]: boolean;
		};
	};
	const filterStore: createFilterReturn<FilterStoreContext> = getContext(
		ContextKeys.filterCountries
	);
	const countriesContext: Writable<{
		countries: CountryData[];
		countriesPage: NodeList<CountryData[]>;
		currentPage: LinkedNode<CountryData[]> | null;
		currentIndexPage: number;
	}> = getContext(ContextKeys.countries);

	let showModal = false;

	const getCheckInput = (k: string, detail: Param) => {
		filterStore.customUpdate!('filters', (part: FilterStore) => {
			const prop = k as unknown as keyof FilterStore;

			return {
				...part,
				[prop]: {
					...part[prop],
					childs: part[k as keyof FilterContent].childs.map((child) => ({
						...child,
						selected:
							child.value === detail.value ? detail.selected : (child as FilterCheckInput).selected
					}))
				}
			};
		});
	};
	const handleSwitch = (e: CustomEvent<any>) => {
		const { value, selected }: { value: SortFilter; selected: boolean } = e.detail;
		filterStore.update((store) => {
			return {
				...store,
				sort: {
					...store.sort,
					[value]: selected
				}
			};
		});
	};

	const fetchFilters = () => {
		const { sort, filters } = $filterStore;
		const regions = (filters['Continent'].childs as FilterCheckInput[]).reduce<any[]>(
			(acc, { selected, value }) => {
				if (selected) {
					return acc.concat(value);
				}
				return acc;
			},
			[]
		);
		const languages = (filters['Languages'].childs as FilterCheckInput[]).reduce<any[]>(
			(acc, { selected, value }) => {
				if (selected) {
					return acc.concat(value);
				}
				return acc;
			},
			[]
		);
		filterFetch(sort, { languages, regions })
			.then((d) => {
				const cleanCountries: CountryData[] = d.countries.map((c) => ({
					...c,
					region: c.region?.name ?? '',
					borders: c.borders?.map((b) => b.initials) ?? [],
					languages: c.languages?.map((l) => l.name) ?? []
				}));

				const nodeList = LinkedHelper.arrayToList(cleanCountries, 8);
				countriesContext.update((p) => {
					return {
						...p,
						countries: cleanCountries,
						countriesPage: nodeList,
						currentPage: nodeList.head,
						currentIndexPage: 1
					};
				});
				showModal = false;
			})
			.catch((e) => {
				alert('There was an error getting the countries.');
			});
	};

	$: accordions = Object.entries($filterStore.filters);
</script>

<LeftModal
	queryParent="#layout-app"
	classNameModal="bg-slate-600 mb-2 p-2 h-5/6 overflow-auto rounded-r-md"
	bind:showModal
>
	<FilterIcon
		className="cursor-pointer fill-slate-800 fill-white"
		width={30}
		height={30}
		slot="modalIcon"
	/>
	<div slot="modalContent" class="relative">
		<div class="text-center my-2 mb-3">
			<span class="block my-2 uppercase font-medium">Filters:</span>
			<Filter {accordions} handleCheckInput={getCheckInput} />
		</div>
		<div class="text-center mt-4">
			<span class="block mb-2 uppercase font-medium">Sort By:</span>
			<div class="px-1">
				<Switch
					text="Alphabetically"
					value={SortFilter.alpha}
					selected={$filterStore.sort[SortFilter.alpha]}
					on:check={handleSwitch}
					className="bg-blue-300/40 p-3 mb-3 rounded-md"
				/>
				<Switch
					text="Population"
					value={SortFilter.population}
					selected={$filterStore.sort[SortFilter.population]}
					on:check={handleSwitch}
					className="bg-blue-300/40 p-3 mb-3 rounded-md"
				/>
				<Switch
					text="Area"
					value={SortFilter.area}
					selected={$filterStore.sort[SortFilter.area]}
					on:check={handleSwitch}
					className="bg-blue-300/40 p-3 mb-3 rounded-md"
				/>
			</div>
		</div>
		<button
			class="p-2 mt-2 bg-blue-300/75 hover:bg-blue-300 rounded-md absolute left-0 right-0"
			on:click={fetchFilters}
		>
			Apply
		</button>
	</div>
</LeftModal>
