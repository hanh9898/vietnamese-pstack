---
name: principle-prove-it-works
description: "Áp dụng sau khi hoàn thành một task, trước khi tuyên bố xong. Kiểm chứng với artifact thật (chạy feature, đọc giá trị thật, xem diff), không phải một thứ đại diện, tự báo cáo, hay 'nó compile được.'"
disable-model-invocation: true
---

# Prove It Works

Kiểm chứng mọi output bằng cách trực tiếp kiểm tra thứ thật: chạy feature, đọc giá trị thật, xem diff. Các thứ đại diện (mtime của file, tự báo cáo, output đã cache, "nó compile được") không được tính. Khi một phép kiểm tra thất bại, hãy nghi ngờ phương pháp quan sát trước khi nghi ngờ hệ thống.

Viết script cho phép kiểm tra khi có thể. Một script tất định chạy lại phép so sánh thắng một lần nhìn duy nhất. Giữ output của nó ở nơi con người có thể thấy, và chỉ commit nó khi dấu vết phải kiểm toán được về sau.
