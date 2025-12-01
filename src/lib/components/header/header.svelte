<script>
  import { getContext } from 'svelte';
  import { page } from '$app/state';
    import Home from "$lib/icons/iconHome.svelte";
     import Search from "$lib/icons/iconSearch.svelte";
    import Skillet from "$lib/icons/skillet.svelte";
    import Iconhome from "$lib/icons/iconHome.svelte"
    import Lunch   from "$lib/icons/lunch.svelte"
    import Dinner  from "$lib/icons/dineheart.svelte"
    import Breakfast  from "$lib/icons/breakfast.svelte"
    import Cake  from "$lib/icons/cake.svelte"
    import Dessert  from "$lib/icons/fruit.svelte"
    import Menu from "$lib/icons/iconMenu.svelte"

    import { afterNavigate} from '$app/navigation';

  let settings = getContext('siteSettings'); 

  let menuClass = $state("closed");
  menuClass = "closed";

  let OpenCloseMenu = ()=> {
   if (menuClass === "closed") {menuClass = "open"}
   else {menuClass ="closed"}
  }

	// 🔔 Close menu on every navigation
	$effect(() => {
		afterNavigate(() => {
			menuClass = 'closed';
		});
	});

</script>

<nav class="desk page txt-center  -p-y">
<a class="txt-accent -p-lg" href="/blog" aria-current={page.url.pathname === '/blog'}> * Cooking Blog * </a>
<a class="btn -ghost txt-accent" href="/search" aria-current={page.url.pathname === '/search'}><Search></Search>Search for Recipes!</a>
<a class="txt-accent -p-lg" href="/pages/about-me" aria-current={page.url.pathname === '/pages/about-me'}> * About Me * </a>
<a class="btn -ghost txt-accent" href="/pages/hire-me" aria-current={page.url.pathname === '/pages/hire-me'}>Hire Me!</a>

</nav>

 
<header class="bg-prime  txt-accent -p-y txt-center brd-btm ">
   <div class="page">
   <a class="txt-accent h1" href="/">{settings.siteTitle}<Skillet /></a> 
   <button class="menu"  aria-label="name"   onclick = "{()=> OpenCloseMenu()}"><Menu /></button>
   </div>
</header>  

<nav class="mobile {menuClass} bg-accent txt-light page">
 <ul class="mobileMenu">  
<li><a class="home" href="/" aria-current={page.url.pathname === '/'}><Home/>Home</a></li>
<li><a class="cake" href="/recipes/tag/cakes" aria-current={page.url.pathname === '/recipes/tag/cakes'}><Cake></Cake>Cakes</a></li>
<li><a class="breakfast" href="/recipes/tag/breakfast"  aria-current={page.url.pathname === '/recipes/tag/breakfast'} ><Breakfast></Breakfast>Breakfast</a></li>
<li><a class="lunch" href="/recipes/tag/lunch" aria-current={page.url.pathname === '/recipes/tag/lunch'}><Lunch></Lunch>Lunch</a></li>
<li><a class="dinner" href="/recipes/tag/dinner" aria-current={page.url.pathname === '/recipes/tag/dinner'}><Dinner></Dinner>Dinner</a></li>
<li><a class="dessert" href="/recipes/tag/dessert" aria-current={page.url.pathname === '/recipes/tag/dessert'}><Dessert></Dessert>Dessert</a></li>
<li><a href="/blog" aria-current={page.url.pathname === '/blog'}>✏️ Blog</a></li>
<li><a href="/search" aria-current={page.url.pathname === '/search'}><Search></Search> Search for Recipes! </a></li>
<li><a href="/pages/about-me" aria-current={page.url.pathname === '/pages/about-me'}>? About Me</a></li>
<li><a href="/pages/hire-me" aria-current={page.url.pathname === '/pages/hire-me'}>£ Hire Me!</a></li>
</ul> 
</nav>


<nav class="desk brand-font txt-center page -p-y--sm -m-b bg-light tags">
    
       <a class="home" href="/" aria-current={page.url.pathname === '/'}><Home/>Home</a>
      <a class="cake" href="/recipes/tag/cakes" aria-current={page.url.pathname === '/recipes/tag/cakes'}><Cake></Cake>Cakes</a> 
        <a class="breakfast" href="/recipes/tag/breakfast"  aria-current={page.url.pathname === '/recipes/tag/breakfast'} ><Breakfast></Breakfast>Breakfast</a>
  <a class="lunch" href="/recipes/tag/lunch" aria-current={page.url.pathname === '/recipes/tag/lunch'}><Lunch></Lunch>Lunch</a> 
  <a class="dinner" href="/recipes/tag/dinner" aria-current={page.url.pathname === '/recipes/tag/dinner'}><Dinner></Dinner>Dinner</a> 
  <a class="dessert" href="/recipes/tag/dessert" aria-current={page.url.pathname === '/recipes/tag/dessert'}><Dessert></Dessert>Dessert</a>
   
</nav>

<style>
    @custom-media --desk (width >= 769px);

nav.tags a {
    padding-right: 0em;
    white-space: nowrap;
    padding-right: 1.5em;
    font-size: 102%;
}

nav.tags a:hover {
    background-color: ivory;
}

[aria-current]:not([aria-current="false"]) {
   background-color: ivory;
}

.desk {
    display: none;
}

.mobile {
    display: none;
}

.mobile.open {
    display: block;
}

.mobileMenu {
    background-color: ivory;
}

.mobileMenu li {
    width: 100%;
      border-bottom: 1px solid var(--accent);
}
.mobileMenu li a {
    line-height: 2em;
    display: block;
    width: 100%;
     background-color: ivory;
     padding-left: 0.5em;
}


.menu {
    position: relative;
    top: 0.75em;
    left: 1em;
}

@media (--desk) {
.desk {
    display: block;
}
.menu {
    display: none;
}

.mobile.open {
    display: none;
}

}


</style>
