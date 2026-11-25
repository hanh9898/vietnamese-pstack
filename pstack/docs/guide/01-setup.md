# Cài đặt pstack

Trong trang này bạn cài plugin, chọn các model pstack sẽ dùng, và chạy task đầu tiên. Cài đặt chỉ gồm một lệnh cộng một cuộc trò chuyện ngắn.

## Cài plugin

Trong một chat Cursor, chạy:

```text
/add-plugin pstack
```

Cursor xác nhận plugin đã được cài.

Nếu trước đây bạn đã cài pstack upstream từ `cursor/plugins`, hãy tắt rồi gỡ plugin đó trước khi cài bản tiếng Việt bên dưới. Cả hai plugin cung cấp lệnh dưới namespace `/pstack:`, nên bật cùng lúc có thể làm trùng lệnh. Với cài đặt user:

```bash
claude plugin disable --scope user pstack@cursor-plugins
claude plugin uninstall --scope user pstack@cursor-plugins
```

Nếu bản upstream được cài ở phạm vi khác, thay `user` bằng `project` hoặc `local`.

Trong terminal, chạy `claude plugin marketplace add hanh9898/vietnamese-pstack`, rồi `claude plugin install pstack@vietnamese-pstack`. Trong một session đang mở, dùng `/plugin marketplace add hanh9898/vietnamese-pstack`, rồi `/plugin install pstack@vietnamese-pstack` và chọn phạm vi cài đặt trong bảng plugin. Claude Code thêm tiền tố cho lệnh của plugin; các slash command bên dưới dùng dạng Cursor, nên thêm `pstack:` trong Claude Code, ví dụ `/pstack:setup-pstack`. [Bộ chuyển đổi Claude Code](../harness/claude-code.md) đề cập các khác biệt còn lại.

## Chọn model

Chạy:

```text
/setup-pstack
```

[`/setup-pstack`](../../skills/setup-pstack/SKILL.md) phát hiện các model bạn có quyền truy cập, hỏi mức ngân sách suy luận (reasoning budget), cho bạn xem từng vai trò (code delegate, phán đoán, các review panel), và hỏi bạn muốn gì. Hãy trả lời các câu hỏi. Trong Cursor, nó ghi `~/.cursor/rules/pstack-models.mdc`; trong Claude Code, nó ghi `~/.claude/rules/pstack-models.md`, một rule nhỏ mà mọi skill pstack đều đọc.

Các giá trị mặc định giống với budget `large`. Code, văn bản và phán đoán chạy trên Opus 5.5 với mức suy luận `xhigh`, còn các review panel và swarm worker chạy ở `high`. Không vai trò nào chạy trên `xhigh`. Ngoài review panel, Fable 5.2 chỉ chạy khi bạn gọi tên nó cho một task hoặc sau khi hai lần chạy Opus 5.5 với cùng một brief đều không qua được bước kiểm tra. `medium` hạ mỗi vai trò xuống một mức và `small` hạ hai mức, cả hai đều tốn ít token hơn.

Bạn chỉ ghi đè những gì mình quan tâm. Vai trò nào không có dòng trong rule sẽ giữ mặc định của skill. Để khôi phục mặc định, xóa dòng của vai trò đó. Chạy lại `/setup-pstack` sẽ giữ mọi vai trò có model khác với mặc định. Khi một mặc định thay đổi, rule được ghi trước thay đổi đó vẫn ghim mặc định cũ cho đến khi bạn chạy lại `/setup-pstack`. Lần chạy đó thay các mặc định cũ mà nó nhận ra, cho bạn biết là những cái nào, và giữ các lựa chọn khác của bạn. Để bỏ một giá trị ghim mà nó không nhận ra, hãy xóa dòng của vai trò đó hoặc xóa file trước.

Có thể bạn đang thắc mắc điều gì xảy ra nếu dùng Auto. Đặt một vai trò thành `inherit-parent` hoặc `auto` và pstack sẽ bỏ trường `model` của subagent, nên subagent kế thừa model của chat cha. Hai giá trị này có cùng ý nghĩa, và không cái nào là model slug. Với vai trò panel, giá trị là một danh sách, và mỗi phần tử chạy một subagent, nên độ dài danh sách quyết định kích thước panel. Cài đặt cũng cấu hình `swarm workers`, model mặc định cho mọi worker của `/swarm` trừ khi một cuộc đua (race) chỉ định model cho từng nhánh.

