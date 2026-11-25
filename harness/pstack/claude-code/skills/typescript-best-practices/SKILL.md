---
name: typescript-best-practices
description: Các best practice cho TypeScript. Dùng khi đọc hoặc sửa bất kỳ file .ts hoặc .tsx nào.
paths: ["**/*.ts", "**/*.tsx"]
disable-model-invocation: true
---

# Best practice cho TypeScript

Áp dụng principle skill **type-system-discipline** trước.

| Quy tắc | Tóm tắt |
|------|---------|
| Discriminated union | Mô hình hóa các biến thể bằng một discriminant literal `kind` để các trạng thái không thể không biểu diễn được. Không dùng túi field tùy chọn. |
| Branded type | Brand các primitive bằng `& { readonly __brand: "X" }` để chúng không bị lẫn lộn. Validate một lần tại ranh giới. Một brand đến từ một type guard có kiểm chứng (`input is AgentId`), không bao giờ từ `as`. |
| Mô hình hóa kiến tạo | Xây hình dạng để giá trị bất hợp lệ không thể được tạo ra. `[T, ...T[]]` cho không rỗng, `[T, T][]` cho độ dài chẵn, `start` cộng `duration` cho một khoảng. Không phải một guard runtime, không phải mong ước về refinement type. |
| Type toàn phần đơn giản nhất | Giữ `T[]` khi mọi thao tác trên nó vẫn toàn phần. Chỉ nâng lên `NonEmpty<T>` ở nơi type lỏng lẻo buộc phải dùng `!`, một cast, hoặc một throw "không bao giờ nên xảy ra". |
| `unknown` thay vì `any` | Dữ liệu bên ngoài là `unknown`. |
| Schema trước guard | Trước khi tự viết một type guard kiểm tra từng property, hãy dùng thư viện schema runtime của repository và suy ra type từ schema, như `z.infer`. |
| Không cast bằng `as` | Mỗi `as` là một lần crash runtime đang chờ. Chỉ cast sau khi validate. |
| Thứ bậc thu hẹp type | Switch theo discriminant > toán tử `in` > `typeof`/`instanceof` > type guard tự định nghĩa > `as`. |
| Type guard | Phải kiểm chứng khẳng định. Một guard nói dối còn tệ hơn `as` vì bug ẩn sau một cái tên nói rằng nó an toàn. Đặt tên chúng là `isX` hoặc `hasX`. |
| Xử lý hết biến thể | Đặt nội tuyến `const _exhaustive: never = x;` trong nhánh default để compiler báo lỗi khi một biến thể mới được thêm vào. |
| `satisfies` thay vì `as` | Validate giá trị mà không nới rộng literal type. |
| Validate tại ranh giới | Parse nơi dữ liệu đi vào, thành một type domain có tên. `Record<string, unknown>` (dù viết thế nào) dừng lại ở bước parse đó. Tin type bên trong. Xem principle skill **boundary-discipline**. |
| Type suy ra từ schema | Dùng `Pick`/`Omit`/`Parameters`/`ReturnType`/`Awaited`/`typeof` trước khi khai báo một interface mới. |
| Tham số dạng object | Truyền object, không truyền theo vị trí, để thứ tự tham số tự giải thích. Bỏ qua trên hot path (render mỗi frame, tokenizer, parser). |
| Test thật | Đừng mock thứ bạn có thể chạy. Ưu tiên các primitive test thật của framework kèm kiểm tra rò rỉ/disposable, và kiểm chứng UI trong một bản build đang chạy. Chỉ mock thứ bạn không thể chạy ở local. |
| Telemetry có cấu trúc | Ưu tiên chẩn đoán qua logger có cấu trúc với đủ context để debug từ một id. Không có `console.log` trong code đã ship. |

Ví dụ: `references/patterns.md`.
