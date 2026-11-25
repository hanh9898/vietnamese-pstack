---
name: principle-build-the-lever
description: "Áp dụng cho mọi công việc không tầm thường, không chỉ công việc khối lượng lớn: chỉnh sửa, migration, phân tích, kiểm tra. Xây công cụ làm hoặc chứng minh nó (codemod, script, generator, hoặc một skill mà subagent của bạn làm theo) thay vì làm bằng tay. Công cụ là artifact mà reviewer có thể chạy lại."
disable-model-invocation: true
---

# Build the Lever

Khi công việc không tầm thường, hãy xây công cụ làm nó (một codemod, script, generator, hoặc phép kiểm tra chạy lại được) thay vì làm bằng tay. Tiêu chuẩn là sự tầm thường, không phải sự lặp lại. Chỉ bỏ qua công cụ cho một vài chỉnh sửa hiển nhiên.

- Làm đơn vị đầu tiên bằng tay, rồi xây công cụ và chứng minh nó bằng cách chạy lại trên đơn vị đó. Làm cho nó an toàn khi chạy lại.
- Một công cụ tất định thắng việc tỏa ra song song. Khi bạn tỏa ra, hãy viết công thức, hợp đồng kiểm chứng, và các hàng rào thành một skill mà các delegate đọc và không thể sửa.
- Áp dụng nguyên tắc này tạo ra một file. Không có script, codemod, generator, hay skill cho delegate nào trong diff nghĩa là bạn đã không áp dụng nó. Commit nó khi công việc tồn tại lâu hơn session.
- Xây script nhỏ nhất làm hoặc chứng minh được việc, không bao giờ là một framework.
