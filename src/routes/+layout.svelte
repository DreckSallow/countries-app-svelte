<script lang="ts">
	import type { LayoutData } from './$types';
	import '../app.css';
	let skipPaths = ['/'];
	let showNav = true;
	export let data: LayoutData;
	$: showNav = skipPaths.find((p) => p === data.pathName) ? false : true;
</script>

<main class="bg-slate-700 text-white min-h-screen relative">
	{#if showNav}
		<nav>
			<a href="/">Home</a>
			<a sveltekit:prefetch href="/countries">countries</a>
		</nav>
	{/if}
	<slot />
</main>
