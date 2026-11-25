---
name: recall
description: "Dựng lại context làm việc gần đây của bạn từ lịch sử chat của chính bạn, state đang chạy, và hồ sơ chung (báo cáo của người dùng, các bản sửa trước, sự cố), rồi trả về một brief ngắn gọn về trạng thái hiện tại. Dùng cho 'recall my work on X', 'catch me up', 'what have I been working on', 'where did I leave off' (hoặc 'nhắc lại việc tôi làm với X', 'cập nhật cho tôi', 'tôi đang dừng ở đâu'), trước khi bắt đầu hoặc tiếp tục công việc."
disable-model-invocation: true
---

# Recall

Trong Claude Code, hãy đọc [adapter Claude Code](../../docs/harness/claude-code.md) một lần mỗi session trước khi làm theo skill này. Claude Code thay `${CLAUDE_PLUGIN_ROOT}` trong skill này bằng thư mục gốc plugin; `<pstack>` là đường dẫn đó. Nó ánh xạ các tên Cursor trong các skill pstack sang Claude Code.

**Trước khi bắt đầu hoặc tiếp tục công việc, bạn dựng lại context làm việc gần đây của người dùng và trả về một bản tóm tắt ngắn gọn về hiện trạng và việc cần làm tiếp theo.**

Giữ nó ngắn gọn và đúng chủ đề. Chỉ đọc những gì các luồng trong phạm vi cần, rồi dừng.

Context của bạn nằm trong hai hồ sơ. Lịch sử chat của riêng bạn chứa những gì bạn đã làm và quyết định. Hồ sơ chung chứa mọi thứ đã xảy ra quanh cùng phần code dưới những tên gọi khác: các triệu chứng người dùng cứ báo cáo, các bản sửa đã ship rồi bị revert, các lỗi vẫn đang nổ ở prod. Hồ sơ thứ hai đó nằm trong source control, issue tracker, các kênh chat và issue, tài liệu dài, và công cụ theo dõi lỗi. Một feature có đuôi bug dài giữ phần lớn câu chuyện của nó ở đó, nên đừng dựng lại nó chỉ từ transcript của bạn.

Transcript nằm ở `~/.cursor/projects/<slug>/agent-transcripts/<uuid>/<uuid>.jsonl`, với `<slug>` là đường dẫn workspace bỏ dấu gạch chéo đầu và mỗi "/" đổi thành "-" (nên `/Users/you/proj` thành `Users-you-proj`). Mỗi dòng là một tin nhắn chat.

