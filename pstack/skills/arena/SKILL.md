---
name: arena
description: "Khởi chạy N ứng viên song song cho cùng một task, chọn một bản nền, ghép những phần mạnh nhất của các bản thua vào nó. Dùng cho /arena, 'arena this', 'throw it in the arena' (hoặc 'cho vào arena'), hoặc khi một lần thử duy nhất cho một artifact không tầm thường sẽ khóa chặt một hình dạng sai."
disable-model-invocation: true
---

# Arena

Mở một todolist với mỗi giai đoạn một mục (Đóng khung, Tỏa ra, Chấm chéo, Chọn, Ghép, Kiểm chứng) trước khi khởi chạy bất cứ thứ gì.

## Phase A: Đóng khung

Mọi ứng viên nhận cùng một prompt, nên prompt là hợp đồng.

1. Nêu artifact mà mỗi ứng viên đang tạo ra.
2. Suy ra rubric, 3-6 tiêu chí cụ thể có thể chấm điểm cho thành công trông như thế nào trên *task này*. Nó là công cụ của người chọn ở Phase D. Các ứng viên chỉ thấy task.
3. Chọn các runner từ dòng `arena runners` trong `~/.cursor/rules/pstack-models.mdc`, mặc định là `claude-fable-5-2-high`, `claude-opus-5-5-high-fast`, và `gemini-4-neon-xhigh`. Một mục `auto` hoặc `inherit-parent` là model của cha, nên bỏ `model` và khởi chạy `generalPurpose`. Nếu tool Task từ chối một slug, hãy dùng slug hợp lệ gần nhất cùng họ hoặc bỏ ghế đó, giữ ít nhất hai runner, và nói vậy. Họ được xác định theo tiền tố, và khớp dài nhất thắng: `claude-fable-*`, `claude-*`, và `gemini-*`, sau khi bỏ tiền tố `cursor-` ở đầu. Họ của mọi slug khác là phần chữ trước dấu gạch nối đầu tiên. Khởi chạy nhiều hơn cho nhiều hướng thiết kế, và lặp lại một model khi công việc bị giới hạn bởi việc tạo sinh, không nhạy cảm với phán đoán. Chọn mức suy luận của từng subagent theo phần Subagent của skill **poteto-mode**.
4. Cho mỗi ứng viên vị trí output riêng (một git worktree khi có thể, nếu không thì `/tmp/arena-<slug>/candidate-<n>/`), theo principle skill **separate-before-serializing-shared-state**.

## Phase B: Tỏa ra

Khởi chạy cả N subagent trong một tin nhắn với `run_in_background: true`, mỗi cái với task, đường dẫn đến phần nền tảng chung, đường dẫn output riêng của nó, và chỉ dẫn tạo ra artifact cùng một lý giải ngắn gọi tên các phương án nó đã cân nhắc và những gì nó đã loại bỏ.

Nếu một ứng viên không tạo ra output, tiếp tục với N-1 và ghi chú ứng viên bỏ cuộc.

## Phase C: Chấm chéo

Sau khi mọi ứng viên của Phase B hoàn thành, khởi chạy một giám khảo chỉ đọc từ dòng `arena cross-judge pool` trong `~/.cursor/rules/pstack-models.mdc`, mặc định là `claude-opus-5-5-high-fast`, `gemini-4-neon-xhigh`. Giám khảo không bao giờ đến từ cùng nhà cung cấp với cha, và Fable được tính là Claude trong phép kiểm tra đó, nên hãy dùng mục đầu tiên từ một nhà cung cấp khác. Một mục `auto` hoặc `inherit-parent` là model của cha. Nếu bạn không biết model của cha, hãy dùng slug thật đầu tiên và nói rằng phép kiểm tra nhà cung cấp đã không chạy. Nếu tool Task từ chối một slug, hãy dùng slug hợp lệ gần nhất cùng họ, rồi đến mục kế tiếp như vậy, hoặc bỏ qua giám khảo, và nói vậy. Trong khi bạn đọc ở Phase D, giám khảo chấm điểm từng ứng viên, theo nhãn đường dẫn, trên từng tiêu chí của rubric và đề xuất một bản nền.

## Phase D: Chọn bản nền

Đọc mọi ứng viên từ đầu đến cuối trước khi chọn. Chấm điểm từng cái theo rubric, từng tiêu chí một, không theo cảm giác tổng thể, và so sánh với giám khảo chấm chéo khi Phase C có chạy. Đồng thuận về bản nền xác nhận lựa chọn. Bất đồng nghĩa là một trong hai bên bị thiên lệch hoặc rubric mơ hồ. Đọc cả hai lý giải trước khi quyết định.

Chọn bản nền mà một người bảo trì tương lai có thể mở rộng dễ nhất mà không phá vỡ bất biến. Khi hai bản có cảm giác ngang nhau, ưu tiên ranh giới gọn hơn hoặc API nhỏ hơn, theo Laziness Protocol.

## Phase E: Ghép

Đi qua mỗi ứng viên thua thêm một lần nữa để tìm những gì đáng đưa vào bản nền, thường là một hoặc hai thứ mỗi ứng viên, không phải phần lớn. Gộp từng phần ghép bằng tay, theo principle skill **redesign-from-first-principles**, để kết quả vẫn mạch lạc dưới một mô hình tư duy. Đừng dán một cách máy móc.

Nếu các ứng viên hội tụ về một hình dạng, đó là sự đồng thuận mạnh. Ghi chú nó và ship hình dạng đồng thuận đó. Không cần ghép gì. Nếu chúng phân kỳ dữ dội, Phase A đã được đặc tả chưa đủ. Đóng khung lại và chạy lại thay vì lấy trung bình sự phân kỳ.

## Phase F: Kiểm chứng

Kiểm chứng artifact đã tổng hợp như mọi output khác, theo principle skill **prove-it-works**. Nếu việc kiểm chứng tìm ra một vấn đề mà arena đã bỏ sót, thì hoặc Phase A sai (đóng khung lại và chạy lại) hoặc một ứng viên đã bắt được nó và bạn bỏ sót phần ghép (quay lại Phase E). Đừng che lấp nó.

## Output

Một artifact đã tổng hợp, kèm một ghi chú tổng hợp ngắn gọi tên bản nền và lý do, phán quyết của giám khảo chấm chéo hoặc việc Phase C đã bỏ qua giám khảo, mỗi phần ghép cùng ứng viên nguồn của nó, những gì bị loại bỏ và lý do, mọi sự hội tụ hoặc ứng viên bỏ cuộc, và kết quả kiểm chứng.
