---
name: architect
description: "Phác thảo type, signature, và cấu trúc module trước khi viết code, rồi ở lại trong vòng lặp khi phần cài đặt được lấp đầy. Dùng cho /architect, 'architect this', 'design this', hoặc công việc không tầm thường mà nhảy thẳng vào code sẽ khóa chặt một hình dạng sai."
disable-model-invocation: true
---

# Architect

Trước khi viết code, hãy lần theo mọi hệ thống mà thay đổi đụng tới, rồi phác thảo hai hình dạng khác nhau cho nó (type, signature, ranh giới module) và chọn hình dạng mà mỗi mẩu state có một chủ sở hữu, mỗi việc có một cách làm, và caller cần biết ít nhất. Thiết kế lại thay vì vá nếu các cách lách cứ lặp lại.

Với một thiết kế lớn hoặc gây tranh cãi, hãy chạy skill **arena** thay vì phác thảo một mình.
