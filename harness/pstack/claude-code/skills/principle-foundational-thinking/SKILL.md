---
name: principle-foundational-thinking
description: "Áp dụng trước khi viết logic: chọn các type và cấu trúc dữ liệu cốt lõi, sắp thứ tự giữa khung sườn và feature, hỏi xem các tác nhân đồng thời chia sẻ gì. Làm đúng cấu trúc dữ liệu để code phía sau trở nên hiển nhiên."
disable-model-invocation: true
---

# Foundational Thinking

Làm đúng hình dạng dữ liệu trước khi viết logic. Định nghĩa các type cốt lõi sớm, lần theo mọi kiểu truy cập, và chọn các cấu trúc khớp với những đường chính. DRY ở cấu trúc, không phải ở từng dòng.

Trước khi chia sẻ state giữa các tác nhân, hãy hỏi điều gì xảy ra nếu một tác nhân khác sửa nó đồng thời. Nếu câu trả lời không phải là "không có gì", hãy cô lập.

Dựng khung sườn trước. Bất cứ thứ gì giúp mọi giai đoạn sau (CI, test, type dùng chung) đi trước, sau khi đã xóa code chết. Giữ các commit nhỏ và đơn mục đích.
