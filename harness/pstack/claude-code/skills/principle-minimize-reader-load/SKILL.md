---
name: principle-minimize-reader-load
description: "Áp dụng khi review hoặc định hình code khó lần theo. Đếm số lớp giữa câu hỏi và câu trả lời, và state ẩn trong đầu người đọc; gộp các wrapper chỉ có một caller và thu hẹp phạm vi có thể thay đổi."
disable-model-invocation: true
---

# Minimize Reader Load

Tải cho người đọc là công sức mà người đọc phải bỏ ra để hiểu code. Nó có hai trục độc lập: số lớp phải lần theo giữa câu hỏi và câu trả lời, và state ẩn hoặc có thể thay đổi mà họ phải giữ trong đầu. Hãy canh giữ cả hai.

- Gộp các lớp chỉ chuyển tiếp: wrapper chỉ có một caller, adapter không có bản cài đặt thứ hai, method chỉ truyền qua. Inline chúng.
- Thu hẹp phạm vi state: return thay vì mutation, biến cục bộ thay vì field, field thay vì state của module, state của module thay vì biến toàn cục. Suy ra thay vì đồng bộ.
- Gọi tên một bất biến một lần tại ranh giới, không phải ở mọi nơi dùng.

Phép thử: một người đọc mới có thể trả lời "X đến từ đâu?" và "cái gì có thể thay đổi X?" trong dưới 30 giây không? Nếu không, hãy cắt bớt lớp hoặc cắt bớt state.
