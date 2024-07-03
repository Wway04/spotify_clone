import { Button, Modal } from "antd";
import { useState } from "react";

import "./PlaylistModal.scss";
function PlaylistModal({
  type = "add",
  playlistId,
  namePlaylist = "",
  descriptionPlaylist = "",
  children,
  onCreatePlaylist,
  onEditPlaylist,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(namePlaylist);
  const [description, setDescription] = useState(descriptionPlaylist);
  const [isError, setIsError] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleSubmit = async () => {
    if (!name) {
      setIsError(true);
      return;
    }
    if (type === "add") {
      await onCreatePlaylist(name, description);
    } else {
      await onEditPlaylist(playlistId, name, description);
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="playlist-modal">
      {type === "add" ? (
        <button type="primary" onClick={showModal} className="bg-transparent border-0">
          {children}
        </button>
      ) : (
        <p onClick={showModal} className="mb-0">
          {children}
        </p>
      )}
      <Modal
        width={600}
        centered
        title={`${type === "add" ? "Add a playlist" : "Edit details"}`}
        open={isModalOpen}
        okText="Submit"
        cancelText="Cancel"
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button key={1} onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key={2} type="primary" onClick={handleSubmit}>
            Submit
          </Button>,
        ]}
      >
        <form>
          <div className="form-group">
            <label hmltfor="inputName" className="my-1">
              Name
            </label>
            <input
              type="name"
              className="form-control "
              id="inputName"
              placeholder="Add a name"
              value={name}
              onChange={(e) => {
                setIsError(false);
                setName(e.target.value);
              }}
            />
            {isError && (
              <p id="show-error" className="text-danger">
                Playlist name is required.
              </p>
            )}
          </div>
          <div className="form-group">
            <label hmltfor="inputDescription" className="my-1">
              Description
            </label>
            <textarea
              type="description"
              className="form-control mb-4"
              id="inputDescription"
              placeholder="Add an optional description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default PlaylistModal;
