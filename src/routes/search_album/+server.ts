import { searchAlbums } from "$lib/music";
import { json } from "@sveltejs/kit";

export async function GET({params, url}): Promise<Response> {
  let query = url.searchParams.get("q");
  if(query === null || query.length < 3){
    return json({albums: []});
  } else {
    let albums = await searchAlbums(query);
    return json({albums});
  }
}