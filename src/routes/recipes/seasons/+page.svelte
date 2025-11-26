<script lang="ts">
	import RecipeSection from '$lib/components/RecipeSection.svelte';

	let { data } = $props();

	let settings = $derived(data.settings);
	let seasonGroups = $derived(data.seasonGroups);
</script>

<svelte:head>
	<title>Seasonal recipes – {settings.siteTitle}</title>
	{#if settings.strapline}
		<meta name="description" content="Browse My recipes by Season" />
	{/if}
</svelte:head>

<main class="page panel">
	<section class="-p txt-center">
		<h1>Seasonal recipes</h1>
		<p class="lede">
			Browse Marni’s recipes by season – Christmas, Easter and more.
		</p>
	</section>

	{#each seasonGroups as group}
		<RecipeSection
			label={group.title}
			slug={group.slug}
			recipes={group.recipes}
			moreHrefBase="/recipes/seasons"
		></RecipeSection>
	{/each}
</main>
