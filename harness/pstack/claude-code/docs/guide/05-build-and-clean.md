# Xây dựng thay đổi và dọn sạch diff

Các playbook xây dựng có chung một kỷ luật. Nói điều bạn đã quan sát, và để playbook đòi bằng chứng. Trang này chỉ ra nên đưa gì vào prompt cho từng task xây dựng phổ biến, rồi đến thói quen dọn dẹp giúp diff dễ review.

## Viết prompt cho từng playbook xây dựng bằng những gì bạn biết

Một prompt bug nêu triệu chứng và yêu cầu tái hiện trước:

```text
/poteto-mode lệnh này ghi ra hai bản ghi sau một lần retry. tái hiện trước, rồi sửa và kiểm chứng.
```

Một prompt feature nêu hành vi và những gì không được thay đổi:

```text
/poteto-mode thêm flag --json. output dạng text giữ nguyên từng byte. kiểm chứng cả hai dạng.
```

Một prompt refactoring ghim hành vi trước khi cấu trúc dịch chuyển:

```text
/poteto-mode chuyển phần parsing vào một module, không thay đổi hành vi nào. ghi lại output hiện tại trước và chứng minh nó không đổi sau đó.
```

Một prompt perf nêu con số đo được, không phải cảm nhận:

```text
/poteto-mode khởi động mất 1.8s trên fixture này. trace nó, sửa nguyên nhân đã đo được, cho tôi xem trước và sau.
```

Mỗi prompt trên được chuyển đến playbook của nó ([Bug fix](../../skills/poteto-mode/playbooks/bug-fix.md), [Feature](../../skills/poteto-mode/playbooks/feature.md), [Refactoring](../../skills/poteto-mode/playbooks/refactoring.md), [Perf issue](../../skills/poteto-mode/playbooks/perf-issue.md)), và playbook bổ sung những bước bạn không gõ: tái hiện trước khi sửa, gọi tên hình dạng dữ liệu trước khi cài đặt, ghim hành vi trước khi tái cấu trúc, profile trước khi tối ưu.

Để cải thiện bền bỉ một con số, có [playbook Hillclimb](../../skills/poteto-mode/playbooks/hillclimb.md). Đưa cho nó chỉ số, một mục tiêu, và số lần thử tối thiểu, và nó lặp từng giả thuyết một với một harness đo lường được đóng băng. Nó giữ lại những lần thắng và revert mọi thứ khác.

