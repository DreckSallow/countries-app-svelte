<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	export let queryParent: string = '#app';
	export let showModal: boolean = false;
	export let classNameDiv: string = '';
	export let classNameModal: string = '';
	let elementContainer: HTMLElement | null = null;
	onMount(() => {
		elementContainer = document.querySelector(queryParent);
	});
	const handleCkick = () => {
		showModal = !showModal;
	};
	$: if (showModal && elementContainer) {
		elementContainer.style.overflow = 'hidden';
	}
	$: if (!showModal && elementContainer) {
		elementContainer.style.overflow = 'auto';
	}
</script>

<div on:click={handleCkick} class={classNameDiv}>
	<slot name="modalIcon" />
</div>

{#if showModal && $$slots.modalIcon}
	<section class="absolute left-0 h-full sm:w-60 w-3/6 {classNameModal}" transition:fade>
		<slot name="modalContent" />
		<button on:click={handleCkick} class="absolute top-0 right-0">X</button>
	</section>
{/if}
