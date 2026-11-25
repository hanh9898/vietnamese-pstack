# pstack trong Claude Code

Các skill của pstack dùng tên của Cursor. Trong Claude Code, hãy đọc file này một lần mỗi session, rồi ánh xạ từng tên Cursor trong một skill bằng các bảng bên dưới. `<pstack>` nghĩa là thư mục gốc plugin `${CLAUDE_PLUGIN_ROOT}` chứa `skills/` và `docs/`; Claude Code thay biến này bằng thư mục cài đặt của phiên bản plugin hiện tại trong nội dung skill và agent. Nếu một trường của Cursor không có dòng tương ứng, hãy bỏ nó và nói rõ. Không bao giờ truyền một trường hoặc giá trị mà schema của tool từ chối.

## Tool

| Cursor | Claude Code |
| --- | --- |
| `Task` | `Agent` |
| `AskQuestion` | `AskUserQuestion`. Ở chế độ `-p` nó không có, nên hãy hỏi bằng văn bản thường. |
| Mở một todolist, hoặc chép các bước vào tool todolist | Dùng `TaskCreate`, `TaskUpdate`, `TaskList`, và `TaskGet` nếu session có; `TodoWrite` có thể thay chúng khi task tools bị tắt. Nếu không có tool nào, giữ danh sách trong câu trả lời và cập nhật nó ở mỗi giai đoạn. |
| Chạy một skill pstack khác (`/name`, "skill **name**" hoặc "the **name** skill") | Trong chat chính, dùng `Skill` với tên `pstack:<name>`. Trong context không có tool đó hoặc không liệt kê skill, dùng `Read` `${CLAUDE_PLUGIN_ROOT}/skills/<name>/SKILL.md` và làm theo nó. Khi bạn bảo người dùng gõ lệnh, hãy viết `/pstack:<name>`. |
| `Grep`, `Glob` | `Bash` với `rg` khi session không có `Grep` hoặc `Glob`. |

## Các trường của subagent

| Cursor | Claude Code |
| --- | --- |
| `subagent_type: generalPurpose` | `subagent_type: "general-purpose"` |
| `poteto-agent`, `comment-sicko` | `pstack:poteto-agent`, `pstack:comment-sicko` |
| Dòng `model:` trong file của `poteto-agent` | Nó chứa một slug của Cursor. Truyền `model` và `effort` trên mọi lệnh gọi `Agent` khởi chạy `pstack:poteto-agent`, được ánh xạ bằng bảng Model, để slug đó không bao giờ đến được API. |
| `readonly: true` | `subagent_type: "Explore"`. Nó vẫn giữ `Bash`, nên brief cũng phải nói "không sửa file", và bạn kiểm tra `git status` sau đó. |
| `readonly: false` | `general-purpose`. Nó giữ các MCP server của session. |
| `environment: "cloud"` | `isolation: "worktree"`. Gọi tên branch hoặc commit mà worker sẽ checkout. |
| `environment: "local"` | Bỏ qua. |
| `cloud_base_branch: <b>` | Bảo worker checkout `<b>` trước. |
| `run_in_background: true` | Bỏ qua khi khởi chạy từ chat chính: Claude Code mặc định chạy custom subagent trong nền. |
| `resume` | Gửi tiếp cho cùng agent ID bằng `SendMessage` để giữ toàn bộ lịch sử và state của nó. Chỉ khởi chạy agent mới kèm brief trước đó nếu không có agent ID Claude Code tương ứng; ID của Cursor không dùng được. |
| `file_attachments` | Liệt kê các đường dẫn trong brief. |

## Model

| Cursor | Claude Code |
| --- | --- |
| `claude-<family>-<version>-<effort>[-fast]`, như `claude-opus-5-5-xhigh` | `model: "opus"` và `effort: "xhigh"`. `model` chỉ nhận `opus`, `sonnet`, `haiku`, `fable`. Bỏ `-fast`. |
| Một slug `gemini-*` hoặc slug không phải Claude khác | Bỏ `model` để agent chạy trên model của session, và nói rõ điều đó. |
| `auto` hoặc `inherit-parent` | Bỏ `model`. |
| Rule `pstack-models.mdc`, `~/.cursor/rules/pstack-models.mdc` | `~/.claude/rules/pstack-models.md`. Claude Code nạp nó vào mọi session mới, nên các dòng vai trò của nó đã có sẵn trong context. Nếu chưa có, hãy đọc file. Nếu file hoặc dòng của vai trò bị thiếu, dùng slug mặc định của skill. |
| Một giá trị vai trò `<model> <effort>`, như `opus high` | `model: "opus"` và `effort: "high"`. |

