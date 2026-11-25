---
name: setup-pstack
description: Cấu hình pstack dùng model nào cho mỗi vai trò và ở ngân sách reasoning nào. Phát hiện các model bạn có và ghi một rule luôn được áp dụng để ghi đè mặc định của skill. Dùng cho /setup-pstack, "configure pstack models", "pstack budget" (hoặc "cấu hình model pstack", "ngân sách pstack"), hoặc khi thay đổi lựa chọn model của pstack.
---

# Thiết lập pstack

Ghi `~/.cursor/rules/pstack-models.mdc`, một rule luôn được áp dụng để đặt model của pstack cho mỗi vai trò.

## Các bước

### 1. Phát hiện các model có sẵn

Liệt kê các model slug mà bạn có thể truyền cho một subagent `Task` trong session này. Đó là nguồn đáng tin cậy. Nếu Cursor cũng cung cấp một API hoặc CLI model liệt kê các model mà người dùng được quyền dùng, hãy ưu tiên nó để đầy đủ hơn. Nếu bạn không phát hiện được cái nào, hãy yêu cầu người dùng dán các slug họ có quyền truy cập. Không bao giờ ghi một slug thật mà bạn chưa xác nhận là có sẵn. Các alias `inherit-parent` và `auto` luôn hợp lệ dù chúng không phải là slug được phát hiện.

### 2. Nạp trạng thái hiện tại

Ánh xạ mặc định từ vai trò sang model là hình dạng rule được cho thấy ở bước 5 bên dưới. Nếu `~/.cursor/rules/pstack-models.mdc` đã tồn tại, hãy đọc nó và coi dòng `# budget` và các giá trị vai trò của nó là lựa chọn hiện tại. Nếu không, bắt đầu từ các mặc định đó. Một dòng có vai trò không nằm trong bước 5, như `hardest tasks`, `architect runners`, `reflect tooling`, hoặc `why investigators`, là của một vai trò đã ngừng dùng. Bỏ nó.

Các mặc định cũ hơn đặt một model Gemini khác, rồi `gemini-4-neon-high`, vào ghế panel. Vì vậy trong bất kỳ rule nào, một mục `gemini-4-neon-high`, hoặc một mục `gemini-4-*` khác `gemini-4-neon-*`, trong một vai trò panel (`arena runners`, `arena cross-judge pool`, `interrogate reviewers`) là một mặc định cũ. Mỗi cái trở thành `gemini-4-neon-xhigh`. Một mục Gemini 4 Neon ở bất kỳ mức nào khác là lựa chọn của người dùng và được giữ. Cho người dùng biết bạn đã thay thế những mục nào.

Một rule không có dòng `# defaults: 3` đến từ một lần thiết lập cũ hơn. Lần thiết lập đó ghi một dòng cho mọi vai trò, nên một số giá trị của nó là mặc định cũ, không phải lựa chọn. Trước bước 3, hãy thay thế các giá trị sau:

- Một danh sách `arena cross-judge pool` gồm đúng một mục `claude-fable-*`, một mục `claude-opus-*`, và một mục `gemini-*`, theo bất kỳ thứ tự nào, nhận danh sách bước 5 của vai trò. Fable và Opus là cùng một nhà cung cấp, nên mục Fable chỉ có thể làm giám khảo ở nơi mục Opus cũng có thể.
- Một dòng `# budget: unlimited` trở thành `large`, vì không vai trò nào chạy trên `xhigh`.
- Nếu rule cũng không có dòng `# defaults: 2`, một slug cũ là slug khớp `grok-*`. Một slug cũ trong `feature, refactoring`, `bug-fix`, `perf-issue`, `hillclimb`, hoặc `swarm workers` nhận mặc định bước 5 của vai trò. Trong một vai trò panel (`arena runners`, `arena cross-judge pool`, `interrogate reviewers`), một danh sách gồm đúng một mục `claude-opus-*` và một slug cũ, theo thứ tự nào cũng được, nhận danh sách bước 5 của vai trò. Trong mọi danh sách khác, mỗi slug cũ trở thành `claude-opus-5-5-high-fast`.

