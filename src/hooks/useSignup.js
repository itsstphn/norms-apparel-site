import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { doc, setDoc } from "firebase/firestore";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
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
      await updateProfile(response.user, { displayName });

      const docRef = doc(db, "users", response.user.uid);
      await setDoc(docRef, {
        displayName: response.user.displayName,
        email: response.user.email,
        isAdmin: false,
      });
      dispatch({ type: "SIGNIN", payload: response.user });
      console.log("signed in after signup");

      !isCancelled && setIsPending(false);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  });

  return { error, isPending, signup };
};
