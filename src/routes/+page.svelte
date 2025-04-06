<script lang="ts">
  import { albumList } from "$lib/albumlist.svelte";
  import AlbumSearch from "./album_search.svelte";
  import AlbumList from "./album_list.svelte";
  import Spinner from "./spinner.svelte";

  let list = albumList("albums");
</script>

<div id="root">
  <AlbumSearch {list} />
  <AlbumList {list} />
  <Spinner {list} />
</div>

<style>
  :global(body) {
    background-color: #000;
    box-sizing: border-box;
    margin: 0px;
    padding: 20px;
    width: 100%;
    height: 100%;
  }
  #root {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
</style>