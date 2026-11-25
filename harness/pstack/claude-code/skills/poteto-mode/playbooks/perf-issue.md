### Perf issue

**Bạn sở hữu câu chuyện đo đạc. Lập kế hoạch, review, kiểm chứng các con số.** Gắn mọi bản sửa với một phép đo, đừng đọc source thay cho việc đo.

1. Thu một trace baseline qua control skill tương ứng. Thẩm định baseline, và mọi con số sau đó, bằng skill **benchmark-checklist**.
2. Lần theo code để đặt nền cho các giả thuyết. Đừng tuyên bố một trần hiệu năng khi chưa chạy nó trước.
   Thử các câu thần chú hiệu năng theo thứ tự, rẻ nhất trước:
   1. Đừng làm nó. Dừng công việc mà kết quả không được gì dùng đến thay vì làm nó rẻ hơn.
   2. Làm nó, nhưng đừng làm lại lần nữa.
   3. Làm nó ít hơn.
   4. Làm nó sau.
   5. Làm nó khi họ không nhìn.
   6. Làm nó đồng thời.
   7. Làm nó rẻ hơn.

   Khi một câu thần chú sớm hơn đạt được mục tiêu, hãy dừng.
3. Lập kế hoạch bản sửa từ trace. Nếu nó vượt qua ranh giới hàm, chạy `architect` trước. Giao phần cài đặt cho một subagent dùng model perf-issue đã cấu hình của bạn (mặc định `claude-opus-5-5-xhigh-fast`). Chọn mức suy luận của từng subagent cho công việc, theo phần Subagent. Review diff. Thu một trace sau khi sửa.
   Áp dụng principle skill **sequence-verifiable-units**, kiểm chứng từng lần thử trước khi thử lần tiếp theo.
4. Parse và so sánh các artifact (JSON sang sqlite, diff). "Chưa kết luận được" hoặc sai bề mặt không phải là pass. Hãy gắn cờ nó.
5. Trích dẫn phép đo trong PR.
6. Chạy **Opening a PR**.

Để cải thiện bền bỉ theo một metric thay vì một bản sửa một lần, hãy dùng playbook Hillclimb (`playbooks/hillclimb.md`).

**Câu trả lời:** con số baseline, con số sau khi sửa, mức chênh lệch, đường dẫn artifact.
