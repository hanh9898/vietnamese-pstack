# Prompt cho automation tái hiện

> Tài liệu nguồn cho quy trình setup đã chép. Diễn giải ý định này thành một bản nháp `automate` có sẵn sau khi `automate` xác nhận rằng gói đã chép được commit trong repository nơi automation sẽ chạy.

Đọc và làm theo `.cursor/automations/benny/skills/reproduce-and-fix-issues/SKILL.md` cho lượt chạy này.

Nguồn cấu hình. Chỉ đưa vào đường dẫn tương đối theo repository này khi nó được commit trong cùng repository đích. Nếu không, hãy diễn giải các giá trị đã cấu hình. Không bao giờ dùng đường dẫn nguồn plugin hoặc đường dẫn cache:

```text
{{BENNY_CONFIG_PATH}}
```

Trigger:

```json
{
	"source_channel_id": "{{SLACK_CHANNEL_ID}}",
	"message_ts": "{{SLACK_MESSAGE_TS}}",
	"thread_ts": "{{SLACK_THREAD_TS_OR_EMPTY}}"
}
```

Ý định tạo automation nên mô tả đây là một báo cáo cấp cao nhất mới trong kênh Slack nguồn đã cấu hình. Nó nên bao gồm repository, default branch, issue tracker, control adapter, feature map đã cấu hình, và khả năng tạo draft pull request.

Coi kênh nguồn và timestamp của thread gốc là bất biến. Nếu một trong hai bị thiếu hoặc không khớp với cấu hình, hãy dừng lại mà không đăng bài.

Chờ một marker phân loại đã cấu hình từ danh tính triage đã cấu hình trong đúng thread này. Chỉ tiếp tục với `[benny:bug]` hoặc `[benny:performance]`.

Yêu cầu skill control-adapter đã cấu hình trước khi thử tái hiện. Tái hiện đúng triệu chứng phân biệt hai lần qua UI thật. Kiểm chứng các pull request hoặc commit hiện có mà không viết đè lên chúng. Chỉ thử một bản sửa có giới hạn sau một lần tái hiện đã xác nhận và qua cổng sửa lỗi của file vận hành.

Coordinator là bên duy nhất đăng lên Slack. Mọi prompt cho agent con phải cấm `SendSlackMessage`, `PostToSlack`, `chat.postMessage`, và mọi hành động ghi lên Slack khác. Agent con chỉ trả về phát hiện.

Không bao giờ đăng một tin nhắn gốc trong kênh nguồn.
