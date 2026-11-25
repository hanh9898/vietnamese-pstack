# Phân loại Bugbot

Dùng tài liệu tham khảo này khi playbook Babysit (`../playbooks/babysit.md`) xử lý comment của Bugbot hoặc của các công cụ review tự động. Mục tiêu không phải là mặc định phớt lờ Bugbot. Mục tiêu là thôi coi mọi comment là một thay đổi code bắt buộc.

## Rubric quyết định

Phân loại từng thread Bugbot trước khi hành động:

- `fix`: Comment chỉ ra một vấn đề có thể xảy ra về tính đúng đắn, bảo mật, quyền riêng tư, mất dữ liệu, auth, billing, migration, idempotency, race, hoặc hành vi đã ship. Sửa nó ở PR sở hữu thấp nhất, rồi trả lời kèm commit SHA và resolve thread.
- `dismiss`: Comment khớp với một mẫu nhiễu rủi ro thấp đã được ghi lại, và code/context hiện tại chứng minh mối lo ngại đó không cần thay đổi code. Trả lời với một lý do ngắn và resolve thread.
- `ask`: Comment mới lạ, mức độ nghiêm trọng cao, liên quan đến bảo mật/quyền riêng tư/dữ liệu, hoặc mơ hồ. Hỏi người dùng thay vì đoán.

Khi còn nghi ngờ, hãy hỏi. Bỏ qua một comment nhiễu về chất lượng code thì rẻ; bỏ qua một bug thật về dữ liệu hoặc bảo mật thì không.

## Định dạng mẫu đã học

Thêm các mẫu trong tương lai theo hình dạng này:

```markdown
### <tên mẫu ngắn>

- Confidence: candidate | recurring | strong
- Bỏ qua khi: <các điều kiện phải đúng>
- Không bỏ qua khi: <các ranh giới rủi ro>
- Tín hiệu ví dụ: <cụm từ hoặc context code nhận diện mẫu>
- Nguồn: <URL PR/comment hoặc ghi chú lịch sử ngắn>
```

Dùng `candidate` cho một hoặc hai ví dụ. Dùng `recurring` sau nhiều lần gạt bỏ thật. Chỉ dùng `strong` khi mẫu hẹp, đã được kiểm chứng nhiều lần, và rủi ro thấp.

## Các ứng viên bỏ qua lặp lại

### Thay đổi trực quan có chủ đích ở UI hoặc design system

- Confidence: candidate
- Bỏ qua khi: Mô tả PR, screenshot, design review, hoặc code lân cận làm rõ thay đổi trực quan, và comment Bugbot chỉ nhắc lại rằng một mặc định trực quan dùng chung đã thay đổi.
- Không bỏ qua khi: Comment chỉ ra accessibility, khả năng hiển thị focus, điều hướng bằng bàn phím, độ tương phản màu, hoặc một hợp đồng API của component mà PR không cố ý thay đổi.
- Tín hiệu ví dụ: Comment về focus outline, kích thước nút, khoảng cách, hoặc mặc định trực quan của component dùng chung mà chủ sở hữu trả lời "intentional" hoặc "intended".

### Việc dùng ở upstack hoặc cục bộ trong stack mà Bugbot không thấy

- Confidence: candidate
- Bỏ qua khi: Bugbot gắn cờ một export, component, helper, hoặc file là không được dùng, và danh sách PR cùng diff của forge đang dùng, diff của phần stack phía trên, hoặc context của PR cho thấy nó được dùng bởi một PR sau trong stack.
- Không bỏ qua khi: PR hiện tại không thuộc một stack, symbol là API công khai, hoặc việc được cho là dùng ở upstack không thể kiểm chứng.
- Tín hiệu ví dụ: "Exported component is never used" kèm một câu trả lời của người như "used upstack".

### Trùng lặp tạm thời trong lúc cài đặt song song

- Confidence: candidate
- Bỏ qua khi: PR cố ý nhân bản một lượng nhỏ code để giữ một đường mới song song với một đường cũ đang bị xóa, thay thế, hoặc đang được chứng minh.
- Không bỏ qua khi: Code bị nhân bản thay đổi bảo mật, billing, truy cập dữ liệu, hành vi API, hoặc một abstraction dùng chung lâu dài rõ ràng sẽ giảm rủi ro.
- Tín hiệu ví dụ: "Significant duplication" hoặc "duplicated validation logic" mà chủ sở hữu giải thích rằng đường cũ sẽ bị xóa hoặc logic trùng lặp cố ý để cục bộ.

