# Hướng dẫn pstack

pstack hoạt động tốt nhất khi bạn thôi quản lý từng li từng tí agent. Bạn mô tả điều mình muốn và cách bạn sẽ biết nó đã xong. `/poteto-mode` chọn playbook, chạy các skill khác khi các bước cần đến, và cho bạn xem bằng chứng. Hướng dẫn này dạy thói quen đó bằng các prompt thực tế.

Đây là những gì bạn sẽ học:

1. [Cài đặt pstack](./01-setup.md). Cài plugin và chọn model.
2. [Chuyển công việc qua `/poteto-mode`](./02-poteto-mode.md). Đưa cho nó một mục tiêu và xem nó chọn playbook.
3. [Hiểu code](./03-understand.md). Một cuộc điều tra chỉ đọc, rồi `/how`, `/why`, `/teach`, và `/recall` trước khi bạn sửa bất cứ thứ gì.
4. [Thiết kế thay đổi](./04-design.md). `/architect`, `/arena`, `/swarm`, `/interrogate`, prototype, và kế hoạch trước khi code chốt cứng một hình dạng.
5. [Xây dựng và dọn dẹp thay đổi](./05-build-and-clean.md). Các playbook xây dựng, `/tdd`, `/unslop`, và `/no-comments`.
6. [Kiểm chứng và ship](./06-verify-and-ship.md). Chứng minh hành vi trên ứng dụng thật, kiểm chứng hình thức những gì test hiếm khi chạm tới, thẩm định con số bằng `/benchmark-checklist`, rồi mở một PR tập trung và đưa nó đến khi merge.
7. [Chạy công việc trong khi bạn ngủ](./07-overnight.md). Niềm tin trước vòng lặp, một hợp đồng chạy qua đêm, một nhật ký quyết định bạn có thể kiểm toán, và Projects cùng automations để mở rộng vượt quá một agent.
8. [Điều hướng bằng tên nguyên tắc](./08-principles.md). 24 cái tên giúp đổi hướng agent giữa chừng.
9. [Biến nó thành của bạn](./09-make-it-yours.md). Mode của riêng bạn, `/correct` cho các lỗi lặp lại, và cách kiểm tra một thay đổi skill.
10. [Công thức và cạm bẫy](./10-recipes-and-pitfalls.md). Các prompt để sao chép và những lỗi nên tránh.

Lần đầu hãy đọc các trang theo thứ tự. Sau đó, mỗi trang đều có thể đọc riêng.

Khi bạn bị kẹt, hoặc không biết skill nào phù hợp, gõ [`/poteto-help`](../../skills/poteto-help/SKILL.md) kèm câu hỏi:

```text
/poteto-help tôi nên dùng skill nào để review branch này?
```

Nó trả lời, đưa bạn một prompt để gửi, và dẫn link đến skill hoặc trang hướng dẫn mà câu trả lời lấy từ đó. Nó không bắt đầu công việc, vì một lần chạy pstack tiêu tốn token thật, nên bạn tự gửi prompt khi đã sẵn sàng. Nó chỉ chạy khi bạn gõ nó.

## Nếu bạn chỉ nhớ một điều

Đưa cho agent một mục tiêu và một cách để kiểm tra nó, bằng lời của chính bạn:

```text
/poteto-mode phần export ghi ra các dòng trùng lặp khi một lần retry xảy ra giữa chừng. tái hiện trước, rồi sửa và kiểm chứng.
```

Bạn không cần gọi tên playbook hay liệt kê skill. "tái hiện trước" và một kết quả kiểm tra được là tất cả tín hiệu định tuyến mà `/poteto-mode` cần. Nó khớp với playbook Bug fix, chép các bước vào todo list, và gọi đúng skill khi mỗi bước kích hoạt.

Tiếp theo: [Cài đặt pstack](./01-setup.md).
