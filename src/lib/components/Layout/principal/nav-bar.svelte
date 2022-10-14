<script lang="ts">
	import { SvelteKitFetch, type NavigatorOpt } from '$lib/types/anchor/nav-bar-types';
	export let currentPath: string;
	export let navigation: NavigatorOpt;
	$: sections = Object.values(navigation);
</script>

<nav class="bg-blue-400 text-white min-w-full flex flex-row justify-start items-center h-14 px-4">
	<slot />
	{#each sections as { path, text, svelteKit }}
		<a
			href={path}
			data-sveltekit:prefetch={svelteKit === SvelteKitFetch.prefetch ? 'true' : 'off'}
			data-sveltekit:reload={svelteKit === SvelteKitFetch.reload ? 'true' : 'off'}
			data-sveltekit:noscroll={svelteKit === SvelteKitFetch.noscroll ? 'true' : 'off'}
			class="ml-6 rounded-md px-3 py-2 font-medium text-sm {currentPath === path
				? 'bg-blue-100 text-blue-600'
				: 'hover:bg-blue-100/90 hover:text-sky-600'}"
		>
			{text}
		</a>
	{/each}
</nav>
