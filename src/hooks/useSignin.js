import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signin = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: "SIGNIN", payload: response.user });

      !isCancelled && setIsPending(false);
    } catch (error) {
      if (!isCancelled) {
        setIsPending(false);
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  });

  return { error, isPending, signin };
};
