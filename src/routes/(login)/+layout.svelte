<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import { writable, type Writable } from 'svelte/store';
	import { getContext } from 'svelte';
</script>

<main class="w-full bg-gray-50 dark:bg-gray-900">
	<div class="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 pt-8 dark:bg-gray-900 md:h-screen">
		<a href="/" class="mb-8 flex items-center justify-center text-2xl font-semibold dark:text-white lg:mb-10">
			<!--<img src={site.img} class="mr-4 h-11" alt={site.imgAlt} />-->
			<span>Star Ledger</span>
		</a>
		<!-- Card -->
		<Card class="w-full">
			<slot />
		</Card>
	</div>
</main>
