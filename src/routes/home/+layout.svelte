<script lang="ts">
	import { goto } from '$app/navigation';

	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, DarkMode } from 'flowbite-svelte';
	import { HomeSolid } from 'flowbite-svelte-icons';

	let linkClass =
		'font-semibold text-lg text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';
</script>

<svelte:head>
	<title>Star Ledger Asset Management</title>
</svelte:head>

<Navbar>
	<NavBrand href="/home">
		<HomeSolid color="primary" class="me-3 h-6 sm:h-9" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Star Ledger</span>
	</NavBrand>

	<div class="flex md:order-2">
		<Button size="sm" class="text-lg font-semibold" on:click={() => goto('/home/register')}>Get started</Button>
		<NavHamburger />
	</div>
	<NavUl class="order-1 ml-auto">
		<NavLi href="/home" class={linkClass}>Home</NavLi>
		<NavLi href="/home/about/contact" class={linkClass}>Contact</NavLi>

		<NavLi href="/home/login" class={linkClass}>Login</NavLi>
	</NavUl>
	<div class="order-3 ml-2">
		<DarkMode />
	</div>
</Navbar>

<slot />