### Bất biến có sẵn của framework hoặc component đã bao phủ cảnh báo

- Confidence: candidate
- Bỏ qua khi: Mối lo ngại đã được đảm bảo bởi một component dùng chung, hợp đồng framework, bất biến về type, hoặc một nguồn sự thật duy nhất hiển thị trong diff hiện tại hoặc code lân cận.
- Không bỏ qua khi: Bất biến được giả định nhưng không được bắt buộc, phụ thuộc vào thời điểm, hoặc vượt qua ranh giới async/state nơi các giá trị có thể lệch nhau.
- Tín hiệu ví dụ: Comment về việc thiếu max-height trên một popover bên trong khi popover dùng chung đã bắt buộc giới hạn viewport, hoặc giá trị nullable khi giá trị được kiểm tra cục bộ và giá trị được truyền có cùng nguồn.

### Follow-up do chủ sở hữu tuyên bố hoặc dọn dẹp được hoãn lại

- Confidence: candidate
- Bỏ qua khi: Chủ sở hữu PR nói rõ vấn đề là một follow-up đã biết, hành vi không bị PR hiện tại làm tệ hơn, và comment không thuộc khu vực rủi ro cao.
- Không bỏ qua khi: Agent đang hành động mà không có ý kiến của chủ sở hữu, vấn đề là hành vi sản phẩm mức độ trung bình/cao, hoặc việc hoãn lại sẽ merge một hồi quy mới.
- Tín hiệu ví dụ: "I'll worry about that later" hoặc "we'll delete this eventually".

### Comment tự rút lại hoặc nói rõ là dương tính giả theo rule

- Confidence: recurring
- Bỏ qua khi: Nội dung comment hoặc một câu trả lời sau đó của Bugbot nói rõ phát hiện đã được rút lại, đã tuân thủ, hoặc là dương tính giả, và agent có thể kiểm chứng rule liên quan tại chỗ.
- Không bỏ qua khi: Bằng chứng duy nhất là một người nói "false positive" về một vấn đề rủi ro cao mà không giải thích.
- Tín hiệu ví dụ: Một comment về rule đặt tên file mà nội dung nói file đó đã tuân thủ.

## Mặc định là hỏi

Đừng tự động bỏ qua các hạng mục này, kể cả khi một PR trước đó đã gạt bỏ điều gì đó tương tự:

- Các phát hiện về bảo mật, quyền riêng tư, auth, billing, lưu giữ dữ liệu, dữ liệu huấn luyện, và ranh giới phân quyền.
- Các phát hiện mức độ nghiêm trọng cao.
- Các phát hiện về migration, schema, idempotency, đồng thời, và hành vi xuyên hệ thống.
- Các comment mà bản sửa được đề xuất nhỏ và rõ ràng giảm rủi ro mà không thay đổi ý định sản phẩm.

Dữ liệu lịch sử cho thấy con người đôi khi gạt bỏ các comment về bảo mật/luồng dữ liệu. Hãy coi đó là quyết định theo phán đoán của chủ sở hữu, không phải quy tắc bỏ qua cho cả nhóm.

## Các bài học ứng viên từ các lần babysit gần đây

Thêm các bài học ứng viên mới vào đây trong hoặc sau khi babysit khi chúng có vẻ hữu ích cho cả nhóm nhưng chưa chín muồi. Ưu tiên nâng các ứng viên lặp lại lên phần ở trên khi vài PR đã xác nhận mẫu đó.

### Tự cài đặt lại hành vi gốc của trình duyệt

- Confidence: candidate
- Bỏ qua khi: Gần như không bao giờ. Khi một diff thay hành vi gốc của trình duyệt bằng một bản tương đương thủ công (native sticky → bản sao định vị bằng JS, native scroll targeting → chuyển tiếp sự kiện wheel/touch, che khuất theo thứ tự paint → mask/clip-path), các phát hiện lỗi logic của Bugbot đối với code đó luôn hợp lệ.
- Không bỏ qua khi: Phát hiện liên quan đến lỗ hổng trong chuyển tiếp sự kiện (wheel deltaMode, touch pan, scroll-chaining ở mép, tap slop), sự khác biệt hit-testing của mask/clip, hoặc race về thời điểm giữa observer và state của React trong code như vậy. Mặc định là sửa.
- Tín hiệu ví dụ: "masks do not affect hit-testing", "overlay blocks wheel scroll", "ignores deltaMode", "runs in the IntersectionObserver callback before React applies state".
- Nguồn: một PR về che khuất sticky: sáu lượt Bugbot, khoảng mười tám phát hiện, cái nào cũng được sửa thay vì gạt bỏ.

