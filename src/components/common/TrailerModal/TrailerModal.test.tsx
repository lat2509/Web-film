import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TrailerModal from "./TrailerModal";

// --- PHẦN 1: MOCKING (QUAN TRỌNG NHẤT) ---
// Chúng ta bảo Vitest: "Này, khi component gọi @hooks/useTrailer, đừng chạy file thật."
// "Hãy chạy cái hàm giả tao định nghĩa ở đây."
import * as useTrailerHook from "@hooks/useTrailer";

vi.mock("@hooks/useTrailer", () => ({
  useTrailer: vi.fn(), // Tạo một hàm rỗng để ta có thể điều khiển kết quả trả về sau này
}));

// Mock component Loading (để test cho dễ, đỡ phải render component Loading thật phức tạp)
vi.mock("../Loading", () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>,
}));

describe("TrailerModal Component", () => {
  // Hàm giả để hứng sự kiện đóng modal
  const mockOnClose = vi.fn();

  // Reset lại mọi thứ trước mỗi lần chạy 1 test case (để sạch sẽ)
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // --- CASE 1: ĐANG TẢI (LOADING) ---
  it("should render loading state initially", () => {
    // 1. Giả lập useTrailer trả về: đang loading = true
    (useTrailerHook.useTrailer as any).mockReturnValue({
      data: null,
      isLoading: true,
    });

    // 2. Vẽ component ra
    render(<TrailerModal id={123} type="movie" onClose={mockOnClose} />);

    // 3. Kiểm tra xem chữ "Loading..." (hoặc spinner) có hiện ra không
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  // --- CASE 2: CÓ DỮ LIỆU TRAILER (SUCCESS) ---
  it("should render iframe with correct video when loaded", () => {
    // 1. Giả lập useTrailer trả về: có dữ liệu
    const mockData = { key: "video_id_123", name: "Super Hero Trailer" };
    (useTrailerHook.useTrailer as any).mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(<TrailerModal id={123} type="movie" onClose={mockOnClose} />);

    // 2. Kiểm tra tên Trailer có hiện đúng không
    expect(screen.getByText("Super Hero Trailer")).toBeInTheDocument();

    // 3. Kiểm tra thẻ iframe có xuất hiện không
    const iframe = screen.getByTitle("Trailer");
    expect(iframe).toBeInTheDocument();

    // 4. Kiểm tra link youtube có đúng ID không
    // (Lưu ý: dùng toContain để check 1 phần chuỗi cho an toàn)
    expect(iframe).toHaveAttribute("src", expect.stringContaining("video_id_123"));
  });

  // --- CASE 3: KHÔNG CÓ TRAILER (EMPTY) ---
  it('should render "No Trailer Available" when no data', () => {
    // 1. Giả lập trả về null (không tìm thấy video)
    (useTrailerHook.useTrailer as any).mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(<TrailerModal id={123} type="movie" onClose={mockOnClose} />);

    // 2. Kiểm tra dòng thông báo lỗi
    expect(screen.getByText("No Trailer Available")).toBeInTheDocument();
  });

  // --- CASE 4: TƯƠNG TÁC NGƯỜI DÙNG (CLICK) ---
  it("should call onClose when clicking close button", () => {
    // Setup dữ liệu giả bất kỳ
    (useTrailerHook.useTrailer as any).mockReturnValue({ data: null, isLoading: false });

    render(<TrailerModal id={123} type="movie" onClose={mockOnClose} />);

    // 1. Tìm nút đóng (thường là button)
    // Vì code bạn dùng <CloseButton>, nó render ra thẻ <button>
    const closeBtn = screen.getByRole("button");

    // 2. Giả lập hành động Click
    fireEvent.click(closeBtn);

    // 3. Kiểm tra hàm onClose có được gọi không
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
