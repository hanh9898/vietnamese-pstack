---
name: create-formal-verification-skill
description: "Tạo một skill cục bộ cho dự án để kiểm chứng hình thức phần code mà một bug gây tốn kém nhất và test chạm đến ít nhất, bằng mọi ngôn ngữ, với công cụ kiểm chứng nào phù hợp. Dùng cho /create-formal-verification-skill, \"model-check this race\", \"prove this invariant\" (hoặc \"model-check race condition này\", \"chứng minh bất biến này\"), hoặc khi concurrency, retry, state machine, parser, hay code unsafe cần nhiều hơn test."
disable-model-invocation: true
---

# Tạo một formal verification skill

Trong Claude Code, hãy đọc [adapter Claude Code](../../docs/harness/claude-code.md) một lần mỗi session trước khi làm theo skill này. Claude Code thay `${CLAUDE_PLUGIN_ROOT}` trong skill này bằng thư mục gốc plugin; `<pstack>` là đường dẫn đó. Nó ánh xạ các tên Cursor trong các skill pstack sang Claude Code.

Một test kiểm tra các trường hợp mà ai đó đã nghĩ ra để viết. Kiểm chứng hình thức kiểm tra mọi trường hợp trong một phạm vi đã nêu: mọi thứ tự các bước trong một model, mọi input đến một giới hạn, hoặc mọi input. Skill này tìm phần của repo nơi điều đó quan trọng nhất, kiểm chứng một tính chất của nó, và để lại một skill cục bộ cho dự án cho phép agent tiếp theo kiểm tra một thay đổi với tính chất đó. Viết skill đó cho một agent đọc nó từ đầu, giữa chừng một thay đổi, và chưa bao giờ thấy công việc của bạn. Người dùng phải có thể tin kết quả và hành động dựa trên nó mà không cần học ngôn ngữ kiểm chứng.

## Chọn mục tiêu từ code

Trả lời từ codebase, và chỉ hỏi người dùng những gì bạn không thể quan sát. Nếu người dùng đã gọi tên một khu vực hoặc một bug, hãy bắt đầu từ đó.

Một mục tiêu tốt là một lời hứa mà code đưa ra, nơi việc phá vỡ nó gây hại cho người dùng và test hiếm khi chạm đến trường hợp phá vỡ nó. Chọn mục tiêu mạnh nhất như vậy trong repo, không phải cái dễ kiểm chứng nhất.

## Để câu hỏi chọn công cụ

Chọn công cụ trả lời câu hỏi với chi phí thấp nhất: một model checker, một proof assistant, một verifier dựa trên SMT, hoặc một công cụ khác. Câu hỏi liệu các sự kiện có thể xảy ra theo một thứ tự xấu hay không thường hợp với một model checker trên một model nhỏ của thiết kế, và TLA+ là mặc định cho điều đó ở mọi ngôn ngữ. Câu hỏi liệu chính code có hoạt động đúng với mọi input hay không, như an toàn bộ nhớ, tràn số, hoặc một bất biến của cấu trúc dữ liệu, thường hợp với một verifier chạy trên code. Nếu không có verifier nào chạy trên ngôn ngữ này, hãy nói vậy, và test code thật bằng các input được sinh ra, không phải một model viết tay của hàm. Một tính chất phải đúng ở mọi kích thước, nơi một giới hạn là không đủ, có thể cần một chứng minh. Ưu tiên một công cụ mà các developer của repo có thể cài và chạy, và cho người dùng biết tại sao bạn chọn nó.

## Điều gì làm nó tốt

