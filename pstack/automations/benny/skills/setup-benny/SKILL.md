---
name: setup-benny
description: Cấu hình Benny và chuẩn bị các automation triage và tái hiện của nó. Dùng khi cài Benny hoặc thay đổi các cài đặt Slack, tracker, repository, định tuyến, control, model, hoặc ngân sách của nó.
disable-model-invocation: true
---

# Thiết lập Benny

Benny được phát hành dưới dạng một automation pack ngủ đông bên trong pstack. Plugin manifest chỉ cung cấp thư mục skill thông thường của pstack; file này và hai file vận hành không phải là slash skill.

Người dùng bắt đầu thiết lập bằng cách trỏ Cursor đến `FOR_AGENTS.md` của pack. Luồng bootstrap sao chép toàn bộ pack vào repository đích, rồi đọc trực tiếp file này tại `.cursor/automations/benny/skills/setup-benny/SKILL.md`.

Benny cần cấu hình bên ngoài và hai Cursor automation đang chạy.

Đừng tạo hay cập nhật một automation cho đến khi người dùng yêu cầu rõ ràng. Không bao giờ đặt giá trị secret vào file plugin, prompt, hay cấu hình đã commit.

## 1. Sao chép pack và bật các skill pstack dùng chung

Làm điều này trước khi hỏi cấu hình Benny và trước khi gọi skill có sẵn `/automate`.

Hỏi repository nào sẽ chạy các automation. Pack nguồn là thư mục chứa `FOR_AGENTS.md`. Đích là `<target-repository>/.cursor/automations/benny/`.

Gộp toàn bộ pack nguồn vào đích:

1. Tạo đích khi nó chưa có.
2. Sao chép mọi file nguồn đến cùng đường dẫn tương đối.
3. Giữ lại các file chỉ có ở đích. Không bao giờ xóa file không liên quan khi cài đặt hoặc làm mới.
4. Giữ cấu hình, feature map, và bản đồ định tuyến do người dùng sở hữu bên ngoài đích. Không bao giờ ghi đè chúng.
5. Khi một file đã có do nguồn quản lý khác đi, hãy xem diff và gộp mà không bỏ đi các chỉnh sửa local. Nếu quyền sở hữu không rõ ràng, hãy dừng và hỏi trước khi thay thế nó.
6. Xác minh rằng đích chứa `FOR_AGENTS.md`, file thiết lập này, cả hai file vận hành, các reference của chúng, và các template.

Nếu file này đã được đọc từ đích, hãy coi việc sao chép là hoàn tất và chạy cùng phép xác minh trước khi tiếp tục.

Thêm pstack vào `.cursor/settings.json` của repository đích. Nếu file hoặc thư mục `.cursor` chưa tồn tại, hãy tạo nó.

Gộp mục này vào JSON hoặc JSONC đã có:

```json
{
	"plugins": {
		"pstack": { "enabled": true }
	}
}
```

Giữ lại mọi cài đặt cấp cao nhất không liên quan và mọi mục plugin khác. Nếu `plugins.pstack` đã tồn tại, chỉ thay đổi giá trị `enabled` của nó. Giữ comment và cú pháp JSONC hợp lệ khi file dùng JSONC. Kiểm tra tính hợp lệ của file sau khi sửa.

Tải lại project đích hoặc bắt đầu một agent mới có gốc ở đó. Xác minh rằng các skill pstack dùng chung sau được phân giải từ phạm vi project:

- `why`
- `tdd`
- `unslop`
- `principle-separate-before-serializing-shared-state`
- `principle-minimize-reader-load`
- `principle-guard-the-context-window`
- `principle-sequence-verifiable-units`
- `principle-fix-root-causes`
- `principle-prove-it-works`

Đừng tính một skill được nạp từ session hiện tại hay một plugin ở phạm vi user. Phép kiểm tra phải cho thấy một agent mới trong repository đích nhận được pstack qua cài đặt project.

Nếu việc cài plugin ở phạm vi project không có sẵn hoặc bất kỳ dependency dùng chung nào không phân giải được, hãy dừng và giải thích thất bại.

Các file Benny được đọc trực tiếp từ `.cursor/automations/benny/`. Đừng thêm thư mục đó vào một plugin manifest hay mong đợi các file `SKILL.md` của nó xuất hiện trong danh sách slash skill.

Cho người dùng biết rằng `.cursor/settings.json`, `.cursor/automations/benny/`, và mọi cấu hình không chứa secret được tham chiếu phải được commit trước khi bật bất kỳ automation nào. Đừng commit chúng trừ khi người dùng yêu cầu.

Khi phép kiểm tra này pass, các prompt automation đang chạy có thể đọc các file vận hành đã commit theo đường dẫn tương đối ổn định trong repository. Chúng không được nhúng đường dẫn cache của plugin hay sao chép nội dung file.

## 2. Điều chỉnh cấu hình