Cả hai playbook perf đều chạy [`/benchmark-checklist`](../../skills/benchmark-checklist/SKILL.md) trên các con số của chúng. Perf issue thẩm định baseline và mọi con số sau đó, còn Hillclimb thẩm định harness trước khi đóng băng nó. [Kiểm chứng và ship](./06-verify-and-ship.md#thẩm-định-một-con-số-đã-đo-bằng-benchmark-checklist) cho thấy khi nào nên tự gõ nó.

Đôi khi bạn muốn biết nguyên nhân trước mọi bản sửa. Với một triệu chứng đang diễn ra, như rò rỉ bộ nhớ, CPU quay vòng khi rảnh, hoặc lỗi hiển thị, [playbook Runtime forensics](../../skills/poteto-mode/playbooks/runtime-forensics.md) gắn công cụ đo vào tiến trình đang chạy. Với một profile bạn đã thu sẵn, [playbook Trace forensics](../../skills/poteto-mode/playbooks/trace-forensics.md) đọc artifact đó và ánh xạ frame nóng về source. Cả hai trả về một chẩn đoán, không phải một bản sửa:

```text
/poteto-mode đây là cpuprofile từ lần khởi động chậm. cho tôi biết thời gian đi đâu và những dòng source nào chịu trách nhiệm. chưa sửa gì.
```

## Viết test thất bại trước với `/tdd`

Khi một bug có đường test cục bộ rẻ, cả prompt có thể chỉ hai từ:

```text
/tdd implement
```

Trong context, như vậy là đủ. [`/tdd`](../../skills/tdd/SKILL.md) viết test nhỏ nhất thất bại vì đúng lý do mong muốn, rồi đến bản sửa, rồi chạy lại test. Nếu một test cần dựng harness rộng hoặc mock dễ vỡ, skill sẽ nói vậy và dùng phép kiểm tra chạy được gần nhất thay thế. Đừng ép một test vào chỗ mà một lệnh thật là bằng chứng mạnh hơn.

## Nạp các quy tắc TypeScript theo tên

[`typescript-best-practices`](../../skills/typescript-best-practices/SKILL.md) biến các nguyên tắc về hệ thống type thành quy tắc cụ thể: discriminated union, `unknown` tại ranh giới, biến thể được xử lý đầy đủ, type suy ra từ schema. Nó không tự nạp, nên hãy gõ `/typescript-best-practices` khi một task đụng đến file `.ts` hoặc `.tsx`.

## Dọn dẹp trước khi commit

[Playbook Opening a PR](../../skills/poteto-mode/playbooks/opening-a-pr.md) chạy `/deslop` trên diff trước mỗi commit, và poteto-mode áp dụng [`/unslop`](../../skills/unslop/SKILL.md) cho mô tả PR và nội dung commit. `/deslop` nằm trong plugin `cursor-team-kit`, không nằm trong pstack. Nếu bạn không có nó, hãy yêu cầu cùng kết quả bằng lời đơn giản: xóa các comment tường thuật, các guard không có căn cứ, các đường tương thích đã chết, và các chỉnh sửa không liên quan.

Với văn xuôi, `/unslop` nhận một mục tiêu và bất kỳ quy tắc bổ sung nào bạn có:

```text
/unslop các thay đổi trong readme, không dùng gạch ngang dài
```

Bạn sẽ hình thành cách viết tắt của riêng mình. Skill đọc ý định tốt từ các prompt cộc lốc như `unslop cái đó, gọn lại`.

## Loại bỏ comment với `/no-comments`

Comment cần một lượt riêng, và không phải từ agent đã viết chúng. Tác giả bảo vệ comment của mình như cách bạn bảo vệ comment của bạn. Nên trước khi review, hãy giao chúng cho một đôi mắt mới:

```text
/no-comments diff này
```

[`/no-comments`](../../skills/no-comments/SKILL.md) khởi chạy [Comment Sicko](../../agents/comment-sicko.md), một reviewer chỉ đọc với danh sách giữ lại ngắn: header license, doc comment trên API công khai, link giải thích điều mà code không thể, hành vi bị ép bởi một dependency bên ngoài mà bạn không thể định hình lại. Mọi thứ khác đều bị xóa. Một điều bất ngờ trong code của chính bạn không được miễn như vậy. Comment quay lại dưới dạng một cờ refactor, và `/no-comments` sửa những cờ nó chấp nhận tại nguyên nhân gốc. Khi một comment tuyên bố một ràng buộc, "đừng xóa", skill đề nghị mã hóa tuyên bố đó thành một type, test, hoặc lint. Dù cách nào, comment cũng bị xóa.

Sự phân công lao động này đáng được giữ rõ ràng. `/deslop` dọn slop khỏi code, `/unslop` dọn nó khỏi văn xuôi, và `/no-comments` giao comment cho một reviewer không phải người viết chúng.

**Cạm bẫy:** dọn dẹp không phải là phần đánh bóng tùy chọn. Một diff có comment tường thuật và phần thừa phòng thủ trông như chưa xong trong mắt reviewer, và phần code thừa là nơi bug tiếp theo ẩn náu. Nếu diff có cảm giác độn, hãy nói `deslop nó` trước khi commit, không phải sau khi review chỉ ra.

Tiếp theo: [Kiểm chứng và ship](./06-verify-and-ship.md).
