---
name: ketchup-video
description: "Cập nhật cho người dùng như /ketchup, với một video ngắn có phụ đề gồm các slide cho những gì đã xảy ra và các quyết định đang chờ dưới dạng chữ bên dưới. Dùng cho /ketchup-video."
disable-model-invocation: true
---

# Ketchup video

Làm theo [`/ketchup`](../ketchup/SKILL.md), nhưng thể hiện những gì đã xảy ra trong một video ngắn có phụ đề thay cho phần tóm tắt và hình ảnh của nó. Khoảng thời gian của nó bắt đầu từ tin nhắn cuối cùng người dùng viết trước `/ketchup-video`, không phải trước bất kỳ `/ketchup` nào trước đó. Viết và render video, bên ngoài repo, là ngoại lệ duy nhất đối với quy tắc chỉ đọc của nó. Câu trả lời là câu mở đầu của ketchup, video được nhúng, một dòng gọi tên mọi công việc còn lại mà bạn tự làm được, và các mục cần hành động. Khi video cho thấy các phương án của một quyết định, hãy gọi mỗi phương án bằng tên mà video đặt cho nó. Nếu render thất bại, hãy nói vậy trong một dòng và chỉ đưa ra các quyết định.

## Slide

Dùng các screenshot, recording, diff, và dữ liệu mà công việc đã tạo ra, không phải văn xuôi trong chat về chúng. Trước khi vẽ, hãy viết một câu mà người dùng nên mang về và mỗi slide một dòng. Bỏ mỗi slide không thay đổi điều người dùng biết. Dùng tối đa 10 slide, và ít hơn thì tốt hơn. Không ghi chú nào trong hai cái đó đi vào câu trả lời.

Mỗi slide nêu một điểm. Xây các slide trên một bức hình và thay đổi nó từ slide này sang slide khác, thay vì cắt sang một hình không liên quan. Một màu hoặc hình dạng mang cùng một ý nghĩa trên mọi slide. Thể hiện công việc bằng hình ảnh, như cách một hệ thống hoạt động, một stack PR với trạng thái của từng PR, trước và sau của một bản sửa, hoặc các phương án đặt cạnh nhau. Chỉ vào những gì đã thay đổi bằng mũi tên, đánh dấu, và chuyển động. Một slide không bao giờ là một danh sách gạch đầu dòng, một danh sách trạng thái, một bảng, hay các hộp không có gì nối với nhau.

Giữ chữ ở mức tối thiểu. Đặt mỗi nhãn lên chính thứ nó gọi tên, bằng từ ngữ đơn giản mà một người sẽ nói, không phải các thẻ như "Tests: pass". Không bao giờ chú thích những gì một bức hình đã cho thấy, và không bao giờ đưa ra một sự thật hai lần, giữa các slide hay trong phần chữ bên dưới chúng.

Cho thấy kết quả của mỗi thứ người dùng đã yêu cầu, và liệu nó đã xong, vẫn đang chạy, thất bại, hay chưa được kiểm tra. Không bao giờ thể hiện một thứ là đã xong khi nó vẫn đang chờ người dùng. Cho thấy mọi bug đã được tìm ra và sửa trên đường đi. Nếu một thay đổi nhìn thấy được không có screenshot, hãy nói vậy trên slide của nó và gọi tên những gì đã thay đổi trên màn hình. Chỉ vẽ từ những sự thật bạn có. Không bao giờ bịa ra một con số, và không bao giờ vẽ một màn hình bạn đã không chụp.

## Phụ đề

Cho mỗi slide một dòng phụ đề ngắn, khoảng mười từ, nói lên điểm của nó theo cách bạn sẽ nói với người dùng, chỉ từ những gì slide đó cho thấy. Nói bức hình có nghĩa là gì thay vì đọc lên các nhãn của nó. Đặt phụ đề trong một dải bên dưới slide, cùng chiều cao trên mọi slide và trống ngoại trừ phụ đề, để nó không bao giờ che slide. Đặt cỡ chữ nhỏ, nhưng đọc được khi video phát ở kích thước chat.

## Render

Render một video ngang không tiếng, như mp4, có chuyển động giữa các slide. Mọi frame là chính slide đó, tràn viền, phía trên dải phụ đề của nó. Tạo các frame từ slide, không bao giờ bằng cách quay màn hình, và in cứng mỗi phụ đề vào các frame của slide đó để nó ở trên màn hình suốt thời gian giữ của slide. Thời gian giữ là thời gian một slide hoàn toàn ở trên màn hình, không tính chuyển động vào hoặc ra. Giữ mỗi slide đủ lâu để đọc các từ nó thêm vào, ít nhất một giây cho mỗi ba từ. Một slide thêm vào phụ đề của nó và mỗi từ không có trên slide trước, bao gồm cả một nhãn mà nó thay đổi. Slide đầu tiên thêm vào tất cả các từ của nó. Các từ bên trong một screenshot không được tính.

Trước khi nhúng video, hãy kiểm tra file đã render. Xem một frame từ mỗi slide ở kích thước chat, và kiểm tra rằng phụ đề của nó đọc được và không che gì. Đo mỗi thời gian giữ bằng cách khớp các frame của file với slide, không dùng bộ phát hiện frame tĩnh, vốn đếm các đầu mờ của một hiệu ứng fade là tĩnh. Đếm số từ mỗi slide thêm vào so với thời gian giữ đã đo của nó. Sửa mọi slide bạn không thể đọc kịp trong thời gian đó, render lại, và kiểm tra lại.
