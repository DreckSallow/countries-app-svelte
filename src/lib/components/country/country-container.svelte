<script lang="ts">
	import CountryCard from '$lib/components/country/country-card.svelte';
	import type { CountryData } from '$lib/types/country';
	export let countries: CountryData[] = [];
</script>

<section class="flex flex-row flex-wrap gap-8 justify-center align-center">
	{#each countries as { name, image, capital, id, region }}
		<CountryCard {name} src={image} {id} {capital} {region} />
	{/each}
</section>
