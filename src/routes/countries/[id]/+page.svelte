<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="flex flex-center w-full">
	<div
		class="card-info w-4/5 sm:w-3/6 h-4/5 sm:h-8/9 lg:w-1/3 flex flex-col p-3 m-3 rounded-lg bg-rata relative"
	>
		<a href="/countries" class="absolute top-0 left-0 bg-blue-300 py-1 px-3 rounded">Back</a>
		<h3 class="text-center text-xl font-semibold text-blue-300 underline">{data.name}</h3>
		<ul>
			<li>
				<span class="font-semibold text-white">Area:</span>
				<span class=""
					>{data.area ? (data.area / 1000000).toFixed(3) + ' km' : 'No information'}</span
				>
			</li>
			<li>
				<span class="font-semibold text-white">Independent:</span>
				<span>{data.independent ? 'Yes' : 'No'}</span>
			</li>
			<li>
				<span class="font-semibold text-white">Population:</span>
				<span
					>{data.population
						? (Number(data.population) / 1000000).toFixed(3) + ' millions'
						: 'No information'}</span
				>
			</li>
			<li>
				<span class="font-semibold text-white">Region:</span>
				<span>{data.region ?? 'No information'}</span>
			</li>
		</ul>
		<img
			src={data.image}
			alt={data.name}
			class="object-cover w-5/6 rounded-lg overflow-hidden"
			title={data.name}
		/>
		<ul>
			<li class="flex flex-col">
				Borders:
				{#if data.borders.length <= 0}
					<span>No information</span>
				{/if}
				<span class="text-xs flex flex-wrap">
					{#each data.borders as border}
						<span class="bg-blue-400/80 rounded-full py-0.5 px-2 m-2">{border}</span>
					{/each}
				</span>
			</li>
			<li class="flex flex-col">
				Languages:
				<span class="text-xs flex flex-wrap">
					{#each data.languages as language}
						<span class="bg-blue-400/80 rounded-full py-0.5 px-2 m-2">{language}</span>
					{/each}
				</span>
			</li>
		</ul>
	</div>
</section>

<style>
	section {
		height: calc(100% - 3.5rem);
	}
	section a {
		transform: translateX(-100%);
	}
	section img {
		width: 80%;
		margin: 1.5rem 10%;
	}
	section ul li {
		margin-top: 0.5rem;
	}
	.card-info {
		background-color: #44586f;
		box-shadow: 1px 1px 36px -3px #45556c;
		-webkit-box-shadow: 1px 1px 36px -3px #45556c;
		-moz-box-shadow: 1px 1px 36px -3px #45556c;
	}
</style>
