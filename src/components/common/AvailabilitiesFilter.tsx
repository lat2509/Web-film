import { Checkbox, FormControlLabel } from "@mui/material";
// Import style cũ của bạn
import { FilterContainer, ParentLabel, ChildGroup } from "@styles/AvailabilitiesFilter.styles";

// Interface
export interface Option {
  label: string;
  value: string | number;
}

interface AvailabilitiesFilterProps {
  type?: string;
  options: Option[];
  selectedValues: (string | number)[]; // Nhận từ Cha
  onChange: (newValues: (string | number)[]) => void; // Báo cho Cha
}

const AvailabilitiesFilter = ({
  type,
  options,
  selectedValues,
  onChange,
}: AvailabilitiesFilterProps) => {
  // LOGIC MỚI: Tính toán dựa trên props từ cha (Không dùng state nội bộ)
  const isAllChecked = selectedValues.length === options.length && options.length > 0;
  const isIndeterminate = selectedValues.length > 0 && selectedValues.length < options.length;

  // 1. Xử lý khi bấm nút Cha (Select All)
  const handleParentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // Chọn hết -> Lấy tất cả value gửi cho Cha
      const allValues = options.map((opt) => opt.value);
      onChange(allValues);
    } else {
      // Bỏ chọn -> Gửi mảng rỗng
      onChange([]);
    }
  };

  // 2. Xử lý khi bấm nút Con (Single Select)
  const handleChildChange = (value: string | number) => {
    const currentIndex = selectedValues.indexOf(value);
    const newValues = [...selectedValues];

    if (currentIndex === -1) {
      newValues.push(value); // Thêm
    } else {
      newValues.splice(currentIndex, 1); // Xóa
    }
    // Gửi mảng mới cho Cha
    onChange(newValues);
  };

  return (
    <FilterContainer>
      <ParentLabel
        label={type || "Select All"}
        control={
          <Checkbox
            checked={isAllChecked}
            indeterminate={isIndeterminate}
            onChange={handleParentChange}
          />
        }
      />

      {/* Logic ẩn hiện dựa trên props từ Cha */}
      <ChildGroup isHidden={isAllChecked}>
        {options.map((opt) => (
          <FormControlLabel
            key={opt.value}
            label={opt.label}
            control={
              <Checkbox
                size="small"
                // Checkbox được kiểm soát bởi Cha
                checked={selectedValues.includes(opt.value)}
                onChange={() => handleChildChange(opt.value)}
              />
            }
          />
        ))}
      </ChildGroup>
    </FilterContainer>
  );
};

export default AvailabilitiesFilter;
