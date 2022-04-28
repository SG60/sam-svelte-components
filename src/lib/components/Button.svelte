<script lang="ts">
	let extraClasses: string = '';
	export { extraClasses as class };
</script>

<button class="button {extraClasses}">
	<slot />
</button>
