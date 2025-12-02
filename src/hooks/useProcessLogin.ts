import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import { getSessionId } from "@api/authApi";
import { loginSuccess } from "@store/authSlice";

export const useProcessLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const processLogin = useCallback(
    async (token: string) => {
      try {
        const res = await getSessionId(token);
        dispatch(loginSuccess(res.data.session_id));
        navigate({ to: "/" });
      } catch (error) {
        console.error("Login Error:", error);
        navigate({ to: "/" });
      }
    },
    [dispatch, navigate],
  );

  return { processLogin };
};
