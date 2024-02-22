<script lang="ts">
	import { Sidebar, SidebarWrapper, SidebarGroup, SidebarItem } from 'flowbite-svelte';
	import { CogOutline, UserOutline } from 'flowbite-svelte-icons';
	import type { LayoutData } from '../$types';
	import { page } from '$app/stores';

	export let data: LayoutData;
	let spanClass = 'flex-1 ms-3 whitespace-nowrap';

	$: activeUrl = $page.url.pathname;
	let activeClass =
		'flex items-center p-2 text-base font-normal text-primary-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-gray-700';
	let nonActiveClass =
		'flex items-center p-2 text-base font-normal text-green-900 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-gray-700';
</script>

<div class="mt-5 flex">
	<div class="w-1/5">
		<Sidebar {activeUrl} {activeClass} {nonActiveClass}>
			<SidebarWrapper class="bg-inherit">
				<SidebarGroup>
					<SidebarItem label=" Public Profile" {spanClass} href="/dashboard/settings/profile">
						<svelte:fragment slot="icon">
							<UserOutline
								class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
							/>
						</svelte:fragment>
					</SidebarItem>
					<!--<SidebarItem label="Account" {spanClass} href="/dashboard/settings/account">
						<svelte:fragment slot="icon">
							<CogOutline
								class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
							/>
						</svelte:fragment>
					</SidebarItem>-->
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>
	</div>

	<slot class="mx-4 mt-2 w-3/5" />
</div>