- **Đúng với code.** Mọi phần của model hoặc chứng minh đều chỉ đến code mà reviewer có thể mở ra. Những gì việc kiểm chứng coi là một bước không thể chia cắt thì là một bước không thể chia cắt trong code. Tên gọi đến từ repo này.
- **Có thể thất bại.** Một phép kiểm tra bạn chưa bao giờ thấy thất bại thì không chứng minh được gì. Cho thấy mỗi tính chất thất bại trên một biến thể bị hỏng của code mà nó bảo vệ, như một phép kiểm tra bị xóa hoặc một bước bị đổi thứ tự.
- **Phát hiện vẫn là phát hiện.** Khi code hiện tại phá vỡ tính chất, hãy báo cáo nó kèm phản ví dụ theo thuật ngữ của code. Đừng làm yếu tính chất hay model cho đến khi nó pass, và đừng thay đổi code sản phẩm trừ khi người dùng yêu cầu.
- **Trung thực về phạm vi.** Nói những gì được kiểm chứng, dưới những giới hạn và giả định nào, và những gì bị bỏ ra ngoài. Một lần pass bao phủ model hoặc giới hạn, không phải toàn bộ hệ thống.
- **Đọc được mà không cần công cụ.** Nêu tính chất và tác hại, mỗi cái trong một câu đơn giản. Kể một phản ví dụ như một chuỗi bước ngắn bằng ngôn từ của code.
- **Rẻ để chạy lại.** Một lệnh, một phiên bản công cụ có thể tái tạo, và một lượt chạy đủ ngắn để agent tiếp theo sẽ dùng nó cho mọi thay đổi liên quan.
- **Đồng bộ với code.** Ghi lại mỗi phép kiểm tra bao phủ những file và hàm nào, và commit mà tại đó bạn xác nhận lần cuối rằng việc kiểm chứng mô tả chúng. Khi code được bao phủ thay đổi sau commit đó, agent tiếp theo có thể thấy rằng việc kiểm chứng cần được xem lại.

## Tạo verify skill

Viết một skill cục bộ cho dự án với frontmatter gọi tên khu vực và nói khi nào dùng nó. Không có frontmatter, skill không bao giờ được đăng ký. Chỉ từ skill, agent tiếp theo phải có thể biết một thay đổi có chạm vào code đã được kiểm chứng không, chạy phép kiểm tra, phân biệt một bug thật với một lỗi mô hình hóa, và cập nhật việc kiểm chứng khi một thay đổi là có chủ đích. Đặt bản ghi độ bao phủ và commit đồng bộ trong skill, và bảo agent tiếp theo chỉ dời commit đồng bộ về phía trước sau khi nó xác nhận rằng việc kiểm chứng mô tả code tại commit mới. Dùng lệnh, đường dẫn, và danh từ thật của repo này, và không để lại placeholder nào.

Nếu phép kiểm tra là một model TLA+, hãy bảo agent tiếp theo đọc mọi kết quả bằng skill pstack [`/statechart`](../statechart/SKILL.md). Nó cho thấy mỗi vi phạm bất biến mà checker tìm ra dưới dạng đường đi ngắn nhất bằng lời lẽ đơn giản. Khi phép kiểm tra pass, `/statechart` vẽ một biểu đồ về cách hệ thống di chuyển giữa các trạng thái. Tham chiếu `/statechart` bằng tên. Các lệnh, tùy chọn, và đường dẫn file của nó thay đổi giữa các bản phát hành và các máy, nên đừng sao chép cái nào vào skill được tạo hay các script của nó.

## Chứng minh nó trước khi bàn giao

Làm theo skill được tạo một lần, như agent tiếp theo sẽ làm, trên một thay đổi nháp phá vỡ tính chất trong code thật. Nó phải bắt được chỗ phá vỡ. Rồi bỏ thay đổi nháp và xác nhận rằng phép kiểm tra đã quay lại trạng thái ban đầu: pass, hoặc chỉ thất bại trên các phát hiện bạn sẽ báo cáo. Một verify skill chưa bao giờ được chạy là một bản nháp. Nếu skill bỏ sót chỗ phá vỡ hoặc một bước không chạy, hãy sửa skill hoặc việc kiểm chứng, không sửa thay đổi nháp.

## Bàn giao

Cho người dùng biết bạn đã kiểm chứng gì, bạn đã dùng công cụ nào và tại sao, các giới hạn, phép kiểm tra tìm ra gì bằng lời lẽ đơn giản, cách chạy nó, và những gì nó không bao phủ. Chỉ đề xuất một mục tiêu thứ hai nếu bạn đã tìm thấy một cái gần. Chỉ người dùng đến `/maintain-formal-verification-skill` để đưa việc kiểm chứng trở lại đồng bộ sau các thay đổi đã không kiểm tra lại nó.
