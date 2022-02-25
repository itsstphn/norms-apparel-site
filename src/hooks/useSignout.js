import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await signOut(auth);

      dispatch({ type: "SIGNOUT" });

      setIsPending(false);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };

  return { signout, error, isPending };
};
