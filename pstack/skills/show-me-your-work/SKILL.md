---
name: show-me-your-work
description: "Giữ một dấu vết quyết định có thể review cho công việc chạy lâu hoặc không có người giám sát: một log TSV với mỗi quyết định một dòng (cái gì, tại sao, bằng chứng, kết quả). Mặc định ở local; commit nó khi reviewer cần dấu vết để tin kết quả. Dùng cho /show-me-your-work, các lượt chạy tự động hoặc nhiều giai đoạn, hoặc công việc mà con người review sau khi rời đi."
disable-model-invocation: true
---

# Show me your work

Giữ một log chuẩn duy nhất.

## Định dạng

Một file TSV duy nhất, mỗi quyết định một dòng. Các ô nằm trên một dòng. Bằng chứng là một con trỏ, không phải văn xuôi.

Sao chép `references/decision-log-template.tsv` (dòng header) để bắt đầu một log sạch. Các cột:

- **ts.** Timestamp ISO8601.
- **phase.** Giai đoạn hoặc luồng công việc.
- **decision.** Điều đã được chọn hoặc đã làm, một dòng.
- **why.** Lý do bằng lời lẽ đơn giản. Nếu một nguyên tắc dẫn đến nó, hãy nói thẳng ra, không dùng như một thẻ thuật ngữ.
- **evidence.** Một link hoặc đường dẫn chứng minh nó: SHA của commit, số PR, `file:line`, hoặc đường dẫn của một artifact, trace, hay screenshot. Không bao giờ là một đoạn văn.
- **result.** Kết quả hoặc trạng thái của vị từ: `tests green`, `reverted`, `pixel-diff 0`, `INCONCLUSIVE`, `open`.

Một ví dụ, viết bằng lời lẽ đơn giản để reviewer đọc trong một cái liếc.

```
ts	phase	decision	why	evidence	result
2026-05-24T09:02:00Z	frame	đếm khối lượng công việc trước, khoảng 100 component và chừng 75 giờ	muốn biết quy mô trước khi bắt đầu một lượt chạy dài	commit 3a9f1c2	tìm ra 5 việc cần giải quyết trước khi bắt đầu
2026-05-24T09:40:00Z	harness	chụp screenshot phiên bản cũ trước khi thay đổi bất cứ thứ gì	để so sánh cũ với mới và bắt mọi thay đổi về hình ảnh	scripts/snapshot.sh, baseline/	đã lưu 120 screenshot tham chiếu
2026-05-24T11:15:00Z	widget	chuyển style của widget sang mà không thay đổi giao diện	giữ thay đổi nhỏ và kết quả giống hệt	commit 7c21e0a, pixel-diff 0	trông giống hệt, test pass
2026-05-24T12:30:00Z	widget	bỏ kết quả của một helper vì screenshot của nó trống	kiểm tra file thật thay vì tin bản tóm tắt của nó	worktree reset	đã revert, siết chặt chỉ dẫn cho lần sau
```

## Ghi một dòng log

Viết mỗi mục theo cách bạn kể cho một đồng đội nghe bạn đã làm gì. Lời lẽ đơn giản, hành động cụ thể, không có văn AI hay thuật ngữ trừu tượng (skill **unslop** cũng áp dụng cho chữ trong log).

Dùng helper `scripts/log.sh <logfile> <phase> <decision> <why> <evidence> <result>`. Nó đóng dấu `ts`, ghi header ở lần dùng đầu tiên, loại bỏ tab/xuống dòng lạc, và thêm một dấu nháy đơn vào đầu mọi ô bắt đầu bằng `=`, `+`, `-`, hoặc `@`. Một lệnh `printf` trần nối thêm một dòng cũng được, nhưng hãy để ý chính những byte đó nếu các ô đến từ chữ được sinh ra hoặc do người dùng cung cấp.

Ghi log các điểm quyết định và checkpoint, không phải mọi hành động: một ngã rẽ đã chọn, một đơn vị đã hoàn thành kèm kết quả kiểm chứng, một lần đổi hướng hoặc revert kèm nguyên nhân kích hoạt, một trở ngại được phát hiện, một cổng được sửa. Với các lượt chạy vòng lặp, mỗi vòng một dòng. Bỏ qua những thứ tầm thường và hiển nhiên.

Một lượt chạy là một cuộc trò chuyện của agent, bao gồm các lượt sau của nó và mọi bản tóm tắt của nó. Một lần tiếp nhận, một agent thay thế, hoặc một chat mới bắt đầu một lượt chạy mới. Khi một lượt chạy thêm vào một log đã có dòng, dòng đầu tiên của nó có phase `start`, và dòng đầu tiên của nó sau dòng `start` của một lượt chạy khác cũng vậy. Vì thế một lượt chạy quay lại một log ở lượt sau trước hết đọc các dòng cuối của log để xem liệu một lượt chạy khác đã ghi kể từ đó chưa. Một dòng `start` gọi tên khoảng `ts` của các dòng trước nó mà lượt chạy này không ghi, và bằng chứng của nó gọi tên lượt chạy này, như agent id của nó. Không dùng phase `start` cho bất cứ thứ gì khác.

