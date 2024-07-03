import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import Button from "../../../components/Button";
import { PlaylistActive } from "../../MainLayout/MainLayout";
import "./Header.scss";

function Header({ search }) {
  const navigate = useNavigate("");
  const {
    indexPage,
    token,
    searchValue,
    searhData,
    searchType,
    searchResult,
    setToken,
    setSearchValue,
    setSearchType,
    setSearchResult,
  } = useContext(PlaylistActive);

  const [userId, setUserId] = useState(localStorage.getItem("user_id"));

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

  useEffect(() => {
    const handleSearch = async () => {
      if (!searchValue) {
        setSearchResult([]);
        return;
      }
      if (!setSearchType) return;
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: searchValue,
            type: searchType,
            offset: indexPage * 20,
            limit: "20",
          },
        });
        console.log("🚀 ~ handleSearch ~ data:", data);
        setSearchResult(data[searchType + "s"].items);
      } catch (error) {
        if (error?.response.status === 401) {
          localStorage.setItem("token", "");
          setToken("");
          navigate("/login");
          return;
        }
        console.log("🚀 ~ handleSearch ~ error:", error);
      }
    };
    handleSearch();
  }, [searhData, searchType, indexPage]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-navigation">
          <button>
            <i className="fa-solid fa-chevron-left" style={{ color: "#ffffff" }}></i>
          </button>
          <button>
            <i className="fa-solid fa-chevron-right" style={{ color: "#ffffff" }}></i>
          </button>
        </div>
        {search && (
          <div className="header-search">
            <div className="header-search-inner">
              <input
                type="text"
                placeholder="What do you want to play?"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
              <div className="search-icon">
                <i className="fa-solid fa-magnifying-glass" style={{ color: "#ffffff" }}></i>
              </div>
              <div
                className="delete-icon"
                role="button"
                onClick={() => {
                  setSearchValue("");
                }}
              >
                <i className="fa-solid fa-x" style={{ color: "#ffffff" }}></i>
              </div>
            </div>
          </div>
        )}
        <div className="header-btns">
          {token ? (
            <Button onClick={handleLogout}>Log out</Button>
          ) : (
            <>
              <Link to="/login">
                <Button type="large">Sign up</Button>
              </Link>
              <Link to="/register">
                <Button type="large">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
      {search && searchValue && (
        <div className="mt-3 w-100 header-search-type">
          <div className="d-flex gap-2 types">
            <Button
              type="type"
              className={`${searchType === "track" ? "active" : ""}`}
              onClick={() => setSearchType("track")}
            >
              Track
            </Button>
            <Button
              type="type"
              className={`${searchType === "artist" ? "active" : ""}`}
              onClick={() => setSearchType("artist")}
            >
              Artists
            </Button>
            <Button
              type="type"
              className={`${searchType === "playlist" ? "active" : ""}`}
              onClick={() => setSearchType("playlist")}
            >
              Playlists
            </Button>
            <Button
              type="type"
              className={`${searchType === "album" ? "active" : ""}`}
              onClick={() => setSearchType("album")}
            >
              Albums
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
