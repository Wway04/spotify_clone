import { createContext, memo, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios";
import Button from "../../../components/Button";
import { playlistSelector } from "../../../redux/UseSelector";
import { addPlaylist, deletePlaylist, editPlaylist } from "../../../redux/actions/playlistsAction";
import { PlaylistActive } from "../../MainLayout/MainLayout";
import PlaylistModal from "./Playlists/PlaylistModal";
import Playlists from "./Playlists/Playlists";
import "./Sidebar.scss";

export const SidebarContext = createContext();

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, userId, setToken } = useContext(PlaylistActive);

  const playlists = useSelector(playlistSelector);

  async function fetchWebApi(endpoint, method, body, params) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: JSON.stringify(body),
      params: params,
    });
    return await res.json();
  }

  const handleCreatePlaylist = async (name, description) => {
    try {
      const playlistsRes = await fetchWebApi(`v1/users/${userId}/playlists`, "POST", {
        name: name,
        description: description,
        public: false,
      });

      if (playlistsRes?.error?.status === 401) {
        localStorage.setItem("token", "");
        setToken("");
        navigate("/login");
        return;
      } else if (playlistsRes?.error?.status === 400) {
        navigate("/login");
        return;
      }

      const result = {
        id: playlistsRes?.id,
        name: playlistsRes?.name,
        description: playlistsRes?.description,
        type: playlistsRes?.type,
        ownerName: playlistsRes?.owner?.display_name || "Le Mai Quoc Khanh",
      };
      dispatch(addPlaylist(result));
    } catch (error) {
      console.log("🚀 ~ createPlaylist ~ error:", error);
    }
  };
  const handleEditPlaylist = async (playlistId, name, description) => {
    dispatch(editPlaylist(playlistId, name, description));
    try {
      await axios(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          name: name,
          description: description,
        }),
      });
    } catch (error) {
      console.log("🚀 ~ handleDeletePlaylist ~ error:", error);
    }
  };
  const handleDeletePlaylist = async (playlistId) => {
    dispatch(deletePlaylist(playlistId));
    try {
      await axios.delete(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log("🚀 ~ handleDeletePlaylist ~ error:", error);
    }
  };

  return (
    <SidebarContext.Provider
      value={{
        handleCreatePlaylist,
        handleEditPlaylist,
        handleDeletePlaylist,
      }}
    >
      <aside className="sidebar">
        <nav className="inner-sidebar">
          <div className="section section-heading">
            <div className="nav-logo">
              <NavLink to="/">
                <img src={require("../../../assets/image/spotify_logo.jpg")} alt="" />
              </NavLink>
            </div>
            <div className="nav-items">
              <div className="nav-item">
                <NavLink to="/">
                  <i className="fa-solid fa-house fa-lg"></i>
                  Home
                </NavLink>
              </div>
              <div className="nav-item">
                <NavLink to="/search">
                  <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                  Search
                </NavLink>
              </div>
            </div>
          </div>
          <div className="section section-body">
            <div className="nav-item library">
              <NavLink to="/">
                <i className="fa-regular fa-chart-bar" style={{ color: "#ffffff" }}></i>
                Your library
              </NavLink>
              <div className="add-playlist" role="button">
                <PlaylistModal type="add" onCreatePlaylist={handleCreatePlaylist}>
                  <i className="fa-solid fa-plus" style={{ color: "#ffffff" }}></i>
                </PlaylistModal>
              </div>
            </div>
            <div className="suggests">
              {token && playlists?.length > 0 ? (
                <Playlists playlists={playlists} />
              ) : (
                <>
                  <div className="suggest">
                    <h6>Create your first playlist</h6>
                    <p className="suggest-description">It's easy, we'll help you</p>
                    <Button
                      onClick={() => {
                        if (!token) {
                          navigate("/login");
                          return;
                        }
                        handleCreatePlaylist();
                      }}
                    >
                      Create playlist
                    </Button>
                  </div>
                  <div className="suggest">
                    <h6>Create your first playlist</h6>
                    <p className="suggest-description">It's easy, we'll help you</p>
                    <Button
                      onClick={() => {
                        if (!token) {
                          navigate("/login");
                          return;
                        }
                        handleCreatePlaylist();
                      }}
                    >
                      Browse podcasts
                    </Button>
                  </div>
                </>
              )}
            </div>
            <div className="sidebar-footer">
              <div className="legal-links">
                <div className="links">
                  <div className="link">
                    <a href="/">Legal</a>
                  </div>
                  <div className="link">
                    <a href="/">Safety & Privacy Center</a>
                  </div>
                  <div className="link">
                    <a href="/">Privacy Policy</a>
                  </div>
                  <div className="link">
                    <a href="/">Cookies</a>
                  </div>
                  <div className="link">
                    <a href="/">About Ads</a>
                  </div>
                  <div className="link">
                    <a href="/">Accessibility</a>
                  </div>
                </div>
                <div className="cookies">
                  <a href="/">Cookies</a>
                </div>
              </div>
              <div className="legal-btn">
                <Button>English</Button>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </SidebarContext.Provider>
  );
}

export default memo(Sidebar);
