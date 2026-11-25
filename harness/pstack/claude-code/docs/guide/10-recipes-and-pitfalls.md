# Công thức và cạm bẫy

Các prompt đáng sao chép, rồi đến những lỗi ai cũng mắc một lần. Thay bằng đường dẫn và điều kiện hoàn thành của riêng bạn. Các công thức được viết thân mật một cách có chủ đích. Đó là cách người ta thật sự gõ chúng, và các skill vẫn đọc được ý định tốt.

![Cô ấy nếm thử một món ăn đã hoàn thành trong khi các robot nấu theo một hộp công thức, với các tấm thẻ ghim /how, /tdd và /loop phía trên quầy.](./images/recipes.jpg)

## Hiểu một subsystem lạ

```text
dùng /how trước để hiểu phần khởi tạo này hoạt động thế nào. rồi dùng /why để tìm ra tại sao gần đây nó bị hỏng.
```

Cơ chế trước, lịch sử sau. Báo cáo của mỗi skill cho bạn biết nó đã tìm trong những nguồn nào, nên bạn biết câu trả lời dựa trên cái gì.

## Nhắc lại một báo cáo nhiều nhiễu trước khi đụng vào code

```text
/poteto-mode đọc thread này. nhắc lại vấn đề cốt lõi bằng lời của bạn, bằng tiếng việt dễ hiểu. chưa thay đổi code nào.
```

Một sự hiểu sai sẽ lộ ra trong phần nhắc lại, nơi việc sửa chỉ tốn một tin nhắn. Hãy giữ giả thuyết của bạn cho riêng mình đến khi agent đã nêu giả thuyết của nó. `/in-your-own-words` chỉ yêu cầu phần nhắc lại, không cần playbook.

## Mài sắc một prompt trước khi gửi

```text
/sharpen viết tài liệu onboarding cho billing service mới.
```

Agent gọi tên những gì một chuyên gia sẽ làm mà bạn chưa yêu cầu, nguyên liệu thô họ sẽ bắt đầu từ đó, phương pháp và công cụ của họ, và một phép kiểm tra bên ngoài cho thấy kết quả là đúng. Nó trả lại prompt của bạn đã được viết lại để yêu cầu điều đó và không làm task. Hãy gửi bản viết lại khi nó đọc thấy đúng.

## Prototype trước khi chọn

```text
/poteto-mode prototype vài phương án cho layout trang settings. đặt chúng sau một công tắc chuyển và gửi tôi screenshot của từng cái.
```

Bạn chọn từ những thứ chạy được, không phải từ mô tả. Agent tự trả lời các câu hỏi về layout và thời gian của nó trên đường đi.

## Biến một thiết kế đã chốt thành kế hoạch

```text
/poteto-mode biến thiết kế này thành một kế hoạch. các PR nhỏ có thể kiểm chứng, mỗi PR có bằng chứng riêng.
```

Chỉ yêu cầu sau khi thiết kế đã chốt. Kế hoạch là sản phẩm bàn giao, và nó gọi tên playbook sẽ thực thi nó.

## Lấy ý kiến thứ hai về một thiết kế

```text
nhờ /arena cho ý kiến thứ hai về thread này và cách tiếp cận của chúng ta
```

Thiết kế hiện tại của bạn trở thành một ứng viên giữa nhiều ứng viên, và phần tổng hợp cho bạn biết panel đã tìm ra thứ gì tốt hơn hay xác nhận những gì bạn đã có. Nó tốn rất ít so với một thiết kế đắt đỏ để đảo ngược.

## Kiểm tra các lát cắt độc lập song song

```text
/swarm kiểm tra mọi package trong packages/ với check.sh của nó. mỗi package một worker. một báo cáo.
```

Mỗi worker sở hữu một package. Cha chờ mọi lát cắt và trả về một báo cáo `PASS`, `ISSUES`, hoặc `BLOCKED` thay vì đống output thô của các worker.

## Review một branch với thái độ hoài nghi

```text
/interrogate toàn bộ branch, nhưng với thái độ hoài nghi. chưa thay đổi gì cả. không bắt bẻ vặt trừ khi đó là bug hoặc hồi quy hành vi thật.
```

