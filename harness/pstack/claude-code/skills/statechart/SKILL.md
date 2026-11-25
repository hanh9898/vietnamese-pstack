---
name: statechart
description: "Kiểm tra một model TLA+ của một hệ thống di chuyển giữa các trạng thái, như một luồng sản phẩm, một giao thức, hoặc một service, và vẽ nó thành một statechart Mermaid. Báo cáo đưa ra đường ngắn nhất đến mỗi trạng thái phá vỡ một quy tắc. Dùng cho /statechart, hoặc để thể hiện một bug như một đường đi qua các trạng thái."
disable-model-invocation: true
---

# Statechart

Biểu đồ cho thấy một hệ thống di chuyển giữa các trạng thái thế nào, bằng ngôn từ của người đọc nó. Người đó, người đọc, quyết định hành vi có đúng không.

## Chạy

Làm việc trong một thư mục nháp bên ngoài repo. Viết một spec TLA+ và config của nó. Rồi chạy:

```sh
<skill dir>/scripts/statechart SPEC.tla [--config FILE] [--view FILE] [--out DIR]
```

`scripts/statechart.ts` là TypeScript, nên hãy chạy nó bằng một runtime có thể thực thi TypeScript. `scripts/statechart` là một shell script POSIX chọn một runtime như vậy. Trên Windows gốc, chạy `node --disable-warning=ExperimentalWarning <skill dir>/scripts/statechart.ts` với Node 22.18 đến 22.x, hoặc Node 23.6 trở lên.

Lần chạy đầu tiên cài TLC và Java bằng mise và cần mạng.

## Viết spec

- Viết mỗi quy tắc mà người đọc đồng ý thành một INVARIANT. Một quy tắc có thể nói về một màn hình, một kết quả, một giá trị được lưu, hoặc một tin nhắn. Nếu model không có biến cho một quy tắc, hãy thêm biến đó. Không bao giờ làm yếu một quy tắc để nó đúng.
- Viết `Next` thành một phép tuyển của các action, như `YouPressPlay \/ YouPressStop`. Nếu không, TLC đặt tên mọi bước là `Next`.
- Một trạng thái không có bước đi ra sẽ phá vỡ `NoDeadlock`, kể cả khi nó là một trạng thái kết thúc đúng. Khi một INVARIANT hoặc một PROPERTY đã có tên đó, quy tắc là `CHECK_DEADLOCK`. Thêm vào `Next` một action chỉ đúng ở các trạng thái kết thúc và không thay đổi gì, như `Done == phase \in {"paid", "failed"} /\ UNCHANGED vars`, và cho nó một nhãn trong `step()`.

## Chọn biểu đồ

Bạn làm phần việc cần phán đoán: chữ trên mỗi trạng thái và mũi tên, các giai đoạn và màu của chúng, tiêu đề, và báo cáo cho người đọc. Đặt công việc của bạn trong một view module, và truyền nó bằng `--view`.

Để thể hiện ngôn từ của người đọc, view export `state(vars)`. Giá trị mà `state()` trả về chọn dạng biểu đồ:

- Một chuỗi cho một biểu đồ phẳng: `export const state = (v) => (v.paid ? "Paid" : "Paying");`
- Một mảng cho các trạng thái cha: `export const state = (v) => v.main.split(".");`
- Một object cho mỗi key một vùng song song: `export const state = (v) => ({ Playback: v.playback, Volume: v.volume });`

Gắn nhãn mỗi trạng thái bằng những gì người đọc có thể thấy hoặc quan tâm, như "Đang thanh toán" hoặc "Đang giữ lease, chờ ghi". Giữ tên biến ngoài nhãn. Trong `vars`, một sequence TLA+ là một object có key bắt đầu từ 1, nên `v.pc[1]` là `pc[1]`. Một tập hợp là một mảng.

View cũng có thể export `step(action, from, to)`. Nó nhận tên action của TLC và các giá trị trước và sau bước, và trả về nhãn của mũi tên. Viết mỗi nhãn bước theo cách người dùng thấy nó xảy ra, như "bạn nhấn play" hoặc "kết nối thất bại". Đừng gọi tên code hay action TLA+. Hai action kết thúc giống nhau trong biểu đồ nhận cùng một nhãn, để chúng dùng chung một mũi tên.