Mọi giá trị khác là lựa chọn của người dùng và được giữ, bao gồm một slug cũ trong bất kỳ vai trò nào khác và mọi giá trị `inherit-parent` hoặc `auto`. Cho người dùng biết bạn đã thay thế những giá trị nào.

### 3. Ngân sách, ánh xạ, và xác nhận

**(a) Hỏi ngân sách.** Ưu tiên AskQuestion thay vì văn bản tự do. Đưa ra ba lựa chọn này với chính xác các nhãn này, và gọi tên ngân sách hiện tại khi rule có ghi một cái. Khi không có rule, hãy nói rằng `large` khớp với mặc định của skill.

- `large — xhigh reasoning`
- `medium — high reasoning`
- `small — medium reasoning`

**(b) Áp dụng nó.** Xây bảng làm việc từ các mặc định của skill, và trong một lần chạy lại hãy giữ mọi vai trò bạn đã thay đổi theo họ model, danh sách, hoặc alias (`inherit-parent`, `auto`). Các họ model là những họ mà Phase A của skill **arena** định nghĩa, nên Fable là một họ riêng. Mỗi vai trò có một mức effort mục tiêu, là effort của mặc định của nó được dịch chuyển theo ngân sách. `large` giữ nguyên, `medium` hạ một bậc, và `small` hạ hai bậc, trên thang `xhigh` > `high` > `medium` > `low`. Không vai trò nào chạy trên `xhigh`, và một mục tiêu ở đáy thang thì ở lại đó. Hầu hết mặc định ở `xhigh`, và mỗi nhãn ngân sách gọi tên nơi chúng rơi xuống. Đặt effort token của mọi slug thật trong vai trò, kể cả các mục panel, thành mục tiêu của vai trò. Effort token là token cuối, hoặc token đứng trước một `fast` ở cuối. Nếu kết quả không phải là một slug được phát hiện, hãy dùng slug được phát hiện của cùng họ có effort cao nhất ở mức bằng hoặc dưới mục tiêu, nếu không thì đánh dấu vai trò là cần một lựa chọn. `inherit-parent` và `auto` không thay đổi. Vì vậy `medium` biến `claude-opus-5-5-xhigh-fast` thành `claude-opus-5-5-high-fast` và `claude-opus-5-5-high-fast` thành `claude-opus-5-5-medium-fast`, còn `small` biến chúng thành `claude-opus-5-5-medium-fast` và `claude-opus-5-5-low-fast`. Opus 5.5 luôn chạy slug `-fast` của nó, nên mọi giá trị Opus 5.5 đều kết thúc bằng `-fast`. Fable 5.2 và Gemini không có slug fast, nên không bao giờ ghi một cái. Các slug Gemini 4 Neon chạy từ `low` đến `xhigh` không có slug `max` hay `fast`, nên ghế của nó chạy ở `gemini-4-neon-xhigh`, slug cao nhất của nó. Một mục Gemini 4 Neon trong một vai trò panel nhận mục tiêu riêng của nó, `xhigh` được dịch chuyển theo ngân sách, nên `large` giữ `gemini-4-neon-xhigh`, `medium` ghi `gemini-4-neon-high`, và `small` ghi `gemini-4-neon-medium`.

**(c) Cho xem các vai trò và xác nhận.** Cho xem mọi vai trò với model của nó, đánh dấu mọi slug thật không nằm trong tập được phát hiện là cần một lựa chọn. Cũng liệt kê mỗi dòng mà bước 2 đã bỏ. Hỏi xem chấp nhận như hiện có hay thay đổi các vai trò cụ thể, đưa ra các model được phát hiện ở mức `xhigh` hoặc thấp hơn cùng với `inherit-parent` và `auto` (cả hai đều nghĩa là: vai trò này chạy trên model của chat cha, đó là cách người dùng Auto ở lại trên Auto) làm các lựa chọn. Ưu tiên AskQuestion thay vì văn bản tự do. Với các vai trò panel (arena runners, interrogate reviewers), giá trị là một danh sách, và mỗi mục chạy một subagent, kể cả các mục alias, nên độ dài danh sách đặt số lượng. `arena cross-judge pool` cũng là một danh sách, nhưng Arena chạy một giám khảo. Nó chỉ thử các giá trị từ một nhà cung cấp khác với của cha, theo thứ tự danh sách, nên hãy sắp xếp nó theo mức ưu tiên. Fable và các model Claude khác là cùng một nhà cung cấp. Một giá trị `inherit-parent` hoặc `auto` không bao giờ làm giám khảo. `swarm workers` là model mặc định cho mọi worker trừ khi một cuộc đua hoặc so sánh gán một model khác cho mỗi nhánh.

