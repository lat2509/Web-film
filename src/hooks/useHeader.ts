import { useState, useEffect, useCallback } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@store/authSlice";
import type { RootState } from "@store/store";

export const useHeader = () => {
  // 1. State
  const [textInput, setTextInput] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  // 2. External Hooks
  const router = useRouterState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionId = useSelector((state: RootState) => state.auth.sessionId);

  const isHomePage = router.location.pathname === "/";

  // 3. Effects
  useEffect(() => {
    setIsSearchOpen(false);
    setTextInput("");
  }, [router.location.pathname]);

  // 4. Handlers
  const handleNavigate = useCallback((path: string) => navigate({ to: path }), [navigate]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    setAnchorElUser(null);
  }, [dispatch]);

  const handleUserMenuOpen = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget);
  }, []);

  const handleUserMenuClose = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleSearchToggle = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
  }, []);

  const handleClearSearch = useCallback(() => {
    setTextInput("");
  }, []);

  return {
    state: {
      textInput,
      isSearchOpen,
      anchorElUser,
      sessionId,
      isHomePage,
      showSearchBar: isSearchOpen || isHomePage,
    },
    actions: {
      setTextInput,
      handleNavigate,
      handleLogout,
      handleUserMenuOpen,
      handleUserMenuClose,
      handleSearchToggle,
      handleClearSearch,
    },
  };
};
