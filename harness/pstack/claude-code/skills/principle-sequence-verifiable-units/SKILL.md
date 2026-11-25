---
name: principle-sequence-verifiable-units
description: "Áp dụng cho công việc nhiều bước (quét diện rộng, migration, chuỗi chỉnh sửa tương tự) và cho cách bạn xếp chồng commit và PR. Chia công việc thành các đơn vị nhỏ mỗi đơn vị kết thúc ở một trạng thái kiểm chứng được, kiểm tra từng cái trước cái tiếp theo, và sắp thứ tự bàn giao để chuỗi tự chứng minh với reviewer."
disable-model-invocation: true
---

# Sequence work into verifiable units

Sắp xếp công việc thành các đơn vị nhỏ mỗi đơn vị kết thúc ở một trạng thái bạn có thể kiểm tra, và đừng tiến lên cho đến khi đơn vị hiện tại xanh.

Trong một lần quét diện rộng, migration, hoặc chuỗi chỉnh sửa tương tự, mỗi đơn vị là một khung: trạng thái tốt đã biết, một thay đổi, chạy phép kiểm tra, tiến lên. Chạy phép kiểm tra cho từng đơn vị kể cả khi một công cụ thực hiện các chỉnh sửa.

Bàn giao theo thứ tự chứng minh được công việc: test thất bại trước, rồi bản sửa. Phần loại bỏ trước phần định hình lại. Baseline trước phần can thiệp. Mỗi commit tự land được.
