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
	<path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
</svg>
