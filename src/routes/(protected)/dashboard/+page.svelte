<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	export let data: PageData;
</script>

<h1>Dashboard</h1>
<p>Some text that should show up</p>
<p>{data.user?.email}</p>
<p>{data.user?.name}</p>
