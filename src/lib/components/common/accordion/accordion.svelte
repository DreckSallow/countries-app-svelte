<script lang="ts">
	import Chevron from '$lib/components/svg/chevron.svelte';
	import { tweened } from 'svelte/motion';

	export let className = '';
	const height = tweened(0, {
		duration: 300
	});
	let isClicked = false;
	const showContent = () => {
		isClicked = !isClicked;
		if ($height === 0 && $$slots['content']) height.set(10);
		else height.set(0);
	};
</script>

<section class="overflow-hidden {className}">
	<header
		class="bg-blue-300 h-9 w-full flex flex-center {!$$slots['content'] && 'bg-blue-300/80'}"
		on:click={showContent}
	>
		<slot name="header" />
		<Chevron
			className="rotate-90 {!$$slots['content'] ? '' : 'icon'} {!$$slots['content']
				? ''
				: isClicked
				? '-rotate-90'
				: ''}"
		/>
	</header>
	<div
		class="border-1 overflow-hidden overflow-y-auto flex flex-col"
		style={`height: ${$height}rem;`}
	>
		<div class="p-2">
			<slot name="content" />
		</div>
	</div>
</section>

<style>
	:global(.icon) {
		transition: transform 300ms ease-in;
	}
	::-webkit-scrollbar {
		width: 3px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: #cfcaca00;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 5px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: rgb(112, 111, 111);
	}
</style>
