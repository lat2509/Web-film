import { ListItemText } from "@mui/material";
// Import styles
import {
  SidebarContainer,
  SidebarHeader,
  StyledListItemButton,
  CountBadge,
} from "@styles/SearchSidebar.styles";

interface SearchSidebarProps {
  stats: { id: string; label: string; count: number; isLoading: boolean }[];
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const SearchSidebar = ({ stats, selectedType, onTypeChange }: SearchSidebarProps) => {
  return (
    <SidebarContainer>
      <SidebarHeader variant="h5">Search Results</SidebarHeader>

      {stats.map((stat) => {
        const isActive = selectedType === stat.id;

        return (
          <StyledListItemButton
            key={stat.id}
            selected={isActive}
            onClick={() => onTypeChange(stat.id)}
          >
            <ListItemText primary={stat.label} />

            {/* Truyền prop active vào để styled component tự xử lý màu */}
            <CountBadge active={isActive}>
              {stat.isLoading ? "..." : stat.count.toLocaleString()}
            </CountBadge>
          </StyledListItemButton>
        );
      })}
    </SidebarContainer>
  );
};

export default SearchSidebar;