### Khẳng định contract test bị lệch có thể kiểm chứng rẻ — hãy chạy test trước

- Confidence: candidate
- Bỏ qua khi: Không bao giờ bỏ qua chính việc kiểm chứng; nó chỉ tốn một lệnh. Khi một PR
  ship một contract test ghim văn bản giao thức hoặc tài liệu (regex trên
  một SKILL.md, snapshot câu chữ tài liệu), và Bugbot khẳng định "test không còn
  khớp với tài liệu" (hoặc ngược lại), hãy chạy test đó trên đầu PR trước khi
  phân loại. Một lượt chạy đỏ xác nhận khẳng định bằng thực nghiệm; một lượt chạy xanh là một
  phản chứng cụ thể cho câu trả lời gạt bỏ.
- Không bỏ qua khi: n/a — đây là một lối tắt kiểm chứng, không phải một mẫu
  gạt bỏ. Lưu ý rằng các heuristic nghiêng về gạt bỏ ở lượt lặp lại sẽ bắn trượt ở đây:
  các test ghim văn bản bị lệch chính VÌ các vòng sửa trước đó đã sửa văn bản.
- Tín hiệu ví dụ: "Contract test omits the pre-fix wait" trên một PR mà các commit
  sửa trước đó đã đổi câu chữ đoạn văn được ghim; lượt chạy test trên đầu PR thất bại đúng
  ở assertion được trích dẫn.
- Nguồn: một PR ghim văn bản với tám lượt Bugbot; khẳng định là thật ở
  lượt 7 dù mọi lượt trước đó đều đã được sửa và resolve.

### Phát hiện cũ của security review đã được sửa sau đó trong cùng PR

- Confidence: candidate
- Bỏ qua khi: Một security review dạng agent (hoặc tương tự) khẳng định thiếu một lệnh gọi authz/validation, và đầu PR hiện tại rõ ràng đã có đúng cổng đó (kèm test), thường được thêm trong một commit gia cố sau khi review chạy.
- Không bỏ qua khi: Helper được trích dẫn là no-op đối với principal đang bàn, phép kiểm tra chạy sau tác dụng phụ mà nó bảo vệ, hoặc thiếu độ bao phủ cho principal được nêu.
- Tín hiệu ví dụ: Một phát hiện HIGH "missing authorization check" trong khi đúng guard đó đã được gọi trước tác dụng phụ trên đầu PR.
- Nguồn: một PR về webhook endpoint có commit gia cố ra đời sau lượt review.

### Nới rộng một điều kiện lỗi cố ý hẹp sẽ che giấu lỗi thật

- Confidence: candidate
- Bỏ qua khi: Phát hiện yêu cầu nới rộng một điều kiện lỗi hẹp (một
  `errno` cụ thể, mã lỗi, hoặc lớp trạng thái) thành bắt tất cả, và sự hẹp đó
  mã hóa một khác biệt thật. Hình dạng chuẩn mực là một fallback cho dependency
  được kích hoạt bởi `ENOENT`: "binary chưa được cài" là một tình huống khác với
  "lệnh đã chạy và thất bại". Thử lại với mọi exit khác không sẽ chạy lại một
  thất bại hợp lệ (không tìm thấy, auth hết hạn, mạng) qua fallback
  rồi báo lỗi của fallback, che giấu lỗi thật.
- Không bỏ qua khi: Điều kiện hẹp bỏ sót một trường hợp CÙNG loại
  (một errno "binary không dùng được" khác như `EACCES`, một thất bại khác ở tầng
  transport), đường chưa được xử lý làm mất dữ liệu hoặc để lại state dở dang, hoặc lần thử lại
  là idempotent VÀ lỗi gốc vẫn được nêu ra.
- Tín hiệu ví dụ: "only retries when X fails with ENOENT … never tries the
  fallback even when a working Y exists", trỏ vào code có fallback
  tồn tại cho một dependency bị thiếu chứ không phải một thao tác thất bại.
- Nguồn: một PR đổi tên CLI có fallback tồn tại cho một binary bị thiếu chứ không phải
  một lệnh thất bại.
