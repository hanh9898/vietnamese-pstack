# Lái bằng tên nguyên tắc

pstack cung cấp 24 nguyên tắc dưới dạng các skill riêng lẻ. `/poteto-mode` đọc chỉ mục của chúng khi bắt đầu mọi task nhiều bước, áp dụng những nguyên tắc mà task kích hoạt, và gọi tên mỗi nguyên tắc đã áp dụng trong câu trả lời cùng với quyết định mà nó đã thay đổi.

Bạn không gọi các nguyên tắc. Bạn dùng tên của chúng để lái. Mỗi cái tên trỏ đến một quy tắc hoàn chỉnh mà agent đã đọc, nên một cụm từ chuyển hướng công việc chính xác hơn cả một đoạn hướng dẫn.

## Lái trong thực tế

Giả sử agent sắp gắn thêm một adapter mới vào ba adapter sẵn có:

```text
dùng subtract before you add. xóa các adapter lỗi thời trước, rồi thiết kế phần còn lại.
```

Giả sử nó tuyên bố thành công vì build đã pass:

```text
áp dụng prove it works. chạy luồng import thật và cho tôi xem các bản ghi đã ghi.
```

Giả sử hai lần thử song song sắp ghi vào cùng một branch:

```text
separate before serializing shared state. cho mỗi lần thử một worktree riêng, không dùng lock.
```

Mỗi cụm từ có tác dụng vì quy tắc phía sau nó rất cụ thể. Agent vẫn phải nói, trong câu trả lời, quy tắc đó đã thay đổi quyết định nào. Một lần trích dẫn nguyên tắc mà không có quyết định nào phía sau nghĩa là agent đã gọi tên quy tắc mà không áp dụng nó.

## 24 nguyên tắc, tóm tắt

Các nguyên tắc cốt lõi quyết định nên xây bao nhiêu và khi nào cần nghĩ lại thiết kế:

- [Laziness Protocol](../../skills/principle-laziness-protocol/SKILL.md) ưu tiên xóa bỏ và thay đổi nhỏ nhất giải quyết được vấn đề.
- [Foundational Thinking](../../skills/principle-foundational-thinking/SKILL.md) chọn các cấu trúc dữ liệu cốt lõi trước khi viết logic.
- [Redesign from First Principles](../../skills/principle-redesign-from-first-principles/SKILL.md) tích hợp một yêu cầu mới như thể nó đã có từ ngày đầu.
- [Attack the Premise](../../skills/principle-attack-the-premise/SKILL.md) viết ra tiền đề mà hai hoặc nhiều bản sửa thất bại cùng chia sẻ và kiểm tra trực tiếp nó trước bản sửa tiếp theo.
- [Subtract Before You Add](../../skills/principle-subtract-before-you-add/SKILL.md) loại bỏ phần thừa trước khi xây lên trên nó.
- [Minimize Reader Load](../../skills/principle-minimize-reader-load/SKILL.md) gộp bớt các lớp và state ẩn mà người đọc phải giữ trong đầu.
- [Outcome-Oriented Execution](../../skills/principle-outcome-oriented-execution/SKILL.md) hội tụ các lần viết lại về thiết kế đích thay vì giữ lại các trạng thái tương thích tạm thời.
- [Experience First](../../skills/principle-experience-first/SKILL.md) chọn kết quả cho người dùng thay vì sự tiện lợi khi cài đặt.
- [Exhaust the Design Space](../../skills/principle-exhaust-the-design-space/SKILL.md) xây hai hoặc ba prototype cạnh tranh khi chưa có tiền lệ.
- [Build the Lever](../../skills/principle-build-the-lever/SKILL.md) xây script làm hoặc chứng minh công việc, để reviewer có thể chạy lại nó. Khi một agent cứ làm đi làm lại cùng một việc bằng tay, hãy để nó viết công cụ hoặc skill mà nó ước mình có. Nếu một script có thể làm một bước theo cùng một cách mỗi lần, hãy dùng script, và để dành agent cho những quyết định cần phán đoán.

Các nguyên tắc kiến trúc quyết định state, validation và tương thích nằm ở đâu:

- [Model the Domain](../../skills/principle-model-the-domain/SKILL.md) mã hóa các quy tắc lặp lại trong một cấu trúc, không phải các điều kiện rải rác.
- [Boundary Discipline](../../skills/principle-boundary-discipline/SKILL.md) validate tại ranh giới và tin tưởng các type bên trong.
- [Type System Discipline](../../skills/principle-type-system-discipline/SKILL.md) làm cho các trạng thái bất hợp lệ không thể biểu diễn được.
- [Make Operations Idempotent](../../skills/principle-make-operations-idempotent/SKILL.md) làm cho các lần retry hội tụ về cùng một trạng thái cuối.
- [Migrate Callers Then Delete Legacy APIs](../../skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md) migrate và xóa trong một đợt.
- [Separate Before Serializing Shared State](../../skills/principle-separate-before-serializing-shared-state/SKILL.md) loại bỏ việc dùng chung trước khi thêm cơ chế phối hợp.

Các nguyên tắc kiểm chứng định nghĩa thế nào được tính là bằng chứng:

- [Prove It Works](../../skills/principle-prove-it-works/SKILL.md) kiểm chứng artifact thật, không phải một thứ đại diện.
- [Fix Root Causes](../../skills/principle-fix-root-causes/SKILL.md) tái hiện và lần đến nguyên nhân trước khi thay đổi code.
- [Sequence Work into Verifiable Units](../../skills/principle-sequence-verifiable-units/SKILL.md) kết thúc mỗi đơn vị nhỏ bằng một phép kiểm tra trước khi bắt đầu đơn vị tiếp theo.
- [Test Behavior, Not Implementation](../../skills/principle-test-behavior-not-implementation/SKILL.md) khẳng định những gì người dùng của code quan sát được, để một test thất bại khi hành vi đó hỏng và vẫn sống sót khi phần bên trong thay đổi.
- [Explain the Number](../../skills/principle-explain-the-number/SKILL.md) gọi tên cái giới hạn một con số đã đo và loại trừ khả năng nó đo nhầm thứ khác, trước khi bất kỳ ai tin hoặc báo cáo nó. [`/benchmark-checklist`](../../skills/benchmark-checklist/SKILL.md) biến nó thành bảy câu hỏi bạn trả lời từ các lượt chạy thật.

Các nguyên tắc giao việc giữ cho công việc song song tỉnh táo:

- [Guard the Context Window](../../skills/principle-guard-the-context-window/SKILL.md) chuyển việc đọc khối lượng lớn cho subagent và giữ các phát hiện trong chat chính.
- [Never Block on the Human](../../skills/principle-never-block-on-the-human/SKILL.md) tiến hành các công việc có thể đảo ngược và trình bày kết quả.

Và một nguyên tắc meta:

- [Encode Lessons in Structure](../../skills/principle-encode-lessons-in-structure/SKILL.md) biến lời khuyên bạn đã nhắc lại hai lần thành một lint, phép kiểm tra, hoặc script. [`/correct`](../../skills/correct/SKILL.md) áp dụng nó cho cả một repo, như được chỉ ra trong [Biến nó thành của bạn](./09-make-it-yours.md#sửa-môi-trường-bằng-correct).

Đừng học thuộc danh sách. Lướt qua nó bây giờ, rồi quay lại khi bạn bắt gặp agent làm điều gì đó mà một cái tên ở đây lẽ ra đã ngăn được. Đó là cách vốn từ vựng này bám lại.

Tiếp theo: [Biến nó thành của bạn](./09-make-it-yours.md).