Khi một bước chỉ có thể xảy ra trong một số điều kiện, hãy kết thúc nhãn của nó bằng điều kiện trong ngoặc vuông, bằng ngôn từ của người đọc, như `bạn nhấn play [khi file đang tải]`. Trong một biểu đồ có vùng, lệnh ghi điều kiện về các vùng khác lên mũi tên, bằng ngôn từ của nhãn của chúng, như `[when Offline]`. Ngoặc vuông của bạn thay thế nó, và khi đó hai mũi tên từ một trạng thái có thể trông giống nhau. Vì vậy trong một biểu đồ có vùng, đừng viết ngoặc vuông cho một điều kiện về vùng khác. Khi một giá trị mà không nhãn nào hiển thị quyết định một bước đi đâu, hãy gọi tên kết quả trong nhãn, như "đọc danh sách thất bại".

View cũng có thể export những thứ sau:

- `group(vars)` trả về tên của một giai đoạn. Mỗi trạng thái biểu đồ nhận màu của nhóm nó. Khi các trạng thái model đằng sau một trạng thái biểu đồ thuộc các nhóm khác nhau, trạng thái đó không có màu.
- `colors` gán cho mỗi tên nhóm một class màu.
- `title` là một chuỗi mà biểu đồ hiển thị ở trên cùng.

Lệnh gọi `state()` và `group()` tối đa một lần cho mỗi trạng thái model, và `step()` tối đa một lần cho mỗi bước. Biểu đồ và báo cáo đều dùng các câu trả lời đó. Vì vậy hãy làm cho mỗi hàm chỉ phụ thuộc vào tham số của nó.

Biểu đồ không vẽ một bước ở lại trong cùng một nhãn. Tách một nhãn khi người đọc phải thấy một bước như vậy.

Nhắm đến khoảng 20 mũi tên hoặc ít hơn, vì một biểu đồ dày đặc hơn khó đọc. Trước hết hãy trả về các nhãn thô hơn từ `state()`. Cho một nhãn cho các giá trị hoạt động giống nhau, và bỏ một chi tiết mà người đọc không cần, như một lời gọi đang chạy mà kết quả trả về không thay đổi gì. Giữ mỗi trạng thái của một đường bug, và giữ mỗi dấu. Khi một lần gộp đổi một trạng thái `breaks` thành `mayBreak`, nó che giấu nơi một quy tắc bị phá vỡ. Đừng gộp hai trạng thái phá vỡ các quy tắc khác nhau, vì khi đó người đọc không thể thấy quy tắc nào bị phá vỡ ở đâu. Nếu biểu đồ vẫn quá dày đặc, hãy trả về `null` từ `step()` cho các bước mà người đọc không cần, như một lần reset mà mọi trạng thái đều có, hoặc một bước có mũi tên lặp lại những gì các mũi tên khác đã cho thấy. Tuân theo các quy tắc này khi bạn ẩn bước:

- Giữ mỗi trạng thái biểu đồ có thể đến được bằng các mũi tên từ một trạng thái bắt đầu.
- Giữ ít nhất một mũi tên đi ra khỏi mỗi trạng thái biểu đồ có bước đi ra trong model.
- Ẩn tất cả các bước của một mũi tên, hoặc không ẩn bước nào. Khi bạn chỉ ẩn một số, điều kiện của nó trở nên hẹp hơn.
- Trong phần bàn giao, nói biểu đồ ẩn những bước nào.

## Đọc báo cáo

