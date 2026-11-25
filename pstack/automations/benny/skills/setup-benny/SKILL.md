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
- Quyền đọc repository và lịch sử
- Một action pull request có thể mở draft pull request
- Skill control-adapter đã cấu hình

Ưu tiên các action Slack của Cursor đã cấu hình cho việc đọc và đăng. `BENNY_SLACK_BOT_TOKEN` tùy chọn có thể lấp một khoảng trống hẹp như sửa một tin nhắn trạng thái vận hành hoặc tải một file đính kèm. Lưu giá trị trong một secret manager hoặc biến môi trường, không phải trong YAML.

Đừng dùng các endpoint tích hợp không được ghi trong tài liệu.

## 5. Chuẩn bị bản đồ định tuyến

Nếu người dùng muốn định tuyến lại hoặc ping owner:

1. Sao chép `../triage-issue-reports/references/routing.example.md` ra bên ngoài `.cursor/automations/benny/`.
2. Thay thế mọi placeholder bằng giá trị công khai hoặc nội bộ của tổ chức.
3. Giữ tắt ping owner theo mặc định.
4. Chỉ cho phép ping một feature owner đã cấu hình hoặc một tác giả có khả năng gây hồi quy đã được xác nhận.

Nếu không có bản đồ định tuyến nào được cấu hình, triage có thể phân loại một báo cáo nhưng không được đoán đích đến hay owner.

## 6. Kiểm chứng control adapter

Đọc `../reproduce-and-fix-issues/references/control-adapter.md` và feature map đã hoàn thiện của người dùng.

Xác nhận rằng skill được gọi tên có thể:

- Khởi động app đích
- Điều hướng đến mọi feature trong map qua UI thật
- Chạy thử các trạng thái trong map qua các action adapter đã khai báo
- Kiểm tra trạng thái mà không ép buộc kết quả
- Chụp screenshot
- Bắt đầu và dừng ghi màn hình
- Dọn dẹp các process và dữ liệu tạm của nó

Nếu thiếu bất kỳ năng lực nào, hãy để automation tái hiện ở trạng thái tắt. Nó phải fail closed thay vì tuyên bố một bản tái hiện mà nó không thực hiện.

## 7. Chuẩn bị các automation đang chạy

Hỏi xem đây là lần tạo đầu tiên hay cấu hình các automation đã có.

Đọc `../../FOR_AGENTS.md` từ pack đã sao chép làm nguồn ý định người dùng chính cho cả hai trường hợp. Dùng nó để hiểu hai trigger, công cụ, chỉ dẫn, kết quả, và các quy tắc chung.

### Tạo lần đầu

Tạo từng automation một.

Với mỗi automation:

1. Đọc prompt template tương ứng đã sao chép làm tài liệu nguồn nội bộ thứ cấp.
2. Biến `FOR_AGENTS.md`, cấu hình Benny đã hoàn thiện, và ý định của template thành một yêu cầu ngôn ngữ tự nhiên hoàn chỉnh.
3. Bảo prompt đang chạy đọc và làm theo chính xác file vận hành đã commit của nó dưới `.cursor/automations/benny/`.
4. Dùng đường dẫn tương đối ổn định trong repository, không phải đường dẫn nguồn hay cache của plugin. Đừng sao chép nội dung file vận hành vào prompt đang chạy.
5. Đọc và làm theo skill có sẵn `automate`.
6. Để `automate` khám phá các channel Slack, repository, và các tích hợp đã kết nối.
7. Để `automate` xác nhận rằng pack đã sao chép và mọi file cấu hình được tham chiếu đã được commit trong cùng repository nơi automation sẽ chạy.
8. Để `automate` hiển thị bảng nháp của nó, nhận phê duyệt, hỏi mức sẵn sàng, và mở trình soạn Automations.
9. Hoàn tất việc bàn giao trình soạn cho automation này trước khi bắt đầu cái tiếp theo.

Đưa cho `automate` ý định triage hoàn chỉnh này, được điền từ cấu hình:

- Tên `benny-triage`.
- Đọc và làm theo `.cursor/automations/benny/skills/triage-issue-reports/SKILL.md` cho mọi lượt chạy.
- Kích hoạt trên mỗi báo cáo cấp cao nhất mới trong channel Slack nguồn đã cấu hình.
- Đọc thread kích hoạt và chỉ trả lời bên trong nó.
- Dùng tích hợp issue-tracker đã cấu hình.
- Phân loại, kiểm tra bằng chứng, lần theo nguyên nhân, khử trùng lặp, và chỉ tạo các bug mới rõ ràng.
- Kết thúc một phán quyết chỉ trong thread bằng marker `[benny:bug]`, `[benny:performance]`, hoặc `[benny:other]` đã cấu hình và URL tracker tùy chọn.
- Không bao giờ đăng tin nhắn gốc trong channel nguồn.

