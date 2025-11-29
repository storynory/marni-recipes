<script lang="ts">
	//routes/recipes/+page.svelte
    
    import RecipeSection from '$lib/components/RecipeSection.svelte';

	let { data } = $props();

	let settings = data.settings;
	let recipes = $state(data.recipes);

let sorted = $derived(recipes.slice().sort((a, b) =>
		a.title.localeCompare(b.title)
	));


</script>

<svelte:head>
	<title>All Marni's Recipes</title>
	{#if settings.strapline}
		<meta name="description" content="All Marni's Recipes, from Breakfast to midnight" />
	{/if}
</svelte:head>

<main class="page panel">
	<header class="-p txt-center">
		<h1>All Recipes</h1>
   {settings.recipesPageIntro}
	</header>

	{#each sorted as recipe}
    <ul> 
    <li class="card">
        <a class="--full" href="/recipes/{recipe.slug}">{recipe.title}</a>  
    </li>
    </ul>
    {/each}



</main>
