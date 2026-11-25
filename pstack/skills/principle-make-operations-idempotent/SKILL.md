---
name: principle-make-operations-idempotent
description: "Áp dụng khi thiết kế lệnh, bước vòng đời, hoặc vòng lặp xử lý chạy giữa các lần crash, khởi động lại, và retry. Hội tụ về cùng một trạng thái cuối bất kể các lượt chạy trước dang dở."
disable-model-invocation: true
---

# Make Operations Idempotent

Thiết kế mọi thao tác thay đổi state để hội tụ về trạng thái đúng dù nó chạy bao nhiêu lần và dù lượt chạy trước dừng ở đâu.

Suy ra mỗi bước từ state đang tồn tại, không phải từ điều lượt chạy trước định làm. Đọc state hiện tại, so sánh nó với mục tiêu, và chỉ áp dụng phần chênh lệch.

Bất cứ thứ gì một lượt chạy để lại (một lock, một file tạm, một bản ghi viết dở, một job đã nhận) phải được lượt chạy tiếp theo nhận ra là cũ, bằng bằng chứng đứng vững ở bất kỳ điểm nào lượt chạy trước có thể đã dừng. Ghi vào một đường dẫn tạm và đổi tên nó vào đúng chỗ.

Phép thử: điều gì xảy ra nếu cái này chạy hai lần? Nếu lượt chạy trước crash ở mọi điểm có thể thì sao? Nếu câu trả lời phụ thuộc vào những gì đã bị để lại, hãy thêm một bước hòa giải.
