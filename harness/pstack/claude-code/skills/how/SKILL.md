---
name: how
description: "Dùng cho \"X hoạt động thế nào\", đi qua code trước khi thay đổi gì đó, và các câu hỏi về vị trí / quyền sở hữu / phân lớp (\"cái này nên nằm ở đâu\", \"package nào sở hữu cái này\", \"đây có phải đúng lớp không\"). Giải thích kiến trúc subsystem, luồng runtime, mô hình tư duy để làm quen. Dùng why cho động cơ."
disable-model-invocation: true
---

# How

Trong Claude Code, hãy đọc [adapter Claude Code](../../docs/harness/claude-code.md) một lần mỗi session trước khi làm theo skill này. Claude Code thay `${CLAUDE_PLUGIN_ROOT}` trong skill này bằng thư mục gốc plugin; `<pstack>` là đường dẫn đó. Nó ánh xạ các tên Cursor trong các skill pstack sang Claude Code.

Khám phá codebase để trả lời các câu hỏi "X hoạt động thế nào?".

Nếu phạm vi mơ hồ, hãy nêu cách hiểu của bạn và khám phá. Người dùng có thể chuyển hướng.

## 1. Giải thích

Khởi chạy một Task subagent với `subagent_type: generalPurpose` và `readonly: true` khám phá và giải thích trong một lượt. Đưa cho nó câu hỏi của người dùng và brief này:

> Bạn đang viết một bản giải thích kiến trúc cho một kỹ sư senior. Khám phá codebase và viết một bản giải thích mà một kỹ sư senior chưa quen khu vực này có thể đọc và có được một mô hình tư duy vững chắc. Họ nên hiểu kiến trúc đủ rõ để bắt đầu làm việc trong đó một cách tự tin. Bạn có quyền truy cập chỉ đọc vào codebase.

## 2. Trình bày

Trình bày output của subagent. Chỉnh sửa nhẹ cho rõ ràng hoặc bổ sung context từ cuộc trò chuyện là được. Đừng viết lại nó một cách đáng kể.
