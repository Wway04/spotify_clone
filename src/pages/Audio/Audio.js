import { useContext } from "react";

import { PlaylistActive } from "../../layouts/MainLayout/MainLayout";

function Audio() {
  const playlistActive = useContext(PlaylistActive);
  return (
    <div className="audio">
      <iframe
        title="Spotify Embed: Recommendation Playlist "
        src={`https://open.spotify.com/embed/playlist/${playlistActive?.playlistId}?utm_source=generator&theme=0`}
        width="100%"
        height="100%"
        style={{ minHeight: "360px" }}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}

export default Audio;
