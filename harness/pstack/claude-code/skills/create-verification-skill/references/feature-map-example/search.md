# Tìm kiếm note

Tìm kiếm cho phép người dùng tìm note theo tiêu đề hoặc nội dung, xem một note khớp, và phân biệt không có kết quả khớp với tìm kiếm không khả dụng.

## Sub-features

- `search-open` mở tìm kiếm từ mỗi điểm vào được hỗ trợ trên trình duyệt.
- `search-match` trả về các kết quả khớp tiêu đề và nội dung mà không thay đổi dữ liệu note.
- `search-open-result` mở một kết quả trong editor note.
- `search-empty` hiển thị một trạng thái rỗng hoàn chỉnh cho một truy vấn không có kết quả khớp.
- `search-clear` xóa truy vấn và khôi phục góc nhìn note gần đây.
- `search-cli` trả về cùng các note khớp từ terminal.

## How to get to it (user POV)

- Chọn nút `Search` trên toolbar của trình duyệt.
- Nhấn `/` trên trình duyệt khi focus nằm ngoài một field có thể chỉnh sửa.
- Chạy `notes search <query>` trong một terminal.

## Driving it with control-notes

Preconditions:

- Notes đang khỏe mạnh tại `http://127.0.0.1:4173`.
- Thư mục dữ liệu dùng một lần chứa `Quarterly plan` với nội dung `Draft budget`.
- `control-notes doctor` báo cáo đúng URL và thư mục dữ liệu mong đợi.

- **Điểm vào toolbar.** Chọn nút `Search`. Chạy `control-notes browser click --role button --name "Search"`. Một dialog tên `Search notes` xuất hiện với focus trong searchbox của nó.
- **Điểm vào bàn phím.** Đóng dialog, focus vào trang, và nhấn `/`. Chạy `control-notes browser press --key "/"`. Cùng dialog đó xuất hiện và trang không chèn dấu gạch chéo.
- **Khớp tiêu đề.** Gõ `quarterly`. Chạy `control-notes browser fill --role searchbox --name "Search notes" --value "quarterly"`. Danh sách `Search results` chứa `Quarterly plan` và không chứa `Grocery list`.
- **Khớp nội dung.** Thay truy vấn bằng `budget`. Chạy `control-notes browser fill --role searchbox --name "Search notes" --value "budget"`. Kết quả `Quarterly plan` vẫn hiển thị với một đoạn trích khớp nội dung.
- **Mở kết quả.** Chọn `Quarterly plan`. Chạy `control-notes browser click --role link --name "Quarterly plan"`. Dialog đóng lại và heading của editor hiển thị `Quarterly plan`.
- **Trạng thái rỗng.** Mở lại tìm kiếm và nhập `volcano`. Chạy `control-notes browser fill --role searchbox --name "Search notes" --value "volcano"`. Một status tên `No matching notes` xuất hiện sau khi tìm kiếm hoàn tất.
- **Xóa truy vấn.** Chọn `Clear search`. Chạy `control-notes browser click --role button --name "Clear search"`. Searchbox trống và vùng `Recent notes` thay thế danh sách kết quả.
- **Khớp qua CLI.** Tìm kiếm từ terminal. Chạy `control-notes cli -- notes search "quarterly" --format json`. Exit code `0` và stdout chứa một object có tiêu đề là `Quarterly plan`.
- **Không khớp qua CLI.** Tìm một giá trị không có. Chạy `control-notes cli -- notes search "volcano" --format json`. Exit code `0` và stdout là `[]`.
- **Bằng chứng.** Thu trạng thái kết quả có dữ liệu. Chạy `control-notes browser snapshot --aria --path artifacts/search/results.aria.txt` và `control-notes browser screenshot --path artifacts/search/results.png`. Cả hai artifact đều xác định Notes, truy vấn, và `Quarterly plan`.

## Gotchas

- Nhấn `/` khi editor hoặc searchbox đang có focus sẽ chèn chữ thay vì mở tìm kiếm.
- Kết quả cập nhật sau một khoảng debounce ngắn. Chờ danh sách kết quả hoặc status rỗng, không dùng một khoảng sleep cố định.
- Các note đã lưu trữ bị loại trừ trừ khi người dùng bật `Include archived`.
- CLI mặc định xuất output dễ đọc cho người. Dùng `--format json` cho các assertion ổn định.
- Mở một kết quả thay đổi trạng thái trình duyệt. Mở lại tìm kiếm trước khi chứng minh một truy vấn khác.
