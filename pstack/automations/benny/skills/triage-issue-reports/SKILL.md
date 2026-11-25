---
name: triage-issue-reports
description: Triage các báo cáo issue trên Slack với một phán quyết duy nhất chỉ trong thread, xem xét bằng chứng, định tuyến có xét đến nguyên nhân, khử trùng lặp trên tracker, và tạo ticket theo kiểu fail-closed. Chỉ dùng từ automation triage Benny đã cấu hình.
disable-model-invocation: true
---

# Triage báo cáo issue

Phân loại một báo cáo Slack và đăng một phán quyết hữu ích trong thread nguồn của nó. Chỉ tạo issue trên tracker cho một bug rõ ràng và mới. Đừng tái hiện hay sửa nó ở đây.

Nạp cấu hình Benny bên ngoài do automation cung cấp. Nếu config bị thiếu, sai định dạng, hoặc chưa hoàn chỉnh, hãy dừng mà không đăng hay ghi gì vào tracker.

## Quy tắc an toàn cứng

- Tọa độ channel nguồn và thread gốc là bất biến.
- Không bao giờ đăng một tin nhắn gốc trong channel nguồn.
- Không bao giờ đăng vào channel khác, broadcast một reply, gửi DM, hay bắt đầu một thread thay thế.
- Kiểm tra trước (preflight) tin nhắn cha nguồn trước mọi lần ghi vào tracker và ngay trước khi đăng phán quyết.
- Nếu tin nhắn cha bị thiếu, bị xóa, không truy cập được, hoặc không chắc chắn, hãy dừng mà không ghi gì.
- Đăng một phán quyết có nội dung. Đừng tường thuật tiến độ.
- Bên điều phối là bên duy nhất đăng lên Slack.
- Các worker được ủy quyền chỉ trả về phát hiện. Chúng phải chỉ đọc và không nhận credential Slack hay action ghi nào.
- Mọi prompt con phải cấm `SendSlackMessage`, `PostToSlack`, `chat.postMessage`, và mọi thao tác ghi Slack khác.
- Nếu việc cô lập worker không thể thực thi các giới hạn đó, hãy làm công việc trong bên điều phối.
- Không bao giờ tạo một issue không thể link ngược về thread nguồn.
- Thà không có ticket còn hơn một ticket đoán mò hoặc trùng lặp.
- Áp dụng `principle-separate-before-serializing-shared-state` của pstack cho tọa độ nguồn.
- Áp dụng các skill `principle-minimize-reader-load` và `unslop` của pstack cho phán quyết cuối cùng.

## 1. Đóng băng tọa độ nguồn

Trước khi lập danh sách công việc hoặc ủy quyền:

1. Đọc `source_channel_id` từ trigger.
2. Yêu cầu nó bằng channel nguồn đã cấu hình.
3. Đặt `SOURCE_THREAD_TS` thành `trigger.thread_ts` khi có. Nếu không, dùng `trigger.ts`.
4. Yêu cầu `SOURCE_THREAD_TS` không rỗng.
5. Lưu `SOURCE_CHANNEL_ID` và `SOURCE_THREAD_TS` thành các giá trị bất biến.
6. Đọc thread và xác minh rằng gốc của nó có chính xác các tọa độ đó.
7. Lấy một permalink nguồn ổn định.

Mọi lần đọc và đăng nguồn về sau phải dùng các giá trị đã lưu đó. Không bao giờ thay thế chúng bằng timestamp của một reply hay timestamp của thread vận hành.

## 2. Đọc toàn bộ báo cáo

Đọc tin nhắn gốc và các reply hiện có trước khi quyết định.

Thu thập:

- Cách diễn đạt của người báo cáo
- Phiên bản sản phẩm, bản build app, môi trường, và nền tảng khi có
- Hành vi mong đợi
- Hành vi quan sát được
- Tần suất và yếu tố kích hoạt
- Chữ lỗi hoặc chữ ký stack
- Các link issue, commit, hoặc pull request đã có
- Mọi tuyên bố rõ ràng rằng ai đó đang sửa nó

Kiểm tra mọi file đính kèm liên quan.

- Đọc screenshot ở độ phân giải hữu ích đầy đủ.
- Xem video để tìm chuyển đổi trạng thái tách biệt hành vi đúng và hỏng.
- Đọc log, trace, và chữ crash để tìm chữ ký cụ thể.
- Nếu media cần xem xét chuyên môn, hãy dùng một media worker chỉ đọc và hỏi một câu hỏi hẹp. Worker chỉ trả về phát hiện.
- Nếu một file đính kèm không đọc được, hãy nói vậy trong phán quyết. Đừng bịa ra những gì nó cho thấy.

Dùng bằng chứng đã có trong thread trước khi hỏi người báo cáo thêm.

## 3. Lần theo nguyên nhân trước khi định tuyến

