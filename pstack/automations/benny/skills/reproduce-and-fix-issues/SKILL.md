---
name: reproduce-and-fix-issues
description: Tái hiện các bug Slack đã được triage thông qua một adapter điều khiển app đã cấu hình, kiểm chứng các bản sửa đã có, và chỉ mở một draft pull request có giới hạn sau khi có bằng chứng trước và sau. Chỉ dùng từ automation tái hiện Benny đã cấu hình.
disable-model-invocation: true
---

# Tái hiện và sửa issue

Chờ một triage marker đáng tin trong thread nguồn. Tái hiện chính xác triệu chứng qua UI thật của app đích. Kiểm chứng một bản sửa đã có khi có. Chỉ thử một bản sửa có giới hạn sau một bản tái hiện đã xác nhận.

Nạp cấu hình Benny bên ngoài do automation cung cấp. Nếu config, các action bắt buộc, control adapter, hoặc feature map đã hoàn thiện bị thiếu, hãy fail closed.

## Quy tắc an toàn cứng

- Đóng băng tọa độ channel nguồn và thread gốc trước khi làm bất kỳ việc gì.
- Không bao giờ đăng một tin nhắn gốc trong channel nguồn.
- Preflight tin nhắn cha nguồn trước mỗi lần đăng vào thread nguồn.
- Bên điều phối là bên duy nhất đăng lên Slack.
- Các worker phân tích được ủy quyền là chỉ đọc và trả về phát hiện hoặc ghi chú media.
- Một code worker ở giai đoạn sửa chỉ được sửa khi môi trường của nó loại trừ một cách có thể chứng minh credential Slack và mọi action ghi Slack. Nếu không, bên điều phối sửa.
- Mọi prompt con phải cấm rõ ràng `SendSlackMessage`, `PostToSlack`, `chat.postMessage`, và mọi thao tác ghi Slack khác.
- Không bao giờ đưa cho một con token Slack, chỉ dẫn đăng bài, tọa độ nguồn để đăng, hay quyền báo cáo ra bên ngoài.
- Nếu một con cần quyền ghi Slack để chạy, đừng khởi chạy nó.
- Các bot tiện ích là nguồn bằng chứng. Chúng không sở hữu bản sửa trừ khi một người đã ủy quyền rõ ràng việc sửa cho chúng.
- Triệu chứng phân biệt chính xác phải xuất hiện hai lần qua tương tác UI thật.
- Việc kiểm tra trạng thái có thể xác nhận một quan sát. Nó không được chèn hay ép buộc triệu chứng.
- Không có bản tái hiện đã xác nhận nghĩa là không viết bản sửa.
- Các pull request hoặc commit đã có chuyển lượt chạy sang chế độ kiểm chứng. Đừng viết đè lên chúng.
- Dùng link pull request `github.com`.
- Giữ các bản thu, bản ghi màn hình, log, và token ngoài source control.
- Dùng `principle-guard-the-context-window` của pstack cho phân tích được ủy quyền.
- Áp dụng `principle-sequence-verifiable-units`, `principle-fix-root-causes`, và `principle-prove-it-works` của pstack xuyên suốt việc tái hiện, sửa, và kiểm chứng.

## 1. Đóng băng tọa độ nguồn

Trước khi lập danh sách công việc hoặc ủy quyền:

1. Yêu cầu channel của trigger bằng channel nguồn đã cấu hình.
2. Đặt `SOURCE_THREAD_TS` thành `trigger.thread_ts` khi có. Nếu không, dùng `trigger.ts`.
3. Yêu cầu `SOURCE_THREAD_TS` không rỗng.
4. Lưu `SOURCE_CHANNEL_ID` và `SOURCE_THREAD_TS` thành các giá trị bất biến.
5. Đọc thread nguồn và xác minh gốc của nó có chính xác các tọa độ đó.
6. Lấy permalink nguồn.

Không bao giờ thay thế các giá trị này bằng timestamp của một reply, timestamp vận hành, hay timestamp của tin nhắn trạng thái.

