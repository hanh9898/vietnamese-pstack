---
name: maintain-verification-skill
description: "Lượt định kỳ giữ cho verification skill và feature map của một dự án trung thực: các reader source song song cho mỗi feature, một session trực tiếp điều khiển mọi feature, tối đa một PR gồm các chỉnh sửa đã được chứng minh. Dùng cho /maintain-verification-skill hoặc \"audit the verify skill\" (hoặc \"kiểm toán verify skill\")."
disable-model-invocation: true
---

# Bảo trì một verification skill

Một feature map mục nát ngay khi app thay đổi. Skill này là vòng lặp bảo trì cho một skill được tạo bởi `/create-verification-skill` (hoặc bất kỳ verification skill cục bộ nào của dự án có feature map). Đơn vị của sự nghiêm ngặt là feature, không phải từng câu: bao phủ mọi file feature từ source và chạy thử mọi feature trực tiếp, mà không cần chạy terminal cho từng gạch đầu dòng.

## Kết quả

Chọn một, và nói là cái nào:

- **clean**: mọi feature đều được bao phủ source và chạy trực tiếp; không có gì đáng ship. Không branch, không PR.
- **changed**: một PR ship các chỉnh sửa đã được chứng minh cho tài liệu, harness, hoặc map.
- **blocked**: việc bao phủ không thể hoàn thành hoặc một bản sửa đã được chứng minh không thể ship an toàn. Nói chính xác điều gì đã chặn nó.

## Phạm vi chỉnh sửa

Chỉ sửa thư mục riêng của verification skill (SKILL.md của nó, features/, và mọi script harness nó sở hữu). Không bao giờ sửa code sản phẩm trong một lượt chạy: một hành vi mà map mô tả nhưng app không còn làm nữa thì hoặc là tài liệu bị lệch (sửa map) hoặc là một hồi quy của sản phẩm (báo cáo nó, đừng che lấp nó trong tài liệu).

## Lượt chạy

0. **Định vị mục tiêu.** Tìm verification skill cần bảo trì: skill cục bộ của dự án có phần thân chứa các mục khởi chạy/điều khiển và một feature map (thường là `.cursor/skills/verify-*/`). Nhiều ứng viên → hỏi cái nào; không có → dừng và chỉ đến `/create-verification-skill` thay vì bịa ra một mục tiêu.

1. **Vệ sinh index.** Đọc README của feature map và glob các file anh em của nó. Sửa các mục bị thiếu, thừa, trùng lặp, hoặc chết. Nhẹ nhàng; không tạo inventory tự động.

2. **Đợt source.** Mỗi file feature một subagent chỉ đọc, khởi chạy đồng thời. Mỗi cái giải thích "feature hướng người dùng này hoạt động thế nào?" từ source, đánh dấu tài liệu có khả năng bị lệch kèm trích dẫn, và trả về một công thức kiểm chứng trực tiếp ngắn gọn. Các con không bao giờ điều khiển app và không bao giờ sửa file. Hình dạng trả về: tóm tắt feature / điểm vào source / khả năng lệch hoặc không có / một công thức.

3. **Đối chiếu.** Mọi file feature đều có một bản tóm tắt trả về. Gộp các công thức chồng lấp vào càng ít trạng thái app càng tốt trong thực tế. Kiểm tra ngẫu nhiên các điểm lệch được trích dẫn; đừng chứng minh lại các khẳng định sạch. Quét các thay đổi gần đây để tìm các bề mặt hướng người dùng còn thiếu trong map — đòi hỏi một đường dẫn source cụ thể trước khi gọi một cái là thiếu.

4. **Lượt chạy trực tiếp.** Bắt buộc kể cả khi source trông sạch. Bên điều phối sở hữu toàn bộ việc điều khiển; làm theo mô hình khởi chạy riêng của verification skill — một instance sống lâu được điều khiển tuần tự cho server và UI, hoặc một session cô lập mới cho mỗi lần điều khiển với các CLI sống ngắn (phần Khởi chạy của skill quyết định, không phải skill này). Chạy thử mọi feature ít nhất một lần, và giữ ba bất biến trong suốt lượt chạy, dù thất bại là gì: (1) không bao giờ điều khiển một instance mà bạn chưa kiểm tra sức khỏe kể từ lần cuối nó làm điều gì đó bất ngờ — doctor trước lần điều khiển đầu tiên, doctor trên mỗi session mới ở nơi session là đơn vị, doctor lại sau mọi lần điều khiển thất bại, và ở nơi doctor không thấy được thất bại (một trạng thái UI bị kẹt trên một process khỏe mạnh), hãy reset về một trạng thái đã biết hoặc khởi chạy lại thay vì hy vọng; (2) bằng chứng thu được đến giờ sống sót qua mọi lần dọn dẹp, được kiểm tra tại vị trí được gọi tên của nó, không phải giả định; (3) không có gì mà một lần điều khiển khởi động tồn tại lâu hơn thời gian hữu ích của lần điều khiển đó — phần sót lại của vòng lặp thất bại được dọn dẹp dù session bị kẹt, đã thoát, hay được dùng chung (với một instance dùng chung, dọn phần sót lại, không dọn instance). Một lần doctor thất bại do skill bị lệch là sự lệch: sửa nó trong phạm vi chỉnh sửa và thử lại một lần — khởi động lại bất cứ thứ gì bản sửa làm mất hiệu lực, không hơn — trước khi gọi lượt chạy là `blocked`. Một feature không thể tiếp cận chỉ là `verified-unreachable` khi có điều kiện tiên quyết cụ thể (xác thực, quyền sử dụng, hệ điều hành, trạng thái bên ngoài) và con đường đã thử; nếu map bỏ sót điều kiện tiên quyết đó, đó là sự lệch. Mọi bản sửa harness từ bước phân loại đều được điều khiển trực tiếp lại trước khi ship. Việc dọn dẹp cuối cùng diễn ra sau lần điều khiển cuối của lượt chạy — kể cả các lần chứng minh lại đó — để không có gì tồn tại lâu hơn lượt chạy (bằng chứng ở lại, theo skill).

5. **Phân loại.** Mô tả theo góc nhìn người dùng sai hoặc thiếu → tài liệu bị lệch, sửa nó. Hành vi hoạt động được nhưng harness không điều khiển được → khoảng trống harness, sửa nó; một bản sửa harness tuân theo cùng quy tắc về helper như khi tạo (script có thể thực thi, cách gọi được ghi trong phần thân skill). Hành vi app thật sự bị hỏng → khoảng trống sản phẩm; ghi lại cho người dùng, giữ nó ngoài PR này.

6. **Ship hoặc dừng.** Với changed: một PR gồm các chỉnh sửa đã được chứng minh, đọc lại mọi file đã thay đổi trước. Với clean hoặc blocked: không có PR, báo cáo kết quả và độ bao phủ một cách trung thực.

Giữ ghi chú lượt chạy ngắn gọn (các feature đã bao phủ, các điều kiện tiên quyết không thể tiếp cận, các điểm lệch đã xác nhận, kết quả) ở một vị trí nháp; đừng commit chúng.
