---
name: principle-explain-the-number
description: "Áp dụng trước khi bạn đo, và trước khi bạn tin, báo cáo, hoặc hành động dựa trên một con số đã đo: mức tăng tốc, hồi quy, throughput, latency, hoặc kết quả eval. Tìm cái giới hạn nó, và loại trừ khả năng nó đo thứ khác với công việc bạn nghĩ."
disable-model-invocation: true
---

# Explain the Number

- **Viết quyết định ra trước khi chạy.** Gọi tên kết quả sẽ làm thay đổi nó, và ngưỡng nhiễu. Dừng khi độ phân tán giữa các lượt chạy lớn hơn hiệu ứng.
- **Hỏi "tại sao không gấp đôi?"** Gọi tên tài nguyên hoặc đường code giới hạn kết quả, từ một profile hoặc bộ đếm lấy trong lúc chạy. Một phỏng đoán từ việc đọc code không phải là yếu tố giới hạn.
- **Liệt kê những gì khác mà con số có thể đang đo** (lỗi, công việc bị bỏ qua hoặc được cache, code chưa bao giờ chạy, một phía chưa được tinh chỉnh, nhiễu, một phần quá nhỏ để có ý nghĩa) và loại trừ từng cái bằng bằng chứng.
- **Giữ số lượt chạy, độ phân tán, và yếu tố giới hạn đi kèm con số.**

Với một con số hiệu năng, hãy chạy skill [benchmark-checklist](../benchmark-checklist/SKILL.md). Với một kết quả eval, hãy hỏi liệu mọi lượt chạy có làm task không, khoảng cách có giữ vững qua các lần thử và các model không, và kịch bản đó có quan trọng không.
