<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import '../app.css';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
	import { HomeSolid } from 'flowbite-svelte-icons';

	$: activeUrl = $page.url.pathname;
	let activeClass =
		'font-semibold text-lg text-white bg-green-700 md:bg-transparent md:text-green-700 md:dark:text-white dark:bg-green-600 md:dark:bg-transparent';
	let nonActiveClass =
		'font-semibold text-lg text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';
</script>

<Navbar>
	<NavBrand href="/">
		<HomeSolid color="primary" class="me-3 h-6 sm:h-9" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Star Ledger</span>
	</NavBrand>
	<NavHamburger />
	<slot name="navbar">
		<div class="flex md:order-2">
			<Button size="sm" class="text-lg font-semibold" on:click={() => goto('/register')}>Get started</Button>
		</div>
		<NavUl {activeUrl} {activeClass} {nonActiveClass} class="ml-auto">
			<NavLi href="/">Home</NavLi>
			<!--<NavLi href="/pricing">Pricing</NavLi>-->
			<NavLi href="/contact">Contact</NavLi>
		</NavUl>
	</slot>
</Navbar>

<slot />
