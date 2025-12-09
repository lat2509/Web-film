import { IoSearchSharp } from "react-icons/io5";
import { X } from "lucide-react";
import { SearchContainer, SearchContent, SearchInput, ClearButton } from "@styles/Header.styles";
import { Autocomplete, Stack, Typography } from "@mui/material";
import { useTrending } from "@hooks/useHomeData";
import type { MovieType } from "@app-types/type";
import { useEffect, useMemo, useState } from "react";
import { useMoviesSearch } from "@hooks/useMoviesSearch";
import { debounce } from "lodash";
import { useNavigate } from "@tanstack/react-router";

interface HeaderSearchBarProps {
  isSticky: boolean;
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
}

const HeaderSearchBar = ({ isSticky, value, onChange, onClear }: HeaderSearchBarProps) => {
  const { data = [] } = useTrending("day");

  const res = data.slice(0, 10);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [debouncedTerm, setDebouncedTerm] = useState(value);

  const debounceSetter = useMemo(
    () =>
      debounce((newValue: string) => {
        setDebouncedTerm(newValue);
      }, 500),
    [],
  );

  useEffect(() => {
    debounceSetter(value);
    return () => {
      debounceSetter.cancel();
    };
  }, [value, debounceSetter]);

  const { data: movieSearch = [] } = useMoviesSearch(debouncedTerm);

  const filter = value ? movieSearch : res;

  return (
    <Autocomplete
      freeSolo
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      inputValue={value}
      onInputChange={(_e, newInputValue) => {
        onChange(newInputValue);
        if (newInputValue) setOpen(true);
      }}
      options={filter}
      getOptionLabel={(option: string | MovieType) => {
        if (typeof option === "string") return option;
        return option.title || option.name || "";
      }}
      renderOption={(props, option: MovieType) => {
        const { key, ...optionProps } = props;
        return (
          <Stack
            component="li"
            key={option.id}
            {...optionProps}
            direction="row"
            onClick={() => {
              navigate({
                to: "/search",
                search: {
                  query: option.title || option.name || " ",
                  page: 1,
                },
              });
              setOpen(false);
            }}
          >
            <Typography>{option.title || option.name}</Typography>
          </Stack>
        );
      }}
      renderInput={(param) => {
        const { InputProps, InputLabelProps, inputProps, ...otherParams } = param;
        const { color, ...otherinputProps } = inputProps;
        return (
          <SearchContainer isSticky={isSticky}>
            <SearchContent onSubmit={(e) => e.preventDefault()}>
              <IoSearchSharp size={24} />
              <SearchInput
                ref={InputProps.ref}
                inputProps={otherinputProps}
                {...otherParams}
                placeholder="Search for a movie, tv show,..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                endAdornment={
                  value && (
                    <ClearButton size="small" onClick={onClear}>
                      <X size={16} />
                    </ClearButton>
                  )
                }
              />
            </SearchContent>
          </SearchContainer>
        );
      }}
    />
  );
};

export default HeaderSearchBar;