Mở các ví dụ đã sao chép sau:

- `../../templates/configuration.example.yaml`
- `../reproduce-and-fix-issues/references/feature-map.example.md`

Tạo các bản sao do người dùng sở hữu bên ngoài `.cursor/automations/benny/`. Đây là các file cấu hình, không phải file của pack. Ví dụ vị trí:

- Config project, như `.cursor/benny/configuration.yaml`
- Feature map project, như `.cursor/benny/feature-map.md`
- Bản đồ định tuyến project, như `.cursor/benny/routing.md`
- Config user, như `~/.config/benny/configuration.yaml`
- Feature map user, như `~/.config/benny/feature-map.md`

Điền một phần feature map cho mọi feature hướng người dùng mà automation có thể tái hiện. Giữ nó ở góc nhìn người dùng. Đừng đóng băng chi tiết cài đặt hay đường code hiện tại trong map.

Đừng sửa các ví dụ đã sao chép. Các lần làm mới pack có thể cập nhật các file do nguồn quản lý sau khi xem xét xung đột, nhưng chúng không bao giờ được chạm vào các bản sao do người dùng sở hữu.

Ưu tiên các file đã commit, không chứa secret trong repository đích khi một checkout automation mới phải đọc chúng. Nếu không, hãy diễn giải các giá trị bắt buộc vào prompt đang chạy. Chỉ tham chiếu một file repository sau khi skill có sẵn `/automate` xác nhận rằng file đó đã được commit trong repository nơi automation chạy.

Dùng đường dẫn tương đối ổn định trong repository cho các file pack và cấu hình đã commit. Không bao giờ tham chiếu thư mục nguồn của plugin hay đường dẫn cache của plugin từ một automation đang chạy.

## 3. Điền các lựa chọn bắt buộc

Hỏi hoặc xác nhận:

- ID channel Slack nguồn
- ID channel vận hành hoặc trạng thái (tùy chọn)
- URL repository và branch mặc định
- Danh tính triage hoặc Slack user ID
- Loại issue tracker, team, project, label, và trạng thái tiếp nhận
- Skill adapter tracker hoặc các action MCP
- Đường dẫn bản đồ định tuyến (tùy chọn)
- Tên control skill bắt buộc
- Đường dẫn feature map hướng người dùng bắt buộc
- Các chuỗi emoji trạng thái
- Định dạng URL pull request
- Ngân sách polling và công sức
- Model slug cho triage, tái hiện, công việc code, và xem xét media

Chỉ dùng các model slug hiển thị là có sẵn trong model picker Cursor của người dùng hoặc danh sách model được hỗ trợ. Đừng đoán một slug và đừng mang theo một mặc định riêng tư.

Channel nguồn, danh tính triage, repository, adapter tracker, control skill, và feature map phải được nêu rõ. Cho việc thiết lập thất bại nếu bất kỳ giá trị bắt buộc nào vẫn còn mơ hồ.

Dùng skill `unslop` của pstack cho tên, mô tả, và prompt shim cuối cùng của automation trước khi lưu chúng.

## 4. Kiểm tra năng lực tích hợp

Automation triage cần:

- Quyền đọc channel Slack nguồn đã cấu hình và các thread của nó
- Quyền trả lời trong thread ở channel đó
- Quyền đọc metadata file đính kèm và tải file khi báo cáo có media
- Quyền tìm, đọc, tạo, và cập nhật qua adapter issue-tracker đã cấu hình

Automation tái hiện cần:

- Quyền đọc thread nguồn
- Quyền trả lời trong thread ở channel nguồn
- Quyền đăng và sửa (tùy chọn) trong channel vận hành đã cấu hình
- Repository read and history access
- A pull request action that can open a draft pull request
- The configured control-adapter skill

Prefer configured Cursor Slack actions for reads and posts. The optional `BENNY_SLACK_BOT_TOKEN` may fill a narrow gap such as editing one operations status message or downloading an attachment. Store the value in a secret manager or environment, not in YAML.

Do not use undocumented integration endpoints.

## 5. Prepare the routing map

If the user wants reroutes or owner pings:

1. Copy `../triage-issue-reports/references/routing.example.md` outside `.cursor/automations/benny/`.
2. Replace every placeholder with public or organization-local values.
3. Keep owner pings off by default.
4. Allow a ping only for a configured feature owner or a confirmed likely regression author.

If no routing map is configured, triage may classify a report but must not guess a destination or owner.

## 6. Verify the control adapter

Read `../reproduce-and-fix-issues/references/control-adapter.md` and the user's completed feature map.

Confirm that the named skill can:

- Bring up the target app
- Navigate every mapped feature through the real UI
- Exercise mapped states through declared adapter actions
- Inspect state without forcing the result
- Capture screenshots
- Start and stop a recording
- Clean up its processes and temporary data

