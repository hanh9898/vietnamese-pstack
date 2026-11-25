---
name: principle-test-behavior-not-implementation
description: "Áp dụng khi bạn viết, thay đổi, hoặc giữ một test. Khẳng định những gì người dùng của code quan sát được, để test thất bại khi hành vi đó hỏng và vẫn pass khi chỉ phần bên trong thay đổi."
disable-model-invocation: true
---

# Test Behavior, Not Implementation

Một test là một khẳng định về những gì người dùng của code quan sát được qua interface của nó: giá trị trả về, lỗi, state họ có thể đọc lại, và tác động lên các hệ thống bên ngoài. Helper riêng tư, thứ tự gọi nội bộ, và dữ liệu trung gian là phần cài đặt.

Đánh giá mỗi test với hai chỉnh sửa tưởng tượng:

- **Làm hỏng hành vi** (một giá trị sai, một tác động bị bỏ qua hoặc bị nhân đôi). Nếu test vẫn pass, nó không chứng minh được gì. Nguyên nhân thường gặp là một assertion lỏng lẻo, một giá trị mong đợi được tính bởi chính code đang được test, và một assertion trên dữ liệu do chính test tạo ra.
- **Thay đổi phần bên trong** và giữ nguyên mọi kết quả quan sát được. Nếu test thất bại, nó bị ghim vào phần cài đặt.

Giữ test bắt được chỉnh sửa thứ nhất và sống sót qua chỉnh sửa thứ hai. Viết lại hoặc xóa phần còn lại. Điều khiển code qua interface công khai của nó với một input cụ thể, và suy ra giá trị mong đợi từ yêu cầu. Những gì một service bên ngoài nhận được là hành vi. Một lệnh gọi đến helper nội bộ thì không. Ghép "điều này không bao giờ xảy ra" với một trường hợp nó có xảy ra. Khẳng định loại lỗi mà caller rẽ nhánh theo, không phải thông điệp.
