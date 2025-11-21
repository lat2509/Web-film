import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface SwitchToggleProps {
  items: { label: string; value: string }[];
  value: string;
  onToggle: (value: string) => void;
}

const SwitchToggle = ({ items, value, onToggle }: SwitchToggleProps) => {
  const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: string) => {
    if (newValue !== null) {
      onToggle(newValue);
    }
  };
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      aria-label="time window"
      sx={{
        height: "30px",
        backgroundColor: "white",
        borderRadius: "30px",
        border: "1px solid #032541",
        "& .MuiToggleButtonGroup-grouped": {
          margin: 0,
          border: 0,
          "&:not(:first-of-type)": {
            borderRadius: "30px",
          },
          "&:first-of-type": {
            borderRadius: "30px",
          },
        },
      }}
    >
      {items.map((item) => (
        <ToggleButton key={item.value} value={item.value}>
          {item.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default SwitchToggle;
