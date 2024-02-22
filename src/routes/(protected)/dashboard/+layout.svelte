<script lang="ts">
	import { page } from '$app/stores';
	import {
		Navbar,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl,
		DarkMode,
		Avatar,
		Dropdown,
		DropdownDivider,
		DropdownHeader,
		DropdownItem,
		Select
	} from 'flowbite-svelte';
	import { UserSolid } from 'flowbite-svelte-icons';
	import type { LayoutData } from './$types';
	import { goto } from '$app/navigation';

	export let data: LayoutData;
	let selected: string;
	let countries = [
		{ value: 'us', name: 'United States' },
		{ value: 'ca', name: 'Canada' },
		{ value: 'fr', name: 'France' }
	];

	let linkClass =
		'font-semibold text-lg text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';
</script>

<svelte:head>
	<title>Star Ledger Dashboard</title>
</svelte:head>

<Navbar>
	<NavBrand href="/home">
		<!--<img src="/" class="me-3 h-6 sm:h-9" alt="Star Ledger Logo" />-->
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Star Ledger</span>
	</NavBrand>
	<div class="flex items-center md:order-2">
		<Avatar id="avatar-menu">
			<UserSolid />
		</Avatar>
		<DarkMode class="order-2" />
		<NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
	</div>
	<Dropdown placement="bottom" triggeredBy="#avatar-menu">
		<DropdownHeader>
			{#if data.user.name !== data.user.email}
				<span class="block text-sm">{data.user.name}</span>
			{/if}
			<span class="block truncate text-sm font-medium">{data.user.email}</span>
		</DropdownHeader>
		<DropdownItem href="/dashboard/user">Settings</DropdownItem>
		<DropdownItem href="/home/about">About</DropdownItem>
		<DropdownItem href="/home//contact">Contact</DropdownItem>
		<DropdownDivider />
		<DropdownItem href="/home/logout">Sign out</DropdownItem>
	</Dropdown>
	<NavUl>
		<NavLi href="/dashbord" class={linkClass}>Dashboard</NavLi>
	</NavUl>
</Navbar>

<slot />
