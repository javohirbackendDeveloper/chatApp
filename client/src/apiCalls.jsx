import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({
    type: "LOGIN_START",
  });
  try {
    const res = await axios.post("http://localhost:4000/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};