## Nó nằm ở đâu

Mặc định log là một artifact làm việc, không được commit. Giữ nó ở `decisions.tsv` trong thư mục làm việc, hoặc `.audit/<task-slug>.tsv` khi nhiều nỗ lực chạy cùng lúc, và để nó ngoài git.

Chỉ commit nó khi công việc đủ tham vọng đến mức reviewer cần dấu vết để tin kết quả.

## Quy tắc

- Chỉ nối thêm. Một quyết định sai nhận một dòng mới thay thế nó. Không bao giờ sửa hay xóa lịch sử.
- Ưu tiên bằng chứng được tạo bởi các script đã commit thay vì những thứ làm tay dùng một lần (principle skill **encode-lessons-in-structure**).

## Kiểm toán log với transcript

Ở cuối lượt chạy, trước khi bàn giao, hãy kiểm tra log đã nói sự thật. Đọc transcript của lượt chạy này trong thư mục `agent-transcripts/` của workspace đang hoạt động (system prompt gọi tên đường dẫn). Đừng glob qua `~/.cursor/projects/*/`. Làm vậy sẽ đọc các chat riêng tư không liên quan. Đi qua các dòng của lượt chạy này so với những gì đã thật sự xảy ra. Mỗi đoạn của chúng bắt đầu tại một trong các dòng `start` của lượt chạy này, hoặc tại dòng đầu tiên nếu lượt chạy này đã tạo log, và kết thúc tại dòng `start` tiếp theo của một lượt chạy khác:

- Kiểm tra rằng mọi dòng ánh xạ đến một quyết định hoặc hành động thật.
- Kiểm tra rằng bằng chứng của mỗi dòng truy ra được và cho thấy điều dòng đó khẳng định.
- Một ngã rẽ, lần đổi hướng, hoặc cách tiếp cận bị bỏ dở đã định hình công việc nhưng không được ghi log là một khoảng trống. Hãy thêm nó.

Sửa log, không sửa câu chuyện. Việc kiểm toán không bao giờ sửa hay xóa một dòng, kể cả một dòng bịa ra. Khi một dòng không ghi một quyết định thật hay một hành động thật, hoặc khẳng định hay bằng chứng của nó sai, hãy thêm một dòng thay thế nó với những gì đã thật sự xảy ra và một con trỏ truy ra được. Việc kiểm toán này không kiểm tra các dòng bên ngoài các đoạn của lượt chạy này. Nếu chính công việc của lượt chạy này cho thấy một trong số chúng sai, hãy thay thế nó như mọi quyết định sai.

## Review chéo model cho dấu vết

Trước khi bàn giao, hãy khởi chạy một subagent trên model của một nhà cung cấp khác với model đã làm công việc. Tự review không phải là sự thay thế. Subagent đọc dấu vết kiểm toán và transcript của lượt chạy, rồi đánh dấu những gì người dùng nên chú ý. Không phải làm lại công việc, mà là quét tìm những gì chưa tối ưu hoặc rủi ro. Chọn mức suy luận của từng subagent cho công việc, theo phần Subagent của skill **poteto-mode**.

- Các quyết định được ghi log với bằng chứng yếu hoặc không có.
- Các bước kiểm chứng bị bỏ qua hoặc được khẳng định mà không có bằng chứng trong transcript.
- Các lựa chọn trông rủi ro khi nhìn lại (quá sớm, phình phạm vi, che lấp một triệu chứng).
- Các khoảng trống mà người dùng sẽ bỏ sót khi lướt qua.

Mọi câu trả lời cho một lượt chạy có tạo dấu vết đều kết thúc bằng một phần "Attention". Mở đầu bằng model của reviewer trên một dòng riêng (`reviewed by <model>`), rồi liệt kê từng cờ chỉ đến các dòng hoặc thời điểm cụ thể. "No flags" là một giá trị hợp lệ. Tên model thì không.

## Review dấu vết

Đọc từ trên xuống dưới, lần theo các con trỏ bằng chứng, kiểm tra ngẫu nhiên. GitHub render một TSV đã commit thành bảng. `column -s$'\t' -t decisions.tsv` render nó trong terminal.

## Kết hợp skill này

Các skill khác định tuyến dấu vết kiểm toán của chúng đến đây thay vì tự nghĩ ra một cái. Tham chiếu nó bằng tên và để nó sở hữu định dạng. Đừng nhắc lại các cột.