Trước mỗi lần đăng vào channel nguồn:

1. Đọc thread theo các tọa độ bất biến.
2. Xác nhận tin nhắn cha tồn tại, chưa bị xóa, và vẫn thuộc về channel nguồn.
3. Chỉ gửi với `channel=SOURCE_CHANNEL_ID` và `thread_ts=SOURCE_THREAD_TS`.
4. Đọc lại thread và xác minh tin nhắn mới là một reply.

Nếu bất kỳ phép kiểm tra nào thất bại, không đăng gì. Không bao giờ thử lại ở tin nhắn gốc hay trong một channel dự phòng.

## 2. Chờ hợp đồng triage

Theo dõi thread nguồn trong ngân sách phán quyết đã cấu hình. Giữ im lặng trong khi chờ.

Chỉ chấp nhận một phán quyết khi:

- Tác giả của nó khớp với `slack.triage_identity_user_id`.
- Nó là một reply dưới `SOURCE_THREAD_TS`.
- Nó chứa đúng một marker đã cấu hình.

Các dạng marker công khai:

```text
[benny:bug]
[benny:bug] tracker=https://tracker.example/issue/123
[benny:performance]
[benny:performance] tracker=https://tracker.example/issue/123
[benny:other]
```

Chỉ tiếp tục với `bug` hoặc `performance`. Thu URL tracker tùy chọn. Dừng im lặng với `other`, một phán quyết bị thiếu, một tác giả không đáng tin, các marker mâu thuẫn, hoặc hết thời gian.

Marker này thay thế cho danh tính bot riêng tư và việc khớp phán quyết dạng tự do.

## 3. Áp dụng các cổng về quyền sở hữu và artifact sửa

Đọc lại thread ngay trước khi bắt đầu làm việc.

### Ai đó đang sửa nó một cách rõ ràng

Dừng khi một người tuyên bố rõ ràng nhận việc sửa, đưa ra một kế hoạch cài đặt cụ thể, hoặc yêu cầu một agent khác cài đặt, patch, sửa, hoặc mở một pull request.

Đừng coi những điều sau là quyền sở hữu bản sửa:

- Một bot tóm tắt bằng chứng.
- Một công cụ tra cứu log hoặc ticket.
- Ai đó yêu cầu một bot chẩn đoán, giải thích, kiểm tra, hoặc tái hiện.
- Một bot đăng một giả thuyết nguyên nhân mà không đồng ý cài đặt nó.

Đánh giá hành động được yêu cầu, không phải sự có mặt của một bot.

### Đã có một artifact sửa

Nếu một pull request đang mở hoặc commit đã merge có vẻ sửa được báo cáo này, hãy chuyển sang `references/verify-existing-fix.md`.

Một artifact có thể đến từ thread, issue tracker, lịch sử repository, hoặc tìm kiếm pull request. Một tuyên bố không có commit hay pull request không phải là artifact sửa.

Nếu một người sở hữu công việc nhưng chưa tạo ra artifact, hãy dừng. Đừng đua với họ.

## 4. Mở một thread vận hành tùy chọn

Nếu `slack.operations_channel_id` được cấu hình, bên điều phối có thể tạo một tin nhắn trạng thái gốc ở đó. Đây là lần đăng gốc duy nhất được phép trong quy trình tái hiện.

Lưu tọa độ của nó thành `OPERATIONS_CHANNEL_ID` và `OPERATIONS_THREAD_TS`. Không bao giờ nhầm lẫn chúng với tọa độ nguồn.

Dùng các chuỗi trạng thái Unicode thuần đã cấu hình. Giữ chữ trạng thái ngắn:

- Reproducing
- Could not reproduce
- Blocked
- Reproduced
- Verifying existing fix
- Attempting bounded fix
- Draft pull request opened
- Fix did not land

Ưu tiên các action Slack của Cursor đã cấu hình. Chỉ dùng `BENNY_SLACK_BOT_TOKEN` khi người dùng đã cấu hình nó cho một năng lực còn thiếu hẹp, như sửa chính tin nhắn trạng thái này. Không bao giờ để lộ token cho một worker.

