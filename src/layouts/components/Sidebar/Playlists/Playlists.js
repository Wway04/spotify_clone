import PlaylistItem from "./PlaylistItem";
import "./Playlists.scss";
function Playlists({ playlists = [] }) {
  return (
    <div className="playlists">
      {playlists?.map((item, index) => (
        <PlaylistItem key={index} playlist={item} />
      ))}
    </div>
  );
}

export default Playlists;
