import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { setToken, clearToken } from "../store/authSlice";

export const useAuth = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  return {
    token,
    setToken: (t: string) => dispatch(setToken(t)),
    clearToken: () => dispatch(clearToken()),
  };
};