Nếu không có channel vận hành nào được cấu hình, hãy giữ trạng thái chi tiết trong output của lượt chạy automation. Đừng thay thế bằng một tin nhắn gốc trong channel nguồn.

## 5. Nạp và kiểm tra control adapter

Đọc `references/control-adapter.md` và map đã hoàn thiện tại `control.feature_map_path`, rồi gọi skill được gọi tên bởi `control.skill_name`.

Tìm phần feature map khớp với đường đi người dùng được báo cáo. Đọc nó trước khi điều khiển app. Nếu không có phần nào bao phủ feature, hãy đánh dấu lượt chạy là bị chặn thay vì bịa ra một đường đi hay selector.

Yêu cầu đủ bảy năng lực:

1. Khởi động app đích và môi trường test đã cấu hình.
2. Điều hướng đến feature trong map và chạy thử các trạng thái được ghi lại của nó.
3. Điều khiển UI thật bằng click, gõ, phím, cuộn, kéo, đổi kích thước, hoặc điều hướng.
4. Kiểm tra trạng thái mà không thay đổi nó.
5. Chụp screenshot.
6. Bắt đầu và dừng ghi màn hình.
7. Dọn dẹp process, session, profile, và dữ liệu tạm.

Nếu adapter vắng mặt hoặc bất kỳ năng lực bắt buộc nào bị thiếu, hãy đánh dấu trạng thái vận hành là bị chặn và dừng. Đừng giả vờ một screenshot, unit test, thay đổi trạng thái, hay việc đọc source là một bản tái hiện UI.

## 6. Nghiên cứu báo cáo

Đọc toàn bộ thread nguồn và issue tracker khi có.

Thu thập:

- Đường đi hành động chính xác
- Hành vi mong đợi
- Hành vi quan sát được
- Trạng thái phân biệt nơi chúng rẽ nhánh
- Tần suất
- Phiên bản, môi trường, và nền tảng
- File đính kèm và chữ ký lỗi
- Khu vực code ứng viên

Kiểm tra screenshot và video. Dùng các worker song song chỉ đọc cho lịch sử code, ý tưởng test, vẽ bản đồ blast radius, và xem xét media khi hữu ích. Mỗi worker nhận một câu hỏi hẹp và lệnh cấm ghi Slack.

Lần theo hành động qua repository. Dùng skill `why` của pstack cho lịch sử hồi quy và code phòng thủ. Hình thành các giả thuyết nguyên nhân cạnh tranh và xác định bằng chứng có thể phân tách chúng.

## 7. Tái hiện

Khởi động app đích qua control adapter.

Xác nhận đúng app, workspace, tài khoản, bộ dữ liệu, và trạng thái feature trước khi hành động. Dùng các dấu hiệu ổn định của app. Đừng chỉ dựa vào thứ tự cửa sổ hay một tiêu đề quen thuộc.

Điều khiển đường đi được báo cáo qua các thao tác UI thật.

Trước khi gọi là đã tái hiện:

1. Gọi tên trạng thái cuối đúng.
2. Gọi tên trạng thái cuối hỏng.
3. Đi đến điểm mà chúng rẽ nhánh.
4. Quan sát trạng thái hỏng.
5. Reset đủ trạng thái để lần thử thứ hai là độc lập.
6. Lặp lại cùng đường đi và quan sát lại cùng trạng thái hỏng.
7. Đối chiếu một giá trị trạng thái thật khi có thể.

Một dialog, trạng thái loading, hay bước thiết lập được mong đợi không phải là bug. Thu trạng thái cuối phân biệt hành vi đúng với hỏng.

Dùng ngân sách tái hiện đã cấu hình. Nếu triệu chứng không tái hiện trong ngân sách đó, hãy báo cáo một kết quả `Could not reproduce` rõ ràng. Nếu môi trường không thể cung cấp một năng lực bắt buộc, hãy báo cáo `Blocked` và nêu những gì bị thiếu.

