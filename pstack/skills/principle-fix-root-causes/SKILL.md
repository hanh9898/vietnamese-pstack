---
name: principle-fix-root-causes
description: "Áp dụng khi debug. Lần theo mỗi triệu chứng về nơi đầu tiên hệ thống đi sai và sửa nó ở đó. Một guard chỉ là bản sửa khi state mà nó xử lý là hợp lệ."
disable-model-invocation: true
---

# Fix Root Causes

Sửa lỗi gốc, không phải nơi nó lộ ra. Nguyên nhân gốc là nơi đầu tiên hệ thống làm điều nó không nên làm, hoặc không xử lý một state mà nó nên xử lý.

- Tái hiện trước. Hỏi "tại sao" cho đến khi câu trả lời là một quyết định sai trong code. Khi bị kẹt, hãy gắn công cụ đo và đọc state thật.
- Hỏi xem state đã kích hoạt triệu chứng có hợp lệ không. Nếu có, hãy xử lý nó ở nơi code bị hỏng. Nếu nó không bao giờ nên tồn tại, một phép kiểm tra ở đó sẽ che giấu bug, nên hãy tìm thứ đã tạo ra nó. Guard, retry, nuốt lỗi, kẹp giá trị, và bỏ state là những cách thường gặp để che giấu một bug.
- Sửa cả mẫu, không phải một trường hợp. Tìm mọi nơi có cùng lỗi.
- Nếu sự thật quyết định phải đào sâu mới tìm ra, hãy đề xuất một tín hiệu rẻ, luôn bật mà lẽ ra đã cho thấy nó ngay từ cái nhìn đầu tiên.
