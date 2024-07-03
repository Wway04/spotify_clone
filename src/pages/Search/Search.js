import _ from "lodash";
import { useContext } from "react";

import Track from "../../components/Track";
import { PlaylistActive } from "../../layouts/MainLayout/MainLayout";
import axios from "axios";

function Search() {
  const {
    token,
    searchValue,
    searhData,
    searchType,
    searchResult,
    setToken,
    setSearchValue,
    setSearchType,
    setSearchResult,
    setIndexPage,
  } = useContext(PlaylistActive);
  console.log("🚀 ~ Search ~ setSearchResult:", setSearchResult);

  const handleAddItemPlaylist = async (playlistId, playlistItemId) => {

    console.log("🚀 ~ handleAddItemPlaylist ~ playlistId:", playlistId);

    const trackUri = `spotify:track:${playlistItemId}`;

    console.log("🚀 ~ handleAddItemPlaylist ~ trackUri:", trackUri);
    try {
      await axios(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackUri}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log("🚀 ~ handleDeletePlaylist ~ error:", error);
    }
  };

  const handleSortDurationPlayList = (type) => {
    const newList = _.orderBy(searchResult, "name", type);
    setSearchResult(newList);
  };

  const handlePaginationsPlayList = (index) => {
    setIndexPage(index);
  };

  return (
    <div>
      <Track
        data={searchResult}
        type={searchType}
        onAddItemPlayList={handleAddItemPlaylist}
        onSortDurationPlayList={handleSortDurationPlayList}
        onPaginationsPlayList={handlePaginationsPlayList}
      />
    </div>
  );
}

export default Search;
