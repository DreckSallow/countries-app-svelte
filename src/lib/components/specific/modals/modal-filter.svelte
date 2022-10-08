<script lang="ts">
	import LeftModal from '$lib/components/common/modals/left-modal.svelte';
	import FilterIcon from '$lib/components/svg/filters.svelte';
	import Filter from '$lib/components/specific/filters/filter.svelte';
	import { createFilterStore } from '$lib/stores/filters/filter-store';
	import type { FilterCheckInput, FilterStore } from '$lib/types/filters';
	type Param = { value: string; selected: boolean };

	/* ------ params ----- */
	export let filterData: FilterStore = {};

	const filterStore = createFilterStore(filterData, (prev) => prev);
	const getRadioInput = (k: string, detail: Param) => {
		filterStore.customUpdate!(k, (part) => ({
			...part,
			childs: part?.childs.map((child) => ({ ...child, group: detail.value }))
		}));
	};
	const getCheckInput = (k: string, detail: Param) => {
		filterStore.customUpdate!(k, (part) => ({
			...part,
			childs: (part.childs as FilterCheckInput[]).map((child) => ({
				...child,
				selected: child.value === detail.value ? detail.selected : child?.selected
			}))
		}));
	};
	$: accordions = Object.entries($filterStore);
</script>

<LeftModal queryParent="#layout-app" classNameModal="bg-slate-600 mb-2 p-2 h-5/6">
	<FilterIcon
		className="cursor-pointer fill-slate-800 fill-white"
		width={30}
		height={30}
		slot="modalIcon"
	/>
	<div slot="modalContent">
		<span>Filters</span>
		<Filter {accordions} handleRadioInput={getRadioInput} handleCheckInput={getCheckInput} />
	</div>
</LeftModal>
