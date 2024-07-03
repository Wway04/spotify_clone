import React, { useContext } from "react";
import { Dropdown, Space } from "antd";

import PlaylistModal from "./PlaylistModal";
import { SidebarContext } from "../Sidebar";

function PlaylistOption({ playlistId, name, description }) {
  const { handleEditPlaylist, handleDeletePlaylist } = useContext(SidebarContext);
  const items = [
    {
      label: (
        <div className="p-1 m-0" style={{ width: "100px" }}>
          <PlaylistModal
            type="edit"
            playlistId={playlistId}
            namePlaylist={name}
            descriptionPlaylist={description}
            onEditPlaylist={handleEditPlaylist}
          >
            <i className="fa-solid fa-pen"></i> Edit
          </PlaylistModal>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <p className="p-1 m-0" onClick={() => handleDeletePlaylist(playlistId)}>
          <i className="fa-solid fa-circle-minus"></i> Delete
        </p>
      ),
      key: "1",
    },
  ];
  return (
    <div>
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <i className="fa-solid fa-ellipsis" style={{ color: "#ffffff" }}></i>
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default PlaylistOption;
