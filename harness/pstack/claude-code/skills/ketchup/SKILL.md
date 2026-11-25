---
name: ketchup
description: "Cập nhật cho người dùng những gì đã thay đổi trong chat này kể từ tin nhắn cuối của họ, bằng lời lẽ đơn giản và hình ảnh nhỏ. Liệt kê mọi mục đang chờ họ cùng những gì họ cần để quyết định chỉ từ câu trả lời. Dùng cho /ketchup."
disable-model-invocation: true
---

# Ketchup

Cập nhật cho người dùng những gì đã thay đổi trong chat này kể từ tin nhắn cuối cùng họ viết trước `/ketchup`, và giúp họ hiểu từng thay đổi, không chỉ nó đang ở đâu. Rồi bày ra mọi quyết định đang chờ họ để họ có thể đưa ra chỉ từ câu trả lời của bạn. Thông báo và kết quả của subagent không phải tin nhắn của họ. Giả định người dùng nhớ tin nhắn cuối của họ và không nhớ gì sau đó.

Dùng giọng văn của [`/bro`](../bro/SKILL.md), không dùng task của nó: lời lẽ đơn giản, câu ngắn, không thuật ngữ, như một người cập nhật cho người khác. Nói điều gì đã thay đổi đối với người dùng, không nói bạn đã làm thế nào. Nói "các test đã pass", không nói "CI xanh". Bỏ hash, đường dẫn file, lệnh, số build, và số lượng test trừ khi người dùng cần một cái để hành động. Gọi mỗi PR, branch, hoặc agent bằng một cái tên người dùng biết, không phải một nhãn bạn tự đặt. Nếu một sự thật cần context mới có nghĩa, hãy đưa ra context hoặc bỏ sự thật đó.

## Thu thập những gì đã thay đổi

Giữ lượt này chỉ đọc. Chỉ tạo hình ảnh từ những gì bạn đã có: không thay đổi code, không khởi động một app hay một job, không đăng bất cứ thứ gì. Thu thập công việc của chính bạn kể từ tin nhắn đó, báo cáo từ các subagent, và tin nhắn từ bất kỳ ai khác trong chat này. Kiểm tra trạng thái hiện tại của mỗi PR, lượt chạy CI, hoặc agent mà chat này đã chạm vào. Kiểm tra mỗi con số bạn sẽ hiển thị với các sự thật mà nó đến từ, và nói vậy khi bạn sửa một con số.

Một mục cần hành động là một quyết định hoặc bước chỉ người dùng có thể thực hiện, như một lựa chọn sản phẩm, một phê duyệt, một hành động không thể đảo ngược, hoặc quyền truy cập bạn không có. Bao gồm mọi mục vẫn đang chờ người dùng, kể cả mục được nêu ra trước tin nhắn cuối của họ. Công việc bạn vẫn tự làm được không phải là mục cần hành động. Không bao giờ bịa ra một quyết định để lấp đầy câu trả lời. Một bước người dùng không yêu cầu và công việc không cần thì không phải là mục cần hành động, trừ khi nó không thể đảo ngược và đang chờ người dùng: cho nó một dòng và không có hình ảnh.

Một quyết định có thể bao gồm nhiều mục, như mỗi PR trong một bộ đang chờ merge. Với mỗi mục, thu thập link của nó, những gì nó thay đổi cho người dùng, bằng chứng đằng sau lựa chọn của bạn, rủi ro của nó, và lựa chọn của bạn. Viết "không rõ" cho một sự thật mà quyết định cần nhưng bạn không biết. Bỏ một link mà bạn không có.

## Viết câu trả lời

Dành chữ cho các quyết định, không phải cho câu chuyện. Giữ phần những gì đã xảy ra dưới 100 từ, không tính hình ảnh, và ngắn hơn khi ít chuyện xảy ra hơn. Bỏ công việc không thay đổi gì cho người dùng. Cho mỗi mục khoảng 30 từ. Câu trả lời dài ra theo số mục: hai mục cần tổng cộng ít hơn hẳn 150 từ, không tính hình ảnh, còn ba mươi mục cần nhiều hơn nhiều. Không bao giờ cắt mục hay thu nhỏ chúng để giữ dưới một số từ: không dùng một con số thay cho một danh sách, và không dùng một link thay cho một mục. Một link có thể thêm chiều sâu, nhưng chỉ câu trả lời thôi phải đủ để quyết định.

Mở đầu bằng một câu ngắn gọi tên những gì đang chờ người dùng, hoặc nói rằng không có gì cả. Các mục cần hành động đưa ra chi tiết. Nếu không có gì xảy ra và không có gì chờ người dùng, hãy nói vậy và dừng.

