### Autonomous run

**Bạn sở hữu điều kiện kết thúc. Định nghĩa thế nào là xong, rồi lái đến đó mà không dừng.**

1. Nêu điều kiện kết thúc dưới dạng một vị từ kiểm tra được trước vòng lặp đầu tiên (test xanh, bản tái hiện đã được sửa, cả N PR đã merge, pixel-diff bằng không).
2. Chọn cơ chế đánh thức bằng lệnh `/loop` của Cursor (có sẵn, không phải một skill pstack). Một sự kiện cần theo dõi (CI, một lần merge, một ref tiến lên) được một watcher subagent đánh thức bạn khi sự kiện xảy ra, với một heartbeat dài theo thời gian làm dự phòng. Không có sự kiện thì dùng một heartbeat theo khoảng cố định, được định cỡ theo lúc kết quả đáng được kiểm tra lại. Chọn mức suy luận của từng subagent cho công việc, theo phần Subagent.
3. Mỗi vòng lặp thực hiện thay đổi nhỏ nhất mà bằng chứng biện minh được, kiểm chứng nó với vị từ, commit nếu nó tiến lên, bỏ những thay đổi không giúp ích. Phòng thủ thừa thãi kiểu "có thể giúp ích" bị revert, không được để đó.
   Sắp thứ tự công việc qua principle skill **sequence-verifiable-units**, kiểm chứng từng đơn vị trước đơn vị tiếp theo thay vì gom các phép kiểm tra lại ở cuối.
4. Những phát hiện giữa lượt chạy hỗ trợ mục tiêu là của bạn. Tự xử lý các skill bị hỏng, bug liên quan, verifier chập chờn, nhiễu review, lỗi tooling, follow-up bị bỏ rơi, và drift có thể sửa qua poteto-mode. Đặt các bản sửa ngoài luồng vào PR riêng của chúng. Đừng gác lại công việc có thể đảo ngược cho con người hay dùng `AskQuestion`. Chỉ nêu ra các hành động không thể đảo ngược, các quyết định sản phẩm hoặc sở thích thật sự mà không thí nghiệm nào giải quyết được, hoặc một ngõ cụt thật. Giữ vị từ làm động lực chính, và quay lại với nó sau mỗi bản sửa phụ.
5. Tạo checkpoint mỗi vòng lặp qua skill **show-me-your-work**, một dòng cho những gì đã thay đổi và vị từ có dịch chuyển không.
6. Dừng khi vị từ được thỏa mãn. Chững lại không phải là dừng, nên hãy tiếp tục và xoay chuyển cách tiếp cận để vượt qua nó. Nêu ra một ngõ cụt thật thay vì quay vòng, và không bao giờ nới lỏng vị từ để tuyên bố chiến thắng.

**Câu trả lời:** điều kiện kết thúc, số vòng lặp đã chạy, những gì đã land, những gì đã bỏ, trạng thái cuối cùng của vị từ.
