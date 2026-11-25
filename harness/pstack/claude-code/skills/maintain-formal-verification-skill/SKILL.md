---
name: maintain-formal-verification-skill
description: "Đưa việc kiểm chứng hình thức của một dự án trở lại đồng bộ với code sau khi code thay đổi: tìm các commit đã chạm vào code được kiểm chứng, cập nhật model, harness, hoặc tính chất để mô tả code như hiện tại, chạy lại, và nói mỗi thất bại là sự lệch trong việc kiểm chứng hay một bug trong code. Dùng cho /maintain-formal-verification-skill, \"is the model still true to the code\" (hoặc \"model còn đúng với code không\"), hoặc sau các lần merge và refactor đã chạm vào code được kiểm chứng mà không kiểm tra lại nó."
disable-model-invocation: true
---

# Bảo trì một formal verification skill

Trong Claude Code, hãy đọc [adapter Claude Code](../../docs/harness/claude-code.md) một lần mỗi session trước khi làm theo skill này. Nó ánh xạ các tên Cursor trong các skill pstack sang Claude Code.

Một phép kiểm tra hình thức chứng minh một tính chất của thứ mà nó mô tả. Khi code thay đổi mà việc kiểm chứng thì không, phép kiểm tra có thể tiếp tục pass trong khi nó mô tả code không còn tồn tại. Lần pass đó là trường hợp nguy hiểm, vì nó trông như một chứng minh. Skill này là vòng lặp bảo trì cho một verify skill mà `/create-formal-verification-skill` đã tạo, hoặc cho bất kỳ skill cục bộ nào của dự án chạy một model checker, prover, hoặc verifier cấp code với code được gọi tên. Skill cục bộ của dự án xử lý một thay đổi mà agent thực hiện trong khi dùng skill đó. Skill này xử lý các thay đổi đã bỏ qua nó: các lần merge, các chỉnh sửa thực hiện mà không có skill, và sự lệch tích tụ qua nhiều commit.

## Kết quả

Cho mỗi phép kiểm tra một kết quả, và nói là cái nào:

- **in sync**: không có thay đổi nào kể từ lần đồng bộ cuối làm thay đổi thứ mà phép kiểm tra mô tả, và phép kiểm tra pass.
- **updated**: code đã thay đổi, việc kiểm chứng giờ mô tả code mới, và phép kiểm tra pass.
- **bug**: việc kiểm chứng mô tả code hiện tại, và code phá vỡ tính chất. Đây là một phát hiện về code. Nó không phải sự lệch.
- **blocked**: phép kiểm tra không thể được đưa trở lại đồng bộ hoặc không thể chạy. Nói chính xác lý do.

Một phép kiểm tra có thể vừa là updated vừa là bug: bản cập nhật làm việc kiểm chứng mô tả lại code, và rồi tính chất thất bại trên nó.

## Phạm vi chỉnh sửa

Chỉ sửa phần kiểm chứng: model, harness, file tính chất, và chính verify skill. Không bao giờ sửa code sản phẩm trong một lượt chạy, trừ khi người dùng yêu cầu. Khi một tính chất thất bại trên code hiện tại, đừng làm yếu tính chất hay model để nó pass. Báo cáo thất bại.

## Lượt chạy

1. **Tìm các phép kiểm tra.** Một verify skill không có tên cố định, nên hãy tìm nó theo những gì nó làm: một skill của dự án chạy một model checker, một prover, hoặc một verifier khác với code được gọi tên. Đọc mỗi cái bạn tìm thấy, hoặc cái mà người dùng đã gọi tên. Với mỗi phép kiểm tra, thu thập tính chất, code nó bao phủ, các giới hạn và giả định, lệnh chạy nó, và commit mà tại đó nó được xác nhận lần cuối là mô tả đúng code. Nếu không có verify skill nào, hãy dừng và chỉ đến `/create-formal-verification-skill`. Nếu skill không ghi lại commit đồng bộ, hãy dùng commit cuối cùng đã thay đổi các file kiểm chứng, và nói rằng bạn đã làm vậy.

2. **Chạy nó như hiện có.** Chạy mỗi phép kiểm tra một lần trước khi bạn thay đổi bất cứ thứ gì, và ghi lại kết quả. Một lần pass ở đây không cho bạn biết rằng code đúng. Nó cho bạn biết rằng mô tả cũ vẫn đứng vững. Một thất bại ở đây có thể là sự lệch hoặc một bug. Đừng quyết định là cái nào cho đến bước 5.

