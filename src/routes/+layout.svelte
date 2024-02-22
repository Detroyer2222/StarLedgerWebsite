<script lang="ts">
	import '../app.css';
	import { Footer, FooterBrand, FooterCopyright, FooterIcon, FooterLink, FooterLinkGroup } from 'flowbite-svelte';
	import type { LayoutData } from './$types';
	import { DiscordSolid, GithubSolid } from 'flowbite-svelte-icons';

	export let data: LayoutData;
</script>

<slot />

<Footer footerType="socialmedia" class="mt-16">
	<div class="md:flex md:justify-between">
		<div class="mb-6 md:mb-0">
			<FooterBrand href="/" alt="StarLedger Logo" name="Star Ledger" />
		</div>
		<div class="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
			<!--<div>
					<h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
					<FooterLinkGroup>
						<FooterLink liClass="mb-4" href="/">Flowbite</FooterLink>
						<FooterLink liClass="mb-4" href="/">Tailwind CSS</FooterLink>
					</FooterLinkGroup>
				</div>-->
			<div>
				<h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">Follow me</h2>
				<FooterLinkGroup>
					<FooterLink liClass="mb-4" href="https://github.com/Detroyer2222">GitHub</FooterLink>
					<FooterLink liClass="mb-4" href="https://discordapp.com/users/232922680934924288">Discord</FooterLink>
				</FooterLinkGroup>
			</div>
			<div>
				<h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">Legal</h2>
				<FooterLinkGroup>
					<FooterLink liClass="mb-4" href="about/contact">Contact us</FooterLink>
					<FooterLink liClass="mb-4" href="/about/privacy">Privacy Policy</FooterLink>
					<FooterLink liClass="mb-4" href="about/terms">Terms & Conditions</FooterLink>
				</FooterLinkGroup>
			</div>
		</div>
	</div>
	<hr class="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
	<div class="sm:flex sm:items-center sm:justify-between">
		<FooterCopyright href="/" by="StarLedger™" />
		<div class="mt-4 flex space-x-6 sm:mt-0 sm:justify-center rtl:space-x-reverse">
			<FooterIcon href="https://discordapp.com/users/232922680934924288">
				<DiscordSolid class="h-4 w-4 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white" />
			</FooterIcon>
			<FooterIcon href="https://github.com/Detroyer2222">
				<GithubSolid class="h-4 w-4 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white" />
			</FooterIcon>
		</div>
	</div>
</Footer>
