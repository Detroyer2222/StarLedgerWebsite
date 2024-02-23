<script lang="ts">
	import { Alert, Button, Heading, Input, Label, Helper, Modal } from 'flowbite-svelte';
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';

	export let data: PageData;
	export let form: ActionData;

	let deleteValue = '';
	let openDeleteAccountModal = false;
	let inputClass = 'my-4';
</script>

<div class="flex-column w-full">
	<Heading tag="h3">Public Profile</Heading>
	<hr class="my-2 h-px border-0 bg-gray-200 dark:bg-gray-700" />

	<form action="?/updateProfile" method="post" use:enhance class="w-3/5">
		<Alert border color="red" class="mt-10">
			<InfoCircleSolid slot="icon" class="h-4 w-4" />
			<span class="font-medium">Important!</span>
			Changing any value here requires you to re-login.
		</Alert>
		{#if form?.failed}
			<Alert color="red" border dismissable>
				<InfoCircleSolid slot="icon" />
				<span class="font-medium">Error!</span>
				Could not update profile. Please try again.
			</Alert>
		{/if}
		<div class={inputClass}>
			<Label class="space-y-2">
				<span>Your Star Citizen Username</span>
				<Input
					type="text"
					name="starCitizenHandle"
					placeholder="Star Citizen Handle"
					value={data.user?.name}
					color={form?.errors?.starCitizenHandle ? 'red' : 'base'}
				/>
				{#if form?.errors?.starCitizenHandle}
					<Helper color="red">{form?.errors?.starCitizenHandle[0]}</Helper>
				{/if}
			</Label>
		</div>
		<div class={inputClass}>
			<Label class="space-y-2">
				<span>Update Email</span>
				<Input type="email" name="email" required value={data.user?.email} color={form?.errors?.email ? 'red' : 'base'} />
				{#if form?.errors?.email}
					<Helper color="red">{form?.errors?.email[0]}</Helper>
				{/if}
			</Label>
		</div>
		<Button
			type="submit"
			color="green"
			class="bg-green-500 text-base font-normal hover:bg-green-400 dark:bg-green-700 dark:hover:bg-green-600 "
			>Update profile</Button
		>
	</form>
	{#if form?.deleteAccountFailed}
		<Alert color="red" border dismissable class="mt-5">
			<InfoCircleSolid slot="icon" />
			<span class="font-medium">Error!</span>
			Deleting account failed. Please try again.
		</Alert>
	{/if}
	<Button
		class="mt-5 w-3/5 bg-red-500 text-base font-normal hover:bg-red-400 dark:bg-red-700 dark:hover:bg-red-600"
		color="red"
		on:click={() => {
			openDeleteAccountModal = true;
		}}>Delete Account</Button
	>

	<Modal
		bind:open={openDeleteAccountModal}
		size="sm"
		autoclose
		outsideclose
		title="Are you sure you want to delete your account?"
		color="red"
	>
		<p>Type 'Delete Account' to confirm the deletion</p>
		<svelte:fragment slot="footer">
			<form method="post" action="?/deleteAccount" use:enhance>
				<Input type="text" name="deleteAccount" bind:value={deleteValue} class="w-full" />
				<div class="flex w-full flex-row space-x-4">
					<Button type="submit" color="red" class="mt-5" disabled={deleteValue !== 'Delete Account'}>Delete Account</Button>
					<Button type="submit" class="mt-5" color="alternative">Cancel</Button>
				</div>
			</form>
		</svelte:fragment>
	</Modal>

	<Alert border color="blue" class="mt-10 w-2/5">
		<InfoCircleSolid slot="icon" class="h-4 w-4" />
		<span class="font-medium">Info!</span>
		Additional functionality will be added soon.
	</Alert>
</div>