If any capability is missing, leave the repro automation disabled. It must fail closed rather than claim a reproduction it did not perform.

## 7. Prepare the live automations

Ask whether this is first-time creation or configuration of existing automations.

Read `../../FOR_AGENTS.md` from the copied pack as the primary user-intent source for either path. Use it to understand the two triggers, tools, instructions, outcomes, and shared rules.

### First-time creation

Create one automation at a time.

For each automation:

1. Read the matching copied prompt template as secondary internal source material.
2. Turn `FOR_AGENTS.md`, the finished Benny configuration, and the template intent into a complete natural-language request.
3. Tell the live prompt to read and follow its exact committed operational file under `.cursor/automations/benny/`.
4. Use the stable repository-relative path, not a plugin source or cache path. Do not copy the operational file contents into the live prompt.
5. Read and follow the built-in `automate` skill.
6. Let `automate` discover Slack channels, the repository, and connected integrations.
7. Let `automate` confirm that the copied pack and any referenced configuration files are committed in the same repository where the automation will run.
8. Let `automate` show its draft table, obtain approval, ask readiness, and open the Automations editor.
9. Finish the editor handoff for this automation before starting the next one.

Give `automate` this complete triage intent, filled from configuration:

- Name `benny-triage`.
- Read and follow `.cursor/automations/benny/skills/triage-issue-reports/SKILL.md` for every run.
- Trigger on each new top-level report in the configured source Slack channel.
- Read the triggering thread and reply only inside it.
- Use the configured issue-tracker integration.
- Classify, inspect evidence, trace cause, dedupe, and create only clear new bugs.
- End one thread-only verdict with the configured `[benny:bug]`, `[benny:performance]`, or `[benny:other]` marker and optional tracker URL.
- Never post a source-channel root message.

After the triage editor handoff is complete, give `automate` this complete repro and fix intent:

- Name `benny-reproduce`.
- Read and follow `.cursor/automations/benny/skills/reproduce-and-fix-issues/SKILL.md` for every run.
- Trigger on the same new top-level reports in the configured source Slack channel.
- Use the configured repository and default branch.
- Read the source thread and reply only inside it.
- Include pull request creation and the configured tracker, control-adapter, and feature-map requirements. Paraphrase mapped user paths and states unless `automate` confirms an eligible committed file in the same repository.
- Wait for a trusted triage marker before acting.
- Reproduce the exact symptom twice through the mapped real UI and capture evidence.
- Verify an existing fix without authoring over it.
- Attempt an optional bounded fix only after confirmed repro, then open a draft pull request when proof and checks pass.
- Never post a source-channel root message.

Do not duplicate `automate`'s Slack, repository, integration, completeness, authentication, draft-review, approval, readiness, or editor-handoff work.

### Existing automations

The built-in `automate` skill is creation-only. Do not use it to search for, inspect, or update existing automations.

Finish configuration, routing, control-adapter, and feature-map validation. Then give the user this concise editor checklist.

For the existing triage automation, update:

- Name and description
- Direct instruction to read `.cursor/automations/benny/skills/triage-issue-reports/SKILL.md`
- New top-level Slack report trigger and source channel
- Slack thread read and reply capabilities
- Issue-tracker integration
- Paraphrased triage instructions, thread-only rule, and Benny verdict markers

For the existing repro automation, update:

- Name and description
- Direct instruction to read `.cursor/automations/benny/skills/reproduce-and-fix-issues/SKILL.md`
- Matching Slack trigger and source channel
- Repository and default branch
- Slack thread read and reply capabilities
- Pull request action
- Tracker, control-adapter, and feature-map requirements
- Paraphrased marker wait, evidence, verification, and bounded-fix instructions

Ask the user to update each existing automation directly in its Automations editor. Do not create replacements or duplicates.

### Creation boundary

Never call a direct automation backend service or backend automation tool. Never use a browser URL that carries draft fields. Never build or open a Cursor protocol deep link. For new automations, the only finish path is the built-in `automate` skill's reviewed Automations editor handoff.

Do not enable either automation until the thread-safety test passes after the editor save.

## 8. Test thread safety

Use a test channel or a harmless test report.

Before testing, confirm that the target repository's `.cursor/settings.json`, `.cursor/automations/benny/`, and every referenced secret-free configuration file are committed on the branch used by the automation checkout. Confirm that both live prompts point at their exact committed operational files. If any check fails, stop. Tell the user that the automation cannot be enabled yet.

Verify:

1. Triage stores the root `thread_ts` and posts exactly one verdict as a reply.
2. The verdict contains one configured marker.
3. Repro accepts the marker only from the configured triage identity.
4. Repro keeps the same immutable source coordinates.
5. No source-channel root message appears.
6. A delegated worker cannot use any Slack write action.
7. Missing coordinates, a deleted parent, or a failed preflight produces no post and no tracker issue.

Enable normal traffic only after all seven checks pass.
