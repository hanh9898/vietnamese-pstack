# ý định automation của benny

## điều tôi muốn tự động hóa

tôi muốn hai cursor automation phối hợp với nhau trong một kênh slack báo cáo issue.

### automation 1: phân loại báo cáo issue

- trigger: khi ai đó đăng một báo cáo cấp cao nhất mới trong kênh slack nguồn tôi đã cấu hình, tôi muốn automation này bắt đầu trên báo cáo đó và giữ nguyên tọa độ thread gốc của nó.
- hành vi: tôi muốn nó đọc thread và tệp đính kèm, phân loại báo cáo là bug hoặc vấn đề performance, yêu cầu feature, câu hỏi hoặc góp ý, hoặc chuyển hướng, và lần theo lớp có khả năng sở hữu vấn đề trước khi định tuyến.
- tracker: tôi muốn nó tìm trong tracker đã cấu hình để phát hiện trùng lặp, cập nhật một bản trùng chắc chắn, và chỉ tạo ticket cho một bug rõ ràng là hoàn toàn mới.
- công cụ: tôi muốn quyền đọc và trả lời thread slack, tích hợp tracker đã cấu hình, và routing map tùy chọn của tôi.
- kết quả: tôi muốn đúng một câu trả lời trong thread nguồn với một phán quyết ngắn và `[benny:bug]`, `[benny:performance]`, hoặc `[benny:other]`. một marker bug hoặc performance có thể kèm url của tracker.
- ranh giới: tôi không bao giờ muốn automation này đăng một tin nhắn gốc trong kênh nguồn.

### automation 2: tái hiện và sửa các bug đã xác nhận

- trigger: tôi muốn automation này bắt đầu từ cùng báo cáo cấp cao nhất mới đó, hoặc một trigger được hỗ trợ khác được chọn trong lúc setup, rồi chờ marker phân loại đáng tin trong thread gốc.
- cổng: tôi muốn nó dừng khi rõ ràng đã có người sở hữu bản sửa. nếu một pull request hiện có hoặc một commit đã merge có thể sửa báo cáo, tôi muốn kiểm chứng thay vì một thay đổi cạnh tranh.
- hành vi: tôi muốn nó dùng control adapter và feature map đã cấu hình, tái hiện đúng triệu chứng hai lần qua ui thật, và thu screenshot, video, và một lần đối chiếu state chỉ đọc.
- bản sửa: tôi muốn nó kiểm chứng các pull request hiện có mà không viết đè lên chúng. sau một lần tái hiện đã xác nhận, nó có thể thử một bản sửa nguyên nhân gốc có giới hạn, dùng tdd khi test rẻ, smoke test blast radius, và chỉ mở một draft pull request khi bằng chứng trước và sau pass.
- công cụ: tôi muốn quyền đọc và trả lời thread slack, quyền truy cập repository và lịch sử, tạo draft pull request, tracker đã cấu hình, và control adapter của tôi.
- kết quả: tôi muốn bằng chứng và một kết quả đã kiểm chứng trong thread nguồn hoặc các thread vận hành tùy chọn, cùng một draft pull request tùy chọn. các cập nhật nên ngắn gọn.
- ranh giới: tôi không bao giờ muốn automation này đăng một tin nhắn gốc trong kênh nguồn.

### quy tắc chung

- tôi muốn kênh nguồn và tọa độ thread gốc giữ bất biến trong suốt lượt chạy.
- tôi coi các bot tiện ích và bot debug là bằng chứng, không phải sự giao việc hay quyền sở hữu bản sửa.
- tôi cho phép subagent giúp đỡ, nhưng chúng không thể đăng lên slack hoặc nhận thông tin xác thực slack.
- tôi muốn toàn bộ gói này được commit tại `.cursor/automations/benny/` trong repository đích. các file `SKILL.md` của nó là hướng dẫn automation trực tiếp, không phải plugin skill đã đăng ký.
- tôi muốn pstack được bật qua `.cursor/settings.json` đã commit của repository đích chỉ cho các dependency dùng chung như `why`, `tdd`, `unslop`, và các principle skill bắt buộc.
- tôi muốn mỗi prompt automation đang chạy đọc trực tiếp file vận hành đã commit của nó. tôi không muốn đường dẫn cache của plugin, các đoạn trích đã sao chép, hay việc khám phá slash skill.
- tôi giữ cấu hình do người dùng sở hữu, feature map, routing map, và secret bên ngoài `.cursor/automations/benny/` để việc làm mới gói không thể ghi đè chúng.
- tôi muốn cả hai automation thất bại theo hướng đóng khi tọa độ kênh, quyền truy cập tracker, control adapter, hoặc feature map bị thiếu hoặc không chắc chắn.
- tôi chỉ muốn draft pull request. không merge hay deploy.

