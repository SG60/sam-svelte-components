<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Modal from '@samsveltecomponents/core/Modal.svelte';

	let open = false;
</script>

<Meta
	title="Modal"
	component={Modal}
	argTypes={{
		class: { control: 'text' }
	}}
/>

<Template let:args>
	<Modal {...args} bind:open>
		<h1>A MODAL</h1>
		<p>Modal here!</p>
		<button slot="buttons">All done!</button></Modal
	>
	<button on:click={() => (open = true)}>Open Modal</button>
</Template>

<Story name="standard" args={{ class: 'modal-styles' }} />

<style>
	:global(.modal-styles) {
		border-radius: 1rem;
		box-shadow: #000000 4px 4px 20px -5px;
		border-color: #b9bdc3;
		border-width: 2px;
	}
</style>
