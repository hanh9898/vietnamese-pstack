### Visual parity

**Bạn chịu trách nhiệm bảo đảm giao diện khớp với bản chuẩn đến từng pixel. Bản chuẩn là đặc tả; không được sửa bản chuẩn.** Sự tương đương được kiểm chứng bằng image diff, không phải bằng mắt.

1. Thiết lập baseline trước, trước mọi migration: một visual regression harness chụp screenshot component hiện tại qua các trạng thái của nó, cộng với đích khi so khớp hai bản cài đặt. Không có baseline, không có khẳng định tương đương. Một điều kiện tiên quyết mang tính chặn, không phải một follow-up.
2. Các điều khoản chống đi tắt, được nêu ra và giữ vững: không sửa harness, không can thiệp baseline, không tái cấu trúc component để làm một diff pass. Nếu baseline trông sai, hãy dừng lại và hỏi, đừng sửa nó.
3. Migrate từng component một. Chạy song song qua các worktree, mỗi component một chủ sở hữu (principle skill **separate-before-serializing-shared-state**). Các primitive dùng chung được migrate trước như một giai đoạn chặn.
4. Kiểm chứng từng component so với baseline của nó qua image diff trên bề mặt tương ứng qua control skill. Một diff khác không là thất bại. Điều tra phần chênh lệch pixel. `/loop` cho mỗi component đến khi diff bằng không.
5. Chạy **Opening a PR** cho mỗi component hoặc mỗi lô an toàn.

**Câu trả lời:** các component đã migrate, kết quả diff cho từng cái, vị trí của baseline harness, những gì còn lại.
