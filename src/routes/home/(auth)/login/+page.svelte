<script lang="ts">
	import { A, Button, Label, Input, Alert, Helper } from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;

	export let form: ActionData;

	let failCount = 0;
	// Increment failCount every time the form fails
	$: if (form?.failed) failCount++;
</script>

<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Login to your account</h1>
<form action="?/login" method="post" class="mt-8 space-y-6" use:enhance>
	{#if form?.failed}
		<Alert color="red" border dismissable>
			<InfoCircleSolid slot="icon" />
			<span class="font-medium">Error!</span>
			Something went wrong while loggin in. Please try again.
		</Alert>
	{/if}
	{#if failCount > 2}
		<Alert color="red" border dismissable>
			<InfoCircleSolid slot="icon" />
			<span class="font-medium">Error!</span>
			Your Login requests could be processed at this time. Please contact support.
		</Alert>
	{/if}
	<div>
		<Label class="space-y-2">
			<span>Your email</span>
			<Input
				type="email"
				name="email"
				placeholder="name@company.com"
				required
				color={form?.errors?.email ? 'red' : 'base'}
				value={form?.data?.email ?? ''}
			/>
			{#if form?.errors?.email}
				<Helper color="red">{form?.errors?.email[0]}</Helper>
			{/if}
		</Label>
	</div>
	<div>
		<Label class="space-y-2">
			<span>Your password</span>
			<Input type="password" name="password" placeholder="••••••••" required color={form?.errors?.password ? 'red' : 'base'} />
			{#if form?.errors?.password}
				<Helper color="red">{form?.errors?.password[0]}</Helper>
			{/if}
		</Label>
	</div>
	<!-- TODO: Think about adding Checkbox to save email in localstorage -->
	<Button type="submit">Login</Button>
	<div class="text-sm font-medium text-gray-500 dark:text-gray-400">
		Not registered? <A href="/home/register">Create account</A>
	</div>
</form>
