---
name: swarm
description: "Tỏa ra N worker song song, chờ chúng xong hết, và trả về một báo cáo. Dùng cho /swarm, 'swarm this', hoặc để bao phủ song song, chạy đua, thử thách, và khám phá."
disable-model-invocation: true
---

# Swarm

Trong Claude Code, hãy đọc [adapter Claude Code](../../docs/harness/claude-code.md) một lần mỗi session trước khi làm theo skill này. Claude Code thay `${CLAUDE_PLUGIN_ROOT}` trong skill này bằng thư mục gốc plugin; `<pstack>` là đường dẫn đó. Nó ánh xạ các tên Cursor trong các skill pstack sang Claude Code.

## Bắt đầu

Mở một todolist với mỗi giai đoạn một mục trước khi khởi chạy bất cứ thứ gì.

1. Đóng khung
2. Tỏa ra
3. Tổng hợp
4. Báo cáo

## Phase A: Đóng khung

1. Nêu vị từ hoàn thành và artifact hoặc báo cáo mà swarm phải trả về.
2. Chọn hình dạng. Chia thành các lát cắt, cho N worker chạy đua trên các brief giống hệt nhau, hoặc kết hợp cả hai. Với hình dạng chạy đua hoặc kết hợp, hãy tuyên bố `first pass`, `rank all`, hoặc `best-of` trước khi khởi chạy.
3. Chọn model worker từ dòng `swarm workers` trong `~/.cursor/rules/pstack-models.mdc`. Nếu rule hoặc dòng đó không có, dùng `claude-opus-5-5-high-fast`. Với `auto` hoặc `inherit-parent`, bỏ `model` để các worker chạy trên model của cha. Nếu tool Task từ chối một slug, dùng mặc định và nói vậy. Nếu nó từ chối mặc định, dùng slug hợp lệ gần nhất cùng họ từ thông báo lỗi của nó. Với một cuộc đua model, gọi tên model của mỗi nhánh ngay từ đầu. Chọn mức suy luận của từng subagent cho công việc, theo phần Subagent của skill **poteto-mode**.
4. Cho mỗi worker output có thể ghi riêng của nó khi nó ghi. Khi các worker kiểm chứng hoặc đo các commit, mỗi brief gọi tên chính xác các SHA. Một brief đo đạc cũng gọi tên phương pháp (số mẫu, một mẫu là gì, thứ tự). Worker ghi lại cả hai trong kết quả của nó.

## Phase B: Tỏa ra

Khởi chạy cả N worker trong một tin nhắn với `subagent_type: generalPurpose`, `environment: "cloud"`, `run_in_background: true`, và model của bước 3, để trống với `auto` hoặc `inherit-parent`. Chỉ dùng `environment: "local"` khi worker cần truy cập thứ gì đó trên máy tính của người dùng.

Khi một worker phải bắt đầu từ một branch đã push không phải mặc định, hãy truyền `cloud_base_branch`.

Mỗi brief tự đứng được. Bao gồm mục tiêu, phạm vi, lát cắt hoặc nhánh đua chính xác, cách kiểm chứng, và những gì cần báo cáo. Báo cáo dùng `PASS`, `ISSUES`, hoặc `BLOCKED` kèm bằng chứng. Một worker có thể chứng minh một lỗi thì báo cáo `ISSUES` và liệt kê mọi vấn đề nó có thể chứng minh, không chỉ vấn đề đầu tiên.

Nếu một worker bỏ cuộc, tiếp tục với N-1 và ghi chú lại.

## Phase C: Tổng hợp

Đọc các kết quả cuối cùng. Bỏ một kết quả không ghi lại các SHA và phương pháp mà brief của nó gọi tên, và khởi chạy lại worker đó một lần. Sau lần thiếu thứ hai, ghi lại một khoảng trống. Một khoảng trống không được tính là pass. Với việc bao phủ, mọi lát cắt bắt buộc đều cần một kết quả. Với một cuộc đua, áp dụng quy tắc lựa chọn đã tuyên bố từ đầu. Dùng first pass, rank all, hoặc best-of. Đừng dán nguyên output thô của worker.

## Phase D: Báo cáo

Trả về một báo cáo hợp nhất trong chat với một bảng kết quả, mỗi vấn đề một dòng, các khoảng trống hoặc worker bỏ cuộc, và quy tắc chạy đua khi có dùng.
