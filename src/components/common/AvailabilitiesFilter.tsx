import React, { useState, useCallback, useMemo } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

interface CheckedBoxFilterProps {
  type: string;
  options: string[];
}

const AvailabilitiesFilter = ({ type, options }: CheckedBoxFilterProps) => {
  const [checkedItems, setCheckedItems] = useState(new Array(options.length).fill(true));

  const isAllChecked = useMemo(() => checkedItems.every(Boolean), [checkedItems]);
  const isIndeterminate = useMemo(
    () => checkedItems.some(Boolean) && !isAllChecked,
    [checkedItems, isAllChecked],
  );

  const handleParentChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedItems(new Array(options.length).fill(event.target.checked));
    },
    [options.length],
  );

  const handleChildChange = useCallback(
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedItems((prev) => {
        const newChecked = [...prev];
        newChecked[index] = event.target.checked;
        return newChecked;
      });
    },
    [],
  );

  return (
    <Box>
      <FormControlLabel
        label={type}
        sx={{ span: { fontWeight: 500 } }} // Style nhẹ cho label cha
        control={
          <Checkbox
            checked={isAllChecked}
            indeterminate={isIndeterminate}
            onChange={handleParentChange}
          />
        }
      />
      {/* Logic ẩn hiện giữ nguyên */}
      <Box sx={{ display: isAllChecked ? "none" : "flex", flexDirection: "column", ml: 3 }}>
        {options.map((label, index) => (
          <FormControlLabel
            key={label}
            label={label}
            control={
              <Checkbox
                checked={checkedItems[index]}
                onChange={handleChildChange(index)}
                size="small" // Checkbox con nhỏ hơn chút cho đẹp
              />
            }
          />
        ))}
      </Box>
    </Box>
  );
};

export default AvailabilitiesFilter;
