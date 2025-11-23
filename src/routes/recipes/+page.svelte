<script lang="ts">
	//routes/recipes/+page.svelte
    
    import RecipeSection from '$lib/components/RecipeSection.svelte';

	let { data } = $props();

	let settings = $derived(data.settings);
	let recipes = $derived(data.recipes);
</script>

<svelte:head>
	<title>All Marni's Recipes</title>
	{#if settings.strapline}
		<meta name="description" content="All Marni's Recipes, from Breakfast to midnight" />
	{/if}
</svelte:head>

<main class="page panel">
	<section class="-p txt-center">
		<h1>All Recipes</h1>
	</section>

	<RecipeSection
		label="All Recipes"
		slug="all"
		recipes={recipes}
		moreHrefBase="/recipes"
        showMore={false}
	></RecipeSection>
</main>
