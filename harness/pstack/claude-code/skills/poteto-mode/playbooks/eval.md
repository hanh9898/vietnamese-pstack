### Eval

**Bạn sở hữu thiết kế thí nghiệm. Lập kế hoạch, làm mù, chạy, tổng hợp.**

**Những điều không thể thương lượng cho việc làm mù:**

- Không có `eval`, `test`, `judge`, `experiment`, `rubric`, `score`, `compare`, `benchmark`, `candidate`, hoặc `arena` trong bất kỳ thư mục, file, hay prompt nào mà ứng viên nhìn thấy.
- Prompt cho ứng viên trông giống một yêu cầu tự nhiên của người dùng. Nêu mục tiêu, không nêu phần meta.
- Không có gợi ý khơi ra chuỗi. Đừng yêu cầu ứng viên liệt kê skill, nguyên tắc, hay file nào họ đã áp dụng. Hãy yêu cầu ghi chú thiết kế một cách chung chung và chấm việc tuân theo chuỗi từ hình dạng code, không từ tự báo cáo.
- Làm sạch tên thư mục và slug. Dùng những tên mang dáng dự án mà một người dùng có thể chọn.
- Đừng nói với ứng viên rằng có các ứng viên khác tồn tại.
- Giám khảo có thể biết mình đang chấm nhưng chỉ thấy output qua nhãn đã làm sạch, không bao giờ qua tên model.
- So sánh hai biến thể: một giám khảo chấm cả hai tập trong một lượt duy nhất trên một thang điểm, không biết mỗi tập đến từ đâu.

**Các bước:**

1. **Đóng khung.** Nêu biến thể nào đang được test và hành vi nào được tính là thành công. Viết rubric (3-6 tiêu chí cụ thể) chỉ cho giám khảo. Giữ nó khỏi các ứng viên.
2. **Thiết lập các môi trường đã làm sạch.** Mỗi ứng viên một thư mục làm việc có sẵn biến thể. Đặt sẵn mọi context mà một task tự nhiên sẽ có: một bộ khung dự án, các skill mà ứng viên sẽ tự nhiên đọc.
3. **Viết một prompt tự nhiên.** Thứ mà một người dùng sẽ gõ. Không rò rỉ điều đang được đo.
4. **Khởi chạy N ứng viên song song** trên các model khác nhau theo Phase B của skill **arena**. Mỗi ứng viên làm việc trong thư mục đã làm sạch của riêng nó. Cùng một prompt cho mỗi ứng viên. Chọn mức suy luận của từng subagent cho công việc, theo phần Subagent. Một agent chỉ điều phối, polling, hoặc đóng gói kết quả chạy trên `claude-opus-5-5-medium-fast`.
5. **Khởi chạy một giám khảo bị làm mù** trên một họ model khác theo Phase C của skill **arena**. Giám khảo thấy output qua nhãn đã làm sạch và rubric, không bao giờ thấy tên model.
6. **Kiểm chứng chuỗi từ transcript, không từ tự báo cáo.** Đọc transcript cục bộ của từng ứng viên trong thư mục `agent-transcripts/` của workspace đang hoạt động (system prompt nêu tên đường dẫn này). Đừng glob qua `~/.cursor/projects/*/`. Việc đó vượt ranh giới workspace và đọc các chat riêng tư từ những dự án không liên quan. Xem mỗi ứng viên thực sự đã mở những file nào. Chấm việc tuân theo chuỗi từ những file nó thật sự đã đọc cộng với hình dạng code, không bao giờ từ khẳng định của chính ứng viên.
7. **Tự đọc mọi output của ứng viên** từ đầu đến cuối. So sánh với phán quyết của giám khảo. Bất đồng nghĩa là một model đang thiên lệch hoặc rubric mơ hồ. Tổng hợp.

**Câu trả lời:** biến thể đang được test, rubric, ghi chú theo từng ứng viên, phán quyết của giám khảo, bản tổng hợp của bạn, và một đề xuất có nên nâng cấp biến thể hay không.
