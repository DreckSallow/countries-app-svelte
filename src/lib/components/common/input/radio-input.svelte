<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	type ValueInput = string | number;
	export let text = '';
	export let value: ValueInput = '';
	export let className: string = '';
	export let name: string = 'relation';
	export let dotCss: string = '';
	export let classCheck: string = '';
	let checkElement: HTMLInputElement | null = null;
	const dispatcher = createEventDispatcher();
	const handleClick = () => {
		if (checkElement?.checked) {
			dispatcher('check', {
				value
			});
		}
	};
</script>

<label class="cursor-pointer select-none grid gap-1 items-center {className}">
	<span class="text col-span-2">{text}</span>
	<input
		type="radio"
		class="absolute h-0 w-0 cursor-pointer"
		{name}
		on:click={handleClick}
		bind:value
		bind:this={checkElement}
	/>
	<span
		class="class-checked h-4 w-4 bg-white left-0 rounded-full col-span-1 overflow-hidden {classCheck}"
	>
		<div class="class-checked-icon flex flex-center opacity-0 max-h-full max-w-full h-full w-full">
			<div class="bg-blue-400 h-2/4 w-2/4 rounded-full {dotCss}" />
		</div>
	</span>
</label>

<style>
	label {
		grid-template-columns: 30px 1fr;
		grid-auto-flow: dense;
	}
	label > .class-checked {
		grid-column: 1/2;
	}
	label > .text {
		grid-column: 2/3;
	}
	input:checked ~ .class-checked > div {
		opacity: 1;
	}
</style>
