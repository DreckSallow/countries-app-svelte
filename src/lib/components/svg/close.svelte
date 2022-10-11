<script lang="ts">
	export let width: number = 24;
	export let height: number = 24;
	export let className: string = '';
	export let fill: string = 'white';
</script>

<svg
	class={className}
	xmlns="http://www.w3.org/2000/svg"
	{width}
	{height}
	viewBox="0 0 24 24"
	{fill}
>
	<path
		d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"
	/>
</svg>
