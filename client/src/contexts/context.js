import { createContext, useContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";
import { useEffect } from "react";
import axios from "axios";
import { ACTIONS } from "./constants";
import { useNavigate } from "react-router-dom";

const EventManagement = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/v1/session")
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: ACTIONS.LOG_IN,
            username: response.data.user,
            user_id: response.data.user_id,
            events_booked: response.data.events_booked,
            favorites: response.data.favorites,
            listings: response.data.listings,
            role: response.data.role,
            isActivated: response.data.isActivated,
            isVerified: response.data.isVerified,
          });
        } else {
          dispatch({ type: ACTIONS.LOG_OUT });
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
