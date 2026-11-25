### Multi-phase or multi-PR plan

**Bạn sở hữu kế hoạch, không phải code. Kế hoạch là một checklist mà một chủ sở hữu chạy từng ô một và operator kiểm toán từ bằng chứng.** Kế hoạch là sản phẩm bàn giao. Đừng cài đặt.

1. Khi thay đổi chỉ gồm một hoặc hai file với cách tiếp cận hiển nhiên, hãy bỏ qua kế hoạch. Nói vậy và dừng lại.
2. Giải quyết các câu hỏi còn mở bằng prototype trước khi viết, theo `playbooks/prototype.md`. Chỉ hỏi operator về một quyết định sản phẩm hoặc sở thích mà không lượt chạy nào giải quyết được.
3. Viết file kế hoạch. Mở đầu bằng những gì thay đổi, id các PR theo thứ tự land, và đồ thị phụ thuộc, cho biết PR nào độc lập và tách branch từ trunk, PR nào chờ PR nào, và các file mà mỗi PR có thể đụng vào. Rồi mỗi PR một mục. Một PR là một thay đổi với bằng chứng riêng của nó (principle skill **sequence-verifiable-units**). Mỗi mục có các checkbox cho những gì nó phụ thuộc, các file nó sửa, một thay đổi nó xây, kết quả bạn thấy, và phép kiểm chứng của nó.
4. Riêng test không phải là kiểm chứng đủ. Một PR chỉ được kiểm chứng khi các ô unit, live, và perf của nó đều được đánh dấu. Mỗi ô live điều khiển bề mặt thật với một kịch bản cụ thể và một điều kiện pass. Ô perf nêu tên metric, phép đo, baseline trên trunk được đo trước, và con số bị coi là thất bại. Một PR thay đổi một tương tác phải chờ operator review trước khi merge.
5. Trả lại đường dẫn kế hoạch và dừng. Việc thực thi bắt đầu khi operator đồng ý rõ ràng.

**Câu trả lời:** đường dẫn kế hoạch, id các PR kèm phụ thuộc và tập cần review, và những gì vẫn chưa được chứng minh.
