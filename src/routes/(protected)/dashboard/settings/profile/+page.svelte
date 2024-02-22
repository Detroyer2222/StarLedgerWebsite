<script lang="ts">
	import { Alert, Button, Heading, Input, Label, Helper } from 'flowbite-svelte';
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';

	export let data: PageData;
	export let form: ActionData;

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
					required
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
		<Button type="submit" class="bg-green-500 text-base font-normal hover:bg-green-400 dark:bg-green-700 ">Update profile</Button>
	</form>
	<Alert border color="blue" class="mt-10 w-2/5">
		<InfoCircleSolid slot="icon" class="h-4 w-4" />
		<span class="font-medium">Info!</span>
		Additional functionality will be added soon.
	</Alert>
</div>
