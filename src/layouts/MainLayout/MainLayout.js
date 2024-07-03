import { createContext } from "react";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Preview from "../../components/Preview";
import useDebounce from "../../hooks/useDebounce";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./MainLayout.scss";

export const PlaylistActive = createContext(localStorage.getItem("playlist_active"));

function MainLayout({ children, search }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [playlistId, setPlaylistId] = useState(localStorage.getItem("playlist_active"));
  const [playlists, setPlaylists] = useState(JSON.parse(localStorage.getItem("playlists")) || []);
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));

  // search
  const [indexPage, setIndexPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const searhData = useDebounce(searchValue, 500);
  const [searchType, setSearchType] = useState("track");
  const [searchResult, setSearchResult] = useState([]);

  const handleClickPlaylistItem = (e, playlist) => {
    e.stopPropagation();
    setPlaylistId(playlist);
    if (location.pathname === "/audio") return;
    navigate("/audio");
  };

  return (
    <PlaylistActive.Provider
      value={{
        playlistId,
        playlists,
        token,
        userId,
        indexPage,
        searchValue,
        searhData,
        searchType,
        searchResult,
        setIndexPage,
        setPlaylistId,
        setPlaylists,
        setToken,
        setSearchValue,
        setSearchType,
        setSearchResult,
        handleClickPlaylistItem,
      }}
    >
      <div className="main-layout">
        <Sidebar />
        <div className="container-custom">
          {search && <Header search />}
          {!search && <Header />}
          <div className="inner">
            {children}
            <Footer />
          </div>
        </div>
        {!token && <Preview />}
      </div>
    </PlaylistActive.Provider>
  );
}

export default MainLayout;
