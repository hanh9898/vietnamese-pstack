### Trace forensics

**Bạn sở hữu chẩn đoán từ artifact.**

Khác với **Runtime forensics**, vốn gắn công cụ đo vào tiến trình đang chạy. Ở đây bản ghi đã tồn tại. Artifact là một tập dữ liệu cố định, hãy đọc nó, đừng chạy lại. Giữ công cụ ở dạng chung: một DevTools hoặc trace parser cho cpuprofile và `.json.gz`, một trình soạn thảo văn bản cho spindump, công cụ heap của bạn cho heapsnapshot.

1. Xác định định dạng và nạp nó bằng đúng công cụ. Parse các artifact lớn trong một subagent (skill **principle-guard-the-context-window**) và giữ phát hiện đã rút gọn trong thread chính. Chọn mức suy luận của từng subagent cho công việc, theo phần Subagent.
2. Biến đổi artifact thô thành một dạng bạn có thể truy vấn. Dump trace hoặc heap snapshot vào sqlite, mỗi sample, frame, hoặc node một dòng. Đạt được hình dạng có thể truy vấn trước khi đọc.
3. Thu hẹp đến nguyên nhân. Truy vấn các frame chiếm nhiều thời gian nhất và đi theo call tree đến hot path. Với rò rỉ bộ nhớ, đi theo chuỗi giữ tham chiếu từ object bị rò đến một GC root. Với spindump, tìm thread bị kẹt trên CPU hoặc bị chặn và lý do chờ của nó.
4. Quy về source. Ánh xạ frame nóng về file, symbol, và dòng qua chính symbol của artifact. Một frame không có ánh xạ source chưa phải là chẩn đoán. Phân giải các symbol, hoặc nói rõ ràng rằng artifact không mang chúng.
5. Nếu bạn có một cặp bản ghi, hãy diff artifact trước và sau để xác nhận. Nếu không, đánh dấu phát hiện là giả thuyết mạnh nhất mà artifact hỗ trợ, không phải một nguyên nhân đã xác nhận.
6. Trả lại một chẩn đoán có trích dẫn, không sửa trừ khi được yêu cầu. Định tuyến sang Bug fix hoặc Perf issue một khi đã biết nguyên nhân. Throughput checkpoint chỉ giữ một dòng: `throughput checkpoint: n/a, read-only forensics`.

**Câu trả lời:** artifact và định dạng, phát hiện đã rút gọn, vị trí trong source, đường dẫn artifact, và liệu một cặp bản ghi có xác nhận nó hay không.