Thực hiện một lượt đọc source và lịch sử có giới hạn trước khi chọn owner hoặc đích đến. Lần theo đường đi từ hành động được báo cáo đến kết quả quan sát được. Dùng skill `why` của pstack khi báo cáo trông giống một hồi quy hoặc chạm vào code phòng thủ.

1. Xác định đường code có khả năng từ hành động được báo cáo đến kết quả quan sát được.
2. Kiểm tra xem triệu chứng nhìn thấy được thuộc về đường code đó hay một dependency bên dưới nó.
3. Kiểm tra các thay đổi gần đây khi báo cáo trông giống một hồi quy.
4. Kiểm tra xem một commit đã merge hoặc pull request đang mở đã giải quyết cùng triệu chứng chưa.
5. Tách sự thật đã xác nhận khỏi giả thuyết.

Lượt này không cần một nguyên nhân gốc hoàn chỉnh. Nó phải đủ mạnh để tránh định tuyến một triệu chứng nhìn thấy được đến sai owner.

Nếu không đọc được repository, đừng đoán code owner. Tiếp tục với một phân loại thận trọng và nói rằng không thể lần theo nguyên nhân.

## 4. Phân loại

Chọn một loại.

### Bug

Một điều gì đó vi phạm hành vi dự định. Ví dụ bao gồm output sai, trạng thái hỏng, một lỗi, một crash, một lần treo, một thao tác im lặng không làm gì, hoặc một hồi quy.

### Hiệu năng

Báo cáo mô tả sự chậm chạp đo được, bộ nhớ dư thừa, hao pin, giật lag, hoặc một vấn đề tài nguyên khác. Coi nó là một bug, nhưng giữ lại các số đo và profile.

### Yêu cầu feature

Hành vi hiện tại có vẻ là có chủ đích và người báo cáo muốn một hành vi hoặc khả năng khác.

### Câu hỏi hoặc góp ý

Báo cáo hỏi một thứ hoạt động thế nào, bày tỏ một sở thích mà không có lỗi cụ thể, hoặc đưa ra góp ý chung.

### Định tuyến lại

Việc lần theo nguyên nhân cho thấy một đích đến đã cấu hình khác sở hữu issue.

Khi ranh giới giữa bug và feature không rõ, đừng tạo ticket. Phán quyết duy nhất có thể hỏi một câu hỏi tập trung và dùng marker `other`.

## 5. Áp dụng định tuyến đã cấu hình

Đọc bản đồ định tuyến tùy chọn từ `routing.map_path`.

- Khớp theo khu vực sản phẩm, đường code, hoặc chữ ký lỗi đã xác nhận.
- Chỉ một triệu chứng nhìn thấy được là không đủ khi việc lần theo nguyên nhân chỉ về nơi khác.
- Nếu không có route nào khớp, hãy nói owner chưa rõ. Đừng đoán.
- Đừng đăng chéo. Cho người báo cáo biết nên mang issue đi đâu trong thread nguồn.

Ping owner tắt theo mặc định. Một lần ping chỉ được phép khi tất cả các điều sau đều đúng:

1. Bản đồ định tuyến gọi tên rõ ràng owner.
2. Config cho phép loại ping đó.
3. Mục đó là một yêu cầu feature cần ý kiến của owner, hoặc lịch sử gần đây xác định một tác giả có khả năng gây ra hồi quy với bằng chứng mạnh.
4. Owner không phải là một nhóm on-call rộng.

Không trường hợp nào khác được ping.

## 6. Dùng adapter issue-tracker

Tracker là một adapter, không phải một nhà cung cấp bắt buộc. Một adapter Linear là một ví dụ hợp lệ. Một adapter GitHub Issues hoặc một tracker khác có thể cài đặt cùng hợp đồng.

Adapter đã cấu hình phải cung cấp:

- Tìm issue theo chữ, trạng thái, label, URL nguồn, và khoảng ngày
- Đọc một issue và các link của nó
- Tạo một issue với tiêu đề, nội dung, trạng thái, label, và URL nguồn
- Cập nhật một issue đã có mà không thay thế các field không liên quan
- Thêm một link nguồn và ghi chú tái diễn
- Hủy, đóng, hoặc xóa một issue do lượt chạy này tạo nếu việc bàn giao trên Slack thất bại

Nếu một thao tác bắt buộc không có sẵn, hãy fail closed cho lần ghi đó.

Phân giải team, project, trạng thái, và label đã cấu hình lúc chạy. Đừng bịa ID, tạo label, gán owner, hay đặt priority trừ khi config yêu cầu rõ ràng.

## 7. Khử trùng lặp

Luôn kiểm tra xem permalink nguồn này đã được link đến một issue tracker hay một reply triage trước đó chưa. Nếu rồi, đừng đăng hay tạo bản trùng lặp.

Với báo cáo bug và hiệu năng, tìm trên tracker bằng:

