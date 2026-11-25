# Hợp đồng control adapter

Benny không biết cách khởi động hay điều khiển mọi app. Người dùng phải cấu hình một control skill hoặc adapter cài đặt hợp đồng này cho app đích.

Đặt tên skill của nó trong `control.skill_name`.

Đặt đường dẫn feature map hướng người dùng đã hoàn thiện trong `control.feature_map_path`. Sao chép và điền [`feature-map.example.md`](./feature-map.example.md) ra bên ngoài `.cursor/automations/benny/` thay vì sửa ví dụ đã sao chép.

Nếu skill, feature map, hoặc một năng lực bắt buộc bị thiếu, mơ hồ, hoặc chưa hoàn chỉnh, công việc tái hiện và sửa phải thất bại theo hướng đóng (fail closed).

## Các năng lực bắt buộc

### Bring up

Khởi động revision app được yêu cầu trong môi trường test được yêu cầu.

Input:

- Repository và revision
- Chế độ build hoặc khởi động
- Các yêu cầu về workspace, tài khoản, fixture, và trạng thái feature
- Thư mục artifact
- Đường dẫn feature map đã hoàn thiện

Trả về:

- Định danh session
- Cách adapter đã xác nhận đúng app và môi trường
- Các dấu hiệu ổn định của app
- Chi tiết process đang chạy hoặc đích mà các lời gọi sau cần
- Mọi năng lực còn thiếu

Adapter phải phân biệt app đích với một cửa sổ, shell, hoặc instance production tương tự.

### Drive UI

Thực hiện các thao tác người dùng thật:

- Click
- Gõ
- Nhấn phím
- Cuộn
- Kéo
- Đổi kích thước
- Điều hướng qua các control của app

Ưu tiên role, nhãn, và selector ổn định. Chỉ dùng tọa độ sau một screenshot mới.

Trả về mỗi thao tác và sự thay đổi trạng thái quan sát được.

Đừng đặt trạng thái nội bộ, gọi các method ẩn của app, ghi trực tiếp vào storage, hay chèn thay đổi DOM để tạo ra triệu chứng.

### Drive mapped features and states

Đọc phần feature map liên quan trước khi điều khiển app.

Adapter phải cung cấp cách để:

- Điều hướng đến mọi feature trong map qua đường đi mà người dùng nhìn thấy.
- Gọi các tên action adapter được liệt kê cho feature đó.
- Tương tác với các trạng thái default, hover, focus-visible, active, disabled, loading, empty, error, selected, open, expanded, và các trạng thái riêng của feature khi chúng áp dụng.
- Sắp đặt một trạng thái qua dữ liệu fixture an toàn, quyền, flag, response của service, hoặc các control test được hỗ trợ.
- Reset feature cho lần thử tái hiện độc lập thứ hai.
- Thu screenshot, video, và phép đối chiếu chỉ đọc mà feature map gọi tên.

Dùng role, accessible name, quan hệ ARIA, dấu hiệu component ổn định, và data attribute được đặt tên theo mục đích. Không bao giờ dùng class CSS hay StyleX được sinh ra, hash động, chỉ số con, hay vị trí DOM dễ vỡ.

Sắp đặt một điều kiện tiên quyết không phải là sự cho phép chèn triệu chứng được báo cáo. Bản thân bản tái hiện vẫn phải đến từ tương tác người dùng thật.

### Inspect state

Đọc trạng thái để xác nhận những gì UI hiển thị.

Ví dụ:

- Accessibility tree
- DOM hoặc cây view
- Trạng thái process
- Log local
- Trạng thái request mạng
- Trạng thái debug mà app cung cấp

Việc kiểm tra là chỉ đọc. Nếu một truy vấn thay đổi trạng thái, nó thuộc về `drive UI` và phải thể hiện một thao tác người dùng thật.

### Screenshot

Thu trạng thái app hiện tại vào một đường dẫn được yêu cầu.

Trả về:

- Đường dẫn file
- Thời điểm thu
- Dấu hiệu app hoặc tiêu đề cửa sổ
- Mô tả ngắn về những gì nên nhìn thấy

Screenshot phải cho thấy đủ phần khung của app để chứng minh đúng app đang được test.

### Recording

Bắt đầu và dừng ghi màn hình bao quanh toàn bộ đường đi tái hiện.

Trả về:

- Đường dẫn file
- Thời điểm bắt đầu và dừng
- Cửa sổ hoặc vùng được thu
- Âm thanh hoặc các lớp phủ nhạy cảm có bị loại bỏ không

Bản ghi phải cho thấy trạng thái cuối phân biệt, không chỉ phần thiết lập hay một màn hình loading.

### Cleanup

Dừng các process và session do adapter tạo ra.

Xóa những thứ dùng một lần:

- Profile trình duyệt hoặc app
- Workspace tạm
- Tài khoản test hoặc fixture khi adapter đã tạo chúng
- Debug port và tunnel
- Các bản thu đã quá thời hạn lưu giữ

Trả về những gì đã được dừng, xóa, giữ lại, hoặc để lại cho một người.

Cleanup không được xóa công việc của người dùng.

## Hành vi của adapter

Adapter phải:

- Báo cáo năng lực trước khi bắt đầu tái hiện.
- Báo cáo những phần feature map nào nó có thể điều khiển và phần nào bị chặn.
- Dùng cùng các input môi trường cho bản build baseline và bản đã patch.
- Đưa lỗi khởi động lên thành thất bại.
- Giới hạn số lần retry.
- Giữ secret ngoài log và artifact.
- Giữ các bản thu bên ngoài repository.
- Hỗ trợ một trạng thái mới hoặc đã reset giữa hai lần thử tái hiện.
- Tránh thay đổi production trừ khi người dùng đã cấu hình rõ ràng một action test an toàn.

## Chuyển đổi môi trường

Trước khi tuyên bố một môi trường bị chặn, hãy nhắc lại lỗi mà không dùng danh từ riêng của nền tảng và tự hỏi liệu cùng hành vi đó có thể được test an toàn trong môi trường có sẵn không.

Ví dụ:

- Một trình duyệt được gọi tên có thể nghĩa là bất kỳ trình duyệt bên ngoài nào.
- Một phím được gọi tên có thể nghĩa là phím tắt đã cấu hình.
- Một host từ xa được gọi tên có thể nghĩa là một đích từ xa bị trễ hoặc mất kết nối.

Chỉ dùng một lần thử đã chuyển đổi khi nó test cùng hành vi gốc. Gắn nhãn nó là bằng chứng đã chuyển đổi. Đừng gọi nó là bản tái hiện chính xác khi môi trường còn thiếu là một phần của lỗi.

Các prompt phần cứng, dialog quyền của hệ điều hành, API chỉ có trên thiết bị, và trạng thái tài khoản không có sẵn có thể là những điểm chặn thật.

## Kiểm tra thiết lập

Trước khi bật automation tái hiện, hãy chạy một phép kiểm tra adapter vô hại:

1. Khởi động app.
2. Xác nhận dấu hiệu ổn định của app.
3. Nạp một phần feature map đã hoàn thiện.
4. Điều hướng đến feature đó qua đường đi người dùng của nó.
5. Chạy thử một trạng thái dùng một lần qua các action adapter trong map.
6. Kiểm tra trạng thái kết quả.
7. Chụp một screenshot.
8. Ghi một đoạn clip ngắn.
9. Dọn dẹp.

Chỉ bật công việc tái hiện khi cả chín bước đều thành công và không có bài đăng Slack nào vào channel nguồn.
