// src/pages/Approved.tsx
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router"; // Hoặc react-router-dom
import { getSessionId } from "../api/authApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";

const Approved = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Lấy params từ URL (?request_token=...)
  const searchParams = new URLSearchParams(window.location.search);
  const requestToken = searchParams.get("request_token");

  useEffect(() => {
    if (requestToken) {
      getSessionId(requestToken)
        .then((res) => {
          dispatch(loginSuccess(res.data.session_id));
          navigate({ to: "/" });
        })
        .catch((err) => {
          console.error("Lỗi tạo session", err);
          navigate({ to: "/" });
        });
    }
  }, [requestToken, navigate]);

  return <div>Đang xử lý đăng nhập... Vui lòng chờ...</div>;
};

export default Approved;
