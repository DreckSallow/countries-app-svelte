<script lang="ts">
	import Accordion from '$lib/components/common/accordion/accordion.svelte';
	import Checkbox from '$lib/components/common/input/checkbox.svelte';
	import RadioInput from '$lib/components/common/input/radio-input.svelte';
	import { filterStore } from '$lib/stores/filters/filter-store';
	const accordions = Object.entries($filterStore);
</script>

<div class="border-1 rounded overflow-hidden">
	{#each accordions as [key, { type, childs }], i (i)}
		{#if childs?.length}
			<Accordion>
				<div slot="header">{key}</div>
				<div slot="content">
					{#each childs as props, i (i)}
						{#if type === 0}
							<RadioInput {...props} />
						{:else}
							<Checkbox {...props} />
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