### 4. Kiểm tra hợp lệ

Mọi slug thật được ghi phải nằm trong tập được phát hiện và ở mức `xhigh` hoặc thấp hơn. `inherit-parent` và `auto` luôn hợp lệ. Nếu một slug thật được chọn không có sẵn, hãy dừng và hỏi lại.

### 5. Ghi rule

Ghi `~/.cursor/rules/pstack-models.mdc` với `alwaysApply: true`, dòng `# defaults: 3`, một dòng `# budget` với nhãn được chọn và effort mà nhãn đó gọi tên, và mỗi vai trò một dòng, dùng cùng các nhãn mà poteto-mode dùng. Ghi đè toàn bộ file để các lần chạy lại vẫn idempotent. Hình dạng:

```
---
description: pstack per-role model choices (overrides skill defaults)
alwaysApply: true
---
# pstack model configuration. One line per role. Delete a line to fall back to the skill default.
# `inherit-parent` or `auto` as a value: the role runs on the parent chat model (omit Task `model` and spawn `generalPurpose`). Alias entries in a panel list still count toward its fan-out.
# defaults: 3
# budget: large (xhigh)
feature, refactoring: claude-opus-5-5-xhigh-fast
bug-fix: claude-opus-5-5-xhigh-fast
perf-issue: claude-opus-5-5-xhigh-fast
hillclimb: claude-opus-5-5-xhigh-fast
judgment and prose: claude-opus-5-5-xhigh-fast
arena runners: claude-fable-5-2-high, claude-opus-5-5-high-fast, gemini-4-neon-xhigh
arena cross-judge pool: claude-opus-5-5-high-fast, gemini-4-neon-xhigh
swarm workers: claude-opus-5-5-high-fast
interrogate reviewers: claude-fable-5-2-high, claude-opus-5-5-high-fast, gemini-4-neon-xhigh
```

### 6. Xác nhận

Cho người dùng biết rule đã được ghi và nó áp dụng cho các session mới. Chạy lại skill này sẽ cập nhật nó.

### 7. Đề xuất một verification skill (tùy chọn)

Kiểm tra xem dự án có cách nào để điều khiển app thật làm bằng chứng không (một skill `verify-*`, hoặc một harness có sẵn). Nếu không, hãy đề xuất một lần: "bạn có muốn một verification skill cục bộ cho dự án, để agent có thể điều khiển app theo cách người dùng làm và chứng minh các thay đổi hoạt động không? Tôi có thể tạo một cái bằng /create-verification-skill." Nếu đồng ý, gọi `/create-verification-skill` (được tìm thấy ở bất cứ đâu pstack được cài: workspace, user, hoặc plugin). Nếu không, tiếp tục mà không thúc ép.

### 8. Đề xuất một formal verification skill (tùy chọn)

Kiểm tra xem dự án đã có formal verification skill chưa (một skill của dự án chạy một model checker, một chứng minh, hoặc một verifier khác trên code). Nếu chưa, hãy đề xuất một lần: "bạn có muốn một formal verification skill, để agent có thể chứng minh một tính chất then chốt của code đúng trong mọi trường hợp trong phạm vi, không chỉ các trường hợp mà test chạm đến không? Tôi có thể tạo một cái bằng /create-formal-verification-skill." Nếu đồng ý, gọi `/create-formal-verification-skill` (được tìm thấy ở bất cứ đâu pstack được cài: workspace, user, hoặc plugin). Nếu không, tiếp tục mà không thúc ép.