3. **Đọc mọi thay đổi đối với code được bao phủ.** Diff các file được bao phủ từ commit đồng bộ đến commit hiện tại, và đọc mỗi commit message. Cũng tìm code đã di chuyển: một hàm được bao phủ bị đổi tên, tách ra, hoặc chuyển sang file khác vẫn là code được bao phủ. Cũng tìm code mới chạm vào trạng thái mà một phép kiểm tra bảo vệ, như một hàm mới ghi vào cùng các field. Với mỗi thay đổi, quyết định nó là loại nào trong số này:
   - **Không có tác động.** Thay đổi không làm thay đổi bất cứ thứ gì việc kiểm chứng mô tả, như định dạng, comment, hoặc các đường code mà việc kiểm chứng không bao phủ. Kiểm tra điều này với model hoặc harness, không phải với commit message.
   - **Việc kiểm chứng không còn mô tả code.** Một bước vốn là một hành động không thể chia cắt giờ là hai, một nhánh được thêm hoặc bỏ, một phép kiểm tra đã di chuyển, một đường mới đến được trạng thái được bảo vệ, hoặc một giá trị giờ có một khoảng khác. Model hoặc harness phải thay đổi.
   - **Lời hứa đã thay đổi có chủ đích.** Thay đổi làm thay đổi điều code hứa hẹn, và bằng chứng trong thay đổi nói rằng điều này là có chủ đích: doc comment, các test, changelog, hoặc commit message. Tính chất phải thay đổi, và bạn phải trích dẫn bằng chứng đó.
   - **Lời hứa có thể đã bị phá vỡ.** Code đã thay đổi, và không có bằng chứng nào nói rằng lời hứa đã thay đổi. Coi một thất bại sau đó là ứng viên bug.

4. **Cập nhật từ code, không phải từ kết quả.** Thay đổi model hoặc harness để mỗi phần bị thay đổi lại chỉ đến code mà reviewer có thể mở ra, và giữ một bước không thể chia cắt trong code là một bước trong việc kiểm chứng. Viết bản cập nhật từ code trước khi chạy lại, và đừng định hình nó theo những gì làm phép kiểm tra pass. Chỉ thay đổi một tính chất cho một lời hứa đã thay đổi có chủ đích. Viết ra cách diễn đạt cũ, cách diễn đạt mới, và bằng chứng. Giữ các giới hạn trừ khi thay đổi làm chúng sai. Nếu bạn phải giảm một giới hạn, hãy nói vậy trong báo cáo.

5. **Chạy lại và đánh giá mỗi kết quả.**
   - **Pass:** phép kiểm tra giờ có thể pass trên một mô tả đã mất khả năng thất bại. Làm hỏng code mới theo cách mà tính chất bảo vệ chống lại, như xóa một phép kiểm tra mới hoặc đổi thứ tự một bước mới, và xác nhận rằng phép kiểm tra bắt được nó. Rồi bỏ chỗ làm hỏng.
   - **Fail:** phát lại phản ví dụ trên code thật, từng bước một. Nếu một bước không thể xảy ra trong code, việc kiểm chứng sai. Sửa việc kiểm chứng, và nói điều gì đã sai. Nếu mọi bước đều có thể xảy ra, đó là một bug. Gọi tên commit đã đưa nó vào, kể phản ví dụ như một chuỗi bước bằng chính ngôn từ của code, và nêu tác hại trong một câu. Nếu một test hoặc bản tái hiện rẻ trên code thật cho thấy bug, hãy thêm nó vào báo cáo làm bằng chứng. Đừng commit nó vào code sản phẩm.

6. **Cập nhật verify skill.** Cập nhật code mà mỗi phép kiểm tra bao phủ, các lệnh, các giới hạn, các giả định, và commit đồng bộ. Đặt commit đồng bộ thành commit mà bạn đã kiểm tra. Đừng dời commit đồng bộ cho một phép kiểm tra blocked, và nói vậy trong báo cáo. Rồi làm theo verify skill một lần như agent tiếp theo sẽ làm, để bạn biết các bước của nó vẫn chạy.

## Báo cáo

Cho người dùng biết, với mỗi phép kiểm tra:

- kết quả, và các commit mà bạn đã đọc;
- những gì đã thay đổi trong việc kiểm chứng và tại sao, với một lý do ngắn cho mỗi thay đổi: code đã đổi hình dạng, hoặc lời hứa đã thay đổi có chủ đích (kèm bằng chứng);
- kết quả chạy lại, và chỗ làm hỏng mà bạn đã dùng để cho thấy phép kiểm tra đã cập nhật vẫn có thể thất bại;
- mỗi bug, bằng lời lẽ đơn giản: phản ví dụ dưới dạng các bước bằng ngôn từ của code, tác hại, và commit đã đưa nó vào;
- những gì việc kiểm chứng vẫn chưa bao phủ, bao gồm code mới mà nó nên bao phủ nhưng không.

Nói thẳng những thất bại nào là sự lệch trong việc kiểm chứng và những thất bại nào là bug trong code. Với một phép kiểm tra đã pass trước khi bạn cập nhật và thất bại sau đó, hãy nói rằng lần pass cũ là trên một mô tả đã lỗi thời.

Đặt các bản cập nhật kiểm chứng trong một thay đổi riêng, tách biệt với mọi bản sửa sản phẩm.