Rồi cho thấy những gì đã xảy ra, hình ảnh trước. Nhúng nội tuyến các screenshot và video mà công việc đã tạo ra, rồi mọi sơ đồ giải thích một thay đổi. Rồi tóm tắt bằng mỗi thứ người dùng đã yêu cầu một gạch đầu dòng ngắn: kết quả của nó, và liệu nó đã xong, vẫn đang chạy, thất bại, hay chưa được kiểm tra. Viết mỗi dòng theo cách bạn sẽ nói thành lời: "Tìm kiếm chậm vì thiếu một index", không phải "Review tìm kiếm: xong" hay "Tìm kiếm chậm: thiếu index". Gọi tên mọi bug đã được tìm ra và sửa trên đường đi. Mỗi dòng phải vẫn đúng khi đọc riêng. Không bao giờ đánh dấu một thứ là xong khi nó vẫn đang chờ người dùng, và bỏ những gì các mục cần hành động đã nói. Dưới phần tóm tắt, đưa ra tối đa ba dòng ngắn thay đổi điều người dùng biết hoặc phải làm. Rồi gọi tên trong một dòng mọi công việc còn lại mà bạn tự làm được.

Rồi liệt kê các mục cần hành động. Hỏi quyết định mà người dùng sở hữu, như merge, phê duyệt, hay chọn, và đưa ra lựa chọn của bạn. Một bước bạn sẽ làm trước đi vào lựa chọn của bạn. Mọi thứ phải xảy ra trước, và mọi thứ không thể hoàn tác, cũng vậy. Đưa ra số hoặc link của mỗi PR, issue, hoặc agent mà một quyết định nói đến, kể cả trong một quyết định giữa các phương án.

Khớp hình dạng với quyết định. Một quyết định về một mục là một gạch đầu dòng: quyết định, lựa chọn của bạn, những gì nó thay đổi cho người dùng, bằng chứng đằng sau lựa chọn của bạn, và rủi ro của nó, với mục được gọi tên một lần. Khi các mục chung một quyết định, viết quyết định và lựa chọn của bạn một lần, rồi cho mỗi mục một gạch đầu dòng riêng, rủi ro nhất trước: link và tên của nó, những gì nó thay đổi cho người dùng, bằng chứng đằng sau lựa chọn của bạn, và rủi ro của nó. Chỉ gọi tên lựa chọn của một mục ở nơi nó khác với lựa chọn của quyết định. Đưa ra rủi ro của mỗi mục kể cả khi nó thấp, như "Rủi ro thấp: chỉ màu sắc thay đổi." Chỉ nói việc chờ đợi tốn kém gì khi nó hơn một sự chậm trễ, như một hạn chót hay dữ liệu bị mất.

Với một quyết định giữa các phương án, hãy đưa ra mọi phương án mà công việc đã cân nhắc, mỗi phương án kèm những gì nó mang lại cho người dùng và cái giá của nó, và trạng thái hiện tại khi có. Những cái giá đó là rủi ro của quyết định, nên đừng thêm dòng rủi ro riêng. Khi các screenshot ở trên cho thấy các phương án, hãy viết lợi ích và cái giá của mỗi phương án dưới screenshot của nó.

## Hình ảnh

Một hình ảnh là một bức hình: một screenshot, một video, một sơ đồ Mermaid, một biểu đồ hoặc sơ đồ từ `/visualize`, hoặc một ảnh được tạo. Một bảng Markdown không phải là hình ảnh, kể cả khi có cột trước và sau.

Khi thứ gì đó dễ nắm bắt dưới dạng hình hơn là câu chữ, hãy vẽ nó: cách một thiết kế hay hệ thống hoạt động, một stack PR hoặc chuỗi phụ thuộc với trạng thái của từng PR, trước và sau của một bản sửa, hoặc các phương án đặt cạnh nhau. Không bao giờ vẽ một danh sách trạng thái, một danh sách các mục cần hành động, hoặc các hộp không có gì nối với nhau. Không bao giờ đưa ra một sự thật hai lần, trong chữ hay giữa các hình ảnh.

Giữ mỗi hình ảnh đủ nhỏ để đọc trong một cái liếc: tối đa sáu hộp, mỗi hộp tối đa tám từ. Viết nhãn bằng từ ngữ đơn giản mà một người sẽ nói, không phải các thẻ như "Tests: pass". Một sự thật cần cả một câu thì thuộc về phần chữ, hoặc không ở đâu cả.

Nhúng nội tuyến screenshot và video khi thay đổi nhìn thấy được, không chỉ dưới dạng link. Nếu một thay đổi nhìn thấy được không có cái nào, hãy đánh dấu dòng tóm tắt của nó là "Chưa có screenshot," và nói ở đó những gì đã thay đổi trên màn hình. Vẽ sơ đồ và biểu đồ từ những sự thật bạn có: một sơ đồ Mermaid cho cách mọi thứ kết nối và một biểu đồ `/visualize` cho các con số. Không bao giờ bịa ra một con số, và không bao giờ vẽ hay tạo ảnh của một màn hình bạn đã không chụp. Chỉ liên kết các artifact có tồn tại.
