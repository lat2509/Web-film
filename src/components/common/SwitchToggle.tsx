import { memo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface SwitchToggleProps {
  items: { label: string; value: string }[];
  value: string;
  onToggle: (value: string) => void;
}

// Styled Component
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  height: "30px",
  backgroundColor: theme.palette.common.white,
  borderRadius: "30px",
  border: `1px solid ${theme.palette.primary.main}`,

  "& .MuiToggleButtonGroup-grouped": {
    margin: 0,
    border: 0,
    textTransform: "none",
    fontWeight: 600,
    fontSize: "14px",
    padding: theme.spacing(0, 2),
    color: theme.palette.primary.main,
    borderRadius: "30px",

    "&:hover": {
      backgroundColor: "rgba(3, 37, 65, 0.1)",
    },

    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      borderRadius: "30px",
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}));

const SwitchToggle = memo(({ items, value, onToggle }: SwitchToggleProps) => {
  const handleChange = useCallback(
    (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
      if (newValue !== null) {
        onToggle(newValue);
      }
    },
    [onToggle],
  );

  return (
    <StyledToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      aria-label="time window"
    >
      {items.map((item) => (
        <ToggleButton key={item.value} value={item.value} disableRipple>
          {item.label}
        </ToggleButton>
      ))}
    </StyledToggleButtonGroup>
  );
});

SwitchToggle.displayName = "SwitchToggle";

export default SwitchToggle;
