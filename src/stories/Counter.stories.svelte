<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import Counter from '$lib/Counter.svelte';
</script>

<Meta title="Counter" component={Counter} />

<Story id="counterdefault" name="default">
	<Counter />
</Story>