- Trong biểu đồ, một trạng thái phá vỡ một quy tắc có class `breaks`. Khi chỉ một số trạng thái model đằng sau nó phá vỡ quy tắc, nó có class `mayBreak`. Legend gọi tên các quy tắc của mỗi dấu. Khi hai quy tắc bị phá vỡ, nó gọi tên cả hai trên một dấu, nên hãy nói trong phần bàn giao trạng thái nào phá vỡ quy tắc nào. Trong một biểu đồ có vùng, một trạng thái nhận một dấu khi mỗi tổ hợp trạng thái vùng bao gồm nó đều có thể phá vỡ một quy tắc. Khi một tổ hợp có thể phá vỡ một quy tắc mà không trạng thái nào của nó có dấu, mỗi trạng thái trong tổ hợp đó nhận một dấu.
- TLC đi tiếp qua một trạng thái phá vỡ một quy tắc, nên biểu đồ cho thấy các trạng thái sau một bug.
- Vì TLC đi tiếp qua bug, một model không giới hạn số trạng thái có thể chạy không có điểm dừng. Giữ các hằng số nhỏ, hoặc thêm một CONSTRAINT.
- Với một VIEW hoặc một SYMMETRY, TLC đếm các trạng thái mà nó coi là giống nhau thành một trạng thái, và biểu đồ vẽ trạng thái đó. Một mũi tên có thể dẫn đến nó thay vì đến trạng thái mà bước đạt tới, và báo cáo nói vậy.
- TLC kiểm tra các quy tắc ở mỗi trạng thái vượt quá một CONSTRAINT hoặc một ACTION_CONSTRAINT, nhưng nó không khám phá trạng thái đó hay kiểm tra deadlock cho nó. Khi đường ngắn nhất của TLC cho một quy tắc kết thúc ở một trạng thái như vậy, biểu đồ vẽ trạng thái đó, và báo cáo đưa ra đường đó. Biểu đồ không vẽ các trạng thái khác vượt quá giới hạn. Một deadlock ở trạng thái như vậy không hiện ra. TLC cũng kiểm tra các quy tắc sau mỗi bước mà một ACTION_CONSTRAINT loại trừ, kể cả khi nó đến được trạng thái kế tiếp bằng cách khác. Khi đường ngắn nhất của TLC cho một quy tắc kết thúc bằng một bước như vậy, biểu đồ vẽ bước đó.
- Lệnh kiểm tra các quy tắc bằng TLC trên config như đã viết, với một worker. Khi một quy tắc bị phá vỡ, lệnh xóa quy tắc đó và chạy TLC lại, cho đến khi không quy tắc nào bị phá vỡ. Sau lần phá vỡ đầu tiên, mỗi lượt chạy dừng ở 100,000 trạng thái phân biệt, để một model lớn không chạy mãi. Khi một lượt chạy đạt đến giới hạn đó hoặc dừng vì lỗi, báo cáo liệt kê các quy tắc nó chưa kiểm tra dưới mục "Rules not checked", và biểu đồ không đánh dấu chúng. Một quy tắc chưa được kiểm tra có thể đúng hoặc bị phá vỡ. Để kiểm tra nó, hãy xóa các quy tắc bị phá vỡ khỏi config, hoặc làm model nhỏ hơn. Giới hạn thêm vào một module làm thay đổi thứ tự các biến của TLC, nên với một property, TLC có thể tìm ra một phản ví dụ khác so với một lượt chạy không có giới hạn.
- `tlc.out` là những gì TLC đã in ra trên config như đã viết. Khi biểu đồ không cho thấy đường bug của một quy tắc bị phá vỡ, `tlc-RULE.out` là những gì TLC đã in ra cho lượt chạy tìm ra nó. Khi TLC lặp lại cảnh báo đầu tiên của nó, TLC thuần in nó hai lần, nhưng `tlc.out` cho thấy nó một lần, vì TLC bỏ bản sao thứ hai khỏi output mà lệnh này đọc. Điều đó chỉ xảy ra khi Java chạy với `-XX:+UseParallelGC`, vì nếu không thì cảnh báo đầu tiên của TLC là lời khuyên truyền flag đó, mà nó chỉ in một lần.

## Hiển thị biểu đồ

Hiển thị `chart.mmd` cho người dùng dưới dạng một code block `mermaid`. Biểu đồ có ngân sách 500 trạng thái, được TLC đếm trên config như đã viết. Vượt quá mức đó, biểu đồ chỉ vẽ các đường đến các quy tắc bị phá vỡ, và khi không quy tắc nào bị phá vỡ, lệnh không ghi `chart.mmd`. Nó vẫn kiểm tra mỗi quy tắc, và báo cáo đưa ra số trạng thái và mỗi đường bug. Để thấy toàn bộ đồ thị, hãy làm model nhỏ hơn.

Render biểu đồ bằng Pele. Khi người dùng yêu cầu một hình ảnh, hoặc một biểu đồ quá lớn để đọc dưới dạng chữ, hãy làm theo `references/render.md`. Đừng dùng một renderer khác trừ khi người dùng yêu cầu.

## Bàn giao

Đưa mỗi biểu đồ và chữ Mermaid của nó cho người phải quyết định. Thêm một dòng cho mỗi bug: quy tắc, câu của người đọc cho quy tắc đó, và đường đi như báo cáo đánh số nó. Nói model bỏ ra ngoài những gì. Đưa ra lệnh tạo lại các file, với một thư mục `--out` mới.

Khi model mô tả code, hãy phát lại mỗi đường bug trên code thật, dưới dạng một test hoặc một bản tái hiện trực tiếp, mỗi action một bước. Nếu một bug không xảy ra, hãy nghĩ rằng model sai cho đến khi bạn chứng minh được là không.
