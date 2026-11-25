---
name: automate-me
description: "Dùng cho \"automate me\", \"create/update/refresh my -mode skill\", \"turn/capture my preferences or working style into a skill\" (hoặc \"tự động hóa tôi\", \"tạo/cập nhật -mode skill của tôi\", \"biến thói quen làm việc của tôi thành skill\"), hoặc khi muốn agent làm theo cách người dùng làm việc. Soạn thảo hoặc chỉnh sửa một -mode skill cá nhân qua create-skill + unslop, có thể lấy bằng chứng mới từ các transcript gần đây."
disable-model-invocation: true
---

# Automate me

Một luồng có hướng dẫn để biến các quy ước làm việc của người dùng thành một skill mà agent sẽ làm theo. Output là một skill `-mode` được may đo cho họ (ví dụ `jay-mode`, `priya-mode`).

Skill này điều phối ba skill khác: một lượt khai thác nội tuyến (xem bước 1), skill `create-skill` có sẵn của Cursor (soạn thảo), và skill **unslop** (kỷ luật văn xuôi). Nó sắp xếp thứ tự chúng. Nó không thay thế chúng.

## Luồng

### 0. Kiểm tra skill hiện có

Tìm đệ quy `.cursor/skills/**/*-mode/SKILL.md` và `~/.cursor/skills/*-mode/SKILL.md` khớp với handle của người dùng. Mode skill có thể nằm trong một thư mục phân loại cá nhân (`.cursor/skills/<handle>/`), không chỉ ở cấp trên cùng. Nếu có một cái, hãy xác nhận ý định bằng `AskQuestion` (trừ khi họ đã nói "update my skill" hoặc tương tự):

- Cập nhật skill hiện có (mặc định cho các lần chạy lặp lại)
- Bắt đầu lại từ đầu (hiếm, hỏi lý do trước khi làm)

Chế độ cập nhật thay đổi phần còn lại của luồng:
- Bước 1 chỉ khai thác lịch sử kể từ lần cuối skill được sửa (`git log -1 --format=%cI <path>`).
- Bước 2 hỏi điều gì đã thay đổi hoặc còn thiếu, không hỏi cần ghi lại gì từ con số không.
- Bước 4 sửa file hiện có tại chỗ. Giữ nguyên các phần người dùng không phản bác. Chỉnh sửa những phần có bằng chứng mới. Chỉ thêm phần mới cho các quy tắc thật sự mới.

### 1. Khai thác lịch sử của họ

Định vị transcript của workspace đang hoạt động trước khi tỏa ra. System prompt gọi tên thư mục `agent-transcripts/` của workspace. Chỉ dùng đường dẫn đó. Đừng glob qua `~/.cursor/projects/*/`. Làm vậy vượt qua ranh giới workspace và đọc các chat riêng tư từ các dự án không liên quan.

Khảo sát các cuộc trò chuyện agent gần đây trong phạm vi đó để tìm các mẫu lặp lại. Chạy nhiều subagent song song trên các lát cắt lịch sử (ví dụ 2-4 tuần qua, chia thành 3 lát để mỗi lát có đủ tư liệu). Chọn mức suy luận của từng subagent cho công việc, theo phần Subagent của skill **poteto-mode**. Mỗi subagent khai thác một lát đọc transcript từ đường dẫn trong phạm vi workspace mà cha cung cấp, tìm các tín hiệu bên dưới, và trả về một danh sách có cấu trúc ngắn gồm các mẫu nó thấy kèm con trỏ bằng chứng. Các tín hiệu mặc định đáng săn tìm:

- Sở thích về câu trả lời (độ dài, giọng văn, định dạng, các lời sửa kiểu "nói đơn giản thôi")
- Thói quen giao việc (subagent, model, workflow chuyên biệt, song song)
- Tư thế kiểm chứng ("xong" nghĩa là gì, unit test hay tái hiện trực tiếp, reviewer)
- Kỷ luật code và văn xuôi (style, các nguyên tắc được trích dẫn, công cụ lint/format)
- Quy ước quy trình (worktree, commit, PR, công cụ review/merge)
- Sở thích meta (sửa skill giữa chừng task, đề xuất skill mới)

Đối chiếu giữa các lát trước khi nâng một tín hiệu lên. Các mẫu thấy ở 2+ lát có độ tin cậy cao. Tín hiệu đơn lẻ là yếu và thường bị bỏ.

### 2. Hỏi trực tiếp người dùng

Việc khai thác bỏ sót những ý định chưa từng xuất hiện. Dùng tool `AskQuestion` (trắc nghiệm có cấu trúc) thay vì bảo người dùng gõ từ đầu.

Hình dạng: một hoặc hai câu hỏi, mỗi câu 4-6 lựa chọn, `allow_multiple: true` cho các câu hỏi về danh mục. Bắt đầu rộng ("Những khu vực nào quan trọng nhất?"), rồi hỏi tiếp về các khu vực được chọn với các lựa chọn cụ thể. Sau các vòng có cấu trúc, một câu hỏi tự do trong chat bắt lấy mọi thứ các lựa chọn bỏ sót.

Đừng đổ ra 20 câu hỏi.

