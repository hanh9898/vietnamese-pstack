# Các prompt đáng sao chép

Thay vào đường dẫn, skill, và phép kiểm tra hoàn thành thật. Cách diễn đạt thân mật cũng được.

## Hiểu

- `/poteto-mode đọc <thread>. nhắc lại vấn đề gốc bằng lời của bạn, bằng ngôn ngữ đơn giản.`
- `/in-your-own-words <yêu cầu dài hoặc lộn xộn>`
- `/sharpen <prompt bạn sắp gửi>`
- `/poteto-mode điều tra tại sao <triệu chứng>. cho tôi biết những gì ta đã biết, dữ liệu bạn đã dùng, và các giả thuyết tốt nhất của bạn. chưa sửa code.`
- `dùng /how để hiểu <subsystem>. rồi dùng /why để tìm hiểu tại sao gần đây nó bị hỏng.`
- `/recall việc tôi làm với <chủ đề> tuần trước, rồi đọc <issue>.`
- `/teach tôi tại sao bạn cài đặt theo cách này mà không phải <cách khác>. bạn đã đánh đổi gì?`
- `/poteto-mode tiếp quản branch này. đọc log quyết định, tìm những gì đã xong, và tiếp tục. đừng làm lại việc đã xong.`

## Xây dựng

- Bug: `/poteto-mode <triệu chứng>. tái hiện trước, rồi sửa và kiểm chứng.`
- Bug trong một app: `/poteto-mode tái hiện cái này bằng /verify-<app>. nếu nó tái hiện được trên main, hãy sửa và cho tôi xem một video làm bằng chứng.`
- Bug có test rẻ: `/poteto-mode tái hiện <bug> trước. nếu có đường test rẻ, dùng /tdd. rồi sửa và chạy lại.`
- Feature: `/poteto-mode thêm <hành vi>. <output hiện tại> giữ nguyên từng byte. kiểm chứng cả hai.`
- Refactor: `/poteto-mode chuyển <code> vào một module, không thay đổi hành vi. ghi lại output hiện tại trước và chứng minh nó không đổi sau đó.`
- Hiệu năng: `/poteto-mode <thao tác> mất <thời gian> trên <fixture>. trace nó, sửa nguyên nhân đã đo được, cho tôi xem trước và sau.`

## Thiết kế và lập kế hoạch

- `/poteto-mode làm prototype vài phương án cho <feature>. chụp screenshot hoặc quay video để tôi so sánh.`
- `/poteto-mode ta cần <feature>. dùng /architect trước, và trả lời các câu hỏi còn mở bằng prototype. để tôi review trước khi làm tiếp.`
- `/poteto-mode viết một tutorial về cách tôi sẽ dùng <package mới> trước. rồi /teach tôi tại sao nó tốt hơn cái hiện tại.`
- `hỏi /arena ý kiến thứ hai về thread này và cách tiếp cận của ta.`
- `/poteto-mode biến thiết kế này thành một kế hoạch. các PR nhỏ kiểm chứng được, mỗi PR có các bước kiểm chứng riêng.`
- `/poteto-mode lập kế hoạch migration <thư viện> sang <mục tiêu>. các PR nhỏ kiểm chứng được. kết quả phải khớp chính xác với bản gốc, kể cả bug.`

## Review và ship

- `/interrogate toàn bộ branch, nhưng với thái độ hoài nghi. chưa thay đổi gì. không bắt lỗi vặt trừ khi đó là bug hoặc hồi quy thật.` Đọc cả danh sách Đã bỏ.
- `/create-formal-verification-skill chứng minh <tính chất> đúng trong <module>, kể cả khi <các bước> xen kẽ nhau hoặc retry.` Sau các lần merge hoặc refactor trong code đó: `/maintain-formal-verification-skill`.
- `/swarm kiểm tra mọi package trong <dir> với check script của nó. mỗi package một worker. một báo cáo.`
- `/poteto-mode mở pr. các commit nhỏ có thứ tự, bằng chứng trong mô tả.`
- `/poteto-mode babysit pr này. làm cho nó xanh.` Chỉ để xem trạng thái: `/poteto-mode kiểm tra pr <số>. còn gì tồn đọng không?`
- `/poteto-mode land stack.`

## Rời đi và quay lại

- `/poteto-mode tôi đi ngủ đây. <mục tiêu> trong một worktree mới tách từ <base>. xong nghĩa là <các phép kiểm tra>. giữ một log quyết định. đừng hỏi tôi trước khi commit. /loop cho đến khi xong. nếu bạn thật sự bị kẹt sau vài giờ, hãy dừng và viết ra lý do.`
- `/show-me-your-work cập nhật cho tôi những gì bạn đã làm đêm qua.` Đọc phần Attention của nó trước.
- `/ketchup` cập nhật cho bạn về chat này kể từ tin nhắn cuối của bạn và liệt kê mọi quyết định đang chờ bạn.
- `/poteto-mode autopilot toàn phần cho hàng đợi này. mỗi mục độc lập.`
- `/poteto-mode autopilot các thay đổi này, nhưng đừng merge. tôi sẽ tự land chúng.`
- `/reflect ghi lại những gì ta đã học để lượt chạy tiếp theo không lặp lại.` Chỉ phê duyệt các chỉnh sửa thay đổi một quyết định trong tương lai.
- `/bro` nhắc lại câu trả lời cuối bằng lời lẽ đơn giản.
