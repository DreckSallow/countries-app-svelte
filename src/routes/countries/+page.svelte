<script lang="ts">
	import CountryContainer from '$lib/components/specific/country/country-container.svelte';
	import type { PageData } from './$types';
	import ModalFilter from '$lib/components/specific/modals/modal-filter.svelte';
	import { TypeInput } from '$lib/types/filters';
	export let data: PageData;
	$: filterData = {
		Languages: {
			type: TypeInput.checkBoxInput,
			childs: data.languages.map((language) => {
				return {
					// ...language,
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
					// ...region,
					selected: true,
					text: region.name,
					value: region.name
				};
			})
		}
	};
</script>

<main class="grid justify-items-center gap-5">
	<header class="flex flex-row gap-5 items-center">
		<div class="rounded border-white">
			<ModalFilter {filterData} />
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
