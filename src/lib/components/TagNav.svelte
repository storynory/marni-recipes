<!-- src/lib/components/TagNav.svelte -->
<script lang="ts">
	import type { Tag } from '$lib/server/content-bkup';

	let { tags, activeSlug } = $props() as {
		tags: Tag[];
		activeSlug?: string;
	};
</script>

<nav class="tags-nav txt-right brand-font page -p-lg-x bg-white">
	<ul class="tags-nav-list">
		{#each tags as tag}
			<li class="tags-nav-item">
				<a
					href={`/recipes/tag/${tag.slug}/`}
					class="tags-nav-link"
					aria-current={tag.slug === activeSlug ? 'page' : undefined}
				>
					{tag.title}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.tags-nav {
		margin-bottom: 1rem;
	}

	.tags-nav-list {
		display: inline-flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.tags-nav-item {
	}

	.tags-nav-link {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 999px;
		text-decoration: none;
		border: 1px solid rgba(0, 0, 0, 0.08);
	}

	.tags-nav-link[aria-current='page'] {
		font-weight: 600;
		border-color: rgba(0, 0, 0, 0.3);
	}
</style>
