import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "../actions";
export const reducer = (state, action) => {
  // console.log(action);
  // console.log(state);
  if (action.type === OPEN_SIDEBAR) {
    return { ...state, isSideBarOpen: true };
  }
  if (action.type === CLOSE_SIDEBAR) {
    return { ...state, isSideBarOpen: false };
  }
  return state;
  throw new Error(`no ${action.type} is specified`);
};
