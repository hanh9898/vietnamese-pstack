# Biến nó thành của bạn

poteto-mode là phong cách của một người. Các playbook, cơ chế định tuyến và vai trò model bên dưới nó hoạt động tốt không kém với phong cách của bạn. Trang này đề cập việc sinh một mode cá nhân, ghi lại bài học từ một session, sửa repo để agent thôi lặp lại lỗi, viết một skill tập trung, và test một thay đổi skill trước khi tin nó.

Hãy bắt đầu nhỏ hơn bạn nghĩ. Bạn không cần nhiều skill ngay ngày đầu, thậm chí không cần cả plugin này. Hãy viết prompt đơn giản, quan sát chỗ agent thất bại, và thêm một skill hoặc một phép kiểm tra khi cùng một lỗi xuất hiện hai lần.

## Sinh mode của riêng bạn với `/automate-me`

```text
/automate-me
```

Bạn không mô tả phong cách của mình, vì [`/automate-me`](../../skills/automate-me/SKILL.md) đọc nó ra từ lịch sử của bạn. Nó đào các transcript gần đây của bạn trong workspace đang hoạt động để tìm các sở thích lặp lại, về cách bạn thích câu trả lời, giao việc, kiểm chứng, code, văn xuôi và quy trình, rồi hỏi bạn những mẫu nào thật sự là bạn. Nó soạn `.cursor/skills/<your-name>-mode/SKILL.md` thông qua luồng `create-skill` có sẵn của Cursor, chạy bản nháp qua [`/unslop`](../../skills/unslop/SKILL.md), và mở một PR từ một worktree để bạn review nó như mọi thay đổi khác.

Chạy lại nó bất cứ khi nào thói quen của bạn thay đổi:

```text
/automate-me cập nhật mode skill của tôi với mọi thứ kể từ lần sửa cuối của nó
```

Chế độ cập nhật chỉ đào lịch sử kể từ lần skill thay đổi gần nhất. Nó giữ các quy tắc bạn chưa phản bác, sửa lại những quy tắc có bằng chứng mới, và chỉ thêm phần mới cho các mẫu mới.

## Ghi lại bài học của một session với `/reflect`

Ngay sau một task đã dạy bạn điều gì đó, hãy chạy:

```text
/reflect việc đó tốn quá nhiều thời gian. ghi lại những gì ta đã học để lượt chạy tiếp theo không lặp lại.
```

[`/reflect`](../../skills/reflect/SKILL.md) đọc transcript, chỉ giữ những bài học sẽ thay đổi công việc của một agent trong tương lai, và xếp các đề xuất vào `Accepted`, `Rejected`, và `Backlog`. Nó chờ bạn chấp thuận trước khi thay đổi bất kỳ skill nào. Chỉ chấp thuận một đề xuất nếu nó sẽ thay đổi một quyết định trong tương lai. Một session kỳ quặc là một giai thoại, không phải một quy tắc.

## Sửa môi trường bằng `/correct`

Khi bạn sửa agent vì cùng một lỗi hết lần này đến lần khác, bản sửa thuộc về repo, không thuộc về prompt tiếp theo của bạn. Xếp hạng các lựa chọn theo mức độ bền vững:

1. Làm cho lỗi không thể xảy ra bằng kiến trúc hoặc một cấu trúc dữ liệu tốt hơn.
2. Chặn nó bằng type, hoặc bằng một lint hay CI check có thông báo lỗi gọi tên cách sửa.
3. Bắt nó bằng một test.
4. Viết nó ra thành tài liệu hoặc quy tắc cho agent. Không có gì thất bại khi một agent bỏ qua một quy tắc, nên cách này đứng cuối.

Review của con người không có trong danh sách. Một reviewer phải bắt cùng một lỗi trên mọi PR chính là vấn đề mà cách này sửa. [`/correct`](../../skills/correct/SKILL.md) làm việc đó:

```text
/correct agent cứ gọi trực tiếp database client thay vì đi qua repository layer
```

Nó đọc các commit gần đây, các lần revert, comment review, và các comment giải thích cách lách, rồi nhóm các lỗi thành từng loại. Một loại được tính khi nó đã xảy ra hai lần. Nó sửa các loại thường gặp nhất, mỗi loại một commit, ở mức cao nhất có hiệu quả, và chứng minh mỗi phép kiểm tra mới thất bại trên một lỗi thật trong quá khứ. Nó cũng giữ một bảng trong file hướng dẫn cho agent ghép mỗi quy tắc với thứ thực thi nó, nên một quy tắc không có gì thực thi sẽ hiện ra như một lỗi lặp lại. Câu trả lời liệt kê từng loại kèm bằng chứng, mức đã chọn, và lý do một mức cao hơn không hiệu quả.

