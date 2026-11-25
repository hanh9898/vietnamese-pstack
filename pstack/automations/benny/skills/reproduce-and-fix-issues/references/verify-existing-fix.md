# Kiểm chứng một bản sửa đã có

Dùng chế độ này khi một pull request đang mở hoặc một commit đã merge có vẻ đã sửa báo cáo.

Artifact đã có sở hữu bản sửa. Kiểm chứng nó. Đừng sửa nó, viết một patch cạnh tranh, hay mở một pull request khác.

## Xác định artifact đủ điều kiện

Yêu cầu một artifact cụ thể:

- Một pull request đang mở có thay đổi code giải quyết triệu chứng
- Một pull request đã merge
- Một commit đã merge có code và ý định khớp

Một khẳng định trong thread, trạng thái tracker, tên branch, hoặc giả thuyết nguyên nhân mà không có pull request hay commit là không đủ.

Khi có nhiều artifact, hãy chọn cái được link từ thread nguồn hoặc tracker. Nếu không, chọn cái khớp nhất với code bị ảnh hưởng và nêu lý do.

## Bảo vệ working tree

Dùng một worktree cô lập hoặc một checkout sạch khác khi repository hỗ trợ. Đừng ghi đè lên thay đổi của người dùng.

Ghi lại:

- Revision baseline
- Revision đã patch
- URL của pull request hoặc commit
- Các input build và môi trường dùng chung cho cả hai lượt chạy

Dùng link pull request `github.com` thông thường.

## Đo baseline

Với một pull request đang mở, dùng base branch của nó làm baseline.

Với một bản sửa đã merge, dùng revision ngay trước bản sửa khi revision đó build được và thể hiện hành vi cũ.

Thông qua control adapter đã cấu hình:

1. Khởi động app baseline.
2. Xác nhận đúng app và môi trường.
3. Chạy đường đi được báo cáo bằng các thao tác UI thật.
4. Quan sát triệu chứng phân biệt.
5. Reset và lặp lại.
6. Thu bản ghi màn hình, screenshot, và phép kiểm tra trạng thái của baseline.

Nếu triệu chứng không xuất hiện hai lần trên baseline, thì không có baseline. Đừng khẳng định bản sửa hoạt động.

## Đo bản build đã patch

Build và chạy pull request hoặc commit sửa với cùng môi trường và dữ liệu.

1. Chạy cùng đường đi UI.
2. Lặp lại hai lần.
3. Xác nhận trạng thái hỏng đã biến mất.
4. Xác nhận trạng thái mong đợi xuất hiện.
5. Thu bản ghi màn hình, screenshot sau, và cùng phép kiểm tra trạng thái.

Đừng dừng ở việc biên dịch hay test. Kết quả sau phải đến từ một app đã patch đang chạy.

## Kết quả

### Confirmed

Baseline tái hiện hai lần và bản build đã patch giải quyết nó hai lần.

- Đánh dấu trạng thái vận hành là đã kiểm chứng.
- Link đến artifact.
- Đăng một câu trả lời ngắn gọn trong thread nguồn sau bước kiểm tra trước nguồn.
- Bao gồm kết quả trước và sau.
- Không mở pull request nào.

### Insufficient fix

Triệu chứng xuất hiện trên cả bản build baseline và bản đã patch.

- Đánh dấu trạng thái vận hành là đã tái hiện nhưng chưa sửa.
- Link đến artifact và nói rằng nó đã không giải quyết triệu chứng.
- Đăng cập nhật nguồn bình thường cho bản tái hiện đã xác nhận nếu lượt chạy chưa dùng nó.
- Không mở pull request cạnh tranh nào.

### Inconclusive

Baseline không tái hiện, app đã patch không chạy được, hoặc bằng chứng không cho thấy trạng thái phân biệt.

- Đừng khẳng định thành công.
- Nêu nửa nào không thể đo được.
- Giữ kết quả trong thread vận hành hoặc output của lượt chạy.
- Không đăng gì trong thread nguồn trừ khi một câu hỏi trực tiếp đòi hỏi câu trả lời.

## Dọn dẹp

Dừng cả hai bản build, xóa các profile và bản thu tạm theo chính sách lưu giữ, và đưa repository về trạng thái trước đó mà không bỏ đi công việc của người dùng.
