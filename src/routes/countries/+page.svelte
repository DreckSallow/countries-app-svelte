<script lang="ts">
	import CountryContainer from '$lib/components/country/country-container.svelte';
	import Filters from '$lib/components/svg/filters.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<main class="grid justify-items-center gap-5">
	<header class="flex flex-row gap-5 items-center">
		<div class="rounded border-blue-400">
			<Filters className="cursor-pointer fill-slate-800" width={30} height={30} />
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
