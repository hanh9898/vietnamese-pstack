# benny

benny cho bạn hai cursor automation cho các báo cáo issue trên slack. một cái phân loại từng báo cáo. cái còn lại tái hiện các bug đã xác nhận và có thể chuẩn bị một bản sửa nháp nhỏ.

các file trong thư mục này là nguồn thiết lập và nguồn automation ở trạng thái ngủ. chúng không xuất hiện dưới dạng slash skill.

## thiết lập

1. chỉ cursor vào [`FOR_AGENTS.md`](./FOR_AGENTS.md) và gọi tên repository đích.
2. để bước setup hợp nhất toàn bộ thư mục này vào repo đích tại `.cursor/automations/benny/`. nó phải giữ lại các file chỉ có ở đích và review các conflict thay vì ghi đè lên chỉnh sửa cục bộ.
3. để bước setup bật pstack trong `.cursor/settings.json` của repository đích cho các dependency dùng chung:

```json
{
	"plugins": {
		"pstack": { "enabled": true }
	}
}
```

4. giữ cấu hình do người dùng sở hữu bên ngoài gói đã chép, ví dụ trong `.cursor/benny/`. điều chỉnh [`configuration.example.yaml`](./templates/configuration.example.yaml) và [`feature-map.example.md`](./skills/reproduce-and-fix-issues/references/feature-map.example.md).
5. commit `.cursor/settings.json`, `.cursor/automations/benny/`, và mọi cấu hình không chứa secret trước khi bật bất kỳ automation nào.
6. review từng bản nháp automation mới hoặc cập nhật các automation hiện có trong editor của chúng. rồi gửi một báo cáo test vô hại và kiểm chứng rằng mọi bài đăng trong kênh nguồn đều nằm trong thread gốc.
