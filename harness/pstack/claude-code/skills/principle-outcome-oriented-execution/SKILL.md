---
name: principle-outcome-oriented-execution
description: "Áp dụng trong các lần viết lại và migration có kế hoạch với ranh giới giai đoạn rõ ràng. Hội tụ về kiến trúc đích; đừng giữ các trạng thái trung gian êm ả bằng code tương thích dùng xong bỏ."
disable-model-invocation: true
---

# Outcome-Oriented Execution

Tối ưu cho trạng thái cuối dự định và kiểm chứng được thay vì giữ các trạng thái trung gian êm ả.

**Tại sao:** Giữ mọi bước trung gian ổn định hoàn toàn thường tạo ra code tương thích tạm thời rồi trở thành nợ lâu dài. Hội tụ về kiến trúc đích và chứng minh tính đúng đắn tại các ranh giới kiểm chứng rõ ràng.

**Quy tắc cốt lõi:**
- Ưu tiên tính toàn vẹn của trạng thái cuối hơn sự ổn định trong giai đoạn chuyển tiếp
- Hỏng hóc trung gian là chấp nhận được khi nó được lên kế hoạch, có phạm vi, và có thể đảo ngược

**Rào chắn:**
- Dùng nguyên tắc này cho các lần viết lại và migration có kế hoạch với ranh giới giai đoạn rõ ràng
- Tuyên bố nơi nào hỏng hóc tạm thời là chấp nhận được
- Giữ các phép kiểm tra tín hiệu cao cho những khu vực đang được đụng tới trong lúc migrate
- Yêu cầu kiểm chứng tĩnh và runtime đầy đủ khi hoàn tất kế hoạch