Generator cũng chuyển frontmatter của agent từ `model: claude-...-<effort>[-fast]` sang model alias Claude Code cùng `effort`, và đổi `is_background` thành `background`.

## setup-pstack

Claude Code nạp mọi file `.md` trong `~/.claude/rules/` vào từng session mới, nên `setup-pstack` ghi rule của nó vào đó. Làm theo các bước của nó với những thay đổi sau:

- Detect. Các model được phát hiện là các giá trị `model` mà schema của tool `Agent` liệt kê, mỗi cái với một effort từ các giá trị `effort` của nó. Viết một model thật dưới dạng `<model> <effort>`, như `opus xhigh`. Effort là token cuối cùng, nên bước budget hoạt động như đã viết.
- Defaults. Ánh xạ từng slug mặc định bằng các dòng ở trên: `claude-opus-5-5-xhigh-fast` là `opus xhigh`, `claude-opus-5-5-high-fast` là `opus high`, `claude-fable-5-2-high` là `fable high`, và `gemini-4-neon-xhigh` là `inherit-parent`.
- Write. Ghi `~/.claude/rules/pstack-models.md` không có frontmatter, rồi đến các dòng comment, dòng `# budget`, và mỗi vai trò một dòng từ bước 5. Ghi đè toàn bộ file. Không bao giờ đặt các dòng vai trò trong `CLAUDE.md` hoặc `AGENTS.md`.

## Đường dẫn

| Cursor | Claude Code |
| --- | --- |
| `.cursor/skills/`, `~/.cursor/skills/` | `.claude/skills/`, `~/.claude/skills/` |
| `~/.cursor/plugins/`, `.cursor-plugin/plugin.json` | `~/.claude/plugins/`, `.claude-plugin/plugin.json` |
| `.cursor/rules/*.mdc`, các rule luôn được áp dụng | `CLAUDE.md`, hoặc `AGENTS.md` khi không có `CLAUDE.md`. Claude Code không bao giờ đọc file `.mdc`. Rule về model là ngoại lệ. Xem phần Model. |
| `https://github.com/hanh9898/vietnamese-pstack/blob/main/pstack/<path>` | `<pstack>/<path>` khi file đó tồn tại. Plugin cung cấp các skill, `docs/guide/`, và `README.md`. Hãy đọc bản cục bộ và không bao giờ tải nó về. Đưa URL cho người dùng khi họ cần một link. |
| Transcript trong `~/.cursor/projects/<slug>/agent-transcripts/` | `~/.claude/projects/<slug>/<session>.jsonl`. Slug là đường dẫn workspace với mỗi `/` và `.` được đổi thành `-`, nên `/Users/you/proj` là `-Users-you-proj`. File `.jsonl` mới nhất nằm trực tiếp trong thư mục đó là session hiện tại. Thư mục `<session>/subagents/` của nó chứa transcript của các subagent. Chỉ đọc thư mục của workspace này. |

## Tính năng chỉ có trên Cursor

Claude Code không có Cursor Automations, Bugbot, cloud agent của Cursor, hay tool PR có sẵn. Khi một bước cần một trong số đó, hãy đặt một dòng trong câu trả lời, `Bỏ qua trong Claude Code: <step>. <reason>.`, rồi chuyển sang bước tiếp theo. Không dừng, hỏi, hay thử lại. Khi một bước sau cần thứ mà bước bị bỏ qua đã tạo ra, như một URL hoặc một key, hãy để một placeholder và gọi tên nó trong dòng đó.

| Cursor | Claude Code |
| --- | --- |
| Cursor Automations: routine, các lệnh gọi routine `update_state`, webhook `api2.cursor.sh/automations`, đánh thức routine, và yêu cầu secret `SendToUser` | Bỏ qua kèm dòng thông báo. |
| Bugbot | Comment của Bugbot trên một PR GitHub là các thread review bình thường, nên hãy phân loại chúng bằng lệnh forge mà bước đó đưa ra. Bỏ qua một bước khởi động, chờ, hoặc cấu hình Bugbot khi PR không có check hoặc comment nào của Bugbot. |
| Cloud agent của Cursor | `environment: "cloud"` ánh xạ thành một worktree, như trong phần Các trường của subagent. Bỏ qua một bước cần chính cloud agent, như trạng thái dashboard của nó hoặc máy riêng của nó. |
| Một tool PR có sẵn | Dùng lệnh forge mà bước đó đưa ra, như `gh pr create`. Đó không phải là bỏ qua, nên không viết dòng nào. |
