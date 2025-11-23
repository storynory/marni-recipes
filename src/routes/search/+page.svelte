<script lang="ts">
	import Fuse from 'fuse.js';

	let { data } = $props();

	// Match the type used in +page.server.ts
	type SearchRecipe = {
		slug: string;
		title: string;
		date: string | null;
		thumbnail: string | null;
		tags: string[];
		seasons: string[];
		tagTitles: string[];
		seasonTitles: string[];
		searchText: string;
	};

	let settings = $derived(data.settings);
	let tags = $derived(data.tags);
	let seasons = $derived(data.seasons);

	// full static search index from +page.server.ts
	let index: SearchRecipe[] = $derived(data.index);

	// UI state
	let searchQuery = $state('');
	let selectedTag = $state('');
	let selectedSeason = $state('');
	let liveResults: SearchRecipe[] = $state([]); // explicitly typed
	let debounceId: ReturnType<typeof setTimeout> | null = $state(null);

	// Initialise results from index when component loads
	$effect(() => {
		liveResults = index;
	});

	function applyFiltersAndSearch() {
		let filtered: SearchRecipe[] = index;

		if (selectedTag) {
			filtered = filtered.filter((r) => r.tags.includes(selectedTag));
		}

		if (selectedSeason) {
			filtered = filtered.filter((r) => r.seasons.includes(selectedSeason));
		}

		const q = searchQuery.trim();
		if (!q) {
			liveResults = filtered;
			return;
		}

		const fuse = new Fuse(filtered, {
			keys: ['title', 'searchText', 'tagTitles', 'seasonTitles'],
			threshold: 0.3,
			ignoreLocation: true
		});

		liveResults = fuse.search(q).map((res) => res.item);
	}

	function handleSearchInput(event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		searchQuery = target.value;

		if (debounceId !== null) {
			clearTimeout(debounceId);
		}

		debounceId = setTimeout(() => {
			applyFiltersAndSearch();
		}, 150);
	}

	function handleTagSelectChange(event: Event) {
		const target = event.currentTarget as HTMLSelectElement;
		selectedTag = target.value;
		applyFiltersAndSearch();
	}

	function handleSeasonSelectChange(event: Event) {
		const target = event.currentTarget as HTMLSelectElement;
		selectedSeason = target.value;
		applyFiltersAndSearch();
	}

	function handleTagRadioChange(event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		selectedTag = target.value;
		applyFiltersAndSearch();
	}

	function handleSeasonRadioChange(event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		selectedSeason = target.value;
		applyFiltersAndSearch();
	}

	function handleSubmit(event: Event) {
		// keep it all client-side
		event.preventDefault();
		applyFiltersAndSearch();
	}

	function clearFilters() {
		searchQuery = '';
		selectedTag = '';
		selectedSeason = '';
		if (debounceId !== null) {
			clearTimeout(debounceId);
		}
		liveResults = index;
	}
</script>
   
<svelte:head>
	<title>Search – {settings.siteTitle}</title>
	{#if settings.strapline}
		<meta name="description" content={settings.strapline} />
	{/if}
</svelte:head>


<main class="page panel">
	<h1 class="txt-center">Search Recipes</h1>

	<!-- One form for semantics / keyboard submit, but all handled client-side -->
	<form class="searchLayout" onsubmit={handleSubmit}>
		<!-- Sidebar filters: first in DOM so top on mobile, left on desktop -->
		

		<!-- Main content: search input + results -->
		<section>
			<div class="search-box">
				<label for="q">Search</label>
				<input
					class="-p -m search"
					id="q"
					name="q"
					type="search"
					value={searchQuery}
					placeholder="e.g. pancake, chocolate, oats"
					oninput={handleSearchInput}
				/>
               
                	
			</div>

			<p class="results-count">
				Results ({liveResults.length})
			</p>

			{#if liveResults.length === 0}
				<p>No recipes found. Try changing search or filters.</p>
			{/if}

			<ul class="grid">
				{#each liveResults as recipe}
					<li class="card">
						<a href={"/recipes/" + recipe.slug + "/"}>
							{#if recipe.thumbnail}
								<img
									src={recipe.thumbnail}
									alt={recipe.title}
									width="360"
									height="200"
								/>
							{/if}

							<h3>{recipe.title}</h3>
</a>
							{#if recipe.tagTitles.length > 0}
								<p class="meta">
									<strong>Tags:</strong> <span class="cap-first">{recipe.tagTitles.join(', ')}</span> 
								</p>
							{/if}
                            		{#if recipe.seasonTitles.length > 0}
								<p class="meta">
									<strong>Seasons:</strong> <span class="cap-first">{recipe.seasonTitles.join(', ')}</span> 
								</p>
							{/if}

						
					</li>
				{/each}
			</ul>
		</section>
	</form>
</main>
<style>

/* Layout for search page */

input.search {
    width: 300px
}



</style>