# Viết prompt

Một prompt nêu ý định và phép kiểm tra hoàn thành. Playbook cung cấp các bước, nên vài câu đơn giản thắng một bản đặc tả.

## Đưa vào

- Mục tiêu. Nói điều gì đang sai hoặc người dùng muốn gì.
- Phép kiểm tra hoàn thành. Nó có thể pass hoặc fail. "Làm cho nó tốt hơn" và một khoảng thời gian không phải là phép kiểm tra.
- Bằng chứng cần cho xem. Yêu cầu output lệnh thật, một video của luồng, giá trị được lưu, hoặc một con số trước và sau.
- Những gì người dùng đã biết. Một triệu chứng, một bước tái hiện, một log, hoặc một link tiết kiệm cho agent một lần tìm kiếm.
- Các ràng buộc thật. "repro first", "don't change any code yet", "zero behavior change", và "let me review before proceeding" (hoặc "tái hiện trước", "chưa sửa code", "không thay đổi hành vi", "để tôi review trước khi làm tiếp") mỗi cái đều thay đổi điều agent làm.

## Bỏ ra ngoài

- Cách làm. Nói cần đạt được gì, và để agent có chỗ tìm ra cách tốt hơn.
- Một danh sách skill hoặc bước. Một thứ tự viết tay sẽ bỏ hoặc đổi thứ tự các bước mà playbook giữ. Chỉ gọi tên một skill để ghi đè một lựa chọn.
- Giả thuyết của người dùng về nguyên nhân, cho đến khi agent nhắc lại vấn đề. Một phỏng đoán được nêu ra thu hẹp việc tìm kiếm.

## Nạp context trước

- Với một báo cáo nhiều nhiễu, hãy bảo agent nhắc lại vấn đề gốc bằng lời của chính nó và bằng ngôn ngữ đơn giản trước khi làm bất cứ điều gì khác. Một cách hiểu sai lộ ra trước khi có dòng code nào.
- Trong một chat mới, dùng `/recall` cho công việc trước đó về chủ đề. Các chat cũ giữ context mà agent mới không có.
- Trước một thay đổi cho code chưa quen, hãy hỏi `/how` về cơ chế và `/why` về lý do. Một agent không có mô hình được lần theo sẽ sửa triệu chứng ở chỗ hợp lý đầu tiên.
- Yêu cầu `/teach` lập luận cho một lựa chọn, như "thuyết phục tôi rằng nó sửa nguyên nhân chứ không phải triệu chứng". Một lập luận dễ kiểm tra hơn một bản tóm tắt.

## Thiết kế trước kế hoạch

- Không bao giờ nhận thiết kế đầu tiên. Yêu cầu prototype cho vài phương án, với screenshot hoặc video cho UI, và chọn từ bằng chứng.
- Để prototype trả lời các câu hỏi còn mở. Đừng review đối kháng một kế hoạch trừu tượng, vì reviewer sẽ bịa ra những rủi ro không bao giờ xảy ra.
- Với một package hoặc API dùng chung, hãy yêu cầu README hoặc một tutorial trước, rồi làm ngược lại về code. Tài liệu trở thành mục tiêu mà agent tự kiểm tra mình.
- Chỉ yêu cầu kế hoạch sau khi thiết kế đã chốt. Mỗi bước của kế hoạch kết thúc bằng một phép kiểm tra.

## Hỏi tiếp ngắn gọn

- "do it", "continue", và "keep going until done" (hoặc "làm đi", "tiếp tục", "cứ làm đến khi xong") là cả một prompt khi chat đã chứa task.
- Bắt đầu bằng "new task" (hoặc "task mới") khi chủ đề thay đổi. Nếu không, mode coi tin nhắn là bước tiếp theo.

## Trước khi rời đi

- Nói "im going to bed" hoặc "im stepping away" (hoặc "tôi đi ngủ đây", "tôi đi vắng") để agent ngừng hỏi.
- Viết điều kiện hoàn thành thành các phép kiểm tra mà mọi vòng lặp đều chạy được, và đưa vị từ đó cho `/loop`.
- Yêu cầu một worktree mới tách từ một base được gọi tên.
- Trả lời trước những gì agent sẽ dừng lại để hỏi, như "đừng hỏi tôi trước khi commit".
- Yêu cầu một log quyết định để kiểm toán sau.
- Đưa ra một lối thoát: "nếu bạn thật sự bị kẹt sau vài giờ, hãy dừng và viết ra lý do".

## Điều hướng trong một dòng

- Nhắc lại mục tiêu: "tôi đã nói mục tiêu là tái hiện. tôi chưa yêu cầu sửa."
- Gọi tên nguyên tắc: "áp dụng prove it works. cho tôi xem output thật, không phải build log."
- Một tên nguyên tắc có tác dụng vì agent đã đọc quy tắc. Câu trả lời của nó gọi tên quyết định mà quy tắc đã thay đổi.
