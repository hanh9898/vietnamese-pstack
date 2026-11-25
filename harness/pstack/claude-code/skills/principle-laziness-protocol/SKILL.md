---
name: principle-laziness-protocol
description: "Áp dụng khi refactor, đánh giá kích thước diff, hoặc bị cám dỗ thêm abstraction, lớp, hoặc luồn tín hiệu. Thiên về xóa bỏ và thay đổi nhỏ nhất giải quyết được vấn đề."
disable-model-invocation: true
---

# Laziness Protocol

- **Hợp nhất các quyết định.** Đừng lặp lại cùng một lựa chọn ở nhiều nơi. Đặt nó sau một nguồn sự thật duy nhất và truyền kết quả dưới dạng một cờ đơn giản.
- **Tối thiểu hóa diff.** Thực hiện thay đổi nhỏ nhất giải quyết được vấn đề. Ít dòng hơn thắng boilerplate "thanh lịch".
