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

// constant
import {
  HOME_PATH,
  MOVIE_MENU_ITEMS,
  TV_MENU_ITEMS,
  AVATAR_INITIAL,
  MENU_PROPS,
  LOGIN_TEXT,
  SEARCH_ICON_SIZE,
} from "@utils/constant";
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