### cấu hình của tôi

- kênh slack nguồn: `<channel>`
- kênh vận hành tùy chọn: `<channel or none>`
- repository và default branch: `<repo>`, `<branch>`
- tracker: `<type, team, project, labels, intake status>`
- routing map: `<path or none>`
- danh tính triage: `<slack identity>`
- control skill: `<configured skill or adapter>`
- feature map: `<committed same-repo path outside the copied pack, or behavior to paraphrase>`
- model: `<triage, reproduce, code, media review>`
- chuỗi emoji trạng thái: `<seen, reproducing, reproduced, blocked, fixing, failed, pull request opened>`
- ngân sách: `<polling, verdict wait, follow-up, repro, rejection, fix>`
- khả năng bot token tùy chọn: `<none, file download, or editable operations status>`

bắt đầu từ [`configuration.example.yaml`](./templates/configuration.example.yaml) và [`feature-map.example.md`](./skills/reproduce-and-fix-issues/references/feature-map.example.md). sao chép và điền chúng bên ngoài gói này, ví dụ trong `.cursor/benny/`. giữ các giá trị secret trong một secret manager hoặc biến môi trường.

## dành cho agent

người dùng bắt đầu setup bằng cách chỉ cursor vào file này. đừng tìm hay gọi một slash skill benny được khám phá.

1. hỏi repository nào sẽ chạy các automation.
2. coi thư mục chứa `FOR_AGENTS.md` này là gói nguồn.
3. hợp nhất toàn bộ gói nguồn vào `<target-repository>/.cursor/automations/benny/`.
4. giữ lại mọi file chỉ có ở đích. không bao giờ xóa các file không liên quan hoặc ghi đè cấu hình, feature map, hay routing map do người dùng sở hữu.
5. khi một file đích hiện có tại một đường dẫn do nguồn quản lý khác đi, hãy review diff và hợp nhất mà không bỏ chỉnh sửa cục bộ. nếu quyền sở hữu không rõ ràng, hãy dừng lại và hỏi trước khi thay thế nó.
6. kiểm chứng rằng `FOR_AGENTS.md` và `skills/setup-benny/SKILL.md` đã chép tồn tại trong repository đích.
7. đọc và làm theo `.cursor/automations/benny/skills/setup-benny/SKILL.md` trực tiếp từ repository đích.

tôi muốn bạn hợp nhất mục này vào `.cursor/settings.json` của repository đích:

```json
{
	"plugins": {
		"pstack": { "enabled": true }
	}
}
```

giữ lại mọi setting và plugin không liên quan. giữ lại comment và cú pháp jsonc hợp lệ khi file hiện có dùng jsonc.

tôi muốn kiểm chứng từ một agent mới có gốc tại repository đích. xác nhận rằng `why`, `tdd`, `unslop` của pstack, và các principle skill mà benny dùng được phân giải trong phạm vi dự án. không tính các skill được nạp từ session hiện tại hoặc từ một bản cài đặt phạm vi người dùng.

nếu plugin phạm vi dự án không khả dụng hoặc bất kỳ dependency dùng chung nào không phân giải được, hãy dừng lại và giải thích điều gì đã thất bại. đừng thêm `.cursor/automations/benny/skills/` vào manifest của plugin hoặc chờ các file của nó xuất hiện trong danh sách slash skill.

hãy nói với tôi rằng `.cursor/settings.json`, `.cursor/automations/benny/`, và mọi cấu hình không chứa secret được tham chiếu phải được commit trước khi bật bất kỳ automation nào. đừng tạo hay cập nhật một automation cho đến khi tôi yêu cầu rõ ràng.

với lần tạo đầu tiên, dùng `/automate` có sẵn một lần cho triage và một lần cho repro và fix. hoàn tất việc review bản nháp, phê duyệt, kiểm tra sẵn sàng, và bàn giao sang Automations editor cho automation đầu tiên trước khi bắt đầu automation thứ hai.

diễn giải ý định này và cấu hình đã hoàn thiện vào mỗi bản nháp. prompt triage phải đọc và làm theo `.cursor/automations/benny/skills/triage-issue-reports/SKILL.md`. prompt repro phải đọc và làm theo `.cursor/automations/benny/skills/reproduce-and-fix-issues/SKILL.md`. chỉ dùng các đường dẫn tương đối theo repo này sau khi `/automate` xác nhận chúng đã được commit trong repository nơi automation sẽ chạy.

với các automation hiện có, đừng dùng `/automate` để xem xét hay cập nhật chúng. validate cấu hình, rồi dùng checklist trường ngắn gọn trong file setup đã chép để tôi có thể sửa từng automation trực tiếp trong editor của nó. đừng tạo bản trùng lặp.
