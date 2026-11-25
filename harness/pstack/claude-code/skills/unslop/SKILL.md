---
name: unslop
description: Cắt bỏ dấu hiệu văn AI khỏi bất kỳ bài viết nào.
disable-model-invocation: true
---

# Unslop

Sửa văn bản để loại bỏ các mẫu văn AI. Quét tìm các mẫu bên dưới, rồi viết lại. Giữ nguyên ý nghĩa và khớp với giọng văn dự định.

Số thứ tự quy tắc là id ổn định mà các skill khác trích dẫn. Một quy tắc bị xóa để lại một khoảng trống.

3. Không có cụm từ đuôi không thêm sự thật nào (tiếng Anh "highlighting...", "ensuring..."; tiếng Việt "qua đó làm nổi bật...", "nhằm đảm bảo...").
5. Không quy nguồn mơ hồ ("các chuyên gia cho rằng"). Gọi tên nguồn hoặc xóa.
7. Không dùng từ vựng AI: tiếng Anh additionally, crucial, delve, enhance, foster, landscape, pivotal, showcase, testament, underscore, vibrant; tiếng Việt "ngoài ra", "then chốt", "đi sâu vào", "nâng tầm", "thúc đẩy", "bức tranh toàn cảnh", "minh chứng", "sống động".
8. Nói "là" hoặc "có", không nói "đóng vai trò là", "được xem như", "tự hào sở hữu", "sở hữu".
9. Không dùng "không chỉ X, mà còn Y". Hãy nêu luận điểm.
10. Đừng ép ý tưởng thành bộ ba.
11. Mỗi thứ một tên. Lặp lại tên đó.
12. Không dùng "từ X đến Y" trừ khi X và Y nằm trên một thang đo thật.
13. Không dùng gạch ngang dài, gạch ngang ngắn, hoặc dấu gạch nối dùng như gạch ngang, và không dùng ngoặc đơn thay cho chúng. Dùng dấu chấm hoặc dấu phẩy.
14. Dấu hai chấm đứng trước một danh sách hoặc một ví dụ, không bao giờ ở giữa câu như một từ nối.
15. Đừng in đậm mọi danh từ riêng hay từ viết tắt.
16. Không dùng nhãn in đậm và dấu hai chấm chỉ nhắc lại dòng của nó ("**Hiệu năng:** Hiệu năng đã được cải thiện..."). Một phần mở đầu in đậm kết thúc bằng dấu chấm và thêm chi tiết mới thì được.
17. Heading viết hoa kiểu câu (chỉ viết hoa chữ đầu và danh từ riêng).
18. Không dùng emoji trang trí.
19. Dùng dấu ngoặc kép thẳng.
20. Không dùng câu kiểu chatbot ("Hy vọng điều này hữu ích!", "Hãy cho tôi biết nếu...").
22. Không mở đầu bằng lời khen hoặc đồng tình. Trả lời trực tiếp.
23. Cắt chữ độn. "Để có thể" thành "để". Xóa "điều quan trọng cần lưu ý là".
24. Tối đa một từ rào đón: "có thể".
25. Không kết luận chung chung. Nêu kế hoạch hoặc sự thật cụ thể.
26. Không dùng danh từ ẩn dụ trừu tượng: substrate, wedge, vector, nexus, primitive, harness, surface, scaffolding, paradigm, ratchet, north star, flywheel (và các từ tương đương như "nền tảng cốt lõi", "kim chỉ nam", "bánh đà", "hệ sinh thái"). Dùng từ cụ thể.
27. Nói nó làm gì, không nói nó mang lại cảm giác thế nào. Gọi tên cơ chế hoặc con số. Cắt một câu có thể xuất hiện nguyên văn trong tài liệu của một dự án khác.
28. Mỗi câu một ý. Tách một câu mà người đọc phải đọc lại.
29. Thể chủ động. Gọi tên chủ thể hành động trừ khi không biết hoặc không quan trọng. Tránh "được/bị" khi có thể nêu ai làm.
30. Cắt trạng từ hoặc dùng một động từ mạnh hơn. Đưa ra con số.
31. Dùng từ đơn giản: "dùng", không dùng "sử dụng một cách tối ưu" hay "tận dụng".
32. Không dùng ẩn dụ, cách ngôn, code được nhân cách hóa, hay động từ bóng bẩy ở nơi có cụm từ nghĩa đen.
33. Viết câu hoàn chỉnh với đủ chủ ngữ và động từ. Viết rõ các mũi tên và từ viết tắt.
