# Kiểm chứng kết quả và mở PR

"Nó compile được" không phải là bằng chứng. [Nguyên tắc Prove It Works](../../skills/principle-prove-it-works/SKILL.md) buộc agent kiểm tra artifact thật trước khi báo thành công, và việc của bạn là làm cho "artifact thật" có thể kiểm tra được. Trang này đề cập cách nêu điều kiện hoàn thành, thẩm định một con số đã đo, tạo một verification skill cho ứng dụng của bạn, kiểm chứng hình thức một thuộc tính mà test hiếm khi chạm tới, mở PR, và đưa nó đến khi được merge.

Kiểm chứng là bước chậm nhất trong phần lớn công việc của agent, vì đó là bước thường phải chờ con người. Hãy làm cho agent tự làm được nó, và bạn thôi là nút thắt cổ chai. Bỏ qua nó, và chạy thêm agent chỉ mang lại thêm công việc chưa được kiểm tra cho bạn review.

![Một chiếc máy bay prototype bay trên đường thử thật trong khi cô ấy bấm giờ bằng đồng hồ và các robot quay phim, đánh dấu checklist cho lượt chạy; terminal hiện verify: pass, evidence: captured.](./images/verification.jpg)

## Nêu điều kiện hoàn thành ngay từ đầu

Đưa định nghĩa "xong" vào prompt đầu tiên, bằng bất cứ lời nào phù hợp:

```text
/poteto-mode thêm output json cho lệnh này. output dạng text giữ nguyên từng byte, json parse được, cả hai chạy trên project mẫu. cho tôi xem bằng chứng.
```

Giờ agent có ba phép kiểm tra nó chạy được, chứ không phải một tâm trạng cần làm hài lòng. Khi câu trả lời quay về, nó nên mang theo chính xác các lệnh và output. Nếu một phép kiểm tra không chạy được, một câu trả lời tốt sẽ nói "chưa kết luận được". Một câu trả lời tự tin mà không có bằng chứng là dấu hiệu cảnh báo.

Chọn phép kiểm tra phù hợp với thay đổi:

- Một thay đổi CLI chạy lệnh thật.
- Một thay đổi UI đi qua luồng đã thay đổi trong ứng dụng đang chạy. Khi nó phải khớp với bản tham chiếu đến từng pixel, [playbook Visual parity](../../skills/poteto-mode/playbooks/visual-parity.md) so sánh screenshot với một baseline đóng băng thay vì phán đoán bằng mắt.
- Một parser hoặc migration phát lại một đầu vào đã lưu.
- Một thay đổi perf so sánh profile trước và sau.
- Một thay đổi về lưu trữ đọc lại giá trị đã ghi.

Hãy yêu cầu bằng chứng dưới dạng một artifact bạn có thể tự xem xét: test thất bại rồi test pass, một video trước và sau, trace, screenshot. Nếu bản sửa đã được merge, hãy yêu cầu chạy lại cùng phép kiểm tra trên main. Một artifact thắng một lời giải thích nghe có lý, vì bạn có thể chất vấn nó mà không phải phát lại cả lượt chạy.

Với một diff nhỏ bạn chưa hoàn toàn tin, [`/blast-radius`](../../skills/blast-radius/SKILL.md) tìm những gì nó có thể làm hỏng ở chỗ khác. Nó tìm một sự thật duy nhất khiến thay đổi an toàn và chứng minh sự thật đó bằng cách chạy code, không phải bằng lập luận.

## Thẩm định một con số đã đo bằng `/benchmark-checklist`

Một con số trước và sau là loại bằng chứng dễ vô tình sai nhất. Một cache đã ấm, một bản build debug ở một phía, hoặc phần việc không bao giờ chạy bên trong vùng được đo thời gian, mỗi thứ đều có thể tạo ra một mức tăng tốc thuyết phục. Trước khi bạn báo cáo hoặc hành động dựa trên một con số, hãy gõ:

```text
/benchmark-checklist thẩm định mức tăng tốc export trước khi nó vào pr
```

[`/benchmark-checklist`](../../skills/benchmark-checklist/SKILL.md) hỏi bảy câu hỏi và đòi bằng chứng từ một lượt chạy cho mỗi câu:

1. Cái gì giới hạn con số này, và tại sao nó không gấp đôi?
2. Mọi phía có chạy được tinh chỉnh giống như production không?
3. Kết quả có phá vỡ một giới hạn vật lý, như băng thông đĩa hay số core không?
4. Có gì báo lỗi hoặc trả về output sai không?
5. Nó có tái hiện qua các lượt chạy xen kẽ, với median và khoảng biến thiên không?
6. Nó có quan trọng từ đầu đến cuối, trên con đường người dùng phải chờ không?
7. Phần việc có thật sự diễn ra bên trong vùng được đo thời gian không?