Các điều kiện kèm theo làm việc thật. "chưa thay đổi gì cả" giữ nó ở chế độ chỉ đọc, và quy tắc về bắt bẻ vặt lọc trước nhiễu để các phát hiện đã kiểm chứng đáng thời gian của bạn.

## Sửa bug thông qua một test thất bại

```text
/poteto-mode tái hiện lần ghi trùng lặp trước. nếu có đường test rẻ, /tdd nó. rồi sửa và chạy lại.
```

"nếu có đường test rẻ" là quan trọng. Ép một test qua các mock dễ vỡ chứng minh được ít hơn chạy lệnh thật, và playbook được phép nói vậy.

## Tái hiện và sửa một báo cáo kèm bằng chứng

```text
/poteto-mode tái hiện lỗi này với /verify-<app>. nếu nó tái hiện trên main, sửa nó và cho tôi xem video làm bằng chứng.
```

"nếu nó tái hiện trên main" cho phép lượt chạy dừng sớm khi bug đã không còn. Video cho phép bạn kiểm tra bản sửa trước khi đọc diff.

## Chứng minh một thuộc tính mà test hiếm khi chạm tới

```text
/create-formal-verification-skill retry queue. một message không bao giờ được gửi hai lần.
```

Bạn nhận được một thuộc tính được kiểm tra trong mọi trường hợp trong một phạm vi đã nêu, một phản ví dụ theo thuật ngữ code của bạn nếu code đã phá vỡ nó, và một skill của dự án mà agent tiếp theo chạy trên mọi thay đổi đối với code đó.

## Thẩm định một con số trước khi đăng nó

```text
/benchmark-checklist thẩm định mức tăng tốc 40% này trước khi nó vào mô tả pr
```

Bạn nhận được nhanh hơn, chậm hơn, không có khác biệt đo được, hoặc chưa kết luận được, kèm số lượt chạy, khoảng biến thiên, và cái giới hạn con số.

## Thôi sửa cùng một lỗi

```text
/correct agent cứ thêm config flag mới mà không đăng ký chúng trong schema
```

Bản sửa land vào repo dưới dạng kiến trúc, một type, một lint, hoặc một test, để agent tiếp theo không thể mắc lỗi đó.

## Hỏi cách làm mà không bắt đầu công việc

```text
/poteto-help làm sao để poteto-mode luôn bật ở mọi lượt?
```

Bạn nhận được một câu trả lời, một prompt để gửi, và một link đến nguồn. Không có gì chạy cho đến khi bạn gửi prompt đó.

## Giữ một lượt chạy trung thực khi bạn đi vắng

```text
tôi đi ngủ đây, cứ tự chủ làm tiếp đến khi mọi fixture đều pass. đừng dừng lại. giữ một nhật ký quyết định để tôi kiểm toán vào buổi sáng.
```

Hợp đồng đầy đủ nằm ở [trang qua đêm](./07-overnight.md). Dạng ngắn dùng được khi task và điều kiện hoàn thành đã có sẵn trong cuộc trò chuyện.

## Chuyển hướng một lượt chạy đang trôi dạt

Các prompt lái chỉ một dòng:

```text
tôi đã nói mục tiêu là tái hiện. tôi chưa yêu cầu sửa.
```

```text
áp dụng prove it works. cho tôi xem output thật, không phải build log.
```

```text
/unslop cái đó, không dùng gạch ngang dài
```

Bạn hiếm khi cần nhiều lời hơn. Bạn cần đúng cái tên, và [trang nguyên tắc](./08-principles.md) là bộ từ vựng.

## Nhận câu trả lời bằng lời đơn giản

```text
/bro
```

Đó là toàn bộ prompt. [`/bro`](../../skills/bro/SKILL.md) nhắc lại tin nhắn cuối như một người nói chuyện với người khác, không thuật ngữ, ngắn hơn. Dùng nó khi một câu trả lời đầy đủ về kỹ thuật mà bạn vẫn không biết nó nói gì.

## Cập nhật một chat bạn để chạy

```text
/ketchup
```

[`/ketchup`](../../skills/ketchup/SKILL.md) cho bạn biết bằng lời đơn giản những gì đã thay đổi kể từ tin nhắn cuối của bạn, rồi liệt kê từng quyết định đang chờ bạn kèm lựa chọn, bằng chứng và rủi ro. Nó không thay đổi gì trong lúc báo cáo.

