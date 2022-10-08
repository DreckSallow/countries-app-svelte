<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	type ValueInput = string | number;
	type CssProp = { on: string; off: string };
	type Css = { icon?: CssProp; cube?: CssProp };
	export let text = '';
	export let value: ValueInput = '';
	export let className = '';
	export let selected = false;
	export let css: Css = {};
	$: styles = {
		icon: css.icon ?? { on: 'white', off: '#93c5fd' },
		cube: css.cube ?? { on: '#93c5fd', off: 'white' }
	};
	export let classCheck = '';
	let checkElement: HTMLInputElement | null = null;
	const dispatcher = createEventDispatcher();
	const handleClick = () => {
		dispatcher('check', {
			value,
			selected: checkElement?.checked
		});
	};
</script>

<label id="switch-container" class="cursor-pointer select-none grid gap-1 items-center {className}">
	<span class="text col-span-2">{text}</span>
	<input
		type="checkbox"
		class="absolute h-0 w-0 cursor-pointer bg-white"
		on:click={handleClick}
		checked={selected}
		{value}
		bind:this={checkElement}
	/>
	<span
		id="switch-content"
		class="class-checked p-0.5 h-5 w-10 left-0 rounded-full col-span-1 overflow-hidden  {classCheck}"
		style="--off:{styles.cube.off};--on:{styles.cube.on};"
	>
		<div class="class-checked-icon flex flex-center h-full w-full max-h-full max-w-full relative">
			<div
				class="rounded-full h-full w-2/4 bg-blue-400 absolute left-0 right-auto"
				style="--off:{styles.icon.off};--on:{styles.icon.on};"
			/>
		</div>
	</span>
</label>

<style>
	label {
		grid-template-columns: 0.5fr 1fr;
		grid-auto-flow: dense;
	}
	label > .class-checked {
		grid-column: 1/2;
	}
	label > .text {
		grid-column: 2/3;
	}
	input ~ span {
		background-color: var(--off);
	}
	input:checked ~ span {
		background-color: var(--on);
		background-color: rgb(147 197 253);
		transition: background-color 300ms ease;
	}
	input:checked ~ .class-checked > div > div {
		right: 0;
		left: 50%;
		background-color: var(--on);
	}
	.class-checked > div > div {
		transition: right 200ms ease, left 200ms ease-in;
		background-color: var(--off);
	}
</style>
