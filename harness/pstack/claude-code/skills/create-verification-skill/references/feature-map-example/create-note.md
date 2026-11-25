# Tạo một note

Tạo note cho phép người dùng lưu một note có tiêu đề từ trình duyệt hoặc CLI, hủy một bản nháp chưa xong, và xác nhận note đã lưu từ một góc nhìn hướng người dùng thứ hai.

## Sub-features

- `create-open` mở một editor trống từ mỗi điểm vào trên trình duyệt.
- `create-save` lưu bền một tiêu đề và nội dung.
- `create-cancel` bỏ một bản nháp chưa xong trên trình duyệt.
- `create-cli` tạo cùng hình dạng note từ terminal.

## How to get to it (user POV)

- Chọn nút `New note` trên toolbar của trình duyệt.
- Nhấn `n` trên trình duyệt khi focus nằm ngoài một field có thể chỉnh sửa.
- Chạy `notes create --title <title> --body <body>` trong một terminal.

## Driving it with control-notes

Preconditions:

- Notes đang khỏe mạnh tại `http://127.0.0.1:4173`.
- Không có note nào có tiêu đề `Release checklist`.
- `control-notes doctor` báo cáo đúng URL mong đợi và thư mục dữ liệu dùng một lần.

- **Mở editor.** Chọn `New note`. Chạy `control-notes browser click --role button --name "New note"`. Một form tên `Note editor` xuất hiện với focus trong textbox `Title`.
- **Nhập nội dung.** Gõ tiêu đề và nội dung. Chạy `control-notes browser fill --role textbox --name "Title" --value "Release checklist"` và `control-notes browser fill --role textbox --name "Body" --value "Tag and publish"`. Nút `Save note` được bật.
- **Lưu note.** Chọn `Save note`. Chạy `control-notes browser click --role button --name "Save note"`. Một status tên `Note saved` xuất hiện và heading hiển thị `Release checklist`.
- **Xác nhận lưu bền.** Quay lại danh sách note và mở lại note. Chạy `control-notes browser click --role link --name "All notes"` và `control-notes browser click --role link --name "Release checklist"`. Editor hiển thị cả hai giá trị đã lưu.
- **Hủy bản nháp.** Mở một note mới, nhập `Discard me`, và chọn `Cancel`. Chạy `control-notes browser click --role button --name "New note"`, `control-notes browser fill --role textbox --name "Title" --value "Discard me"`, và `control-notes browser click --role button --name "Cancel"`. Danh sách note quay lại và không có link `Discard me`.
- **Điểm vào CLI.** Tạo một note thứ hai. Chạy `control-notes cli -- notes create --title "CLI note" --body "Created from terminal" --format json`. Exit code `0` và stdout chứa ID và tiêu đề của note mới.
- **Bằng chứng.** Mở lại cả hai note đã lưu từ `All notes`. Chạy `control-notes browser snapshot --aria --path artifacts/create-note/list.aria.txt` và `control-notes browser screenshot --path artifacts/create-note/list.png`. Các artifact cho thấy `Release checklist` và `CLI note`.

## Gotchas

- Nhấn `n` khi một textbox đang có focus sẽ gõ ký tự đó thay vì mở một editor mới.
- Tiêu đề được cắt khoảng trắng khi lưu. Khẳng định tiêu đề được render, không phải giá trị input của bản nháp.
- Chỉ một status lưu là bằng chứng chưa đủ. Mở lại note từ danh sách.
- Xóa `Release checklist` và `CLI note` khi dọn dẹp fixture, nhưng giữ lại các artifact bằng chứng của chúng.
