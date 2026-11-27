---
name: tdd
description: "Chỉ dùng khi người dùng yêu cầu rõ ràng về TDD, một bài test thất bại hoặc một regression test, hoặc khi có cách kiểm thử bug trên máy rõ ràng và ít tốn kém. Trừ khi người dùng yêu cầu rõ ràng, hãy bỏ qua nếu chưa rõ nên kiểm thử thế nào, việc kiểm thử quá tốn kém hoặc phụ thuộc nhiều vào tích hợp."
disable-model-invocation: true
---

# Sửa bug theo TDD

Khi sửa bug mà có cách kiểm thử ngay trên máy rõ ràng và ít tốn công, hãy viết test tái hiện hành vi lỗi trước khi sửa code production. Mục tiêu là một regression test tập trung, thất bại trước khi sửa và chạy qua sau khi sửa.

Đừng ép buộc một test khi nó không thực tế. Nếu test có sẵn đòi hỏi thiết lập harness rộng, mock dễ vỡ, hạ tầng end-to-end chậm, state chỉ có ở production, các bước tái hiện mơ hồ, hoặc thay đổi lớn ở các fixture không liên quan, hãy bỏ qua việc thêm test mới và dùng phép kiểm chứng hữu ích gần nhất thay vào đó.

## Workflow

1. **Hiểu bug.** Xác định hành vi dự định, hành vi hiện tại, đường bị ảnh hưởng, và bản tái hiện quan sát được nhỏ nhất.
2. **Chọn phép kiểm tra thực thi được hẹp nhất.** Ưu tiên test unit, component, integration, hoặc regression gần nhất đã được dùng cho đường code đó. Nếu chưa thấy cách kiểm thử nào rõ ràng và ít tốn công, đừng tự dựng một cách mới chỉ để làm theo quy trình.
3. **Viết test thất bại trước.** Thêm test tập trung nhỏ nhất lẽ ra đã bắt được bug. Test nên mã hóa hành vi dự định, không phản chiếu phần cài đặt hiện tại.
4. **Chạy test mới trước khi sửa.** Xác nhận nó thất bại vì đúng lý do dự định. Nếu nó pass hoặc thất bại vì một lý do không liên quan, hãy sửa test hoặc bản tái hiện trước khi sửa phần cài đặt.
5. **Sửa bug.** Thực hiện thay đổi production nhỏ nhất thỏa mãn hành vi dự định trong khi giữ nguyên các hợp đồng lân cận.
6. **Chạy lại regression test.** Xác nhận test giờ đã pass.

## Nếu một test thất bại là không thực tế

Thay vào đó dùng phép kiểm tra hồi quy thực thi được gần nhất: một script có mục tiêu, lệnh tái hiện thủ công, tự động hóa trình duyệt, so sánh snapshot, assertion trên log, hoặc một phép kiểm tra tích hợp tập trung.

Thà không có test mới còn hơn một test tồi. Một test tồi là test chủ yếu test mock, mã hóa chi tiết cài đặt hiện tại, phụ thuộc vào thời điểm hoặc state toàn cục không liên quan, cần hạ tầng tốn kém cho một bản sửa nhỏ, hoặc sẽ bị xóa ngay sau khi chứng minh bản sửa.

## Rào chắn

- Đừng thay đổi test chỉ để khớp với một phần cài đặt sai.
- Đừng làm yếu các assertion hiện có trừ khi hành vi mong đợi thật sự đã thay đổi và lý do rõ ràng.
- Giữ regression test tập trung vào bug. Tránh thay đổi fixture rộng hoặc mở rộng độ bao phủ không liên quan.
- Nếu bug chập chờn, hãy làm cho test tất định khi có thể và ghi lại tín hiệu đang được khóa chặt.
- Nếu bug để lộ một lớp thất bại rộng hơn, trước hết hãy land đường hồi quy tập trung, rồi mới cân nhắc thêm độ bao phủ cho các trường hợp anh em.

## Câu trả lời cuối cùng

Báo cáo bằng chứng, không chỉ kết quả:

- Gọi tên test hoặc phép kiểm tra thực thi được đã thất bại trước và lỗi mà nó tạo ra.
- Gọi tên lượt chạy test pass sau và mọi phép validation lân cận đã thực hiện.
- Nếu không thể chứng minh bằng chứng thất bại trước, hãy nêu lý do và mô tả phép kiểm tra hồi quy gần nhất đã dùng thay thế.
