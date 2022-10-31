<script lang="ts">
	let dialog: HTMLDialogElement;

	export let open: boolean;
	$: {
		if (dialog) {
			if (open) dialog.showModal();
			else dialog.close();
		}
	}

	let extraClasses = '';
	export { extraClasses as class };
</script>

<dialog on:close on:close={() => (open = false)} on:submit bind:this={dialog} class={extraClasses}>
	<slot />
	<form method="dialog">
		<slot name="buttons" />
	</form>
</dialog>
