<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Button from '$components/Button.svelte';
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
	title="Button CSS"
	component={Button}
	argTypes={{
		contained_html: { control: 'text', name: 'Contained HTML', defaultValue: 'button' },
		extraClasses: { control: 'text', name: 'class' }
	}}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
	<Button class={args.extraClasses} {...args}>{@html args.contained_html}</Button>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story name="Default" args={{ contained_html: 'Default Button <hr> Some Stuff' }} />

<Story
	name="Styled Button"
	args={{
		extraClasses: 'bg-slate-500 text-white'
	}}
/>