Phán quyết trả về là nhanh hơn, chậm hơn, không có khác biệt đo được, hoặc chưa kết luận được, kèm số lượt chạy, khoảng biến thiên, và yếu tố giới hạn. Nó nói chưa kết luận được khi không gọi tên được yếu tố giới hạn hoặc một phía chạy chưa được tinh chỉnh. `/poteto-mode` vốn đã chạy checklist bên trong các playbook Perf issue và Hillclimb, nên bạn tự gõ nó khi đo thứ gì đó bên ngoài chúng, hoặc khi con số của người khác trông quá đẹp. Đó là dạng thực hành của [nguyên tắc Explain the Number](../../skills/principle-explain-the-number/SKILL.md).

## Tạo một verification skill cho dự án

Gạch đầu dòng về UI ở trên che giấu một yêu cầu thật. Agent cần một cách có kịch bản để điều khiển ứng dụng của bạn. Nếu dự án của bạn có sẵn, tuyệt. Nếu không, hãy chạy:

```text
/create-verification-skill
```

[`/create-verification-skill`](../../skills/create-verification-skill/SKILL.md) phỏng vấn repository, không phải bạn. Nó tìm ra người dùng chạm vào những gì, ứng dụng khởi chạy cục bộ ra sao, cái gì có thể điều khiển nó (ưu tiên một harness có sẵn, nếu không thì browser và CDP, một PTY, hoặc HTTP thuần), bằng chứng nào chứng minh hành vi, và liệu hai instance có thể chạy song song không. Nó chỉ hỏi bạn những gì code không trả lời được.

Nó ghi ra `.cursor/skills/verify-<app>/`, các hướng dẫn dành cho agent với các phần Launch, Doctor, Drive, Evidence và Cleanup chính xác, một phần Helpers cho mọi script nó kèm theo, cùng một feature map trong `features/` lập chỉ mục những gì ứng dụng làm và kết quả nào chứng minh mỗi feature hoạt động. Skill kèm theo một [ví dụ feature map hoàn chỉnh](../../skills/create-verification-skill/references/feature-map-example/) với một README chỉ mục và mỗi feature một file dùng bốn H2 bắt buộc. Trước khi bàn giao, bộ sinh chứng minh skill một lần từ đầu đến cuối: khởi chạy, doctor check, điều khiển một feature, thu bằng chứng, dọn dẹp, rồi xác nhận bằng chứng vẫn còn sau khi dọn. Nếu bước chứng minh đó thất bại, đừng dùng output.

Từ đó trở đi, "kiểm chứng nó trong ứng dụng" là một bước bất kỳ agent nào cũng thực hiện được, trong repo này, không cần cuộc trò chuyện thiết lập nào. Gọi tên nó trong prompt khi bạn muốn bằng chứng ở một dạng cụ thể:

```text
/poteto-mode xây hành động bulk-archive. dùng /verify-<app> để kiểm chứng thay đổi của bạn và cho tôi xem video và screenshot làm bằng chứng.
```

```text
/poteto-mode tái hiện lỗi này với /verify-<app>. nếu nó tái hiện trên main, sửa nó và cho tôi xem video làm bằng chứng.
```

Khi verify skill đã hoạt động, một [`/swarm`](../../skills/swarm/SKILL.md) có thể chia một lượt đầy đủ theo từng mục trong feature map và gộp kết quả. Một swarm các verifier cũng xác nhận một cải thiện perf trên mẫu đủ lớn, hoặc fuzz ứng dụng để tìm hồi quy trước khi một PR được ship.

Hãy coi verification skill là hạ tầng, không phải thứ dùng một lần. Commit nó, để mọi người và mọi agent trong team điều khiển ứng dụng theo cùng một cách. Rồi [xây đòn bẩy](../../skills/principle-build-the-lever/SKILL.md). Khi agent cứ viết các script dùng xong bỏ để click qua ứng dụng, hãy yêu cầu một CLI điều khiển nhỏ để skill gọi thay vào đó. Agent tốn ít token hơn, và mọi lượt chạy trở nên lặp lại được. Một CLI mà agent dùng tốt có các đặc điểm sau:

- Vài lệnh có thể kết hợp, mỗi lệnh làm việc thật, thay vì nhiều lệnh mỏng.
- Một tùy chọn `--dry-run` trên mọi thứ có tính phá hủy.
- Các subcommand bộc lộ feature dần dần thay vì tất cả cùng lúc.
- Thông báo lỗi nói nên làm gì thay thế.
- Văn bản `--help` phong phú.
- Output máy đọc được, như JSON.

