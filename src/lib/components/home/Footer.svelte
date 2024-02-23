<script>
	import { Footer, FooterBrand, FooterLinkGroup, FooterLink, FooterIcon, FooterCopyright } from 'flowbite-svelte';
	import { DiscordSolid, GithubSolid } from 'flowbite-svelte-icons';
</script>

<Footer footerType="logo" class="mt-16">
	<div class="sm:flex sm:items-center sm:justify-between">
		<FooterBrand href="/home" alt="StarLedger Logo" name="Star Ledger" />
		<FooterLinkGroup ulClass="flex flex-wrap items-center gap-x-6 mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
			<FooterLink liClass="mb-4" href="about/contact">Contact us</FooterLink>
			<FooterLink liClass="mb-4" href="/about/privacy">Privacy Policy</FooterLink>
			<FooterLink liClass="mb-4" href="about/terms">Terms & Conditions</FooterLink>

			<FooterIcon href="https://discordapp.com/users/232922680934924288" class="mb-4">
				<DiscordSolid class="h-4 w-4 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white" />
			</FooterIcon>
			<FooterIcon href="https://github.com/Detroyer2222" class="mb-4">
				<GithubSolid class="h-4 w-4 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white" />
			</FooterIcon>
		</FooterLinkGroup>
	</div>
	<hr class="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
	<FooterCopyright href="/" by="StarLedger™" />
</Footer>
