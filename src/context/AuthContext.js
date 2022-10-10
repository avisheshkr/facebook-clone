import { createContext, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "62590b252633440efc5034b6",
    username: "anukarki",
    email: "anupamakr@gmail.com",
    profilePicture:
      "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    coverPicture:
      "https://images.pexels.com/photos/133633/pexels-photo-133633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    followers: [],
    followings: [
      "62590b7d2633440efc5034b8",
      "6259187f175e73bad70260ca",
      "625917fb175e73bad70260c7",
    ],
    isAdmin: false,
    createdAt: "2022-04-15T06:05:25.371Z",
    __v: 0,
    city: "Sydney",
    desc: "Hello I am Anupama Karki.",
    from: "Bhaktapur, Nepal",
    relationship: 1,
  },
  isFetching: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
