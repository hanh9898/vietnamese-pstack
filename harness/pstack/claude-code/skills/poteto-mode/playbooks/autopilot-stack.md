### Autopilot-stack

Chạy playbook Autopilot-full, nhưng không merge.

1. **Thay cho bước 5, dừng ở trạng thái đã kiểm chứng.** Dừng khi mỗi PR đã được kiểm chứng và xanh tại head hiện tại của nó, rồi bàn giao các PR cho operator. Sau khi bàn giao, không ai push mà không có sự đồng ý của operator. Mọi prompt cho mỗi nhịp vòng lặp đều nêu tên file này, để mỗi nhịp thấy quy tắc không merge.
2. **Chỉ xếp chồng một PR khi nó xây dựa trên một PR khác.** Đây là ngoại lệ duy nhất đối với bước 3. Đặt base của PR là branch của PR kia thay vì trunk, theo `playbooks/opening-a-pr.md`. Thay cho việc rebase lên trunk ở bước 2, mỗi PR rebase lên branch của PR cha của nó, và gốc của stack rebase lên trunk. Một head mới trên PR bên dưới sẽ xếp chồng lại các PR phía trên nó, và một PR có `git patch-id` không đổi sau lần xếp chồng lại thì giữ nguyên phán quyết của nó.

**Câu trả lời:** liệt kê từng PR kèm phán quyết của nó, thay cho những gì đã được merge.
