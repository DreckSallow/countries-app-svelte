<script lang="ts">
	import CountryContainer from '$lib/components/specific/country/country-container.svelte';
	import LeftModal from '$lib/components/common/modals/left-modal.svelte';
	import FilterIcon from '$lib/components/svg/filters.svelte';
	import type { PageData } from './$types';
	import Filter from '$lib/components/specific/filters/filter.svelte';
	export let data: PageData;
</script>

<main class="grid justify-items-center gap-5">
	<header class="flex flex-row gap-5 items-center">
		<div class="rounded border-white">
			<LeftModal queryParent="#layout-app" classNameModal="bg-slate-600 mb-2 p-2 h-5/6">
				<FilterIcon
					className="cursor-pointer fill-slate-800 fill-white"
					width={30}
					height={30}
					slot="modalIcon"
				/>
				<div slot="modalContent">
					<Filter />
				</div>
			</LeftModal>
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
