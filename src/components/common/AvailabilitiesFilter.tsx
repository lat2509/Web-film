import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

// Hooks
import { useCheckboxGroup } from "@hooks/useCheckBoxGroup";

// Styles
import { FilterContainer, ParentLabel, ChildGroup } from "@styles/AvailabilitiesFilter.styles";

interface AvailabilitiesFilterProps {
  type: string;
  options: string[];
}

const AvailabilitiesFilter = ({ type, options }: AvailabilitiesFilterProps) => {
  const { checkedItems, isAllChecked, isIndeterminate, handleParentChange, handleChildChange } =
    useCheckboxGroup(options.length);

  return (
    <FilterContainer>
      <ParentLabel
        label={type}
        control={
          <Checkbox
            checked={isAllChecked}
            indeterminate={isIndeterminate}
            onChange={handleParentChange}
          />
        }
      />

      <ChildGroup isHidden={isAllChecked}>
        {options.map((label, index) => (
          <FormControlLabel
            key={label}
            label={label}
            control={
              <Checkbox
                checked={checkedItems[index]}
                onChange={handleChildChange(index)}
                size="small"
              />
            }
          />
        ))}
      </ChildGroup>
    </FilterContainer>
  );
};

export default AvailabilitiesFilter;
