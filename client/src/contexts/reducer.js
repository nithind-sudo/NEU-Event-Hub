import { LOGIN_STATUS, ACTIONS, CLIENT, COMPONENT } from "./constants";

export const initialState = {
  events_booked: [],
  favorites: [],
  listings: [],
  role: "",
  loginStatus: LOGIN_STATUS.PENDING,
  username: "",
  error: "",
  user_id: "",
  isActivated: false,
  isVerified: false,
  first_name: "",
  last_name: "",
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOG_IN:
      return {
        ...state,
        error: "",
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        username: action.username,
        component: COMPONENT.DASHBOARD,
        user_id: action.user_id,
        events_booked: action.events_booked,
        favorites: action.favorites,
        listings: action.listings,
        role: action.role,
        isActivated: action.isActivated,
        isVerified: action.isVerified,
        first_name: action.first_name,
        last_name: action.last_name,
      };

    case ACTIONS.PENDING:
      return {
        ...state,
        error: "",
        loginStatus: LOGIN_STATUS.PENDING,
      };

    case ACTIONS.GET_USER:
      return {
        ...state,
        first_name: action.first_name,
        last_name: action.last_name,
        events_booked: action.events_booked,
        favorites: action.favorites,
        role: action.role,
        phone_number: action.phone_number,
        created_on: action.created_on,
      };

    case ACTIONS.SET_VIEW_EVENT:
      return {
        ...state,
        eventName: action.eventName,
        eventDescription: action.eventDescription,
        eventID: action.eventID,
        eventDate: action.eventDate,
        eventImage: action.eventImage,
        ticketPrice: action.price
      };
    
    case ACTIONS.CHECKOUT:
      return {
        ...state,
        numberOfSeats : action.numberOfSeats
      }

    case ACTIONS.LOG_OUT:
      return {
        ...state,
        error: "",
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
        events_booked: [],
        favorites: [],
        listings: [],
        role: "",
        username: "",
        user_id: "",
        isActivated: false,
        isVerified: false,
        component: "LogInScreen",
      };

    default:
      throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action });
  }
}
