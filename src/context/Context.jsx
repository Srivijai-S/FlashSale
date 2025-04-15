import { createContext, useContext, useReducer } from "react";
import { reducer } from "../reducer/AppReducer";
import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "../actions";
const GlobalContext = createContext();

const AppContext = ({ children }) => {
  const initialState = { isSideBarOpen: false };
  const [state, dispatch] = useReducer(reducer, initialState);

  // open sidebar
  const openSidebar = () => {
    dispatch({ type: OPEN_SIDEBAR });
  };

  //close sidebar
  const closeSidebar = () => {
    dispatch({ type: CLOSE_SIDEBAR });
  };

  return (
    <GlobalContext.Provider value={{ state, openSidebar, closeSidebar }}>
      {children}
    </GlobalContext.Provider>
  );
};

// custom hook
export const useGlobalContext = () => useContext(GlobalContext);

export default AppContext;
