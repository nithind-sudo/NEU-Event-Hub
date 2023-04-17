import { createContext, useContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";

const EventManagement = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <EventManagement.Provider value={{ state, dispatch }}>
      {children}
    </EventManagement.Provider>
  );
};

export default Context;

export const EventManagementState = () => {
  return useContext(EventManagement);
};
