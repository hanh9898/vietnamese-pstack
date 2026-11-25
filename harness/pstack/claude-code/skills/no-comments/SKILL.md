---
name: no-comments
description: "Khởi chạy Comment Sicko, sửa các phát hiện được chấp nhận, và đề xuất cách mã hóa cho các ràng buộc được tuyên bố."
disable-model-invocation: true
---

# No comments

Trong Claude Code, hãy đọc [adapter Claude Code](../../docs/harness/claude-code.md) một lần mỗi session trước khi làm theo skill này. Nó ánh xạ các tên Cursor trong các skill pstack sang Claude Code.

Khởi chạy Comment Sicko. Hành động dựa trên các phát hiện được chấp nhận.

Nhường cho góc nhìn mới của Comment Sicko.

## Phạm vi

Dùng các file hoặc diff của bên gọi. Nếu không, dùng diff hiện tại so với base branch, mặc định là `main`, bao gồm cả working tree.

## Các bước

1. Khởi chạy `Task` với `subagent_type: "comment-sicko"`. Truyền phạm vi vào. Chọn mức suy luận của từng subagent cho công việc, theo phần Subagent của skill **poteto-mode**. Đừng nhắc lại các quy tắc của nó.
2. Xem xét báo cáo và diff của nó. Từ chối các chỉnh sửa code ứng dụng, việc vượt phạm vi, các lần xóa được ngoại lệ bảo vệ, lý do `MUST KILL` bị nêu sai, và các cờ coi code có chủ đích được giữ lại là có tội. Các cờ định hình lại cho những điều bất ngờ trong code của ta vẫn có thể hành động. Đừng khôi phục những comment đó. Một mục giữ lại chỉ sống sót khi có bằng chứng nó nói về thứ ta không thể thay đổi. Kiểm toán các lệnh tắt lint và TypeScript trong phạm vi bị bỏ sót. Các lệnh tắt liên quan đến tính đúng đắn hoặc an toàn vẫn là các `MUST KILL` có thể hành động. Chỉ khôi phục các lần xóa khi có ngoại lệ chính xác và bằng chứng trong phạm vi. Trước khi chấp nhận các lần giết hoặc giữ `IMPORTANT` hay `do not remove` mỏng manh, hãy lần theo symbol của chúng hoặc chạy `/why` trên nó. Nếu một lần giết mơ hồ, đừng khôi phục. Nếu một mục giữ lại bị bác bỏ hoặc vẫn mơ hồ, hãy xóa nó. Revert và chạy lại một báo cáo bị từ chối với lỗi được gọi tên. Từ chối báo cáo thứ hai, báo cáo nó là còn mở, và đánh trượt `/no-comments`.
3. Sửa trực tiếp các cờ tầm thường được chấp nhận bằng cách xóa một đường chết, bỏ một tham số, hoặc dùng API thật. Nếu bản sửa nào cần một hình dạng, hãy chạy `/architect` một lần cho tập được chấp nhận và code xung quanh. Dừng ở bản phác thảo. Architect định hình. Bước 4 cài đặt.
4. Cài đặt bản sửa nguyên nhân gốc nhỏ nhất trong phạm vi. Loại bỏ mọi cách lách được gọi tên. Nếu nguyên nhân gốc nằm ngoài phạm vi, hãy land bản sửa nhỏ nhất trong phạm vi và báo cáo phần còn lại là còn mở. Các skill **principle-fix-root-causes** và **principle-redesign-from-first-principles** chỉ hướng dẫn ý định. Không cái nào cho phép nới rộng hàng rào hay sửa các trường hợp bên ngoài nó. Không bao giờ gắn chắp vá các guard cho triệu chứng.
5. Comment ràng buộc nói `do not remove`, `do not change wording`, hoặc `talk to X before changing`. Để lại các mục giữ lại về những thứ ta không thể thay đổi. Đề xuất type, runtime, test, hoặc CI lint rẻ nhất trong phạm vi. Chờ phê duyệt tương tác. Chế độ không có người giám sát và eval cần bên gọi phê duyệt trước. Nếu được phê duyệt, mã hóa rồi xóa. Nếu không, xóa, báo cáo ràng buộc là còn mở, và phác thảo công việc ngoài phạm vi.
6. Báo cáo số lượng đã xóa, các comment đã khôi phục, các lần chạy lại, bản phác thảo của architect, các bản sửa, các đề xuất mã hóa, các mã hóa, các ràng buộc chưa được bắt buộc, và các công việc còn mở khác.