1. Phân loại, rồi định tuyến. Một chat cụ thể trước đó cần tiếp tục là playbook `session-pickup`, không phải skill này. Biến thói quen thành một skill bền vững là `automate-me`. Một bản tóm tắt công việc cho người đọc là một task khác. Recall nạp context làm việc qua các chat gần đây trước khi bạn hành động. Nếu người dùng đã đưa bạn một bản tóm tắt trạng thái đầy đủ (đường dẫn, branch, thay đổi), hãy dùng nó và bỏ qua việc khai thác.
2. Khóa phạm vi trước khi tìm. Ghim khoảng thời gian ("gần đây" là một khoảng thật, mặc định 7 ngày qua), chủ đề nếu được gọi tên, và workspace (mặc định là workspace đang hoạt động. Không bao giờ đọc transcript của dự án khác khi chưa được yêu cầu). Nhắc lại phạm vi. Không bao giờ lặng lẽ biến "tất cả" thành "N gần đây".
3. Tỏa ra trên lịch sử chat của bạn. Khởi chạy các subagent song song trên một model nhanh, rẻ, mỗi cái nhận một lát cắt của tập dữ liệu. Bảo mọi subagent sắp xếp ứng viên theo thời gian sửa đổi thật (`ls -t`) và không bao giờ theo tên UUID, grep chủ đề trước rồi chỉ đọc các chat khớp và chỉ các vùng liên quan của chúng, và bỏ qua chat hiện tại cùng các nhiễu hiển nhiên (chat của subagent, eval, và test). Mỗi cái trả về cùng một schema, mỗi chat một khối: chủ đề, mục tiêu của người dùng, các quyết định, các luồng còn mở, các khó khăn và lời sửa, và các artifact (PR, ticket, branch), mỗi mục trích dẫn UUID của chat. Với một hoặc hai chat, bỏ qua việc tỏa ra và tìm trực tiếp. Transcript thô ở lại trong các subagent. Luồng chính chỉ nhận các phát hiện của chúng. Chọn mức suy luận của từng subagent cho công việc, theo phần Subagent của skill **poteto-mode**.
4. Quét hồ sơ chung bất cứ khi nào chủ đề gọi tên một feature, file, subsystem, khu vực, hoặc bug. Đây là mặc định, không phải một quyết định cần phán đoán, và "việc tôi làm với X" không được miễn. Khởi chạy một subagent điều tra cho mỗi nguồn, ở chế độ agent vì readonly loại bỏ quyền truy cập MCP, và hỏi mỗi cái "trạng thái hiện tại là gì, điều gì đã được thử mà không đứng vững, và người dùng vẫn đang báo cáo gì". Chạy chúng song song với việc khai thác lịch sử chat. Kết quả rỗng cũng là phát hiện. Bỏ qua một MCP không khả dụng và nói vậy. Gộp những gì nhận về vào brief. Chỉ bỏ qua bước này cho việc nhắc lại hoạt động thuần túy không có mục tiêu được gọi tên ("tuần này tôi đã làm gì"), khi lịch sử của riêng bạn và state đang chạy là toàn bộ câu trả lời.
5. Kiểm chứng với state đang chạy. Lấy các PR, branch, và ticket mà việc khai thác và việc quét đã tìm ra và kiểm tra chúng bằng `git` và `gh`. Khi câu trả lời phụ thuộc vào điều một agent thật sự đã làm (các tool nó chạy, file nó đọc, lỗi nó gặp), hãy đọc toàn bộ transcript, không chỉ một bản sao cục bộ đã bị cắt bớt.
6. Viết brief theo hợp đồng bên dưới. Nhóm theo luồng. Bám đúng chủ đề được gọi tên.

## Hợp đồng output

Mở đầu bằng bản tóm tắt, rồi trạng thái các luồng, rồi các vấn đề, rồi bước tiếp theo. Chi tiết sâu hơn đặt bên dưới hoặc bị cắt.

- **Tóm tắt.** Tối đa 5 gạch đầu dòng. Công việc này là gì và nhìn chung nó đang ở đâu.
- **Các luồng.** Mỗi luồng một dòng, có tiền tố đúng một thẻ trạng thái: `[merged #N]`, `[open PR #N]`, `[in flight <branch>]`, `[verified, uncommitted]`, `[reverted #N]`, hoặc `[planned, not started]`. Một luồng không có thẻ là chưa xong, nên hãy gắn thẻ cho nó.
- **Các vấn đề.** Tối đa 5, những vấn đề lặp lại. Bao gồm các triệu chứng người dùng cứ báo cáo và mọi bản sửa đã ship rồi bị revert, để lần thử tiếp theo bắt đầu từ chỗ lần trước thất bại.
- **Bước tiếp theo.** Một hành động tiếp theo hữu ích nhất, cụ thể.

Một feature hoặc ticket lân cận nằm ngoài trừ khi nó chặn cái này. Khi bản tóm tắt và các dòng luồng vượt quá một màn hình, hãy cắt chi tiết trước khi cắt luồng. Viết brief qua skill **unslop**, trích dẫn các phát hiện từ chat bằng UUID và các phát hiện từ hồ sơ chung bằng nguồn của chúng (PR #, ID ticket, permalink chat, issue trên công cụ theo dõi lỗi), và làm sạch context riêng tư trước mọi output công khai.

**Câu trả lời:** brief, theo hợp đồng ở trên.