### 3. Gom nhóm các phát hiện

Nhóm các tín hiệu kết hợp thành các phần. Các phần thường gặp (chỉ dùng những gì áp dụng):

- **Phong cách trả lời**: độ dài, giọng văn, định dạng.
- **Tự chủ**: làm bao nhiêu mà không cần hỏi, việc dùng tool MCP.
- **Hiểu trước**: dùng skill nào khi xác định phạm vi hoặc điều tra một thay đổi.
- **Subagent**: mặc định, song song, model cho từng task, workflow chuyên biệt.
- **Kỷ luật văn xuôi / code**: nguyên tắc, công cụ lint, hướng dẫn style.
- **Review và kiểm chứng**: tư thế tái hiện, skill kiểm chứng, công cụ test trực tiếp.
- **Quy trình**: git worktree, commit, PR, công cụ review/merge.
- **Skill**: thói quen soạn skill, sửa skill trước, đề xuất skill mới.

Skill **poteto-mode** cho thấy hình dạng. Đọc nó để biết độ chi tiết. Đừng sao chép nội dung của nó. Các quy tắc của người dùng không giống của poteto-mode.

### 4. Soạn skill

Dùng skill `create-skill` có sẵn của Cursor để soạn skill. Vị trí:

- Đường dẫn: giữ nguyên danh mục của một mode skill hiện có. Với một mode mới, dùng `.cursor/skills/<handle>/<handle>-mode/SKILL.md` khi repo đã có một danh mục cá nhân được thiết lập cho handle đó. Nếu không, mặc định là `.cursor/skills/<handle>-mode/SKILL.md` trong dự án (hoặc `~/.cursor/skills/<handle>-mode/` nếu người dùng thích một skill cá nhân).
- Handle: tên của người dùng hoặc định danh họ chọn.
- `description` trong frontmatter: kích hoạt theo tên của họ + `/<handle>-mode` + "work in their style", không theo các từ khóa chung chung như "write code" hay "review PR".
- Định dạng frontmatter: làm theo các quy tắc YAML của `create-skill`. Giữ `description` là một YAML scalar. Đặt trong dấu nháy hoặc dùng `description: >-` với các dòng tiếp nối thụt lề khi dấu câu hoặc việc xuống dòng đòi hỏi.
- `disable-model-invocation: true` trong frontmatter theo mặc định. Chỉ bỏ ra nếu người dùng rõ ràng muốn mode của họ áp dụng ở mọi lượt.

### 5. Lặp lại trên văn xuôi

Áp dụng skill **unslop** và hướng dẫn viết của `create-skill` cho mọi dòng.

Cho người dùng xem bản nháp và nhận phản hồi. Chuẩn bị cho nhiều vòng lặp. Cắt không thương tiếc. Một mode skill không phải là sách hướng dẫn.

### 6. Land nó

Làm việc trong một worktree tách từ main. Commit và mở PR. Đừng push thẳng lên main.

## Rào chắn

- **Đừng khớp quá mức với một cuộc trò chuyện.** Một sở thích được nêu một lần và bị phản bác lần khác là nhiễu. Đòi hỏi nhiều lần xuất hiện trước khi mã hóa nó.
- **Đừng tỏ ra khéo léo.** Nhắc lại nội dung của skill khác, bịa ra ẩn dụ, hoặc viết văn xuôi "thơ mộng" cho người đọc là agent là chi phí không có lợi ích. Giữ nó mang tính vận hành.
- **Tham chiếu, đừng chép nội tuyến.** Các skill khác mà người dùng dựa vào nên xuất hiện dưới dạng tham chiếu đường dẫn, không phải đoạn trích được dán. Tương tự với mọi tài liệu nguyên tắc họ duy trì ở nơi khác.
- **Giữ các phần ở mức tối thiểu.** Chỉ thêm một phần nếu người dùng có một quy tắc cụ thể, không mặc định ở đó. "Giao tiếp rõ ràng" không phải là một phần. "Đoạn văn ngắn. Bảng khi so sánh các phương án. Gạch đầu dòng chỉ khi các mục thật sự song song." thì là.
- **Đặt tên quy ước chung chung.** Dùng "người dùng" hoặc "con người" trong câu mệnh lệnh, không dùng tên của tác giả.
- **Đừng ép đối xứng.** Nếu người dùng không có quy tắc quy trình nào đáng viết ra, hãy bỏ hẳn phần Quy trình.

## Đánh giá

Một skill `-mode` là output mang tính chủ quan. Một vòng lặp benchmark test/lặp kiểu `create-skill` không hữu ích ở đây. Kiểm tra cảm giác với người dùng: nó đọc lên có giống họ không? Nó có bỏ sót gì không? Rồi ship.

Chỉ chạy một vòng lặp tối ưu description nếu độ chính xác kích hoạt của skill hóa ra là vấn đề trong thực tế.

## Khi nào không dùng

- Người dùng muốn một skill cho task cụ thể (không phải quy ước làm việc): chỉ `create-skill`, không cần khai thác.
- Người dùng muốn ghi lại một workflow hẹp (ví dụ "cách tôi viết commit message"). Đó là một skill thông thường, không phải mode skill.