## Chấp nhận các đề xuất kiểm chứng, hoặc không

Cuối quá trình cài đặt, `/setup-pstack` tìm một cách để chứng minh hành vi ứng dụng trong dự án của bạn, hoặc là một skill `verify-*` hoặc là một harness có sẵn. Nếu không thấy cái nào, nó đề xuất một lần việc sinh ra một cái bằng [`/create-verification-skill`](../../skills/create-verification-skill/SKILL.md).

Đồng ý thì nó ghi `.cursor/skills/verify-<app>/` trong Cursor hoặc `.claude/skills/verify-<app>/` trong Claude Code, một skill cục bộ của dự án dạy agent điều khiển ứng dụng của bạn theo cách người dùng làm. Nó chứng minh skill hoạt động một lần trước khi bàn giao. Từ chối thì quá trình cài đặt tiếp tục. Bạn có thể tự chạy `/create-verification-skill` bất cứ lúc nào. [Kiểm chứng và ship](./06-verify-and-ship.md#tạo-một-verification-skill-cho-dự-án) đề cập chi tiết.

Nếu bạn mới dùng pstack, hãy đồng ý. Một agent có thể kiểm tra công việc của chính nó sẽ tiếp tục cho đến khi bước kiểm tra pass. Một agent không làm được vậy sẽ trả mọi kết quả về cho bạn kiểm tra bằng tay. Trong mọi thứ ở hướng dẫn này, verification skill là thứ đáng giá nhất.

Sau đó cài đặt đề xuất một lần việc sinh một formal verification skill bằng [`/create-formal-verification-skill`](../../skills/create-formal-verification-skill/SKILL.md), trừ khi dự án đã có. Test kiểm tra những trường hợp mà ai đó đã nghĩ ra để viết. Formal verification skill kiểm tra một thuộc tính then chốt trong code của bạn, ví dụ "một job không bao giờ chạy hai lần cùng lúc", trong mọi trường hợp thuộc một phạm vi đã nêu. Hãy đồng ý khi code của bạn có concurrency, retry, state machine, hoặc parser, nơi một bug gây tốn kém và test hiếm khi chạm tới trường hợp gây lỗi. Nếu không thì từ chối, và chạy nó sau nếu tình hình thay đổi. [Kiểm chứng và ship](./06-verify-and-ship.md#chứng-minh-một-thuộc-tính-bằng-formal-verification-skill) đề cập phần này.

Sau khi cài đặt, hãy mở một chat mới. Rule model áp dụng cho các session mới.

## Kiểm soát chi phí

pstack tiêu thêm token cho subagent và review panel. Đó là cái giá của sự chặt chẽ. Để tiêu ít hơn:

- Chạy lại `/setup-pstack` và chọn reasoning budget nhỏ hơn hoặc model rẻ hơn. Một model mạnh ở chat chính cùng các model rẻ hơn, nhanh hơn ở các vai trò viết code là một cách chia tốt.
- Đặt một vai trò thành `auto` hoặc `inherit-parent` để nó chạy trên chính model của chat.
- Rút ngắn danh sách panel. Mỗi phần tử chạy một subagent.
- Để dành `/poteto-mode` cho công việc cần sự chặt chẽ. Một chỉnh sửa nhỏ, hiển nhiên thì không cần.

## Chạy task đầu tiên

Chọn một việc thật nhưng nhỏ, và mô tả nó như cách bạn mô tả với một đồng nghiệp:

```text
/poteto-mode thêm flag --json cho lệnh này. output dạng text phải giữ nguyên từng byte. kiểm chứng cả hai.
```

Theo dõi todo list. Các mục đầu tiên là các bước của playbook được khớp, chép vào nguyên văn, với prompt này là playbook Feature.

Từ đây bạn có thể gõ các câu hỏi tiếp theo bình thường. Để giữ `/poteto-mode` bật cho cả chat, chọn nó từ menu `/` bằng Option+Enter (Mac) hoặc Alt+Enter (Windows) thay vì Enter. Việc đó biến nó thành một [Custom Mode](https://cursor.com/docs/skills#using-a-skill-as-a-custom-mode), ở lại trong context mọi lượt cho đến khi bạn thoát. Custom Mode có trong Agents Window và CLI. Nhấn Enter thường chỉ đính kèm skill vào một tin nhắn, và nó mờ dần khi chat tiếp diễn.

Tiếp theo: [Chuyển công việc qua `/poteto-mode`](./02-poteto-mode.md).
