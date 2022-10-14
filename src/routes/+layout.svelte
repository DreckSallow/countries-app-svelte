<script lang="ts">
	import type { LayoutData } from './$types';
	import '../app.css';
	import NavBar from '$lib/components/Layout/principal/nav-bar.svelte';
	import { SvelteKitFetch, type NavigatorOpt } from '$lib/types/anchor/nav-bar-types';
	import Globe from '$lib/components/svg/globe.svelte';
	let skipPaths = ['/'];
	let showNav = true;
	export let data: LayoutData;
	$: showNav = skipPaths.find((p) => p === data.pathName) ? false : true;
	const navigator: NavigatorOpt = {
		home: {
			path: '/',
			text: 'Home'
		},
		countries: {
			path: '/countries',
			text: 'Countries',
			svelteKit: SvelteKitFetch.prefetch
		}
	};
</script>

<main
	id="layout-app"
	class="bg-slate-700 text-white min-h-screen relative min-w-full h-screen overflow-x-hidden overflow-y-auto"
>
	{#if showNav}
		<NavBar navigation={navigator} currentPath={data.pathName}>
			<Globe />
		</NavBar>
	{/if}
	<slot />
</main>
