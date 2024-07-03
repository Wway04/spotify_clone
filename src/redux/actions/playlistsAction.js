export const addPlaylist = (playlistItem) => ({
  type: "ADD",
  payload: playlistItem,
});

export const editPlaylist = (playlistId, name, description) => ({
  type: "EDIT",
  payload: { id: playlistId, name, description },
});

export const deletePlaylist = (playlistId) => ({
  type: "DELETE",
  payload: playlistId,
});
