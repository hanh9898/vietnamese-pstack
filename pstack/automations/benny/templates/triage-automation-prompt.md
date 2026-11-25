# Prompt cho automation phân loại

> Tài liệu nguồn cho quy trình setup đã chép. Diễn giải ý định này thành một bản nháp `automate` có sẵn sau khi `automate` xác nhận rằng gói đã chép được commit trong repository nơi automation sẽ chạy.

Đọc và làm theo `.cursor/automations/benny/skills/triage-issue-reports/SKILL.md` cho lượt chạy này.

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

Ý định tạo automation nên mô tả đây là một báo cáo cấp cao nhất mới trong kênh Slack nguồn đã cấu hình.

Coi kênh nguồn và timestamp của thread gốc là bất biến. Nếu một trong hai bị thiếu hoặc không khớp với cấu hình, hãy dừng lại mà không đăng bài hay ghi vào issue tracker.

File vận hành đã commit sở hữu việc phân loại, xem xét tệp đính kèm, lần theo nguyên nhân, định tuyến, khử trùng lặp, ghi vào tracker, và phán quyết cuối cùng. Không đăng tin nhắn tiến độ nào. Không bao giờ đăng một tin nhắn gốc trong kênh nguồn.

Coordinator là bên duy nhất đăng lên Slack. Mọi worker được giao việc phải ở chế độ chỉ đọc, chỉ trả về phát hiện, và nhận lệnh cấm rõ ràng đối với mọi hành động ghi lên Slack.

Kết thúc phán quyết duy nhất bằng đúng một marker đã cấu hình:

```text
[benny:bug]
[benny:performance]
[benny:other]
```

Một marker bug hoặc performance có thể thêm `tracker=<URL>`.
