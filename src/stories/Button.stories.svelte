<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
	title="Button CSS"
	argTypes={{
		contained_html: { name: 'Contained HTML', defaultValue: 'A Button' },
		classes: { name: 'CSS Classes' }
	}}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
	<button class="button {args.classes}">{@html args.contained_html}</button>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story name="Default" args={{ contained_html: 'Default Button <hr> Some Stuff' }} />

<Story
	name="Styled Button"
	args={{
		classes: 'bg-slate-500 text-white'
	}}
/>
