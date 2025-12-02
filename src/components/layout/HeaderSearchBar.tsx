import { IoSearchSharp } from "react-icons/io5";
import { X } from "lucide-react";
import { SearchContainer, SearchContent, SearchInput, ClearButton } from "@styles/Header.styles";

interface HeaderSearchBarProps {
  isSticky: boolean;
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
}

const HeaderSearchBar = ({ isSticky, value, onChange, onClear }: HeaderSearchBarProps) => {
  return (
    <SearchContainer isSticky={isSticky}>
      <SearchContent onSubmit={(e) => e.preventDefault()}>
        <IoSearchSharp size={24} />
        <SearchInput
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
};

export default HeaderSearchBar;
