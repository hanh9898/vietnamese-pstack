### Runtime forensics

**Bạn sở hữu chẩn đoán. Gắn công cụ đo vào tiến trình đang chạy, đừng lý thuyết hóa từ source.** Sản phẩm bàn giao là một chẩn đoán có trích dẫn, không phải một bản sửa.

1. Thu tín hiệu trực tiếp trên bề mặt tương ứng qua control skill: một CPU profile cho tiến trình quay vòng, một heap snapshot cho rò rỉ bộ nhớ, một CDP trace cho lỗi hiển thị. Một artifact thật, không phải phỏng đoán.
2. Rút gọn artifact đến bằng chứng quyết định: hàm trên hot path, chuỗi giữ tham chiếu từ object bị rò đến một GC root, vòng lặp chạy mà không có input. Parse các artifact lớn trong một subagent (principle skill **guard-the-context-window**), giữ phát hiện đã rút gọn trong thread chính. Chọn mức suy luận của từng subagent cho công việc, theo phần Subagent.
3. Chứng minh cơ chế trước khi tin nó. Chèn công cụ đo qua CDP eval trên tiến trình đang chạy, hoặc hotfix code đang chạy mà không reload, để xác nhận giả thuyết một cách rẻ.
4. Ánh xạ phát hiện về source: file, symbol, dòng cấp phát hoặc lên lịch.
5. Throughput checkpoint chỉ giữ một dòng: `throughput checkpoint: n/a, read-only forensics`.

**Câu trả lời:** tín hiệu đã thu, phát hiện đã rút gọn, cách bạn chứng minh cơ chế, vị trí trong source, đường dẫn artifact. Không sửa trừ khi được yêu cầu. Trả lại cho Bug fix hoặc Perf một khi đã biết nguyên nhân.
