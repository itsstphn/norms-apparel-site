import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (displayName, email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response.user);
      dispatch({ type: "SIGN_IN", payload: response.user });
      await updateProfile(response.user, { displayName });

      setIsPending(false);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};