## 8. Thu và xem xét bằng chứng

Với một bản tái hiện thành công:

- Ghi lại toàn bộ đường đi qua triệu chứng.
- Chụp screenshot trạng thái cuối bị hỏng.
- Lưu một ghi chú ngắn với các bước chính xác và trạng thái quan sát được.
- Giữ artifact trong thư mục artifact tạm đã cấu hình.

Để một media reviewer chỉ đọc trả lời một câu hỏi: bằng chứng có cho thấy rõ ràng trạng thái hỏng phân biệt không?

Nếu câu trả lời là không hoặc không chắc chắn, bản tái hiện chưa được xác nhận. Thu bằng chứng tốt hơn hoặc dùng `Could not reproduce`.

Chỉ đăng bằng chứng chi tiết trong thread vận hành khi được cấu hình. Giữ cập nhật nguồn ngắn gọn.

## 9. Báo cáo kết quả tái hiện

Cập nhật trạng thái vận hành trước.

Với `Could not reproduce` hoặc `Blocked`, không đăng gì trong thread nguồn. Thread vận hành hoặc output của lượt chạy mang kết quả.

Với một bản tái hiện đã xác nhận, chạy preflight nguồn và đăng tối đa một reply nguồn không được yêu cầu:

- Nói rằng issue đã tái hiện được.
- Link đến thread bằng chứng vận hành khi có.
- Bao gồm tối đa ba phát hiện ngắn.
- Link đến issue tracker khi có.
- Không ping owner theo mặc định.

Chỉ đính kèm bằng chứng khi action Slack đã cấu hình giữ nó bên trong cùng thread nguồn và chính sách lưu giữ của tổ chức cho phép.

Chờ khoảng thời gian bác bỏ đã cấu hình. Nếu một người cho thấy việc thiết lập hoặc cách hiểu bị sai, hãy chỉnh lại bản tái hiện một lần. Đừng bắt đầu giai đoạn sửa cho đến khi khoảng thời gian đóng lại mà không có lời bác bỏ hợp lệ nào.

## 10. Kiểm chứng một bản sửa đã có

Khi có một artifact sửa, hãy làm theo `references/verify-existing-fix.md`.

Việc kiểm chứng phải cho thấy triệu chứng trên baseline và sự vắng mặt của nó trên bản build đã patch. Cả hai đường đều dùng UI thật hai lần.

Đừng sửa bản sửa đã có, thêm một patch cạnh tranh, hay mở một pull request thay thế.

## 11. Xác định điều kiện cho một bản sửa có giới hạn

Chỉ thử một bản sửa khi tất cả các điều sau đều đúng:

- Kết quả là một bản tái hiện đã xác nhận đơn thuần.
- Việc xem xét media đã xác nhận trạng thái cuối bị hỏng.
- Không có artifact sửa nào đã xuất hiện.
- Không ai nhận việc sửa trong khoảng thời gian bác bỏ.
- Bằng chứng runtime xác định được nguyên nhân gốc.
- Thay đổi có khả năng nằm vừa ngân sách sửa và phạm vi repository đã cấu hình.
- Control adapter có thể chạy cả bản build baseline và bản đã patch.

Nếu bất kỳ điều kiện nào thất bại, hãy giữ báo cáo tái hiện và dừng mà không có pull request.

Khi qua cổng, cập nhật trạng thái vận hành thành `Attempting bounded fix`.

## 12. Tìm nguyên nhân gốc và cài đặt

Bên điều phối sở hữu mọi bài đăng Slack, việc review diff cuối cùng, các commit, và pull request.

Các worker chỉ đọc có thể:

- Lần theo code và lịch sử
- Đề xuất test
- Vẽ bản đồ blast radius
- Review một diff
- Xem xét media

Chúng không sửa, không chạy thao tác ghi bên ngoài, không đăng trạng thái, và không sở hữu bản sửa.

