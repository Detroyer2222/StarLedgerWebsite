<script lang="ts">
	import type { PageData } from '../../about/contact/$types';

	export let data: PageData;
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="mx-auto max-w-screen-md px-4 py-8 lg:py-16">
		<h2 class="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Contact Us</h2>
		<p class="mb-8 text-center font-light text-gray-500 dark:text-gray-400 sm:text-xl lg:mb-16">
			Got a technical issue? Have inquiries about GDPR laws?
		</p>
		<form action="post" class="space-y-8" use:enhance>
			<div>
				<label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
				<input
					type="email"
					id="email"
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light dark:focus:border-primary-500 dark:focus:ring-primary-500"
					placeholder="name@flowbite.com"
					required
				/>
			</div>
			<div>
				<label for="subject" class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
				<input
					type="text"
					id="subject"
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light dark:focus:border-primary-500 dark:focus:ring-primary-500"
					placeholder="Let us know how we can help you"
					required
				/>
			</div>
			<div class="sm:col-span-2">
				<label for="message" class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
				<textarea
					id="message"
					rows="6"
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
					placeholder="Leave a comment..."
				></textarea>
			</div>
			<button
				type="submit"
				class="rounded-lg bg-primary-700 px-5 py-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-fit"
				>Send message</button
			>
		</form>
	</div>
</section>