Nhân tiện, hãy làm cho môi trường dev cũng lặp lại được: dữ liệu seed sẵn, user test, và một lệnh dựng môi trường lên theo cùng một cách mỗi lần.

## Giữ verification skill trung thực

Ứng dụng thay đổi, và feature map bị lỗi thời. Hãy chạy lệnh này ít nhất mỗi ngày một lần, lý tưởng là từ một automation theo lịch để không ai phải nhớ:

```text
/maintain-verification-skill
```

[`/maintain-verification-skill`](../../skills/maintain-verification-skill/SKILL.md) kiểm toán skill đã sinh: mỗi feature một trình đọc source chỉ đọc chạy song song, rồi một lượt chạy thật điều khiển mọi feature đã ánh xạ. Nó kết thúc với đúng một trong ba kết quả. `clean` nghĩa là bao phủ đầy đủ và không có gì để ship. `changed` nghĩa là một PR gồm các chỉnh sửa đã được chứng minh, giới hạn trong chính thư mục của verification skill. `blocked` gọi tên vật cản. Nó không bao giờ sửa code sản phẩm. Nếu lượt chạy thật bắt được một hồi quy của sản phẩm, nó báo cáo hồi quy đó thay vì che giấu bằng một chỉnh sửa tài liệu.

## Chứng minh một thuộc tính bằng formal verification skill

Một verification skill chứng minh những con đường bạn điều khiển. Có những bug sống trên những con đường không ai điều khiển: hai lần retry chồng lên nhau, một lock hết hạn giữa lúc đang ghi, một thay đổi state đến không đúng thứ tự. Test hiếm khi chạm tới những trường hợp đó. Với code mà một bug như vậy gây tổn thất lớn, hãy chạy:

```text
/create-formal-verification-skill
```

[`/create-formal-verification-skill`](../../skills/create-formal-verification-skill/SKILL.md) chọn mục tiêu từ code: một lời hứa mà code đưa ra, nơi việc phá vỡ nó gây hại cho người dùng và test hiếm khi chạm tới trường hợp phá vỡ nó. Nó chọn mục tiêu mạnh nhất, không phải mục tiêu dễ kiểm chứng nhất. Gọi tên một khu vực hoặc một bug để bắt đầu từ đó thay thế:

```text
/create-formal-verification-skill logic job lease và retry. một job không bao giờ được chạy hai lần cùng lúc.
```

Câu hỏi quyết định công cụ. Liệu các sự kiện có thể xảy ra theo một thứ tự tồi hay không thì hợp với một model checker trên một mô hình nhỏ của thiết kế, và TLA+ là mặc định cho việc đó với bất kỳ ngôn ngữ nào. Liệu code có hoạt động đúng với mọi đầu vào hay không thì hợp với một verifier chạy trên chính code. Nếu không có verifier nào chạy trên ngôn ngữ của bạn, agent sẽ nói vậy và test code thật với các đầu vào được sinh ra, không phải một mô hình viết tay của hàm. Một thuộc tính phải đúng ở mọi kích thước có thể cần một chứng minh. Agent cho bạn biết nó đã chọn công cụ nào và tại sao.

Nó kiểm chứng một thuộc tính và cho thấy thuộc tính đó thất bại trên một biến thể bị làm hỏng của code, vì một phép kiểm tra bạn chưa từng thấy thất bại thì không chứng minh được gì. Khi code hiện tại đã phá vỡ thuộc tính, bạn nhận được phản ví dụ dưới dạng một chuỗi bước ngắn theo thuật ngữ của code bạn. Thuộc tính giữ nguyên như đã nêu, nên phát hiện vẫn là phát hiện. Code sản phẩm không thay đổi trừ khi bạn yêu cầu.

Nó ghi ra một skill cục bộ cho dự án, cho agent tiếp theo biết liệu một thay đổi có đụng đến code đã được kiểm chứng không, cách chạy phép kiểm tra bằng một lệnh, và cách phân biệt một bug thật với một lỗi mô hình hóa. Trước khi bàn giao, bộ sinh làm theo skill đó một lần trên một thay đổi nháp phá vỡ thuộc tính, và phép kiểm tra phải bắt được nó. Phần bàn giao nói rõ điều gì đã được kiểm chứng, bằng công cụ và giới hạn nào, phép kiểm tra tìm thấy gì, và nó không bao phủ những gì. Một lần pass bao phủ mô hình hoặc giới hạn, không phải toàn bộ hệ thống.

