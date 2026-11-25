# Bản đồ kiểm chứng Notes

Thư mục này là nguồn được bảo trì để kiểm chứng hành vi hướng người dùng của Notes. Đọc index trước khi điều khiển app, rồi dùng file feature tương ứng làm công thức.

## Điều kiện tiên quyết cơ bản

- Khởi chạy Notes tại `http://127.0.0.1:4173` với một thư mục dữ liệu dùng một lần.
- Đặt `NOTES_DATA_DIR=/tmp/notes-verify-$RUN_ID` để các lượt chạy đồng thời không dùng chung trạng thái.
- Seed các note có tiêu đề `Quarterly plan` và `Grocery list`.
- Đặt `control-notes` và CLI `notes` vào `PATH`.
- Chạy `control-notes doctor` và yêu cầu đúng URL, thư mục dữ liệu, và revision build mong đợi.
- Không bao giờ điều khiển một instance không được khởi động bởi lượt chạy kiểm chứng này.

## Quy ước điều khiển

- Bắt đầu mọi công thức từ trạng thái cơ bản trừ khi điều kiện tiên quyết của nó nói khác.
- Ưu tiên ARIA role và accessible name thay vì CSS selector hay vị trí DOM.
- Coi mọi lệnh là nguyên văn. Giữ nguyên các tên và flag trong dấu nháy.
- Chạy các hành động trên trình duyệt qua `control-notes browser`.
- Chạy các hành động trên terminal qua `control-notes cli -- <command>`.
- Khôi phục dữ liệu seed sau một thay đổi. Đừng xóa các artifact bằng chứng khi dọn dẹp.

## Báo cáo bằng chứng và phần bỏ qua

- Thu hành động của người dùng và trạng thái kết quả, không chỉ màn hình cuối.
- Bằng chứng UI bao gồm một ARIA snapshot và một screenshot có thể thấy danh tính của app.
- Bằng chứng CLI bao gồm lệnh, stdout, stderr, và exit code.
- Bằng chứng thay đổi dữ liệu bao gồm một góc nhìn thứ hai chỉ đọc của giá trị đã lưu.
- Ghi lại ID feature và điểm vào đã dùng cùng mọi artifact.
- Báo cáo một đường không thể tiếp cận kèm lệnh đã thử và điều kiện tiên quyết chưa được đáp ứng.
- Đừng báo cáo một điểm vào bị bỏ qua là đã kiểm chứng qua một đường khác.

## Hợp đồng cho mục feature

Mỗi file feature bắt đầu bằng một tiêu đề H1 và một đoạn văn mô tả hành vi mà người dùng nhìn thấy. Sau đó nó dùng đúng bốn phần H2 theo thứ tự này.

1. `Sub-features` liệt kê các ID ngắn, mỗi hành vi một dòng.
2. `How to get to it (user POV)` liệt kê mọi điểm vào của người dùng.
3. `Driving it with <harness>` bắt đầu bằng `Preconditions:` và dùng các gạch đầu dòng có nhãn ghép mỗi hành động của người dùng với một lệnh chính xác và kết quả quan sát được.
4. `Gotchas` liệt kê các cái bẫy có thể làm lãng phí hoặc vô hiệu hóa một lượt chạy kiểm chứng.

Giữ chi tiết cài đặt ngoài map. Chỉ gọi tên đường đi của người dùng, handle ổn định, trạng thái cần có, lệnh, và bằng chứng quan sát được.

## Các feature

- [Tạo một note](./create-note.md) bao gồm việc tạo qua trình duyệt và CLI, hủy, lưu bền, và dọn dẹp.
- [Tìm kiếm note](./search.md) bao gồm tìm kiếm qua toolbar, bàn phím, và CLI với các trạng thái khớp, rỗng, và xóa.