Để xem bản cập nhật thay vì đọc, hãy chạy [`/ketchup-video`](../../skills/ketchup-video/SKILL.md). Nó cho thấy những gì đã xảy ra trong một video ngắn gồm các slide có phụ đề, và liệt kê các quyết định đang chờ bạn dưới dạng văn bản bên dưới.

## Các cạm bẫy

- **Liệt kê skill trong prompt.** "dùng /architect rồi /arena rồi /interrogate" đảo thứ tự các bước mà playbook đã sắp xếp. Hãy nêu mục tiêu và ràng buộc. Chỉ gọi tên một skill để ghi đè một mặc định.
- **Một điều kiện hoàn thành mơ hồ.** "làm cho nó tốt hơn" không cho `/loop` thứ gì để kiểm tra. Hãy đưa ra một lệnh hoặc artifact có thể pass hoặc fail.
- **Mở đầu bằng giả thuyết của bạn về nguyên nhân.** Agent tìm kiếm ở bất cứ đâu bạn đã chỉ. Hãy yêu cầu nó nhắc lại vấn đề trước, rồi mới chia sẻ linh cảm của bạn.
- **Nhận thiết kế đầu tiên.** Một lần thử khóa chặt hình dạng đầu tiên mà model nghĩ ra. Hãy yêu cầu prototype hoặc `/architect` và chọn dựa trên bằng chứng.
- **Trau chuốt một kế hoạch trừu tượng.** Review đối kháng một kế hoạch không có code phía sau sẽ bịa ra những rủi ro không bao giờ xảy ra. Hãy giải quyết các câu hỏi mở bằng prototype, rồi review những gì đã được xây.
- **Nhiều agent song song trong một worktree.** Chúng ghi đè lên nhau, và không ai biết agent nào đã thay đổi cái gì. Hãy chạy chúng dưới dạng cloud agent, hoặc nói "mỗi lần thử một worktree riêng".
- **Chạy vòng lặp trước khi tin vòng lặp.** Một vòng lặp không thể tự kiểm chứng công việc của mình chỉ làm công việc chưa kiểm tra nhanh hơn. Hãy làm cho verification skill hoạt động trước.
- **Tin một con số chưa được thẩm định.** Một cache đã ấm hoặc một đường code bị bỏ qua có thể làm giả một mức tăng tốc. Hãy chạy `/benchmark-checklist` trước khi con số đi đâu.
- **Tự tay sửa cùng một lỗi.** Một lời sửa trong chat giúp một lượt chạy. `/correct` sửa repo để không lượt chạy nào sau đó lặp lại nó.
- **Dùng `/arena` để bao phủ.** `/arena` lặp lại một brief thiết kế hoặc code, rồi chọn một base và ghép những phần tốt nhất. `/swarm` phân chia các lát cắt hoặc các nhánh đua đã khai báo và gộp thành một báo cáo.
- **Chấp nhận mọi comment review.** Cả bot và người đều ghi phát hiện thật lẫn nhiễu trong cùng một danh sách. `/interrogate` chỉ giữ những phát hiện mà một lần chạy lại chứng minh được và liệt kê những gì nó đã loại bỏ cùng lý do, và bạn có thể ghi đè theo cả hai chiều.
- **Coi `auto` là một model slug.** `auto` và `inherit-parent` nghĩa là "bỏ trống trường model để subagent thừa hưởng model của chat cha." [Cài đặt](./01-setup.md) đề cập các vai trò.
- **Báo thành công dựa trên một bản build xanh.** Một bản build chứng minh nó compile được. Hãy yêu cầu lệnh, luồng, giá trị đã lưu, hoặc profile thật, và chờ đợi bằng chứng trong câu trả lời.
- **Tự tay viết một `SKILL.md`.** Hãy đưa nó qua [playbook Authoring or modifying a skill](../../skills/poteto-mode/playbooks/authoring-a-skill.md) để việc validate và review diễn ra.

Đó là toàn bộ hướng dẫn. Nếu bạn đã đọc lướt qua, hãy quay lại [cài đặt](./01-setup.md) và chạy một task thật. Thói quen bám lại từ việc dùng, không phải từ việc đọc.

Quay lại [mục lục hướng dẫn](./README.md).
