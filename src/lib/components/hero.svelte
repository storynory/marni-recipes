	<script>
    import Skillet from '$lib/icons/skillet.svelte';
    import { getContext } from 'svelte';
    let settings = getContext('siteSettings')
    </script>	
        
        	<section class="grid card  -p">
		<div>
			<img
    src={settings.portrait}
    alt="cooking girl"
    width="600"
    height="600"
    loading="eager"
    decoding="async"
    fetchpriority="high"
/>		</div>

		<div class="heroine-text">
			<h1 class="txt-center">
				<a href="/pages/about-me">Hello I'm Marni</a>
			</h1>
			<p class="txt-center">
				<Skillet></Skillet>
			</p>
			<p class="lede txt-center max-measure brand-font">
			{settings.siteIntro}
			</p>
		</div>
	</section>