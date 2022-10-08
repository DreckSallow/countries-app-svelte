<script lang="ts">
	export let width: number = 24;
	export let height: number = 24;
	export let fill: string = 'white';
	export let className: string = '';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	{width}
	{height}
	{fill}
	viewBox="0 0 24 24"
	class={className}
>
	<path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
</svg>
