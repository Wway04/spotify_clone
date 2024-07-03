import { useContext } from "react";

import { PlaylistActive } from "../../../MainLayout/MainLayout";
import PlaylistOption from "./PlaylistOption";

function PlaylistItem({ playlist }) {
  const playlistActive = useContext(PlaylistActive);

  return (
    <div className="playlist-item">
      <div
        className="d-flex align-items-center gap-3 playlist-item-inner"
        role="button"
        onClick={(e) => playlistActive.handleClickPlaylistItem(e, playlist.id)}
      >
        {playlist?.images ? (
          <img src={playlist?.images[0].url} alt="" width="48px" />
        ) : (
          <div className="playlist-item-img">
            <i className="fa-solid fa-music" style={{ color: "#dad7d7" }}></i>
          </div>
        )}
        <div className="playlist-item-info">
          <h6>{playlist?.name}</h6>
          <span>
            {playlist?.type} • {playlist?.ownerName}
          </span>
        </div>
      </div>
      <div className="playlist-options">
        <PlaylistOption name={playlist?.name} description={playlist?.description} playlistId={playlist.id} />
      </div>
    </div>
  );
}

export default PlaylistItem;
