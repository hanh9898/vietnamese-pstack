---
name: principle-boundary-discipline
description: "Áp dụng khi nối dây validation, xử lý lỗi, hoặc adapter của framework. Tập trung guard ở ranh giới hệ thống (CLI, config, mạng, API bên ngoài); tin tưởng type bên trong và giữ business logic trong các hàm thuần."
disable-model-invocation: true
---

# Boundary Discipline

Validate, thu hẹp type, và xử lý lỗi ở nơi dữ liệu vượt qua một ranh giới hệ thống (tham số CLI, file config, API bên ngoài, mạng). Bên trong, hãy tin type: không validate lại và không kiểm tra nil thừa. Parse dữ liệu thô thành type của domain tại ranh giới, và giữ các type của transport và framework ngoài bề mặt công khai. Business logic sống trong các hàm thuần không phụ thuộc framework. Lớp vỏ gọi chúng thì mỏng.

Hai phép thử. Dữ liệu này có đang vượt qua một ranh giới ngay lúc này không? Nếu không, việc validate là thừa. Cái này có thể là một hàm thuần mà lớp vỏ chỉ việc gọi không? Nếu có, hãy tách nó ra.
