<script lang="ts">
	import { page } from '$app/stores';
	import Globe from '$lib/components/svg/globe.svelte';
</script>

<section class="w-full flex flex-center flex-col sm:flex-row">
	<div class="mb-10 sm:mb-0">
		<Globe className="globe w-40 h-40 fill-blue-200" />
	</div>
	<div class="flex flex-col text-start sm:ml-10">
		<header class="text-blue-300 text-4xl font-semibold">
			{$page.status}
		</header>
		<div class="text-blue-300 mb-3">
			{$page.error?.message ?? 'Unexpected error'}
		</div>
		<div class="text-sm flex flex-row gap-10 mb-2 justify-center">
			<button
				class="rounded py-2 px-4 bg-blue-300"
				on:click={() => {
					window.history.back();
				}}>Go back</button
			>
			<a href="/" class="rounded py-2 px-4 bg-blue-300">Home</a>
		</div>
	</div>
</section>

<style>
	section {
		height: calc(100% - 3.5rem);
	}
	:global(.globe) {
		animation: spin 7s linear infinite;
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
