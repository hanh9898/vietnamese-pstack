### Opening a PR

Được gọi ở cuối mọi playbook khác.

Làm việc từ một git worktree tách ra từ trunk, và giữ công việc không liên quan bên ngoài nó. Rebase thành các commit nhỏ, có thể land được. Chạy `/deslop` từ `cursor-team-kit` trên diff trước khi commit.

Tiêu đề: `type(scope): subject`, gọi tên một symbol thật khi có một symbol mang thay đổi. Thân: một bản tóm tắt đọc trong một phút, dưới 40 dòng, với các heading `##` này theo thứ tự, bỏ những heading trống: `## Why`, `## What changed`, `## Scope`, `## Tradeoffs` (chỉ những phương án đã bị loại mà reviewer sẽ hỏi đến nếu không có), `## Blast Radius`, `## Verification`.

Xếp chồng các follow-up theo base branch. Mở PR ở trạng thái sẵn sàng, qua PR tool của lượt chạy với `draft: false`. Nếu không có tool đó, dùng `gh pr create` không kèm `--draft`, hoặc `origin pr create --status open` khi CLI của Origin phân giải được repository. Mở một PR không khởi động babysit.
