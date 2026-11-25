### Feature

**Bạn sở hữu thiết kế. Lập kế hoạch, review, kiểm chứng.** Giao phần cài đặt. Bạn giữ vai trò dẫn dắt.

1. Lần theo subsystem bị ảnh hưởng.
2. `architect` để có hình dạng.
3. Viết throughput checkpoint thành bốn mục todo. Một chiều thật sự không áp dụng (một file, không tỏa ra song song) vẫn giữ mục của nó với `n/a: <reason>` thay vì bị bỏ đi:
   - **Các bước đầu tiên mang tính chặn.** Các cổng chạy trước khi tỏa ra song song.
   - **Các luồng công việc độc lập.** File, service, hoặc lớp tách rời thì chạy song song. Các thao tác ghi dùng chung thì tuần tự hóa.
   - **State có thể thay đổi dùng chung.** Mặc định là tách đích ra (principle skill **separate-before-serializing-shared-state**). Chỉ tuần tự hóa cho các bất biến thật.
   - **Cách phân rã an toàn nhỏ nhất.** Nếu một worker là tốt nhất, hãy nêu lý do.
4. Giao việc viết code cho một subagent dùng model feature đã cấu hình của bạn (mặc định `claude-opus-5-5-xhigh-fast`) với phạm vi cụ thể (đường dẫn file, hình dạng dữ liệu được gọi tên và cấu trúc tổ chức của nó theo **principle-model-the-domain**, một state machine thay vì các boolean rải rác, một bảng/registry thay vì rẽ nhánh, một typed model thay vì các giả định về hình dạng lặp lại, được chọn trước khi delegate viết logic, và tiêu chí thành công). Chọn mức suy luận của từng subagent cho công việc, theo phần Subagent. Khi phần cài đặt cho phép nhiều hình dạng hợp lệ (xử lý lỗi, lớp abstraction, cấu trúc test), hãy giao việc qua skill **arena** thay vào đó để các runner đưa ra các phương án và giám khảo chấm chéo bảo vệ lựa chọn. Bắt buộc: không có lối thoát bỏ qua kèm lý do, và Laziness Protocol không ghi đè điều này (lợi ích là sự tách biệt review, không phải số dòng tiết kiệm được). Một subagent bị cấm khởi chạy agent khác đáp ứng điều này bằng cách trực tiếp sở hữu diff với cùng sự tách biệt review. Không có câu trả lời "đang chờ" phụ thuộc vào một agent lồng nhau. Chỉnh sửa chính xác, đối chiếu lại với nguồn cho các file bắt nguồn từ upstream. Port các cải tiến của primitive dùng chung sang mọi nơi dùng và kiểm chứng từng nơi. Commit thoải mái.
5. Kiểm chứng trên bề mặt tương ứng. "Chưa kết luận được" hoặc sai bề mặt không phải là pass. Hãy gắn cờ nó.
6. Rebase thành các commit nhỏ, có thứ tự. Xếp chồng các follow-up.
   Dùng principle skill **sequence-verifiable-units**, xây, kiểm chứng, và commit từng đơn vị nhỏ trước đơn vị tiếp theo.
7. Nếu thiết kế gây tranh cãi, `interrogate` trước khi ship.
8. Chạy **Opening a PR**.

Công việc gắn chặt với code (một feature, một migration) được giao cho một chủ sở hữu duy nhất với checkpoint nội tuyến. Chủ sở hữu đó tỏa ra nội bộ sau giai đoạn chặn. Tỏa ra ở cấp cha dành cho các lát cắt tạo ra artifact độc lập (kiểm toán, điều tra xuyên subsystem, thí nghiệm cạnh tranh). Viết lại checkpoint ở các ranh giới giai đoạn. Khởi chạy một chủ sở hữu mới thay vì nối chuỗi các lần ngắt.

**Câu trả lời:** những gì bạn đã xây, những gì bạn đã chọn và tại sao, throughput checkpoint, các quyết định còn mở. Dùng bảng cho các phương án thiết kế.
