<script lang="ts">
	import Picture from "./Picture.svelte";

	type RecipeCard = {
		slug: string;
		title: string;
		thumbnail?: string;
	};

	let {
		label,
		slug,
		recipes,
		moreHrefBase = '/recipes/seasons',
		showMore = true
	} = $props();

	const list = recipes as RecipeCard[];
	const href = `${moreHrefBase}/${slug}/`;
</script>

{#if list.length}
	<section class="home-section">
		<header>
			{#if showMore}
				<h2 class="-p txt-center brd-tp -m-y">
					<a href={href}>
						{label}
					</a>
				</h2>
			{:else}
				<h2 class="-p txt-center brd-tp -m-y">
					{label}
				</h2>
			{/if}
		</header>

		<ul class="grid">
			{#each list as recipe}
				<li class="card bg-light txt-center">
					<a href={`/recipes/${recipe.slug}/`}>
						{#if recipe.thumbnail}
							<Picture
								src={recipe.thumbnail}
								alt={recipe.title}
								width="620"
								height="320"
							/>
						{/if}
						<h3 class="txt-accent">{recipe.title}</h3>
					</a>
				</li>
			{/each}
		</ul>

		{#if showMore}
			<div class="txt-center">
				<a href={href} class="btn -ghost clr-white">
					More {label}
				</a>
			</div>
		{/if}
	</section>
{/if}
