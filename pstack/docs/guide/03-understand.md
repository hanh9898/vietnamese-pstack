# Hiểu code trước khi thay đổi nó

Sửa code bạn không hiểu là cách những lỗi hồi quy khó thấy lọt ra production, và điều đó đúng với agent cũng như với bạn. Agent thường thất bại theo một trong hai cách. Chúng hiểu sai điều bạn muốn, hoặc chúng không có đủ context để làm đúng việc. [Prompt nên chứa gì](./02-poteto-mode.md#prompt-nên-chứa-gì) xử lý cách thứ nhất. Trang này xử lý cách thứ hai.

pstack cho bạn bốn lối vào. `/how` giải thích code hiện đang làm gì. `/why` đào ra lý do nó có hình dạng như vậy. `/teach` hòa cả hai thành một lời giải thích. `/recall` dựng lại context gần đây của chính bạn về một chủ đề. Mỗi cái cũng buộc agent tự giải thích bằng lời mà bạn có thể kiểm tra. Đó là cách bạn giám sát một agent có thể hiểu code rõ hơn bạn.

![Một thám tử xem xét bản thiết kế máy móc bằng kính lúp trong khi các robot mang hồ sơ vụ án đến; bảng bằng chứng phía sau cô nối các manh mối dưới /how và /why.](./images/understanding.jpg)

## Bắt đầu bằng một cuộc điều tra chỉ đọc

Khi nguyên nhân chưa rõ, hãy yêu cầu phát hiện, không phải bản sửa:

```text
/poteto-mode điều tra tại sao các background job bị timeout vài tiếng một lần. cho tôi biết những gì ta đã biết, dữ liệu bạn đã dùng, và các giả thuyết tốt nhất của bạn. chưa thay đổi code nào.
```

"chưa thay đổi code nào" chuyển việc này sang [playbook Investigation](../../skills/poteto-mode/playbooks/investigation.md). Nó lần theo code, thêm `/why` cho các câu hỏi về động cơ, và trả về một lời giải thích có trích dẫn. Với một lựa chọn giữa các phương án, nó trả về một đề xuất kèm bảng đánh đổi. Hỏi "dữ liệu bạn đã dùng" buộc agent tách bằng chứng khỏi phỏng đoán. Khi các phát hiện chỉ ra một bản sửa, hãy bắt đầu bản sửa đó như một task mới.

## Lần theo hành vi với `/how`

```text
/how chúng ta khử trùng lặp thông báo thế nào? có bị n+1 khi tra cứu subscriber không?
```

Hãy hỏi đúng câu hỏi bạn đang có. [`/how`](../../skills/how/SKILL.md) đọc code và trả lời ở mức một kỹ sư senior đang hướng dẫn bạn làm quen subsystem, với luồng runtime, các type chính, và những phần không hiển nhiên. Nó khởi chạy một subagent chỉ đọc để khám phá code và viết lời giải thích.

## Đào lịch sử với `/why`

```text
/why giới hạn retry được đặt là năm? lý do đó còn đúng không?
```

[`/why`](../../skills/why/SKILL.md) trả lời từ hồ sơ lịch sử, không phải từ code. Nó đọc các commit và thảo luận PR đã tạo ra đoạn code đó và từng thay đổi sau đó, và xem các nguồn khác khi dấu vết đó mỏng. Câu trả lời trích dẫn những gì tác giả đã viết, đánh dấu suy luận của agent là suy luận, và nói rõ hồ sơ không trả lời được điều gì, vì "không ai ghi lại lý do" tự nó cũng là một câu trả lời.

Hai skill này kết hợp với nhau rất tự nhiên. `làm why trước rồi how` là một prompt tốt khi bạn nghi rằng lịch sử giải thích được mớ hỗn độn.

## Thật sự hiểu nó với `/teach`

```text
/teach tôi cách PR này thay đổi retry. thuyết phục tôi rằng nó sửa nguyên nhân chứ không phải triệu chứng.
```

[`/teach`](../../skills/teach/SKILL.md) dành cho khi một bản tóm tắt là không đủ. Nó chạy `/how` và `/why`, với thay đổi nhỏ có thể chỉ một trong hai, và đan các phát hiện thành một lời giải thích đơn giản được xây dần qua từng sơ đồ. Cách đặt vấn đề "thuyết phục tôi" rất đáng dùng lại. Nó biến lời giải thích thành một lập luận bạn có thể kiểm tra thay vì một chuyến tham quan.

Nó cũng hoạt động với chính các lựa chọn của agent:

```text
/teach tôi tại sao bạn cài đặt theo cách này mà không dùng queue. bạn đã đánh đổi những gì, và tại sao?
```

Việc dạy giúp ích cho agent nhiều như cho bạn. Một agent phải giải thích công việc của mình thì phải đọc code và chống lưng mỗi khẳng định bằng bằng chứng, thay vì nói một cách tự tin rồi đi tiếp.

## Dựng lại context của chính bạn với `/recall`

```text
/recall cập nhật cho tôi về công việc export tuần trước
```

[`/recall`](../../skills/recall/SKILL.md) đào các chat gần đây của chính bạn cùng hồ sơ chung (issue, các bản sửa trước, những lỗi vẫn đang phát sinh) và trả về một bản tóm tắt về tình hình hiện tại và việc tiếp theo. Các chat cũ của bạn chứa context mà một agent mới không có, nên hãy bắt đầu công việc mới về một chủ đề cũ bằng cách nạp nó trước, rồi mới đưa đầu vào mới:

```text
/recall công việc của tôi về virtualized list hôm qua, rồi đọc báo cáo bug này.
```

Nếu bạn muốn tiếp tục một chat cụ thể, đó là playbook Session pickup bên dưới, không phải `/recall`.

## Tiếp quản công việc trước đó với Session pickup

Khi một agent khác (hoặc chính bạn, tuần trước) để lại một branch đang làm dở:

```text
/poteto-mode tiếp quản branch này. đọc nhật ký quyết định, xác định những gì đã xong, và tiếp tục từ đó. đừng làm lại việc đã xong.
```

[Playbook Session pickup](../../skills/poteto-mode/playbooks/session-pickup.md) coi dấu vết trước đó là nguồn chính thống. Nó dựng lại trạng thái branch và các quyết định, gọi tên điểm tiếp tục, và kiểm chứng các khẳng định được thừa hưởng so với mục tiêu ban đầu thay vì suy ra lại mọi thứ từ đầu.

**Cạm bẫy:** đừng bỏ qua các skill trong trang này vì "dù sao agent cũng sẽ đọc code." Một agent bắt đầu sửa khi chưa có mô hình đã được lần theo thường sửa triệu chứng ở chỗ hợp lý đầu tiên. `/how` trước thì rẻ hơn bug thứ hai.

Tiếp theo: [Thiết kế thay đổi](./04-design.md).
