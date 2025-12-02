import { memo, useCallback } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import { StyledToggleButtonGroup } from "@styles/SwitchToggle.styles";

interface SwitchToggleProps<T extends string> {
  items: { label: string; value: T }[];
  value: T;
  onToggle: (value: T) => void;
}

// 1. Khai báo Component Inner (Chưa bọc memo)
const SwitchToggleInner = <T extends string>({ items, value, onToggle }: SwitchToggleProps<T>) => {
  const handleChange = useCallback(
    (_event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
      if (newValue !== null) {
        // Ép kiểu newValue từ MUI (string) về T
        onToggle(newValue as T);
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
};

// 2. Bọc memo và ÉP KIỂU (Quan trọng!)
const SwitchToggle = memo(SwitchToggleInner) as typeof SwitchToggleInner;

export default SwitchToggle;
