---
name: correct
description: "Tìm những lỗi mà agent cứ lặp lại trong repo này và làm cho mỗi lỗi trở nên không thể xảy ra. Thử kiến trúc trước, rồi type, rồi một lint có thông báo lỗi gọi tên cách sửa, rồi một test, và viết tài liệu sau cùng. Chứng minh mỗi phép kiểm tra thất bại trên một lỗi thật trong quá khứ. Lặp lại việc này mỗi lần operator sửa bạn. Dùng cho /correct."
disable-model-invocation: true
---

# Correct

Operator cứ phải sửa các agent trong repo này vì cùng những lỗi đó. Hãy thay đổi repo để agent tiếp theo không thể mắc chúng.

Giả định mọi người đóng góp là một agent chỉ thấy những file nó đã mở, sao chép ví dụ gần nhất, và đi con đường ngắn nhất compile được. Thiết kế repo sao cho một thay đổi trông đúng từ một file thì đúng cho cả repo.

## Tìm các lớp lỗi

Trước hết, đọc các commit gần đây, các lần revert, comment review, file chỉ dẫn cho agent, và các comment giải thích cách lách. Gom các lỗi thành từng lớp. Một lớp được tính khi nó đã xảy ra hai lần.

## Sửa mỗi lớp ở cấp cao nhất có tác dụng

1. **Loại bỏ nó bằng kiến trúc.** Cho mỗi mẩu state một chủ sở hữu và mỗi việc một cách được hỗ trợ. Ẩn phần bên trong để import sai sẽ thất bại. Thay các danh sách đồng bộ bằng tay bằng một nguồn sự thật duy nhất. Xóa các cách cũ và code chết mà một agent sẽ sao chép.
2. **Bắt buộc nó bằng type để state xấu không thể được viết ra.** Nếu code xấu vẫn compile, hãy thêm một lint hoặc phép kiểm tra CI có thông báo lỗi gọi tên file, type, hoặc hàm nên dùng thay thế. Nếu mẫu đó đã phổ biến, chỉ đánh trượt khi một thay đổi thêm nhiều hơn.
3. **Test hành vi.** Sửa hoặc xóa mọi test vẫn pass khi hành vi nó kiểm tra bị hỏng, hoặc thất bại khi chỉ phần bên trong thay đổi.
4. **Viết tài liệu hoặc quy tắc cho agent sau cùng, chỉ cho các quyết định cần phán đoán.** Không có gì thất bại khi một agent bỏ qua chúng.

## Sửa và chứng minh

Rồi sửa các lớp thường gặp nhất ngay bây giờ, mỗi lớp một commit. Chứng minh mỗi phép kiểm tra mới thất bại trên một lỗi thật trong quá khứ. Chạy cùng một lệnh ở máy local và trong CI. Các ngoại lệ được đặt trên chính dòng vi phạm kèm một lý do, một ngày hết hạn, và sự phê duyệt của một người.

## Giữ bảng quy tắc

Cuối cùng, giữ một bảng trong file chỉ dẫn cho agent ghép mỗi quy tắc với thứ bắt buộc nó. Khi operator sửa bạn, hãy sửa lỗi và thêm quy tắc. Nếu quy tắc đã có ở đó mà không có gì bắt buộc nó, đó là một lần lặp lại, nên hãy sửa nó ở cấp cao nhất trong cùng thay đổi. Bỏ một quy tắc khi lỗi của nó không còn có thể xảy ra.

**Câu trả lời:** mỗi lớp kèm bằng chứng của nó, cấp bạn đã chọn, và tại sao một cấp cao hơn không có tác dụng.
