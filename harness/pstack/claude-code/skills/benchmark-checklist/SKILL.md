---
name: benchmark-checklist
description: "Thẩm định một phép đo hiệu năng (yếu tố giới hạn, tinh chỉnh, giới hạn vật lý, lỗi, khả năng lặp lại, mức liên quan, và liệu công việc có thật sự xảy ra) trước khi bạn báo cáo hoặc hành động dựa trên nó. Dùng khi bạn chạy một benchmark hoặc báo cáo một mức tăng tốc hay hồi quy mà bạn đã đo."
disable-model-invocation: true
---

# Checklist benchmark

Dùng skill này khi bạn tạo ra một con số hiệu năng: trước và sau của một PR, một khẳng định về hồi quy, một harness hillclimb, hoặc một lựa chọn thư viện hay cấu hình. Trả lời mỗi câu hỏi bằng bằng chứng từ một lượt chạy, không phải phỏng đoán về code.

Với một ước lượng nhanh mà người dùng yêu cầu, một lượt chạy là đủ. Vẫn kiểm tra câu hỏi 4 và 7, và nói rằng đó là một lượt chạy. Bỏ qua phần còn lại trừ khi lượt chạy đó trông có vẻ sai. Một lựa chọn giữa các phương án không bao giờ là ước lượng nhanh.

## Trước khi chạy bất cứ thứ gì

- Viết ra khẳng định bạn dự kiến đưa ra, bằng những từ bạn sẽ ship ("export nhanh hơn 30% ở p50 trên dataset 60k dòng"). Các câu hỏi kiểm tra câu đó.
- Đọc script đo. Ghi chú nó đo thời gian gì, đếm gì, và bỏ qua gì.
- Kiểm tra load average bằng `uptime` và số core bằng `nproc`. Nếu máy đang bận, hãy tìm xem cái gì đang chạy. Nếu bạn không thể dừng nó, hãy chạy xen kẽ các phía để cả hai thấy cùng một mức nhiễu, và nói vậy trong báo cáo.

## Các câu hỏi

1. **Tại sao không gấp đôi?** Gọi tên yếu tố giới hạn. Profile trong một lượt chạy bạn không báo cáo, vì profiler và tracer làm công việc chậm đi. Dùng CPU theo từng process (`top`, `pidstat`), một profiler runtime (`node --cpu-prof`, `py-spy`, `perf`), I/O wait, và số syscall (`strace -c` trên Linux), rồi ánh xạ điểm nóng về source. Theo dõi cả bộ tạo tải: nếu nó bão hòa trước, bạn đã đo bộ tạo tải. Nếu một thay đổi không làm con số dịch chuyển, yếu tố giới hạn giải thích tại sao, nên hãy tìm nó trước khi bạn gọi thay đổi đó là vô ích.
2. **Nó đã được tinh chỉnh chưa?** Chạy mọi phía theo cách production chạy nó: bản build release, flag và env của production, cài đặt batching và transaction, connection pool, cache nóng hoặc lạnh như production thấy, và cùng phiên bản và dữ liệu. Nếu một phía chạy với mặc định, bạn đã so sánh các cấu hình, không phải các cách cài đặt. Một yếu tố giới hạn là một cài đặt (mỗi dòng một commit, một bản build debug, thiếu một index) nghĩa là phía đó chưa được tinh chỉnh. Tinh chỉnh nó và đo lại trước khi bạn chọn bên thắng. Nếu bạn không thể tinh chỉnh nó, đừng chọn bên thắng từ lượt chạy đó. Khi người dùng đang chọn thứ để áp dụng, thu hẹp khẳng định về code như nó đang ship hôm nay không sửa được điều này, vì họ áp dụng phương án, không phải các cài đặt hôm nay.
3. **Nó có phá vỡ giới hạn không?** Làm phép tính. So sánh byte mỗi giây với băng thông đĩa và mạng, số thao tác mỗi giây nhân chi phí mỗi thao tác với số core của bạn, và thời gian tiết kiệm được với thời gian mà phần bị thay đổi đã tốn. Loại bỏ một phần chiếm 10% lượt chạy có thể làm lượt chạy nhanh hơn tối đa khoảng 11%. Một kết quả vượt quá giới hạn đã đo thứ khác với công việc, như một cache, một no-op, hoặc một bug.
4. **Nó có lỗi không?** Đếm các thất bại và phản hồi không thành công, và kiểm tra rằng output là đúng, không chỉ là có mặt. Các lần từ chối thường nhanh, còn timeout và retry thì chậm. Nếu script không đếm lỗi, hãy thêm phép đếm.
5. **Nó có tái hiện được không?** Chạy mỗi phía ít nhất 5 lần, xen kẽ (A, B, A, B, v.v.) để warmup, khởi tạo lười, cache, và trôi dạt không thiên vị bên nào. Báo cáo trung vị và khoảng. Một khoảng cách nhỏ hơn mức biến thiên giữa các lượt chạy là không có khác biệt đo được. Khi kết quả sát nhau, hãy dùng kiểm định rank-sum hoặc thống kê của chính harness.
6. **Nó có quan trọng không?** Bên cạnh mọi kết quả vi mô, hãy đo đường end-to-end mà người dùng phải chờ, với kích thước dữ liệu và mức đồng thời thực tế, và báo cáo kết quả vi mô như một phần của tổng thể. Một helper chiếm 1% của một request có thể làm request nhanh hơn tối đa 1%, dù helper có nhanh đến đâu.
7. **Nó có thật sự xảy ra không?** Xác nhận công việc đã chạy trong vùng được đo thời gian: request đã đến server, các dòng đã được ghi, các byte đã được đọc, và code đã dùng kết quả. Code lười (generator không ai lặp qua, promise không ai await, kết quả mà JIT có thể bỏ đi) và timeout tạo ra con số cho công việc chưa bao giờ xảy ra.

## Báo cáo

- Mở đầu bằng phán quyết: nhanh hơn, chậm hơn, không có khác biệt đo được, hoặc không kết luận được.
- Đưa ra con số kèm đơn vị, số lượt chạy, khoảng, và yếu tố giới hạn. Ví dụ, "p50 41 ms → 33 ms, trung vị của 7 lượt chạy mỗi phía, khoảng 32 đến 35 ms sau thay đổi, bị giới hạn bởi việc parse JSON trên một core."
- Gọi phán quyết là không kết luận được khi bạn khẳng định có khác biệt nhưng không thể gọi tên yếu tố giới hạn, khi một phía chạy chưa tinh chỉnh, hoặc khi bạn không thể kiểm tra câu hỏi 4 và 7. Gọi tên khoảng trống.
- Giữ phần thân PR ở một con số chính. Đặt các lượt chạy, khoảng, và bằng chứng về yếu tố giới hạn trong một artifact hoặc file ghi chú được liên kết.

## Tài liệu hiệu năng khác

- Thẩm định baseline của playbook **Perf issue** trước khi playbook lập kế hoạch từ nó, và mọi con số sau đó.
- Thẩm định harness của playbook **Hillclimb** trước khi nó bị đóng băng. Harness đã đóng băng sau đó in ra số lỗi và số công việc, nên mỗi lần giữ-hay-revert kiểm tra câu hỏi 4 và 7 miễn phí.
