### Bug fix

**Bạn sở hữu task này. Lập kế hoạch, review, kiểm chứng.** Giao việc điều tra và bản sửa cho subagent, bạn giữ vai trò dẫn dắt. Chọn mức suy luận của từng subagent cho công việc, theo phần Subagent.

Hãy làm việc một cách khoa học. Mỗi dòng được ship đều truy được về bằng chứng runtime. Phòng thủ thừa thãi kiểu "có thể giúp ích" là một giả thuyết, không phải bản sửa. Nó không được ship. Khi bằng chứng bác bỏ một giả thuyết, hãy revert những gì nó đã thúc đẩy. Thay đổi nhỏ nhất mà bằng chứng biện minh được sẽ được ship, không hơn.

1. Tự tái hiện nó trên bề mặt tương ứng qua control skill (phần Những điều không thể thương lượng), kể cả khi một quy trình debug hoặc đo đạc bảo hãy nhờ người dùng tái hiện. Chỉ nhờ người dùng khi có một lý do cụ thể, được nêu rõ, rằng control surface không thể chạm tới mục tiêu, và chỉ sau khi đã điều khiển nó xa nhất có thể. Nếu nó không tái hiện trực tiếp, hãy tổng hợp trigger, siết chặt điều kiện, hoặc gắn công cụ đo cho đến khi nó xảy ra.
2. Tìm kiếm nhị phân nguyên nhân. Lập các giả thuyết ứng viên, rồi loại trừ chúng cho đến khi chỉ còn một. Gieo chúng bằng một trace của subsystem bị ảnh hưởng và skill **why** cho lịch sử hồi quy. Mỗi lượt, chọn cách chia cắt bỏ nhiều không gian vấn đề còn lại nhất, lấy bằng chứng runtime, loại trừ. Khi state của chương trình không rõ, hãy thêm công cụ đo hoặc logging và đọc nó khi code chạy. Đừng đoán. Lái một cuộc săn dài hoặc dai dẳng bằng lệnh `/loop` của Cursor. Xác nhận *cơ chế* còn sống sót bằng bằng chứng runtime trước `architect` của bước 3 hoặc một lần tỏa ra `interrogate`.
3. Lập kế hoạch bản sửa. Nếu nó vượt qua ranh giới hàm, chạy `architect` trước. Giao phần cài đặt cho một subagent dùng model bug-fix đã cấu hình của bạn (mặc định `claude-opus-5-5-xhigh-fast`) với phạm vi cụ thể.
4. Kiểm chứng trên cùng bề mặt. Bản tái hiện ban đầu giờ pass. "Chưa kết luận được" hoặc sai bề mặt không phải là pass. Hãy gắn cờ nó. Unit test cho thấy hành vi của nhánh, không chứng minh bug vắng mặt.
5. Sắp các commit để bản tái hiện thất bại land trước bản sửa trong lịch sử git. Xem skill **tdd** cho nhịp viết test thất bại trước khi bug có đường test cục bộ rẻ. Bỏ qua nó khi test sẽ tốn kém, nặng về tích hợp, hoặc không rõ ràng.
   Đây là ví dụ chuẩn mực của principle skill **sequence-verifiable-units**, test thất bại trước và bản sửa ở trên.
6. Chạy **Opening a PR**.

**Câu trả lời:** cái gì đã hỏng, nguyên nhân gốc, bản sửa, bạn đã kiểm chứng thế nào. Dán nguyên văn output tái hiện thất bại rồi pass.
