if (!localStorage.getItem("playlists")) localStorage.setItem("playlists", JSON.stringify([]));

const initialState = JSON.parse(localStorage.getItem("playlists"));

function playlistReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD":
      const result = [action.payload, ...state];
      localStorage.setItem("playlists", JSON.stringify(result));
      return result;
    case "EDIT":
      state.forEach((item) => {
        if (item.id === action.payload.id) {
          item.name = action.payload.name;
          item.description = action.payload.description;
          return;
        }
      });
      return [...state];
    case "DELETE":
      let id;
      state.forEach((item, index) => {
        if (item.id === action.payload.id) {
          id = index;
          return;
        }
      });
      state.splice(id, 1);
      console.log(state);
      localStorage.setItem("playlists", JSON.stringify(state));
      return [...state];
    default:
      return state;
  }
}

export default playlistReducer;
