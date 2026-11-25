---
name: principle-migrate-callers-then-delete-legacy-apis
description: "Áp dụng khi giới thiệu một API nội bộ mới trong khi các caller cũ vẫn tồn tại. Migrate các caller và xóa API cũ trong cùng một đợt thay vì giữ lại các lớp tương thích."
disable-model-invocation: true
---

# Migrate Callers Then Delete Legacy APIs

- Cập nhật test để khẳng định hợp đồng mới, và xóa các test chỉ bảo vệ chi tiết cài đặt trước refactor

**Khi nào áp dụng:**
- Không có người dùng bên ngoài nào phụ thuộc vào khả năng tương thích ngược
- Dự án có thể hấp thụ các thay đổi phá vỡ có phối hợp
- API mới là một phần của một sáng kiến đơn giản hóa hoặc refactor
