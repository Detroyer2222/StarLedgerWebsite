<script lang="ts">
	//Dynamic Theming
	import 'carbon-components-svelte/css/all.css';
	import type { LayoutData } from './$types';

	import { Theme, RadioButtonGroup, RadioButton } from 'carbon-components-svelte';

	export let data: LayoutData;
	let theme = 'g100';
</script>

<slot />

<Theme
	bind:theme
	persist
	persistKey="__carbon-theme"
	render="toggle"
	toggle={{
		themes: ['g10', 'g100'],
		labelA: 'Enable dark mode',
		labelB: 'Enable dark mode',
		hideLabel: true,
		size: 'sm'
	}}
/>