Sau khi việc bàn giao trình soạn triage hoàn tất, đưa cho `automate` ý định tái hiện và sửa hoàn chỉnh này:

- Tên `benny-reproduce`.
- Đọc và làm theo `.cursor/automations/benny/skills/reproduce-and-fix-issues/SKILL.md` cho mọi lượt chạy.
- Kích hoạt trên cùng các báo cáo cấp cao nhất mới trong channel Slack nguồn đã cấu hình.
- Dùng repository và branch mặc định đã cấu hình.
- Đọc thread nguồn và chỉ trả lời bên trong nó.
- Bao gồm việc tạo pull request và các yêu cầu về tracker, control-adapter, và feature map đã cấu hình. Diễn giải các đường đi và trạng thái người dùng trong map trừ khi `automate` xác nhận một file đã commit đủ điều kiện trong cùng repository.
- Chờ một triage marker đáng tin trước khi hành động.
- Tái hiện chính xác triệu chứng hai lần qua UI thật trong map và thu bằng chứng.
- Kiểm chứng một bản sửa đã có mà không viết đè lên nó.
- Chỉ thử một bản sửa có giới hạn tùy chọn sau bản tái hiện đã xác nhận, rồi mở một draft pull request khi bằng chứng và các phép kiểm tra pass.
- Không bao giờ đăng tin nhắn gốc trong channel nguồn.

Đừng lặp lại công việc của `automate` về Slack, repository, tích hợp, tính đầy đủ, xác thực, review bản nháp, phê duyệt, mức sẵn sàng, hay bàn giao trình soạn.

### Automation đã có

Skill có sẵn `automate` chỉ dùng để tạo. Đừng dùng nó để tìm, kiểm tra, hay cập nhật các automation đã có.

Hoàn tất việc kiểm tra cấu hình, định tuyến, control-adapter, và feature map. Rồi đưa cho người dùng danh sách kiểm tra trình soạn ngắn gọn này.

Với automation triage đã có, cập nhật:

- Tên và mô tả
- Chỉ dẫn trực tiếp đọc `.cursor/automations/benny/skills/triage-issue-reports/SKILL.md`
- Trigger báo cáo Slack cấp cao nhất mới và channel nguồn
- Năng lực đọc và trả lời thread Slack
- Tích hợp issue-tracker
- Chỉ dẫn triage đã diễn giải, quy tắc chỉ trong thread, và các marker phán quyết Benny

Với automation tái hiện đã có, cập nhật:

- Tên và mô tả
- Chỉ dẫn trực tiếp đọc `.cursor/automations/benny/skills/reproduce-and-fix-issues/SKILL.md`
- Trigger Slack tương ứng và channel nguồn
- Repository và branch mặc định
- Năng lực đọc và trả lời thread Slack
- Action pull request
- Các yêu cầu về tracker, control-adapter, và feature map
- Chỉ dẫn đã diễn giải về chờ marker, bằng chứng, kiểm chứng, và bản sửa có giới hạn

Yêu cầu người dùng cập nhật trực tiếp từng automation đã có trong trình soạn Automations của nó. Đừng tạo bản thay thế hay bản trùng lặp.

### Ranh giới tạo

Không bao giờ gọi trực tiếp một service backend automation hay công cụ automation backend. Không bao giờ dùng một URL trình duyệt mang các field nháp. Không bao giờ xây dựng hay mở một deep link giao thức Cursor. Với automation mới, con đường hoàn tất duy nhất là việc bàn giao trình soạn Automations đã được review của skill có sẵn `automate`.

Đừng bật automation nào cho đến khi bài test an toàn thread pass sau khi lưu trong trình soạn.

## 8. Test an toàn thread

Dùng một channel test hoặc một báo cáo test vô hại.

Trước khi test, xác nhận rằng `.cursor/settings.json`, `.cursor/automations/benny/`, và mọi file cấu hình không chứa secret được tham chiếu của repository đích đã được commit trên branch mà checkout automation dùng. Xác nhận rằng cả hai prompt đang chạy đều trỏ đến chính xác các file vận hành đã commit của chúng. Nếu bất kỳ phép kiểm tra nào thất bại, hãy dừng. Cho người dùng biết rằng automation chưa thể được bật.

Xác minh:

1. Triage lưu `thread_ts` gốc và đăng đúng một phán quyết dưới dạng reply.
2. Phán quyết chứa một marker đã cấu hình.
3. Repro chỉ chấp nhận marker từ danh tính triage đã cấu hình.
4. Repro giữ cùng các tọa độ nguồn bất biến.
5. Không có tin nhắn gốc nào xuất hiện trong channel nguồn.
6. Một worker được ủy quyền không thể dùng bất kỳ action ghi Slack nào.
7. Tọa độ bị thiếu, tin nhắn cha bị xóa, hoặc preflight thất bại không tạo ra bài đăng nào và không có issue tracker nào.

Chỉ bật lưu lượng bình thường sau khi cả bảy phép kiểm tra pass.