- Chữ ký lỗi hoặc crash chính xác
- Khu vực sản phẩm
- Yếu tố kích hoạt
- Triệu chứng
- Phiên bản hoặc khoảng ngày
- Commit nghi gây hồi quy
- Permalink nguồn

Chọn một kết quả:

- Trùng lặp chắc chắn: cùng chữ ký, hoặc cùng khu vực, yếu tố kích hoạt, và triệu chứng, hoặc một nguyên nhân chung đã xác nhận.
- Có thể liên quan: một nguyên nhân chung là hợp lý nhưng chưa được chứng minh.
- Giống bề ngoài: sự tương đồng chỉ là hời hợt.
- Không khớp.

Với một trùng lặp chắc chắn, cập nhật issue đã có với permalink nguồn và một ghi chú tái diễn ngắn. Đừng mở lại, đổi label, hay gán lại nó trừ khi config nói vậy.

Với một kết quả có thể khớp, hãy link nó trong phán quyết như là không chắc chắn và không tạo gì.

Một issue đã đóng từ lâu là manh mối về hồi quy, không tự động là một bản trùng lặp còn sống.

## 8. Quyết định có tạo không

Chỉ tạo khi tất cả các điều sau đều đúng:

1. Phân loại là bug hoặc hiệu năng.
2. Hành vi rõ ràng là hỏng.
3. Issue vẫn còn tồn tại hoặc chưa được biết là đã sửa.
4. Việc khử trùng lặp không tìm thấy kết quả khớp còn sống chắc chắn hoặc hợp lý.
5. Tin nhắn cha nguồn và permalink đã qua preflight.
6. Các field đích trên tracker đã được phân giải.
7. Adapter có thể bù trừ nếu việc đăng phán quyết thất bại.

Không bao giờ tạo cho một yêu cầu feature, câu hỏi, góp ý, định tuyến lại, trùng lặp có thể, trùng lặp chắc chắn, hay issue đã được sửa.

Issue mới phải tự chứa đầy đủ:

- Tiêu đề đơn giản gọi tên khu vực và triệu chứng
- Trích dẫn của người báo cáo
- Hành vi mong đợi và quan sát được
- Phiên bản và môi trường, hoặc `unknown`
- Yếu tố kích hoạt và tần suất
- Permalink thread nguồn
- Các phát hiện ngắn từ việc lần theo nguyên nhân, với giả thuyết được gắn nhãn là giả thuyết
- Screenshot inline hoặc khung hình video tiêu biểu khi được hỗ trợ
- Link đến các artifact còn lại
- Trạng thái tiếp nhận và label đã cấu hình

Đừng đưa một nguyên nhân gốc đoán mò vào tiêu đề.

## 9. Đăng một phán quyết

Chạy một lần preflight tin nhắn cha nguồn mới. Rồi đăng đúng một reply với `channel=SOURCE_CHANNEL_ID` và `thread_ts=SOURCE_THREAD_TS`.

Không bao giờ gọi một action đăng vào channel nguồn mà không có `thread_ts` không rỗng.

Giữ reply ngắn:

- Bắt đầu bằng kết quả.
- Link đến issue tracker đã có hoặc mới khi có.
- Nhắc đến một lần định tuyến lại hoặc một sự thật còn thiếu khi cần.
- Bao gồm tối đa một lần ping owner được phép.
- Kết thúc bằng đúng một dòng marker.

Hợp đồng marker:

```text
[benny:bug]
[benny:bug] tracker=https://tracker.example/issue/123
[benny:performance]
[benny:performance] tracker=https://tracker.example/issue/123
[benny:other]
```

Chỉ dùng các chuỗi marker đã cấu hình. Automation tái hiện chỉ tin marker khi nó đến từ danh tính triage đã cấu hình trong thread nguồn này.

Sau khi đăng, đọc cùng thread nguồn và xác minh phán quyết xuất hiện dưới `SOURCE_THREAD_TS`. Nếu không, không bao giờ thử lại ở tin nhắn gốc.

Nếu lượt chạy này đã tạo một issue tracker và phán quyết không đến nơi, hãy dùng action bù trừ của adapter. Xác minh rằng issue đã bị hủy, đóng, hoặc xóa. Nếu không thể xác minh việc bù trừ, chỉ báo cáo thất bại trong output của lượt chạy automation.

## 10. Theo dõi một khoảng thời gian follow-up

Theo dõi thread nguồn trong khoảng thời gian follow-up đã cấu hình, rồi dừng.

- Chỉ trả lời một câu hỏi trực tiếp dành cho danh tính triage.
- Áp dụng một chỉnh sửa cụ thể cho issue tracker khi an toàn.
- Đừng phát ra marker thứ hai trong cùng lượt chạy.
- Đứng ngoài việc phối hợp giữa người với người và các cuộc trò chuyện bên lề.
- Dừng sớm nếu ai đó yêu cầu automation dừng.

Đừng kéo dài khoảng thời gian quá một lần. Một báo cáo mới nên bắt đầu một lượt chạy mới.
