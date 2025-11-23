<script lang="ts">
	  import { getContext } from 'svelte';
      import Hero from "$lib/components/hero.svelte"
    
    import Skillet from '$lib/icons/skillet.svelte';
	import Cake from '$lib/icons/cake.svelte';
	import Breakfast from '$lib/icons/breakfast.svelte';
	import Lunch from '$lib/icons/lunch.svelte';
	import Dinner from '$lib/icons/dinner.svelte';
	import Desert from '$lib/icons/fruit.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import type { Recipe, Season, SiteSettings } from '$lib/server/content-bkup.js'; // adjust path
   
	let { data } = $props();

	let settings: SiteSettings = data.settings;
	let featuredRecipes: Recipe[] = data.featuredRecipes;
	let allRecipes: Recipe[] = data.allRecipes;
	let seasons: Season[] =  data.seasons;

	type SectionDef = {
		slug: string;
		label: string;
		Icon: typeof Cake;
		className: string;
	};

	const sections: SectionDef[] = [
		{ slug: 'cakes', label: 'Cakes', Icon: Cake, className: 'cake' },
		{ slug: 'breakfast', label: 'Breakfast', Icon: Breakfast, className: 'breakfast' },
		{ slug: 'lunch', label: 'Lunch', Icon: Lunch, className: 'lunch' },
		{ slug: 'dinner', label: 'Dinner', Icon: Dinner, className: 'dinner' },
		{ slug: 'dessert', label: 'Dessert', Icon: Desert, className: 'dessert' } // keep slug "desert" for URLs
	];

	// ------- Tag helpers (max 4) -------

	function recipesFor(slug: string): Recipe[] {
		return featuredRecipes
			.filter((recipe) => recipe.tags?.includes(slug))
			.slice(0, 4);
	}

	// ------- Season helpers (max 4) -------

	const featuredSeasonSlug: string | undefined = settings.featuredSeason;

	const currentSeason: Season | undefined = $derived(
		featuredSeasonSlug
			? seasons.find((s) => s.slug === featuredSeasonSlug)
			: undefined
	);

	function recipesForSeason(slug: string): Recipe[] {
		// Use allRecipes so seasonal pull-out isn’t limited
		return allRecipes
			.filter((recipe) => recipe.seasons?.includes(slug))
			.slice(0, 4);
	}

    let setttings = getContext('settings')
</script>

<svelte:head>
	<title>{settings.siteTitle}</title>
	{#if settings.strapline}
		<meta name="description" content={settings.strapline} />
	{/if}
</svelte:head>

<main class="page panel page">
<Hero />

	<!-- 🌿 Seasonal section -->
	{#if currentSeason}
		{@const seasonList = recipesForSeason(currentSeason.slug)}
		{#if seasonList.length}
			<section class="home-season">
				<header>
					<h2 class="-p txt-center brd-tp -m-y">
						<a href="recipes/seasons/{currentSeason.slug}">
							{currentSeason.title} Recipes
						</a>
					</h2>
				</header>

				<ul class="grid">
					{#each seasonList as recipe}
						<li class="card bg-light txt-center">
							<a href="/recipes/{recipe.slug}">
								{#if recipe.thumbnail}
									<Picture
										src={recipe.thumbnail}
										alt="{recipe.title} for {recipe.seasons}" 
										sizes="(min-width: 1024px) 33vw,
											(min-width: 640px) 50vw,
											100vw"
										class="card-image"
									></Picture>
								{/if}
								<h3 class="txt-accent">{recipe.title}</h3>
							</a>
						</li>
					{/each}
				</ul>

				<div class="txt-center">
					<a href="recipes/seasons/{currentSeason.slug}" class="btn -ghost clr-white">
						More {currentSeason.title} recipes
					</a>
				</div>
			</section>
		{:else}
			<!-- Optional: debug text while you’re wiring it up -->
			<!-- <p class="txt-center">No recipes found for {currentSeason.slug}</p> -->
		{/if}
	{/if}

	<!-- Tag sections in same order as nav -->
	{#each sections as section}
		{@const list = recipesFor(section.slug)}
		{#if list.length}
			<section class="home-section home-section--{section.className}">
				<header>
					<h2 class="-p {section.slug} txt-center brd-tp -m-y">
						<a href="recipes/tag/{section.slug}" class="{section.slug}">
							<span class="home-section-icon">
								<section.Icon></section.Icon>
							</span>
							{section.label}
						</a>
					</h2>
				</header>

				<ul class="grid">
					{#each list as recipe}
						<li class="card bg-light txt-center">
							<a href="recipes/{recipe.slug}">
								{#if recipe.thumbnail}
									<Picture
										src={recipe.thumbnail}
										alt="{recipe.title} for {section.label}" 
										sizes="(min-width: 1024px) 33vw,
											(min-width: 640px) 50vw,
											100vw"
										class="card-image"
									></Picture>
								{/if}
								<h3 class="txt-accent">{recipe.title}</h3>
							</a>
						</li>
					{/each}
				</ul>

				<div class="txt-center">
					<a href="recipes/tag/{section.slug}" class="btn -ghost clr-white">
						More {section.label}
					</a>
				</div>
			</section>
		{/if}
	{/each}
</main>
