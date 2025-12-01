import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { Box, Stack, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Search, X } from "lucide-react";
import { IoSearchSharp } from "react-icons/io5";
import login from "@services/login";
import { logout } from "@store/authSlice";
import type { RootState } from "@store/store";
import HoverDropdown from "@components/common/HoverDropdown";

import {
  HeaderContainer,
  ContentWrapper,
  Logo,
  NavList,
  NavItemText,
  UserBadge,
  SearchContainer,
  SearchContent,
  SearchInput,
  ClearButton,
} from "@styles/header.styles";

// Constants
const HOME_PATH = "/";
const AVATAR_INITIAL = "A";
const SEARCH_ICON_SIZE = 24;
const LOGIN_TEXT = "đăng nhập";

const MOVIE_MENU_ITEMS = [
  { label: "Popular", path: "/browse/movie/popular" },
  { label: "Now Playing", path: "/browse/movie/now-playing" },
  { label: "Upcoming", path: "/browse/movie/upcoming" },
  { label: "Top Rated", path: "/browse/movie/top-rated" },
] as const;

const TV_MENU_ITEMS = [
  { label: "Popular", path: "/browse/tv/popular" },
  { label: "Airing Today", path: "/browse/tv/airing-today" },
  { label: "On TV", path: "/browse/tv/on-the-air" },
  { label: "Top Rated", path: "/browse/tv/top-rated" },
] as const;

const MENU_PROPS = {
  anchorOrigin: { vertical: "bottom" as const, horizontal: "center" as const },
  transformOrigin: { vertical: "top" as const, horizontal: "center" as const },
};

const Header = () => {
  const [textInput, setTextInput] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const router = useRouterState();
  const isHomePage = router.location.pathname === HOME_PATH;
  const dispatch = useDispatch();
  const sessionId = useSelector((state: RootState) => state.auth.sessionId);
  const navigate = useNavigate();

  useEffect(() => {
    setIsSearchOpen(false);
    setTextInput("");
  }, [router.location.pathname]);

  const showSearchBar = isHomePage || isSearchOpen;

  const handleNavigate = useCallback(
    (path: string) => {
      navigate({ to: path });
    },
    [navigate],
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
    setAnchorElUser(null);
  }, [dispatch]);

  const handleUserMenuClose = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleUserMenuOpen = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget);
  }, []);

  const handleSearchToggle = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
  }, []);

  return (
    <>
      {/* --- Main Header --- */}
      <HeaderContainer>
        <ContentWrapper>
          {/* LEFT SIDE: Logo & Menu */}
          <Stack direction="row" alignItems="center">
            <Link to={HOME_PATH}>
              <Logo src="/images/movie_logo2.png" alt="movie" />
            </Link>

            <NavList>
              <li>
                <HoverDropdown label="Movies">
                  {MOVIE_MENU_ITEMS.map((item) => (
                    <MenuItem key={item.path} onClick={() => handleNavigate(item.path)}>
                      {item.label}
                    </MenuItem>
                  ))}
                </HoverDropdown>
              </li>
              <li>
                <HoverDropdown label="TV Shows">
                  {TV_MENU_ITEMS.map((item) => (
                    <MenuItem key={item.path} onClick={() => handleNavigate(item.path)}>
                      {item.label}
                    </MenuItem>
                  ))}
                </HoverDropdown>
              </li>
            </NavList>
          </Stack>

          {/* RIGHT SIDE: User & Search */}
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* User Section */}
            <Box>
              {sessionId ? (
                <>
                  <UserBadge onClick={handleUserMenuOpen}>
                    <Typography fontSize="inherit" fontWeight="inherit">
                      {AVATAR_INITIAL}
                    </Typography>
                  </UserBadge>

                  <Menu
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleUserMenuClose}
                    {...MENU_PROPS}
                    sx={{ mt: 1 }}
                  >
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                  </Menu>
                </>
              ) : (
                <NavItemText onClick={() => login()} sx={{ fontSize: "16px" }}>
                  {LOGIN_TEXT}
                </NavItemText>
              )}
            </Box>

            {/* Search Icon Toggle */}
            <IconButton
              disableRipple
              onClick={handleSearchToggle}
              color="secondary" // Sử dụng màu secondary (blue) từ theme
              sx={{ p: 0 }}
            >
              {isSearchOpen && !isHomePage ? (
                <X size={SEARCH_ICON_SIZE} />
              ) : (
                <Search size={SEARCH_ICON_SIZE} />
              )}
            </IconButton>
          </Stack>
        </ContentWrapper>
      </HeaderContainer>

      {/* --- Search Bar --- */}
      {showSearchBar && (
        <SearchContainer isSticky={isHomePage}>
          <SearchContent onSubmit={(e) => e.preventDefault()}>
            <IoSearchSharp size={SEARCH_ICON_SIZE} />

            <SearchInput
              placeholder="Search for a movie, tv show,..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              endAdornment={
                textInput && (
                  <ClearButton size="small" onClick={() => setTextInput("")}>
                    <X size={16} />
                  </ClearButton>
                )
              }
            />
          </SearchContent>
        </SearchContainer>
      )}
    </>
  );
};

export default Header;