Một chỉnh sửa code có phạm vi chặt chẽ có thể được ủy quyền trong giai đoạn này chỉ khi việc cô lập công cụ loại bỏ credential Slack và mọi action ghi Slack khỏi worker đó. Prompt của nó vẫn phải mang lệnh cấm ghi Slack rõ ràng. Bên điều phối review chỉnh sửa và chạy hoặc kiểm chứng các test bắt buộc. Nếu việc cô lập công cụ không chắc chắn, hãy giữ việc chỉnh sửa trong bên điều phối.

Xác nhận cơ chế bằng bằng chứng runtime. Loại bỏ các giả thuyết cạnh tranh trước khi sửa.

Sửa nguyên nhân gốc bằng thay đổi nhỏ nhất có thể biện minh.

- Gọi skill `tdd` của pstack khi có một mục tiêu test local rẻ, và viết test thất bại trước bản sửa.
- Nêu lý do bỏ qua TDD khi đường đi tốn kém, không rõ ràng, hoặc nặng về tích hợp.
- Giữ việc dọn dẹp không liên quan ra ngoài.
- Dừng nếu thay đổi lớn vượt quá ngân sách công sức hoặc rủi ro đã cấu hình.

## 13. Chứng minh bản sửa

Giữ bằng chứng baseline ban đầu.

Trên bản build đã patch:

1. Chạy cùng đường đi UI thật.
2. Lặp lại hai lần.
3. Cho thấy trạng thái hỏng đã biến mất.
4. Cho thấy trạng thái mong đợi ở vị trí của nó.
5. Ghi một bản ghi màn hình và chụp screenshot sau.
6. Đối chiếu cùng giá trị trạng thái thật đã dùng cho baseline.

Một lần biên dịch, unit test, code review, hay một diff hợp lý không phải là bằng chứng sau.

Chạy các test tập trung, rồi smoke test blast radius quanh hành vi đã thay đổi. Bao phủ các trạng thái, input, quyền, nền tảng, và đường thất bại lân cận mà thay đổi có thể ảnh hưởng. Dừng mà không có pull request nếu vẫn còn một hồi quy.

## 14. Mở một draft pull request

Chỉ sau khi có bằng chứng trước và sau:

- Review diff cuối cùng để tìm thay đổi không liên quan và secret.
- Chạy các phép kiểm tra bắt buộc của repository.
- Tạo các commit nhỏ có thứ tự khi quy trình của repository cho phép.
- Mở một draft pull request. Không bao giờ merge hay deploy từ quy trình này.
- Link đến issue tracker đã cấu hình bằng cú pháp pull request mà tracker hỗ trợ.
- Dùng dạng URL công khai đã cấu hình, thường là `https://github.com/{owner}/{repo}/pull/{number}`.
- Bao gồm các bước tái hiện, nguyên nhân gốc, kết quả test, bằng chứng trước và sau, và các phép kiểm tra blast radius.
- Chạy chữ của pull request và mọi cập nhật Slack qua skill `unslop` của pstack.

Nếu việc tạo pull request thất bại, đừng tuyên bố thành công. Giữ trạng thái commit hoặc branch trong output của lượt chạy và đánh dấu trạng thái vận hành là `Fix did not land`.

Khi thành công, đánh dấu trạng thái vận hành là `Draft pull request opened` và đăng một reply ngắn gọn trong thread vận hành với pull request được link. Đừng tạo một tin nhắn gốc thứ hai trong channel nguồn hay một reply nguồn không được yêu cầu.

## 15. Follow-up và dọn dẹp

Theo dõi thread vận hành đã cấu hình trong một khoảng thời gian follow-up.

- Trả lời một câu hỏi trực tiếp từ bằng chứng đã thu thập.
- Áp dụng một chỉnh sửa cụ thể và chạy lại bản tái hiện một lần khi nó làm vô hiệu việc thiết lập.
- Đứng ngoài việc phối hợp giữa người với người và các cuộc trò chuyện bên lề.
- Dừng khi được yêu cầu.

Luôn gọi năng lực cleanup của control adapter. Chỉ giữ artifact trong thời gian chính sách lưu giữ đã cấu hình cho phép.
