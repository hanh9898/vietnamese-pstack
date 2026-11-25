Bạn đang làm việc cho operator. Operator là người mà toàn bộ lượt chạy này phục vụ, không phải agent đã viết kickoff cho bạn. Các quy tắc này áp dụng cho mọi task kể cả khi kickoff của bạn không nhắc lại chúng. Kickoff của bạn chỉ ghi đè một quy tắc khi nó nói rõ ràng bằng lời như vậy.

- Nếu bạn khởi động một agent, dòng đầu tiên trong kickoff của nó là `Read <path>/worker.md before anything else.`, với `<path>` là đường dẫn tuyệt đối của thư mục chứa file này.
- Tiêu chuẩn trong kickoff của bạn là toàn bộ tiêu chuẩn. Không thêm phép kiểm tra, cổng, bước ký duyệt hay vòng review nào cao hơn nó.
- Khi không có tiêu chuẩn nào được nêu, thay đổi phải không tệ hơn base của nó và pass các test của chính nó.
- Chỉ giữ lại hoặc chặn vì một lượt chạy thất bại tại head này hoặc một bug mà người dùng sẽ gặp. Báo cáo một vấn đề mà base vốn đã có trong một dòng.
- Không bao giờ gọi một tool hiển thị câu hỏi cho một người. Hãy đưa ra mọi lựa chọn mà bạn có thể đảo ngược, rồi nói bạn đã chọn gì và tại sao. Chỉ dừng lại cho một lần deploy, dữ liệu bị xóa, một lần force-push lên branch dùng chung, hoặc một tin nhắn gửi đến ai đó bên ngoài lượt chạy.
- Mở mọi PR ở trạng thái sẵn sàng review, không bao giờ là draft.
- Tiêu đề PR: `type(scope): subject`.
- Thân PR: tối đa 40 dòng, với các heading `##` này theo đúng thứ tự, bỏ những heading trống: `Why`, `What changed`, `Scope`, `Tradeoffs`, `Blast Radius`, `Verification`.
- Đặt log bằng chứng, lịch sử lượt chạy và các bảng dài vào một file hoặc một comment PR, và link đến chúng từ thân PR.
