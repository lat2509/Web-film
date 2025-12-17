import { describe, it, expect, beforeEach } from "vitest";
import authReducer, { loginSuccess, logout } from "./authSlice";

describe("authSlice", () => {
  // Chuẩn bị: Xóa sạch localStorage trước mỗi bài test để không bị lưu vết cũ
  beforeEach(() => {
    localStorage.clear();
  });

  // Test case 1: Kiểm tra trạng thái ban đầu
  it("should return initial state", () => {
    // Act: Gọi reducer với state undefined (chưa có gì)
    const state = authReducer(undefined, { type: "unknown" });

    // Assert: Mong đợi nó trả về null như khai báo trong code gốc
    expect(state).toEqual({
      sessionId: null,
      user: null,
    });
  });

  // Test case 2: Kiểm tra Đăng nhập
  it("should handle loginSuccess", () => {
    // Arrange: Tạo dữ liệu giả
    const initialState = { sessionId: null, user: null };
    const mockSessionId = "session_123_abc";

    // Act: Gọi hành động loginSuccess
    const nextState = authReducer(initialState, loginSuccess(mockSessionId));

    // Assert: Kiểm tra 2 thứ
    // 1. State trong Redux đã đổi chưa?
    expect(nextState.sessionId).toEqual(mockSessionId);
    // 2. LocalStorage đã lưu chưa? (Side effect)
    expect(localStorage.getItem("session_id")).toEqual(mockSessionId);
  });

  // Test case 3: Kiểm tra Đăng xuất
  it("should handle logout", () => {
    // Arrange: Giả vờ đang đăng nhập rồi
    const loggedInState = { sessionId: "old_session", user: null };
    localStorage.setItem("session_id", "old_session"); // Set tay vào localStorage

    // Act: Gọi hành động logout
    const nextState = authReducer(loggedInState, logout());

    // Assert: Kiểm tra mọi thứ đã về null chưa
    expect(nextState.sessionId).toBeNull();
    expect(localStorage.getItem("session_id")).toBeNull();
  });
});
