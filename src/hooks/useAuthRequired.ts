import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { selectSession, toggleShowLogin } from "../App/sessionSlice";

export default function useAuthRequired() {
  const { user, checked } = useSelector(selectSession);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user && checked) {
      dispatch(toggleShowLogin());
    }
  }, [user, checked, dispatch]);
}
