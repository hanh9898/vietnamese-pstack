# Ví dụ feature map

Map mọi feature hướng người dùng mà Benny có thể tái hiện. Đọc phần liên quan trước khi điều khiển app. Giữ map này ở góc nhìn người dùng. Khám phá phần nội bộ và đường dẫn code hiện tại lúc chạy thay vì đóng băng chúng ở đây.

Sao chép file này ra bên ngoài `.cursor/automations/benny/`, ví dụ đến `.cursor/benny/feature-map.md`, và đặt `control.feature_map_path` thành bản sao. Các lần làm mới pack không được ghi đè lên nó.

## Mẫu cho mỗi feature

### `<feature name>`

`<one-line user-visible purpose>`

#### Người dùng đến đó thế nào

- Đường click: `<screen> -> <menu, tab, or panel> -> <control>`
- Phím tắt: `<shortcut or none>`

#### Control adapter điều khiển nó thế nào

- `<adapter action>` với `<inputs>` nên `<visible result>`.
- Reset: `<how the adapter returns to a fresh state>`.

#### Selector ổn định

- `<role and accessible name>`
- `<ARIA relationship>`
- `<data-component or purpose-named data attribute>`

Không bao giờ dùng class CSS hay StyleX được sinh ra, hash động, chỉ số con, hay vị trí DOM dễ vỡ.

#### Các trạng thái cần chạy thử

- Default, hover, focus-visible, active, disabled
- Loading, empty, error
- Selected, open, expanded
- `<relevant feature-specific variants>`

Đánh dấu các trạng thái không áp dụng.

#### Điều kiện tiên quyết và thiết lập

- Xác thực: `<account state>`
- Dữ liệu: `<fixture>`
- Quyền: `<role>`
- Flag: `<flag or none>`
- Service: `<required availability>`

#### Bằng chứng và đối chiếu

- Screenshot: `<app identity, feature, and discriminating state>`
- Video: `<entry path, interaction, and final state>`
- Đối chiếu: `<read-only state or value that confirms the UI>`

#### Gotchas

- `<known dead end or wrong surface>`
- `<safe environment translation>`

## Ví dụ hư cấu

Các feature này thuộc về một app quản lý task hư cấu. Chúng là ví dụ, không phải các feature bắt buộc của Benny.

### Sign in

Cho phép người dùng vào app quản lý task.

#### Người dùng đến đó thế nào

- Mở app và chọn `Sign in`. Không có phím tắt.

#### Control adapter điều khiển nó thế nào

- `open_app`, `click Sign in`, `fill credentials`, và `click Continue` nên mở danh sách item.
- Reset bằng cách đăng xuất và xóa session dùng một lần.

#### Selector ổn định

- Nút `Sign in`, các textbox `Email` và `Password`, `data-component="sign-in-form"`

#### Các trạng thái cần chạy thử

- Default, focus-visible, submitting, disabled, loading, error

#### Điều kiện tiên quyết và thiết lập

- Tài khoản dùng một lần và service xác thực có sẵn

#### Bằng chứng và đối chiếu

- Ghi từ trang đích đến danh sách item. Kiểm tra trạng thái session ở chế độ chỉ đọc.

#### Gotchas

- Một trang marketing là sai bề mặt. Thiếu service xác thực là một điểm chặn.

### Item list and detail

Cho phép người dùng duyệt các item và mở một cái.

#### Người dùng đến đó thế nào

- Mở tab `Items`, rồi chọn một dòng.

#### Control adapter điều khiển nó thế nào

- `select_tab Items` và `click <fixture item>` nên mở chi tiết của nó.
- Reset bằng cách đóng chi tiết và xóa lựa chọn.

#### Selector ổn định

- Tab và danh sách tên `Items`, dòng được đặt tên theo fixture, `data-component="item-detail"`

#### Các trạng thái cần chạy thử

- Loading, empty, error, selected, open, expanded

#### Điều kiện tiên quyết và thiết lập

- Các item fixture có tên, quyền đọc, service item có sẵn

#### Bằng chứng và đối chiếu

- Cho thấy lựa chọn và tiêu đề chi tiết khớp. Kiểm tra ID của item được chọn.

#### Gotchas

- Kết quả tìm kiếm có thể trông giống nhưng dùng một đường đi khác.

### Item editor

Cho phép người dùng tạo hoặc sửa một item.

#### Người dùng đến đó thế nào

- Chọn `Edit` từ chi tiết hoặc `New item` từ danh sách.

#### Control adapter điều khiển nó thế nào

- `click Edit`, `fill <field>`, và `click Save` nên cập nhật chi tiết.
- Reset bằng cách khôi phục fixture.

#### Selector ổn định

- Các nút `Edit`, `New item`, `Save`, form `Item editor`, các field được liên kết với nhãn

#### Các trạng thái cần chạy thử

- Default, focus-visible, dirty, validating, disabled, saving, error, success

#### Điều kiện tiên quyết và thiết lập

- Fixture sửa được, quyền ghi, service lưu có sẵn

#### Bằng chứng và đối chiếu

- Cho thấy thay đổi của field đến chi tiết đã cập nhật. Kiểm tra giá trị item được lưu ở chế độ chỉ đọc.

#### Gotchas

- Đừng chèn trạng thái form. Một field chi tiết chỉ đọc không phải là editor.

### Settings

Cho phép người dùng thay đổi tùy chọn cá nhân.

#### Người dùng đến đó thế nào

- Mở menu profile, rồi chọn `Settings`.

#### Control adapter điều khiển nó thế nào

- `open_menu Profile`, `click Settings`, và `toggle <preference>` nên cập nhật control.
- Reset bằng cách khôi phục tùy chọn ban đầu.

#### Selector ổn định

- Nút `Profile`, mục menu `Settings`, vùng `Settings`, attribute tùy chọn được đặt tên theo mục đích

#### Các trạng thái cần chạy thử

- Closed, open, selected, focus-visible, disabled, loading, error

#### Điều kiện tiên quyết và thiết lập

- Tài khoản test đã đăng nhập, các tùy chọn đã biết, service tùy chọn có sẵn

#### Bằng chứng và đối chiếu

- Cho thấy đường đi qua menu và trạng thái control cuối cùng. Kiểm tra giá trị tùy chọn ở chế độ chỉ đọc.

#### Gotchas

- Cài đặt hệ điều hành là một bề mặt khác.

## Danh sách kiểm tra đầy đủ

- Mọi feature hướng người dùng có thể tái hiện đều có một phần.
- Mọi phần đều gọi tên một đường đi người dùng, các action adapter, và cách reset.
- Selector dùng role, tên, ARIA, dấu hiệu component ổn định, hoặc attribute được đặt tên theo mục đích.
- Không selector nào dùng class được sinh ra hay vị trí DOM.
- Các trạng thái tương tác, loading, empty, error, selected, và expanded liên quan đều được bao phủ.
- Xác thực, fixture, quyền, flag, và service đều được nêu rõ.
- Yêu cầu về screenshot, video, và phép đối chiếu bên dưới đều được nêu rõ.
- Các bề mặt sai, ngõ cụt, và chuyển đổi môi trường an toàn đều được liệt kê.
- Chi tiết cài đặt vẫn là những thứ được khám phá lúc chạy.
