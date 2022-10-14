<script lang="ts">
	import Accordion from '$lib/components/common/accordion/accordion.svelte';
	import Checkbox from '$lib/components/common/input/checkbox.svelte';
	import RadioInput from '$lib/components/common/input/radio-input.svelte';
	type Reg = [string, { type: number; childs: any[] }];
	export let accordions: Reg[] = [];
	export let handleRadioInput = (k: string, v: any) => {};
	export let handleCheckInput = (k: string, v: any) => {};
</script>

<div class="border-1 rounded overflow-hidden">
	{#each accordions as [key, { type, childs }], i (i)}
		{#if childs?.length}
			<Accordion>
				<div slot="header">{key}</div>
				<div slot="content" class="text-start">
					{#each childs as props, i (i)}
						{#if type === 0}
							<RadioInput {...props} on:check={(e) => handleRadioInput(key, e.detail)} />
						{:else}
							<Checkbox {...props} on:check={(e) => handleCheckInput(key, e.detail)} />
						{/if}
					{/each}
				</div>
			</Accordion>
		{:else}
			<Accordion>
				<div slot="header">{key}</div>
			</Accordion>
		{/if}
	{/each}
</div>
