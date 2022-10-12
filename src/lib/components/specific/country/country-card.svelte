<script lang="ts">
	export let name: string = '';
	export let capital: string | null = null;
	export let region: string | null = null;
	export let src: string = '';
	export let id: string;
</script>

<div class="rounded-md overflow-hidden w-44 shadow-md h-56">
	<div class="w-full h-28 overflow-hidden">
		<img {src} alt={name} class="h-full w-full object-cover" />
	</div>
	<div class="flex flex-col bg-white text-slate-900 px-2 py-1 h-28 gap-1 flex-center">
		<h4 class="font-medium w-full ellipsis mb-1 max-h-12 text-center" title={name}>{name}</h4>
		<div class="text-xs py-1 w-full flex flex-center gap-1">
			<span class="bg-slate-200 px-2 py-1 rounded ellipsis" title={region}
				>{region || 'Not exist'}</span
			>
			<span class="bg-slate-200 px-2 py-1 rounded ellipsis" title={capital}>
				{capital || 'Not exist'}
			</span>
		</div>
		<a
			href="/countries/{id}"
			class="flex flex-center text-blue-400 text-xs pt-1 hover:underline underline-offset-2 no-underline"
		>
			See country
		</a>
	</div>
</div>
