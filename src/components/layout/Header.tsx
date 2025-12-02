import { Link } from "@tanstack/react-router";
import { Box, Stack, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Search, X } from "lucide-react";
import login from "@services/login";

// Components & Hooks
import HoverDropdown from "@components/common/HoverDropdown";
import HeaderSearchBar from "./HeaderSearchBar";
import { useHeader } from "@hooks/useHeader";

// Styles
import {
  HeaderContainer,
  ContentWrapper,
  Logo,
  NavList,
  NavItemText,
  UserBadge,
} from "@styles/Header.styles";

// Constants
const HOME_PATH = "/";
const AVATAR_INITIAL = "A";
const SEARCH_ICON_SIZE = 24;
const LOGIN_TEXT = "đăng nhập";

const MENU_PROPS = {
  anchorOrigin: { vertical: "bottom" as const, horizontal: "center" as const },
  transformOrigin: { vertical: "top" as const, horizontal: "center" as const },
};

// Data Menu (Có thể tách ra file constants riêng nếu muốn)
const MOVIE_MENU_ITEMS = [
  { label: "Popular", path: "/browse/movie/popular" },
  { label: "Now Playing", path: "/browse/movie/now-playing" },
  { label: "Upcoming", path: "/browse/movie/upcoming" },
  { label: "Top Rated", path: "/browse/movie/top-rated" },
];

const TV_MENU_ITEMS = [
  { label: "Popular", path: "/browse/tv/popular" },
  { label: "Airing Today", path: "/browse/tv/airing-today" },
  { label: "On TV", path: "/browse/tv/on-the-air" },
  { label: "Top Rated", path: "/browse/tv/top-rated" },
];

const Header = () => {
  const { state, actions } = useHeader();

  return (
    <>
      <HeaderContainer>
        <ContentWrapper>
          {/* LEFT: Logo & Nav */}
          <Stack direction="row" alignItems="center">
            <Link to={HOME_PATH}>
              <Logo src="/images/movie_logo2.png" alt="movie" />
            </Link>

            <NavList>
              <li>
                <HoverDropdown label="Movies">
                  {MOVIE_MENU_ITEMS.map((item) => (
                    <MenuItem key={item.path} onClick={() => actions.handleNavigate(item.path)}>
                      {item.label}
                    </MenuItem>
                  ))}
                </HoverDropdown>
              </li>
              <li>
                <HoverDropdown label="TV Shows">
                  {TV_MENU_ITEMS.map((item) => (
                    <MenuItem key={item.path} onClick={() => actions.handleNavigate(item.path)}>
                      {item.label}
                    </MenuItem>
                  ))}
                </HoverDropdown>
              </li>
            </NavList>
          </Stack>

          {/* RIGHT: User & Search Toggle */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box>
              {state.sessionId ? (
                <>
                  <UserBadge onClick={actions.handleUserMenuOpen}>
                    <Typography fontSize="inherit" fontWeight="inherit">
                      {AVATAR_INITIAL}
                    </Typography>
                  </UserBadge>
                  <Menu
                    anchorEl={state.anchorElUser}
                    open={Boolean(state.anchorElUser)}
                    onClose={actions.handleUserMenuClose}
                    {...MENU_PROPS}
                    sx={{ mt: 1 }}
                  >
                    <MenuItem onClick={actions.handleLogout}>Log Out</MenuItem>
                  </Menu>
                </>
              ) : (
                <NavItemText onClick={() => login()} sx={{ fontSize: "16px" }}>
                  {LOGIN_TEXT}
                </NavItemText>
              )}
            </Box>

            <IconButton
              disableRipple
              onClick={actions.handleSearchToggle}
              color="secondary"
              sx={{ p: 0 }}
            >
              {state.isSearchOpen && !state.isHomePage ? (
                <X size={SEARCH_ICON_SIZE} />
              ) : (
                <Search size={SEARCH_ICON_SIZE} />
              )}
            </IconButton>
          </Stack>
        </ContentWrapper>
      </HeaderContainer>

      {/* SEARCH BAR SUB-COMPONENT */}
      {state.showSearchBar && (
        <HeaderSearchBar
          isSticky={state.isHomePage}
          value={state.textInput}
          onChange={actions.setTextInput}
          onClear={actions.handleClearSearch}
        />
      )}
    </>
  );
};

export default Header;
