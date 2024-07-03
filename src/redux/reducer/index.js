import { combineReducers } from "redux";

import playlistReducer from "./PlaylistReducer";

const rootReducer = combineReducers({
  playlistReducer,
  // add more reducers here
});

export default rootReducer;
