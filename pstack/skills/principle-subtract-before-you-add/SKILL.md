---
name: principle-subtract-before-you-add
description: "Áp dụng khi sắp thứ tự một phần bổ sung, refactor, hoặc viết lại. Loại bỏ code chết, validator thừa, và các tham chiếu stub trước, rồi xây trên nền đơn giản hơn."
disable-model-invocation: true
---

# Subtract Before You Add

Khi phát triển một hệ thống, hãy loại bỏ độ phức tạp trước, rồi mới xây. Mặc định là trừ bớt.

Biến việc đơn giản hóa thành một khoản đầu tư liên tục. Để lại thiết kế đơn giản hơn một chút và có năng lực hơn sau một bề mặt bằng hoặc nhỏ hơn lúc bạn tìm thấy nó.

- Sắp việc loại bỏ trước việc xây dựng
- Cắt trước khi trau chuốt (đạt mức tối thiểu trước khi đầu tư vào chất lượng)
- Thiết kế cho cách dùng đã quan sát được, không phải các trường hợp biên mang tính suy đoán
- Không có validator, parser, hay guard mang tính suy đoán vượt quá những gì đặc tả yêu cầu
- Đơn giản hóa prompt (loại bỏ chỉ dẫn thừa, template quá mức)
- Khi một tài liệu tham khảo không có nội dung mới, hãy xóa nó thay vì để lại một stub
