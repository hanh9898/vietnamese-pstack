---
name: figure-it-out
description: "Thiết kế một playbook có thể kiểm toán khi không có playbook hẹp hơn nào phù hợp: một migration lớn, một thay đổi nhiều phần đầy tham vọng, hoặc công việc mà con người review sau khi rời đi. Điều chỉnh mức nghiêm ngặt theo task, chạy một vòng lặp giả thuyết, và ghi lại các quyết định. Dùng cho /figure-it-out hoặc 'figure it out' (hoặc 'tự tìm cách làm đi')."
disable-model-invocation: true
---

# Figure it out

Trong Claude Code, hãy đọc [adapter Claude Code](../../docs/harness/claude-code.md) một lần mỗi session trước khi làm theo skill này. Nó ánh xạ các tên Cursor trong các skill pstack sang Claude Code.

Khi task không khớp playbook nào, hãy thiết kế một cái. Sản phẩm bàn giao trước bất kỳ dòng code nào là chính workflow: một chuỗi giai đoạn điều chỉnh mức nghiêm ngặt theo task, chạy phương pháp khoa học, và để lại một dấu vết quyết định mà con người có thể kiểm toán sau khi rời đi.

## Bắt đầu

Mở một todolist có mục đầu tiên là đọc phần Nguyên tắc của skill **poteto-mode**. Rồi thêm các giai đoạn bên dưới làm todo.

## Phase A: Đóng khung

Nắm chắc nền tảng trước, rồi mới cam kết. Đừng bắt đầu lượt chạy cho đến khi bạn có thể nêu:

- Định nghĩa hoàn thành dưới dạng một vị từ có thể bác bỏ (principle skill **prove-it-works**).
- Phạm vi, được định lượng: số đơn vị và công sức ước chừng, cùng các trở ngại mà bước nắm nền tảng đã phát hiện.
- Mức nghiêm ngặt, nghiêng về cao. Cửa một chiều và blast radius lớn nhận nhiều hơn. Các bước có thể đảo ngược và ít rủi ro nhận ít hơn. Mức nghiêm ngặt là các cổng và artifact, không phải "cố gắng hơn".

Trình bày cách đóng khung và các đánh đổi trước khi cam kết một lượt chạy dài. Công việc có thể đảo ngược thì cứ tiến hành (principle skill **never-block-on-the-human**), nhưng một lượt chạy nhiều giờ xứng đáng có một checkpoint.

## Phase B: Thiết kế workflow

Phân rã thành các đơn vị nguyên tử, có thể land độc lập. Sắp xếp những ẩn số rủi ro nhất lên trước. Khung sườn và kiểm chứng đi trước feature (principle skill **foundational-thinking**).

- Xây harness kiểm chứng trước công việc, với baseline được ghi lại từ trạng thái trước thay đổi, để phép kiểm tra đọc thành "giá trị cũ so với giá trị mới".
- Với các quyết định thiết kế cửa một chiều, hãy chạy skill **architect** (nó chạy **arena**). Bỏ qua nó cho công việc cơ học có hình dạng đã cụ thể. Một arena thứ hai trên một thiết kế đã chốt là làm quá (principle skill **laziness-protocol**).
- Quyết định cái gì được tỏa ra. Chỉ song song hóa dọc các đường nối, và cho mỗi worker worktree hoặc branch riêng (principle skill **separate-before-serializing-shared-state**). Đừng tỏa ra quá mức. Chọn mức suy luận của từng subagent cho công việc, theo phần Subagent của skill **poteto-mode**.
- Viết ra danh sách giai đoạn đã thiết kế. Danh sách đó là thứ con người review.

Rồi thực thi thiết kế. Thêm các bước của nó vào todolist thành các mục cụ thể nằm giữa mục Phase C và Phase D. Chạy mỗi bước theo kỷ luật vòng lặp của Phase C, và đan log của Phase D xuyên suốt chúng, một dòng khi mỗi bước land, thay vì để dành toàn bộ dấu vết đến cuối.

## Phase C: Chạy vòng lặp

Mỗi đơn vị là một thí nghiệm. Nêu giả thuyết, thực hiện thay đổi nhỏ nhất, đo với vị từ trên artifact thật, giữ nó nếu nó tiến lên, revert nếu không. Áp dụng principle skill **sequence-verifiable-units**, kiểm chứng mỗi đơn vị trước khi bắt đầu đơn vị tiếp theo thay vì gom các phép kiểm tra đến cuối.

- Kiểm chứng bằng cách xem xét artifact, không bao giờ bằng tự báo cáo. Khi thứ gì đó pass quá dễ, hãy nghi ngờ phương pháp quan sát trước khi nghi ngờ hệ thống.
- Ghép công việc được giao với một giám khảo. Nếu một worker lách cổng, hãy reset và siết chặt hợp đồng. Nếu chính cổng sai, hãy sửa cổng trong một thay đổi riêng thay vì đi vòng qua nó.
- Phán quyết là VERIFIED, NOT VERIFIED, hoặc INCONCLUSIVE. Inconclusive không phải là pass. Đừng giấu một kết quả âm.

## Phase D: Giữ dấu vết kiểm toán

Ghi log lượt chạy qua skill **show-me-your-work**. Công việc của figure-it-out thường đủ tham vọng để commit dấu vết, để reviewer có thể đọc nó trong PR. Dấu vết cộng với diff là thứ cho phép con người quay lại và tin tưởng công việc.

## Phase E: Kiểm chứng và bàn giao

Kiểm tra toàn bộ với vị từ của Phase A trên sản phẩm thật, không chỉ trên harness. Mã hóa mọi lời sửa lặp lại thành một cổng, một lint rule, một phép kiểm tra, hoặc một script (principle skill **encode-lessons-in-structure**).

**Câu trả lời:** playbook bạn đã thiết kế, mức nghiêm ngặt và lý do, đường dẫn dấu vết quyết định, những gì đã được kiểm chứng với vị từ, và những gì vẫn còn mở.
