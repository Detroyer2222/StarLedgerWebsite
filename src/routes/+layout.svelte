<script lang="ts">
	import Footer from '$lib/components/home/Footer.svelte';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="flex min-h-screen flex-col">
	<slot />
	<div class="grow"></div>
	<Footer />
</div>