Skill cũng ghi lại mỗi phép kiểm tra bao phủ code nào và commit mà phép kiểm tra khớp với nó lần gần nhất. Các lần merge và refactor bỏ qua skill có thể để phép kiểm tra vẫn pass trên một mô tả của code đã không còn. Sau những lần đó, hãy chạy [`/maintain-formal-verification-skill`](../../skills/maintain-formal-verification-skill/SKILL.md). Nó cập nhật phần kiểm chứng từ code, chạy lại, cho thấy mỗi phép kiểm tra đã cập nhật vẫn có thể thất bại, và cho bạn biết mỗi lần thất bại là do phần kiểm chứng bị lệch hay do một bug trong code.

## Thể hiện hành vi dưới dạng statechart

Một phản ví dụ theo thuật ngữ mô hình thuyết phục được bạn. PM hoặc designer sở hữu hành vi đó cần thấy nó theo thuật ngữ của họ. Hãy chạy:

```text
/statechart người dùng thấy gì khi họ sửa một ghi chú lúc offline
```

[`/statechart`](../../skills/statechart/SKILL.md) vẽ một Mermaid statechart về những gì người dùng thấy, được sinh từ một mô hình TLA+, nên bức hình và mô hình đã kiểm tra không thể lệch nhau. Các quy tắc của người đọc ("bạn không bao giờ thấy Synced khi đang offline") trở thành invariant. Biểu đồ đánh dấu mỗi state phá vỡ một quy tắc, và báo cáo đưa ra đường đi ngắn nhất đến nó bằng lời của người đọc. Trước khi bàn giao, agent tái hiện mỗi đường đi gây bug trong code thật, để một lỗi mô hình hóa không đến tay người đọc dưới dạng một bug.

## Mở PR

```text
/poteto-mode mở pr. các commit nhỏ có thứ tự, bằng chứng trong mô tả.
```

[Playbook Opening a PR](../../skills/poteto-mode/playbooks/opening-a-pr.md) làm việc từ một worktree, rebase công việc thành các commit nhỏ có thể land, dọn diff, viết một bản tóm tắt đọc trong một phút làm phần thân, và mở PR ở trạng thái sẵn sàng. Các follow-up xếp chồng tốt hơn một branch cứ phình to.

## Đưa PR đến trạng thái sẵn sàng merge với Babysit

Một PR đang mở bắt đầu tích tụ vật cản ngay lập tức. Check thất bại, reviewer comment, trunk dịch chuyển. Hãy giao sự xáo trộn đó cho [playbook Babysit](../../skills/poteto-mode/playbooks/babysit.md):

```text
/poteto-mode babysit pr này. làm nó xanh.
```

Babysit theo dõi PR, với một watcher đi kèm trên GitHub hoặc Origin CLI khi có sẵn, và xử lý vật cản theo thứ tự: conflict, rồi các thread review, rồi CI. Nó không bao giờ rebase hay force-push. Một conflict hoặc một base cũ được trả về cho bạn cùng branch cần rebase. Việc phân loại comment mang tính hoài nghi, vì người và bot ghi cả phát hiện thật lẫn nhiễu trong cùng một danh sách. Một phát hiện thật được sửa, còn nhiễu bị bác bỏ với lời phản bác được đăng trên thread. Khi tất cả những gì bạn muốn là trạng thái, hãy hỏi ít hơn và Babysit trả lời mà không bắt đầu vòng lặp:

```text
/poteto-mode kiểm tra pr 123. còn gì tồn đọng không?
```

Babysit dừng ở trạng thái sẵn sàng merge. Nó không bao giờ merge, kể cả khi mọi thứ đều xanh, vì merge là một quyết định khác.

## Land stack với Shipping

Xanh không đồng nghĩa với an toàn. Khi bạn sẵn sàng land, hãy nói ra:

```text
/poteto-mode land stack.
```

[Playbook Shipping](../../skills/poteto-mode/playbooks/shipping.md) kiểm chứng từng PR một cách độc lập trước khi kích hoạt bất cứ thứ gì. Mỗi PR một agent mới chứng minh hành vi khi chạy thật, và agent phán xét một thay đổi không bao giờ là agent đã viết nó. Rồi Shipping chỉ land chuỗi liên tục đã được kiểm chứng tính từ dưới lên, từng PR một qua GitHub theo mặc định hoặc qua Origin khi có CLI của nó, và báo cáo PR đầu tiên làm đứt chuỗi. Một PR đã kiểm chứng nằm trên một PR chưa kiểm chứng phải chờ, vì merge nó sẽ kéo khoảng trống vào bên dưới.

Tiếp theo: [Chạy công việc trong khi bạn ngủ](./07-overnight.md).
