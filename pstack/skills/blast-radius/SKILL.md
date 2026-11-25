---
name: blast-radius
description: "Tìm những gì một thay đổi có thể làm hỏng ở chỗ khác trước khi nó được ship, vượt ra ngoài diff, và chứng minh sự thật duy nhất khiến nó an toàn bằng cách chạy code thật thay vì viết ra. Dùng cho 'blast radius of X', 'what could this break' (hoặc 'thay đổi này có thể làm hỏng gì'), hoặc khi review một diff nhỏ mà bạn không tin."
disable-model-invocation: true
---

# Blast radius

Tìm những gì một thay đổi làm hỏng ở chỗ khác, trước khi nó được ship. Dùng cho "blast radius of X", "what could this break", hoặc khi review một diff nhỏ mà bạn chưa tin.

Đi kèm với `how` và `why`. `how` cho bạn biết code làm gì. `why` cho bạn biết tại sao nó có hình dạng như vậy. Blast radius cho bạn biết nó làm hỏng gì ở chỗ khác.

Liệt kê các caller không phải là công việc. Agent có thể grep chúng trong một giây. Công việc là những chỗ hỏng mà grep sẽ không cho bạn thấy.

## Đừng tin bài viết của chính bạn

Một bài viết blast radius nghe có vẻ đúng là vô giá trị. Nó đọc lên vẫn thuyết phục dù đúng hay không. Vậy nên đừng trả về bài viết. Tìm một hoặc hai sự thật mà toàn bộ phụ thuộc vào và chứng minh chúng bằng cách chạy code.

### Bạn chắc chắn đến đâu

Với mỗi sự thật mà sự an toàn của thay đổi phụ thuộc vào, hãy đưa nó xuống càng sâu trong danh sách này càng tốt khi còn rẻ, và nói nó dừng ở đâu.

1. Bạn nói vậy. Tự nó là vô giá trị.
2. Bạn chỉ vào dòng code. Một `file:line` thật, hoặc chính source của thư viện.
3. Bạn cho thấy trường hợp xấu không thể xảy ra. Bạn đi qua thất bại từng bước và nó không đến được.
4. Bạn đã chạy nó. Một script hoặc test gọi code thật và thất bại ầm ĩ nếu bạn sai.
5. Bạn đã tái hiện nó trong app đang chạy.

Bước 4 thường là một script nhỏ import cùng thư viện mà app ship và gọi chính xác hàm bạn đang lo lắng.

## Các bước

1. Đọc thay đổi. Diff, các symbol nó thêm, đổi, và xóa, và những gì giờ nó làm khác đi, bao gồm cả phần diff không nói rõ. Lấy PR và các commit của nó.
2. Tìm sự thật duy nhất khiến nó an toàn. Phần lớn các thay đổi trông có vẻ rủi ro đều an toàn nhờ một sự thật duy nhất, như "lệnh gọi này chỉ bỏ các mục cache vốn đã chết và không làm gì khác". Tìm sự thật đó. Nếu nó đứng vững, phần lớn các trường hợp rủi ro được gỡ bỏ cùng lúc. Dành thời gian ở đây, không phải cho một danh sách dài các khả năng.
3. Nhìn vào nơi grep dừng lại. Đọc source của thư viện bạn gọi, và kiểm tra phiên bản được ghim và mọi bản vá cục bộ. Xác định khi nào mọi thứ chạy: microtask, unmount và teardown, Solid so với React. Lần theo những gì tìm kiếm symbol bỏ sót: JSON mà một API trả về, một cột DB, một định dạng truyền tải, một ngôn ngữ khác đọc cùng những byte đó, một feature flag, code cách ba bước ở phía sau.
4. Trung thực về từng rủi ro. Cho nó một khả năng xảy ra thật và một cái giá thật nếu nó xảy ra. Giữ các rủi ro bạn đã xác nhận. Liệt kê riêng những cái bạn đã kiểm tra và gỡ bỏ. Trích dẫn một `file:line` thật, một tìm kiếm không ra gì vẫn là một câu trả lời, và không bao giờ bịa ra một caller hay một API.
5. Chứng minh sự thật duy nhất đó. Viết một script hoặc test chạy code thật, chạy nó, và dán những gì đã xảy ra.
6. Với một thay đổi lớn hoặc rộng, hãy chạy nó như một `arena`. Hỏi nhiều hơn một model cùng câu hỏi và gộp các câu trả lời. Các model khác nhau bắt được các bug thật khác nhau.

## Những gì cần trả về

- **Nó làm gì.** Những gì đã thay đổi, bao gồm cả phần không hiển nhiên.
- **Sự thật duy nhất khiến nó an toàn.** Nêu nó, nói bạn đã đưa nó đến bước nào, và cho xem bằng chứng. Nếu bạn không thể chứng minh nó, hãy viết là chưa được chứng minh.
- **Rủi ro.** Mỗi rủi ro gọi tên cách nó hỏng, `file:line`, khả năng xảy ra và mức độ tệ, và cách kiểm tra. Dán bằng chứng cho những cái quan trọng.
- **Đã gỡ bỏ.** Những gì bạn đã kiểm tra và tại sao nó ổn.
- **Trước khi merge.** Test hoặc bản tái hiện rẻ nhất bắt được bug thật, bao gồm script bạn đã viết.

Viết nó qua `unslop`, trích dẫn code thật, và loại bỏ mọi thứ riêng tư trước khi nó đi đến bất kỳ nơi công khai nào.

**Câu trả lời:** bài viết ở trên, với sự thật an toàn duy nhất hoặc đã được chứng minh hoặc được đánh dấu là chưa được chứng minh.
