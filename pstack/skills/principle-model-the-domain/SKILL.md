---
name: principle-model-the-domain
description: "Áp dụng khi viết logic có state, hoặc khi code rẽ nhánh nhiều hay lặp lại một giả định về hình dạng qua nhiều file."
disable-model-invocation: true
---

# Model the Domain

Mã hóa domain trong một cấu trúc dữ liệu thay vì rải nó ra qua các điều kiện. Cấu trúc đúng làm cho các trạng thái bất hợp lệ không thể biểu diễn và xóa bớt các nhánh.

Hãy dùng một state machine thay vì các boolean hoặc phép kiểm tra giai đoạn rải rác, một typed model thay vì các tham số rời rạc, một map, registry, hoặc discriminated union thay vì rẽ nhánh trải khắp các file, một reducer thay vì các mutation tùy tiện, và một index, queue, hoặc collection đã chuẩn hóa ở nơi kiểu truy cập đòi hỏi.

Đừng ép buộc. Giữ code nhàm chán khi hình dạng rõ ràng, cục bộ, và khó có khả năng phát triển thêm, và hãy nghi ngờ một abstraction thêm lớp gián tiếp mà không xóa bớt nhánh hay trạng thái bất hợp lệ nào.

Dấu hiệu cho thấy bạn đã bỏ qua điều này: một feature làm chuỗi if/else dài thêm một nhánh, hoặc một boolean thứ hai phải luôn đồng bộ với boolean thứ nhất.