Chạy nó không có đối số và nó tự tìm các loại lỗi từ lịch sử. `/reflect` và `/correct` chia nhau công việc. `/reflect` cải thiện skill từ một session. `/correct` thay đổi repo để một loại lỗi không thể quay lại. Kết hợp nó với `/architect` khi bản sửa là một ranh giới mới. [Chạy nhiều dự án song song](./07-overnight.md#chạy-nhiều-dự-án-song-song) có một prompt làm cả hai trên toàn bộ một repo.

## Viết một skill tập trung

Khi bạn đã biết rõ quy trình mình muốn ghi lại:

```text
/poteto-mode viết một skill để kiểm chứng database migration trong repo này
```

Viết một skill khớp với [playbook Authoring or modifying a skill](../../skills/poteto-mode/playbooks/authoring-a-skill.md), playbook này đi qua `create-skill` có sẵn của Cursor, validate frontmatter và link, và ship kết quả qua playbook Opening a PR. Văn xuôi dành cho agent có tiêu chuẩn cao hơn văn xuôi dành cho người, vì một câu vô ích sẽ trở thành một chỉ dẫn mà agent nào đó trong tương lai làm theo. Hãy để playbook giữ tiêu chuẩn đó thay vì tự tay viết một `SKILL.md`.

Hai trường hợp đặc biệt có bộ sinh riêng. Một skill phải điều khiển ứng dụng của bạn và chứng minh hành vi là một verification skill, nên hãy dùng [`/create-verification-skill`](../../skills/create-verification-skill/SKILL.md) và [`/maintain-verification-skill`](../../skills/maintain-verification-skill/SKILL.md) thay thế. Một skill kiểm tra một thuộc tính của code bằng model checker, một chứng minh, hoặc một verifier khác là một formal verification skill, nên hãy dùng [`/create-formal-verification-skill`](../../skills/create-formal-verification-skill/SKILL.md) và [`/maintain-formal-verification-skill`](../../skills/maintain-formal-verification-skill/SKILL.md). [Kiểm chứng và ship](./06-verify-and-ship.md#chứng-minh-một-thuộc-tính-bằng-formal-verification-skill) đề cập cả hai loại.

## Viết tài liệu theo chuẩn với `/technical-writing`

Skill không phải là văn xuôi duy nhất bạn ship. Với tài liệu, RFC, readme, mô tả PR và commit message:

```text
/technical-writing review các thay đổi trong readme
```

[`/technical-writing`](../../skills/technical-writing/SKILL.md) áp dụng một tiêu chuẩn nhiều lớp. Mục tiêu của nó là văn xuôi mà một kỹ sư mệt mỏi hiểu ngay lần đọc đầu. Nó chọn chế độ của tài liệu trước (tutorial, how-to, reference, hoặc explanation), rồi làm từng câu một: ai làm gì, mỗi câu một ý, không có gì đọc được theo hai cách. Dùng nó để review những gì bạn hoặc một agent vừa viết, hoặc gọi tên nó ngay từ đầu khi bạn yêu cầu một tài liệu.

## Test mù một thay đổi skill

Một chỉnh sửa skill ảnh hưởng đến mọi session trong tương lai, nên hãy test nó như một thí nghiệm đúng nghĩa. Điều tương tự áp dụng khi dùng skill của người khác. Hãy kiểm tra nó làm agent tốt hơn trên công việc của bạn trước khi giữ lại.

```text
/poteto-mode chạy playbook eval trên thay đổi skill này. cùng một task cho cả hai biến thể, các ứng viên không được biết.
```

Khi một skill cứ trượt và bạn biết nó nên làm gì, hãy thay đổi và test nó trong cùng một task:

```text
/poteto-mode cập nhật review skill để nó gắn cờ các migration bị thiếu, và eval thay đổi đó.
```

Yêu cầu eval ngay từ đầu giữ cho chỉnh sửa trung thực. Một bản sửa viết ra từ một session tồi thường overfit với session đó, và qua nhiều lần sửa skill sẽ trôi dạt. Eval bắt được sự trôi dạt trước khi nó được ship.

[Playbook Eval](../../skills/poteto-mode/playbooks/eval.md) được xây quanh một kiểu thất bại, hiệu ứng người quan sát. Một agent biết mình đang bị đánh giá sẽ hành xử khác đi. Nên các agent ứng viên nhận một task trông tự nhiên trong các thư mục đã được làm sạch, không bao giờ thấy chữ "eval" hay "candidate", và không bao giờ biết sự tồn tại của nhau. Một giám khảo chấm mọi output dưới các nhãn trung lập, và việc đi theo chuỗi chỉ dẫn được chấm dựa trên những file mỗi ứng viên thật sự đã đọc, không phải những gì nó tuyên bố.

Hãy tự đọc mọi output trước khi chấp nhận phán quyết. Nếu bạn không đồng ý với giám khảo, hãy nghi ngờ rubric trước khi nghi ngờ phán đoán của mình.

## Xây UI cho bot với `/make-bot-ui`

Một skill tình huống dành cho người dùng Grok Bot. [`/make-bot-ui`](../../skills/make-bot-ui/SKILL.md) xây một trang nhỏ có các nút đánh thức một bot qua một routine webhook. Ví dụ, bạn có thể vuốt qua một hàng đợi review và mỗi lần vuốt yêu cầu bot hành động trên mục đó. Một server trên máy của bạn giữ sender key của webhook, nên key không bao giờ đến được browser hay chat. Skill cũng đề cập việc công khai trang trên Tailscale.

**Cạm bẫy:** đừng sửa một skill giữa chừng task chỉ vì nó đang hoạt động sai. Hãy sửa nó trong PR riêng và giữ cho task tiếp tục. Một chỉnh sửa skill được ship lẫn vào công việc feature thì vô hình với review và không thể đánh giá được.

Tiếp theo: [Công thức và cạm bẫy](./10-recipes-and-pitfalls.md).
