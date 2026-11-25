### Prototype

**Bạn sở hữu quyết định thiết kế, không phải code. Prototype là một công cụ dùng xong bỏ. Bản xây thật theo playbook Feature.**

Đây là playbook duy nhất mà "thay đổi nhỏ nhất" của Laziness Protocol và tiêu chuẩn kiểm chứng bị đảo ngược. Tốc độ hơn trau chuốt, chất lượng code không quan trọng, không lập kế hoạch. Sự chặt chẽ nằm ở việc chọn đúng thiết kế một cách rẻ. Đề xuất các biến thể mà người dùng không yêu cầu, bỏ một cách tiếp cận đi và thử cách khác.

1. Xác định phạm vi quyết định mà prototype tồn tại để đưa ra: bố cục nào, tương tác nào, mật độ nào, hoặc với một ngã rẽ thực nghiệm thì hành vi, thời điểm, hay cách tiếp cận nào. Không có quyết định nghĩa là không có prototype. Định tuyến sang Feature.
2. Thu thập tài liệu tham khảo khi không gian thiết kế còn mở. Tìm các tiền lệ, tóm tắt một moodboard gồm chủ đề, bảng màu, và bố cục, để người dùng chọn hướng trước khi xây. Bỏ qua khi hướng đi đã định.
3. Xây bản dùng xong bỏ trong một thư mục nháp tách biệt, riêng khỏi source production. Với một quyết định trực quan, dùng HTML/CSS/JS thuần hoặc stack nhẹ nhất hiển thị được ý tưởng, dependency qua CDN, một dev server có hot reload. Với một quyết định về hành vi hoặc thời điểm, dùng script nhỏ nhất kiểm tra được câu hỏi. Không framework production, không test, không abstraction.
4. Khi so sánh các phương án, xây chúng sau một bộ chuyển đổi (nút bấm hoặc phím tắt), mỗi biến thể có nhãn. Đây là principle skill **exhaust-the-design-space** được làm cho rẻ.
5. Kiểm chứng trên bề mặt tương ứng. Với một quyết định trực quan, chụp screenshot từng biến thể qua control skill và điều khiển tương tác. Với một quyết định về hành vi hoặc thời điểm, quan sát thứ bạn đang quyết định bằng cách log thời gian, in output, hoặc xem quá trình render. Ở đây việc quan sát chính là test, không phải một assertion.
6. Trình bày các phương án, đánh đổi, và một đề xuất. Output là quyết định cùng artifact dùng xong bỏ, không phải code có thể ship. Bàn giao hướng đã chọn cho **Feature** (hoặc `architect` để có hình dạng) cho bản xây thật.

**Câu trả lời:** các biến thể đã khám phá, bằng chứng (screenshot cho quyết định trực quan, output hoặc thời gian quan sát được cho quyết định về hành vi), các đánh đổi, đề xuất của bạn, và đường dẫn thư mục nháp. Nói rõ ràng rằng prototype là đồ dùng xong bỏ.
