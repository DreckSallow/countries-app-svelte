<script lang="ts">
	export let width: number = 24;
	export let height: number = 24;
	export let className: string = '';
	export let stroke: string = 'currentColor';
	export let fill: string = 'white';
	export let strokeWidth: number = 2;
</script>

<svg
	class={className}
	xmlns="http://www.w3.org/2000/svg"
	{width}
	{height}
	{stroke}
	stroke-width={strokeWidth}
	viewBox="0 0 24 24"
	{fill}
	><path
		d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"
	/></svg
>
