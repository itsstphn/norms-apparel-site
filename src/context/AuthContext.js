import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useReducer } from "react";
import { auth, db } from "../firebase/config";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN":
      return { ...state, user: action.payload };
    case "SIGNOUT":
      return { ...state, user: null, isAdmin: false };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    case "USER_IS_ADMIN":
      return { ...state, isAdmin: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
    isAdmin: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });

      if (user) {
        const docRef = doc(db, "users", user.uid);
        const response = await getDoc(docRef);
        if (response.data().isAdmin) {
          console.log("updated to admin");
          dispatch({ type: "USER_IS_ADMIN" });
        }
      }

      unsub();
    });
  }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
