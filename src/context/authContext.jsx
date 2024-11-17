import React, { createContext, useReducer } from "react";

export const authContext = createContext({
  token: null,
  login: () => {},
  logout: () => {},
});
const reducer = (state, action) => {
  if (action.type == "LOGIN") {
    return {
      ...state,
      token: action.payload,
    };
  } else if (action.type == "LOGOUT") {
    return {
      ...state,
      token: null,
    };
  } else return state;
};

export default function AuthContext(props) {
  const [state, dispatch] = useReducer(reducer, { token: null });
  const login = (token) => {
    dispatch({ type: "LOGIN", payload: token });
  };
  const logout = (token) => {
    dispatch({ type: "LOGOUT" });
  };
  const defaultValue = {
    token: state.token,
    login,
    logout,
  };
  return (
    <authContext.Provider value={defaultValue}>
      {props.children}
    </authContext.Provider>
  );
}
