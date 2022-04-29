<script lang="ts">
	let extraClasses = '';
	let type = 'button';
	export { extraClasses as class };
</script>

<button
	class="block justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-200 hover:border-blue-300 focus:outline outline-2 outline-offset-2 outline-blue-300 {extraClasses}"
	{type}
>
	<slot />
</button>
