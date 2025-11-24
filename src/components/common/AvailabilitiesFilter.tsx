import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";

interface checkedBoxFiler {
  type: string;
  options: string[];
}

const AvailabilitiesFilter = ({ type, options }: checkedBoxFiler) => {
  const [checkedItems, setCheckedItems] = useState(new Array(options.length).fill(true));

  const isAllChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !isAllChecked;

  const handleParentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems(new Array(options.length).fill(event.target.checked));
  };

  const handleChildChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = [...checkedItems];
    newChecked[index] = event.target.checked;
    setCheckedItems(newChecked);
  };

  return (
    <div>
      <FormControlLabel
        label={type}
        control={
          <Checkbox
            checked={isAllChecked}
            indeterminate={isIndeterminate}
            onChange={handleParentChange}
          />
        }
      />
      <Box sx={{ display: isAllChecked ? "none" : "flex", flexDirection: "column" }}>
        {options.map((label, index) => (
          <FormControlLabel
            key={label}
            label={label}
            control={<Checkbox checked={checkedItems[index]} onChange={handleChildChange(index)} />}
          />
        ))}
      </Box>
    </div>
  );
};

export default AvailabilitiesFilter;
