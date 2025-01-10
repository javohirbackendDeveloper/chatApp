import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import axios from "axios";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
  userID: null, // userIDni statega qo'shish
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(state.user));
  // }, [state.user]);

  useEffect(() => {
    const fetchUserId = async () => {
      if (state.user) {
        try {
          const res = await axios.get(
            `http://localhost:4000/api/posts/getUserId/${state.user.username}`
          );
          dispatch({ type: "SET_USER_ID", payload: res.data._id }); // userIDni statega saqlash
        } catch (error) {
          console.error("Error fetching user ID:", error);
        }
      }
    };
    fetchUserId();
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user, state.userID]);

  console.log(state);

  return (
    <AuthContext.Provider
      value={{
        user: { ...state.user, userID: state.userID },
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
