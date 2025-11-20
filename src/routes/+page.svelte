<script lang="ts">
    // front page
	import Skillet from '$lib/icons/skillet.svelte';
	import Cake from '$lib/icons/cake.svelte';
	import Breakfast from '$lib/icons/breakfast.svelte';
	import Lunch from '$lib/icons/lunch.svelte';
	import Dinner from '$lib/icons/dinner.svelte';
	import Desert from '$lib/icons/fruit.svelte';
	// adjust icon import paths to match your project

	let { data } = $props();

	let settings = $derived(data.settings);
	let featuredRecipes = $derived(data.featuredRecipes);

	type SectionDef = {
		slug: string;
		label: string;
		Icon: typeof Cake;
		className: string;
	};

	// Order matches your nav
	const sections: SectionDef[] = [
		{ slug: 'cakes', label: 'Cakes', Icon: Cake, className: 'cake' },
		{ slug: 'breakfast', label: 'Breakfast', Icon: Breakfast, className: 'breakfast' },
		{ slug: 'lunch', label: 'Lunch', Icon: Lunch, className: 'lunch' },
		{ slug: 'dinner', label: 'Dinner', Icon: Dinner, className: 'dinner' },
		// slug kept as "desert" to match your existing URLs,
		// but label shown as "Dessert"
		{ slug: 'desert', label: 'Dessert', Icon: Desert, className: 'dessert' }
	];

	function recipesFor(slug: string) {
		return featuredRecipes.filter((recipe) => recipe.tags?.includes(slug));
	}
</script>

<svelte:head>
	<title>{settings.siteTitle}</title>
	{#if settings.strapline}
		<meta name="description" content={settings.strapline} />
	{/if}
</svelte:head>

<main class="page panel page">
	<section class="grid  -p">
		<div class="heroine-image">
			<img
				src="/cooking-girl-left.jpg"
				alt="cooking girl"
                />
	
		</div>

		<div class="hero-text">
			<h1 class="txt-center">
				<a href="/">Hello I'm Marni</a>
			</h1>
			<p class="txt-center">
				<Skillet></Skillet>
			</p>
			<p class="lede txt-center max-measure brand-font">
				There will be a picture of me here and an intro saying that you 
				can use my recipes and if you live near Oxford I can bake you a cake, 
				cook for your dinner party, or cater for your special event.
				Catch me on Tik Tok.
			</p>
		</div>
	</section>

	<!-- Tag sections in same order as nav -->
	{#each sections as section}
		{@const list = recipesFor(section.slug)}
		{#if list.length}
		
				<header>
					<h2 class="-p txt-center brd-tp -m-y">
						<a href={`/recipes/tag/${section.slug}/`}>
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
							<a href="/recipes{recipe.slug}/">
								{#if recipe.thumbnail}
									<img
										src={recipe.thumbnail}
										alt={recipe.title}
										width="620"
										height="320"
									>
								{/if}
								<h3 class="txt-accent">{recipe.title}</h3>
							</a>
						</li>
					{/each}
				</ul>
               <div class="txt-center">
				<a href={`/recipes/tag/${section.slug}/`} class="btn -ghost  clr-white">
							More {section.label}
						</a>
                        </div>
		{/if}
	{/each}
</main>

