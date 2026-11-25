---
name: interrogate
description: "Dùng cho \"interrogate\", \"adversarial review\", \"multi-model review\", \"challenge this\", \"stress test this code\", \"find blind spots\", hoặc \"tear this apart\" (hoặc các yêu cầu tương đương như \"chất vấn cái này\", \"review đối kháng\", \"tìm điểm mù\"). Các đối thủ cố phá vỡ một thay đổi hoặc thiết kế, và chỉ những phát hiện được chứng minh bằng một lượt chạy mới sống sót."
disable-model-invocation: true
---

# Interrogate

Các đối thủ cố phá vỡ một thay đổi hoặc một thiết kế. Một phát hiện chỉ sống sót khi một lượt chạy chứng minh nó. Báo cáo các phát hiện. Không áp dụng bản sửa.

## Đóng khung

Phạm vi là những gì người dùng gọi tên. Nếu không, đó là diff của branch tính từ merge base với base branch, đến working tree. Nêu ý định bằng skill **in-your-own-words**, từ tin nhắn của người dùng, các commit, và mô tả PR. Hỏi người dùng khi ý định không rõ.

## Tỏa ra

Chạy bước 3 và 4 của Phase A và Phase B của skill **arena**, với bốn thay đổi. Đọc dòng `interrogate reviewers` thay cho `arena runners`. Chép các thay đổi chưa commit trong phạm vi vào mỗi worktree. Khởi chạy mỗi đối thủ dưới dạng `generalPurpose`. Thay cho task và lý do của arena, đưa cho mỗi đối thủ phạm vi, ý định, và brief này:

> Hãy phá vỡ thay đổi này. Chứng minh mỗi phát hiện bằng một lượt chạy với code thật, như một test thất bại, một script tái hiện, hoặc output của lệnh cho thấy hành vi sai. Với một thiết kế hoặc kế hoạch, hãy chạy một prototype hoặc thăm dò tree hiện tại. Giữ các bản tái hiện trong worktree của riêng bạn. Báo cáo mỗi phát hiện với một tiêu đề, lệnh chính xác, output nó in ra, và output mà ý định yêu cầu. Bỏ ra ngoài bất cứ thứ gì bạn không chạy. Điều đó bao gồm style, cách đặt tên, cấu trúc, và các rủi ro cần một thay đổi trong tương lai mới trở nên quan trọng. Không có phát hiện nào là một kết quả hợp lệ.

## Kiểm chứng

Kiểm chứng mỗi phát hiện theo Phase F của arena bằng cách chạy lại lệnh của nó. Giữ một phát hiện khi output cho thấy thất bại và thất bại đó phá vỡ ý định. Bỏ phần còn lại. Gộp các phát hiện có chung nguyên nhân gốc.

Bỏ qua Phase C, D, và E của arena. Các đối thủ tìm ra những thất bại khác nhau, nên phán quyết giữ mọi phát hiện đã kiểm chứng, không phải danh sách của một đối thủ.

## Output

- **Ý định**: bản nhắc lại.
- **Phát hiện**: với mỗi phát hiện đã kiểm chứng, lệnh, output của nó, cách nó phá vỡ ý định, và các đối thủ đã tìm ra nó. Nói "không có phát hiện nào được kiểm chứng" khi không có gì sống sót.
- **Đã bỏ**: với mỗi đối thủ, số phát hiện đã bỏ và lý do.
