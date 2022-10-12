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
		d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"
	/></svg
>
