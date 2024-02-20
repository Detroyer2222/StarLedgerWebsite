<script lang="ts">
	import { enhance } from '$app/forms';
	import { A, Checkbox, Button, Label, Input, Alert, Helper } from 'flowbite-svelte';
	import { EyeOutline, EyeSlashOutline, EnvelopeSolid, LockSolid, InfoCircleSolid } from 'flowbite-svelte-icons';
	import type { ActionData } from './$types';

	let showPassword = false;
	export let form: ActionData;
</script>

<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create a Free Account</h1>
<form action="?/register" method="post" class="mt-8 space-y-6" use:enhance>
	{#if form?.general}
		<Alert color="red" border dismissable>
			<InfoCircleSolid slot="icon" />
			<span class="font-medium">Error!</span>
			Something went wrong while creating your account. Please try again.
		</Alert>
	{/if}
	{#if form?.duplicate}
		<Alert color="red" border dismissable>
			<InfoCircleSolid slot="icon" />
			<span class="font-medium">Duplicate Email!</span>
			An Account with this email already exists.
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
			>
				<EnvelopeSolid slot="left" />
			</Input>
			{#if form?.errors?.email}
				<Helper color="red">{form?.errors?.email[0]}</Helper>
			{/if}
		</Label>
	</div>
	<div>
		<Label class="space-y-2">
			<span>Your password</span>
			<Input
				type={showPassword ? 'text' : 'password'}
				name="password"
				placeholder="••••••••"
				required
				color={form?.errors?.password ? 'red' : 'base'}
			>
				<LockSolid slot="left" />
				<button slot="right" on:click={() => (showPassword = !showPassword)} class="pointer-events-auto">
					{#if showPassword}
						<EyeOutline class="h-6 w-6" />
					{:else}
						<EyeSlashOutline class="h-6 w-6" />
					{/if}
				</button>
			</Input>
			{#if form?.errors?.password}
				<Helper color="red">{form?.errors?.password[0]}</Helper>
			{/if}
		</Label>
	</div>
	<div>
		<Label class="space-y-2">
			<span>Confirm password</span>
			<Input
				type="password"
				name="confirmPassword"
				placeholder="••••••••"
				required
				color={form?.errors?.confirmPassword ? 'red' : 'base'}
			>
				<LockSolid slot="left" />
			</Input>
			{#if form?.errors?.confirmPassword}
				<Helper color="red">{form?.errors?.confirmPassword[0]}</Helper>
			{/if}
		</Label>
	</div>
	<Checkbox name="terms">
		<span>
			I accept the <A href="about/terms">Terms and Conditions</A>
		</span>
	</Checkbox>
	{#if form?.errors?.terms}
		<Helper class="-mt-8" color="red">{form?.errors?.terms[0]}</Helper>
	{/if}
	<Button type="submit">Create account</Button>
	<div class="text-sm font-medium text-gray-500 dark:text-gray-400">
		Already have an account? <A href="/login">Login here</A>
	</div>
</form>
