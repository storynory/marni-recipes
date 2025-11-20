<script lang="ts">
	import { getTagBySlug } from '$lib/server/content.js';

	let { data } = $props();

	let settings = data.settings;
	let recipes = data.recipes; // plural
</script>

<svelte:head>
	<title>Recipes – {settings.siteTitle}</title>
</svelte:head>

<main class="page">
	<h1>All recipes</h1>

	
		{#each recipes as rep}
       
        <ul class="recipe-grid">
			<li class="recipe-card">
				<a href={`/recipes/{rep.slug}/`}>
					{#if rep.thumbnail}
						<img src={rep.thumbnail} alt={rep.title}/>
					{/if}
					<h2>{rep.title}</h2>
				</a>
			</li>
            </ul>
         
		{/each}
	
</main>
