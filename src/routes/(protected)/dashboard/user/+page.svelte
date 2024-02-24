<script lang="ts">
	import { Sidebar, SidebarWrapper, SidebarGroup, SidebarItem } from 'flowbite-svelte';
	import { GridSolid, MailBoxSolid, UserOutline, CogOutline } from 'flowbite-svelte-icons';
	import type { PageData } from './$types';

	export let data: PageData;
	//TODO: Make toggle between User and Organization
	//TODO: Add Organization Settings in the sidebar
</script>
