---
name: technical-writing
description: "Tiêu chuẩn viết kỹ thuật nhiều lớp: cấu trúc Diátaxis, câu theo Google developer style, quy tắc chỉ dẫn STE, cú pháp Global English. Dùng cho /technical-writing hoặc khi viết hay review tài liệu, RFC, readme, mô tả PR, hoặc commit message."
disable-model-invocation: true
---

# Viết kỹ thuật

Viết sao cho một kỹ sư đang mệt hiểu ngay lần đọc đầu tiên.

- Cắt mọi từ không làm việc gì.
- Dùng từ ngắn, thông dụng hằng ngày: "dùng", không phải "sử dụng một cách tối ưu".
- Khi một quy tắc làm câu tệ hơn, hãy sửa câu theo cách khác hoặc để nguyên.
- Viết đúng tên symbol, file, flag, hoặc lệnh thật, không dùng từ đồng nghĩa hay mô tả của nó.
- Đừng bịa ra thuật ngữ. Dùng những từ một developer sẽ nói thành lời. Nói một mẫu có tên nghĩa là gì ở lần đầu tiên.

## Thay đổi nhịp điệu

- Trộn các độ dài câu. Tách câu mang hai ý. Giữ câu dài mang một ý.
- Có quan điểm trong phần giải thích. Giữ phần tham chiếu khô khan.
- Cụ thể. Không phải "thay đổi schema có thể gây vấn đề" mà là "đổi tên một cột làm build thất bại".

## Chọn chế độ trước (Diátaxis)

Một tài liệu, một chế độ. Đừng trộn các chế độ. Thay vào đó hãy tách ra và liên kết.

- **Tutorial: học bằng cách làm.** Nói người học sẽ xây gì. Mỗi bước tạo ra một kết quả nhìn thấy được, và bạn nói họ nên thấy gì. Phần giải thích chỉ được một mệnh đề và một link.
- **How-to: các bước để đạt một mục tiêu.** Giải quyết vấn đề của người đọc. Giả định họ có năng lực. Chỉ có hành động. Cho phép rẽ nhánh. Đặt tên hướng dẫn theo task.
- **Reference: sự thật để tra cứu.** Chỉ mô tả. Khô khan, đầy đủ, và chắc chắn. Phản chiếu cấu trúc của thứ được mô tả.
- **Explanation: hiểu biết và lý do.** Một chủ đề có giới hạn. Đưa ra context: quyết định thiết kế, lịch sử, ràng buộc, các phương án thay thế. Ý kiến được phép ở đây và không ở đâu khác.

## Viết câu hướng đến người đọc (Google developer style)

- Nói chuyện với người đọc bằng "bạn", ở thì hiện tại.
- Nói ai làm gì. Thể bị động chỉ ổn khi chủ thể không rõ hoặc không liên quan.
- Viết chỉ dẫn dưới dạng mệnh lệnh. Đặt điều kiện trước chỉ dẫn và trường hợp thường gặp trước.
- Không dùng từ thời thượng, không dùng ngôn ngữ bóng bẩy, không "vui lòng", và không bao giờ dùng "chỉ cần", "dễ dàng", hay "nhanh chóng" trong một quy trình.
- Đừng báo trước, và đừng bắt đầu các câu liên tiếp bằng cùng một cụm từ.
- Liên kết bằng những từ nói link đi đến đâu.
- Heading mang luận điểm, viết hoa kiểu câu. Mỗi trang một h1, không bỏ cấp.
- Danh sách đánh số cho các chuỗi tuần tự, gạch đầu dòng cho mọi thứ khác. Giới thiệu một danh sách bằng một câu hoàn chỉnh. Giữ các mục song song nhau.
- Code đặt trong font code. Các phần tử UI in đậm. Dùng dấu phẩy trước từ nối cuối trong một chuỗi liệt kê. Bỏ "v.v.".

## Làm cho mỗi câu chỉ nạp một thứ một lúc (quy tắc STE)

- Mỗi câu một chỉ dẫn. Mỗi câu một ý ở mọi chỗ khác.
- Tách các chỉ dẫn dài hơn khoảng 20 từ và các câu khác dài hơn khoảng 25 từ.
- Đặt cảnh báo hoặc điều kiện trước bước mà nó bảo vệ.
- Giữ các mạo từ "the" và "a" khi viết tiếng Anh. Khi viết tiếng Việt, giữ các từ chỉ số lượng và loại như "các", "những", "một", "cái" khi chúng giúp câu rõ nghĩa.
- Cho mỗi từ một nghĩa, và chọn một từ cho mỗi hành động.
- Viết quy trình dưới dạng mệnh lệnh trực tiếp, không bao giờ dưới dạng kể chuyện và không bao giờ ở thể bị động.
- Tránh các từ đuôi "-ing" trong tiếng Anh và các cụm danh động từ dài trong tiếng Việt ở nơi bạn có thể.

## Không để câu nào có thể hiểu theo hai cách (Global English)

- Giữ các từ như "chỉ" và "không" ngay cạnh từ mà chúng bổ nghĩa.
- Chia nhỏ các chuỗi danh từ dài.
- Làm cho mọi "nó", "chúng", và "điều này" chỉ về một thứ hiển nhiên. Không bao giờ dùng "điều này" hay "mà" để chỉ cả một mệnh đề.
- Đừng bỏ động từ, hoặc các từ nhỏ cho thấy cấu trúc, như "rằng" hay "mà".
- Lặp lại từ chỉ loại trong một chuỗi khi nó ngăn hiểu sai. Nói rõ "và" hay "hoặc" nối những phần nào.
- Dùng dấu chấm, không dùng dấu chấm phẩy hay gạch ngang dài. Không dùng dấu gạch chéo, và không dùng "(s)". Làm cho chữ trong ngoặc đơn thành một đơn vị ngữ pháp hoàn chỉnh.
- Gọi mỗi thứ bằng một tên, ở mọi nơi.
- Bỏ qua thành ngữ, khẩu ngữ, viết tắt tiếng Latin, và ẩn dụ.

## Giọng văn và đặc thù của repo

- Áp dụng skill **unslop** cho mọi tài liệu mà skill này chạm vào. Skill đó sở hữu danh mục các mẫu văn rác: từ vựng AI, chữ độn, rào đón, dấu hiệu định dạng.
- Mô tả PR và commit message cũng là viết. Mọi lớp trừ Diátaxis đều áp dụng cho chúng. Thân PR là một bản tóm tắt mà reviewer có thể đọc trong chưa đầy một phút. Đừng dán log swarm, danh sách SHA, hay bảng số liệu. Hãy liên kết đến chúng.
- Chuỗi UI của sản phẩm không phải tài liệu. Dùng hướng dẫn viết copy của sản phẩm cho chúng.
- Thụt lề code snippet bằng tab. Viết đường dẫn thật. Làm cho mọi khẳng định về số lượng hay cây thư mục đúng tại commit land nó, và kèm lệnh tạo lại nó.
