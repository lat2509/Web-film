import { useState, useCallback, useMemo } from "react";

export const useCheckboxGroup = (totalItems: number, defaultChecked = true) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(totalItems).fill(defaultChecked),
  );

  const isAllChecked = useMemo(() => checkedItems.every(Boolean), [checkedItems]);
  const isIndeterminate = useMemo(
    () => checkedItems.some(Boolean) && !isAllChecked,
    [checkedItems, isAllChecked],
  );

  const handleParentChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedItems(new Array(totalItems).fill(event.target.checked));
    },
    [totalItems],
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

  return {
    checkedItems,
    isAllChecked,
    isIndeterminate,
    handleParentChange,
    handleChildChange,
  };
};
