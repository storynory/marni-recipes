<script>
    import Home from "$lib/icons/iconHome.svelte";
     import Search from "$lib/icons/iconSearch.svelte";
    import Skillet from "$lib/icons/skillet.svelte";
    import Iconhome from "$lib/icons/iconHome.svelte"
    import Lunch   from "$lib/icons/lunch.svelte"
    import Dinner  from "$lib/icons/dineheart.svelte"
    import Breakfast  from "$lib/icons/breakfast.svelte"
    import Cake  from "$lib/icons/cake.svelte"
     import Desert  from "$lib/icons/fruit.svelte"
   

</script>

<nav class="page txt-center  -p-y">

<input type="search" class="-p-sm" placeholder="Search for recipes" />
</nav>

 
<header class="bg-prime  txt-accent -p-y txt-center brd-btm ">
   <div class="page">
   <a class="txt-accent h1" href="/">Marni's Kitchen <Skillet /></a> 
   </div>
</header>  


<nav class="brand-font txt-center page -p-y--sm  bg-prime tags">
    
       <a class="home" href="/"><Home/>Home</a>
      <a class="cake" href="/recipes/tag/cakes/"><Cake></Cake>Cakes</a> 
        <a class="breakfast" href="/recipes/tag/breakfast/"><Breakfast></Breakfast>Breakfast</a>
  <a class="lunch" href="/recipes/tag/lunch/"><Lunch></Lunch>Lunch</a> 
  <a class="dinner" href="/recipes/tag/dinner/"><Dinner></Dinner>Dinner</a> 
  <a class="dessert" href="/recipes/tag/desert/"><Desert></Desert>Desert</a>
   
</nav>

<style>
    
nav.tags a {
    padding-right: 0em;
    white-space: nowrap;
    padding-right: 1.5em;
    font-size: 102%;
}

nav.tags a:hover {
    background-color: ivory;
}

</style>