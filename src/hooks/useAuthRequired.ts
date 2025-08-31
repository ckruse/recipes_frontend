import { useEffect } from "react";

import { selectSession, setShowLogin } from "@/App/sessionSlice";

import { useAppDispatch, useAppSelector } from ".";

export default function useAuthRequired() {
  const { user, checked } = useAppSelector(selectSession);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user && checked) {
      console.log("not logged in");
      dispatch(setShowLogin(true));
    }
  }, [user, checked, dispatch]);
}
