---
name: principle-type-system-discipline
description: "Áp dụng khi thiết kế type, review một function signature, hoặc viết code trong bất kỳ ngôn ngữ có type tĩnh nào. Làm cho các trạng thái bất hợp lệ không thể biểu diễn, brand các primitive mang ngữ nghĩa, parse dữ liệu bên ngoài tại ranh giới, xử lý hết các biến thể, suy ra từ các schema có thẩm quyền."
disable-model-invocation: true
---

# Type System Discipline

Làm cho compiler từ chối các trạng thái không thể, các primitive không khớp, và các biến thể chưa được xử lý.

- **Brand các primitive mang ngữ nghĩa.** Nếu hai tham số có cùng kiểu primitive nhưng mang nghĩa khác nhau, hãy cho mỗi cái type riêng. Validate một lần khi tạo.
- **Dữ liệu bên ngoài là không có type cho đến khi được parse.** JSON, payload RPC, tham số CLI, config, biến môi trường, và các dòng database đi qua một hàm parse tại ranh giới trả về typed model.
- **Suy ra type từ các schema có thẩm quyền.** Khi một file schema sở hữu một hình dạng, hãy suy ra type từ nó thay vì tự viết một bản song song.

Về cú pháp TypeScript, xem skill **typescript-best-practices**.
