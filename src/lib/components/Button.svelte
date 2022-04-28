<script lang="ts">
	let extraClasses = '';
	export { extraClasses as class };
</script>

<button class="button {extraClasses}">
	<slot />
</button>
