<script lang="ts">
  import { AlbumList, type Album } from "$lib/albumlist.svelte";

  let props: {list: AlbumList} = $props();
  let list = props.list;

  let results: Album[] = $state([]);
  let searchQuery = $state("");
  let searchBarValue = $state("");

  function onkeydown(event: KeyboardEvent){
    if(event.key != "Enter"){
      return;
    }
    searchQuery = searchBarValue;
    fetch("/search_album?q=" + encodeURIComponent(searchQuery)).then(function(value){
      value.json().then(function(json){
        results = json.albums;
      })
    })
  }
</script>

<div id="root">
  <div id="search-wrapper">
    <div id="search-image-box">
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.089 10.973L13.934 14.817C13.9917 14.8754 14.0605 14.9218 14.1364 14.9534C14.2122 14.9851 14.2936 15.0013 14.3757 15.0012C14.4579 15.0011 14.5392 14.9847 14.6149 14.9529C14.6907 14.9211 14.7594 14.8746 14.817 14.816C14.875 14.7579 14.921 14.6889 14.9523 14.613C14.9836 14.5372 14.9997 14.4559 14.9996 14.3738C14.9995 14.2917 14.9833 14.2104 14.9518 14.1346C14.9203 14.0588 14.8741 13.99 14.816 13.932L10.983 10.1L10.989 9.67299C11.489 8.96674 11.8152 8.15249 11.9413 7.29642C12.0674 6.44034 11.9897 5.5666 11.7145 4.74621C11.4394 3.92582 10.9745 3.18192 10.3578 2.57498C9.74104 1.96804 8.98979 1.51519 8.16509 1.25322C7.34039 0.991255 6.46551 0.927572 5.61157 1.06735C4.75763 1.20712 3.94871 1.54641 3.25057 2.05764C2.55243 2.56887 1.98476 3.23761 1.59371 4.0095C1.20265 4.7814 0.999236 5.63468 1 6.49999C1 7.95868 1.57946 9.35763 2.61091 10.3891C3.64236 11.4205 5.04131 12 6.5 12C7.689 12 8.788 11.62 9.687 10.978L10.089 10.973ZM6.5 10.75C4.157 10.75 2.25 8.84299 2.25 6.49999C2.25 4.15699 4.157 2.24999 6.5 2.24999C8.843 2.24999 10.75 4.15699 10.75 6.49999C10.75 8.84299 8.843 10.75 6.5 10.75Z" />
      </svg>        
    </div>
    <input type="text" placeholder="Search for an album" {onkeydown} bind:value={searchBarValue}>
  </div>
  {#if results.length == 0}
    <div id="search-message">
      <span id="search-message-span">
        {#if searchQuery == ""}
          Use the search bar to search for an album
        {:else}
          No results found
        {/if}
      </span>
      <div id="credits">
        <img src="/lastfm.webp" alt="Last.fm">
        <span>Music data from <a href="https://www.last.fm/" target="_blank">Last.fm</a></span>
      </div>
    </div>
  {:else}
    <div id="results">
      {#each results as result}
        <button class="result" title="{result.name}&#013;{result.artist}" onclick={() => list.add(result)}>
          <img src={result.image} alt="{result.name} - {result.artist}">
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  /** Container */
  #root {
    --image-side-length: 4rem;
    align-self: start;
    background-color: #222;
    box-sizing: border-box;
    border-radius: 8px 8px;
    width: calc(4 * var(--image-side-length));
  }

  /** Search Bar */
  #search-wrapper {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    height: 2.5rem;
    min-height: 2.5rem;
    width: 100%;
  }
  #search-image-box {
    display: flex;
    min-width: 2.5rem;
    height: 100%;
    justify-content: center;
    align-items: center;
    fill: #fff;
  }
  #search-image-box svg {
    width: 1rem;
    height: 1rem;
  }
  #search-wrapper input {
    background: transparent;
    border: none;
    color: #fff;
    font-family: Inter;
    font-size: 1rem;
    padding: 0px;
    width: 100%;
    outline: none;
  }

  /** Album Results Grid */
  #results {
    display: grid;
    grid-template-columns: repeat(4, var(--image-side-length));
    grid-template-rows: repeat(5, var(--image-side-length));
    gap: 0px;
    width: 100%;
  }
  .result {
    background: transparent;
    border: none;
    display: block;
    padding: 0px;
    width: var(--image-side-length);
    height: var(--image-side-length);
  }
  .result img {
    width: inherit;
    height: inherit;
  }
  .result:hover {
    cursor: pointer;
  }

  /** Search Message */
  #search-message {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    height: calc(5 * var(--image-side-length));
    padding-bottom: 2.5rem;
  }
  #search-message span {
    color: #fff;
    display: inline-block;
    font-size: 1rem;
    text-align: center;
    vertical-align: center;
    user-select: none;
  }
  #search-message-span {
    font-size: 1rem;
    margin: 0px 1rem;
  }

  /** Credits */
  #credits {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    justify-content: center;
  }
  #credits img {
    border-radius: 0.25rem;
    image-rendering: smooth;
    height: 1.25rem;
    width: 1.25rem;
  }

  /** Generic Links */
  a {
    color: #6f6;
  }
  a:hover {
    color: #bfb;
  }
  a:active {
    color: #dfd;
  }
</style>