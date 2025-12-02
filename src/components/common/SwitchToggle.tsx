import { memo, useCallback } from "react";
import ToggleButton from "@mui/material/ToggleButton";

// Import Styled Component
import { StyledToggleButtonGroup } from "@styles/SwitchToggle.styles";

interface SwitchToggleProps {
  items: { label: string; value: string }[];
  value: string;
  onToggle: (value: string) => void;
}

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
      aria-label="switch toggle"
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
