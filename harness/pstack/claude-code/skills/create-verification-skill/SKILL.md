---
name: create-verification-skill
description: "Tạo một verification skill cục bộ cho dự án, điều khiển app của bạn theo cách người dùng làm — mọi ngôn ngữ, framework, hoặc nền tảng. Dùng cho /create-verification-skill, \"make a control skill for this repo\" (hoặc \"tạo control skill cho repo này\"), hoặc khi một dự án không có cách nào được viết script để chứng minh hành vi của UI/CLI/service."
disable-model-invocation: true
---

# Tạo một verification skill

Trong Claude Code, hãy đọc [adapter Claude Code](../../docs/harness/claude-code.md) một lần mỗi session trước khi làm theo skill này. Claude Code thay `${CLAUDE_PLUGIN_ROOT}` trong skill này bằng thư mục gốc plugin; `<pstack>` là đường dẫn đó. Nó ánh xạ các tên Cursor trong các skill pstack sang Claude Code.

Mọi dự án nghiêm túc đều cần một cách được viết script để điều khiển app thật và chứng minh hành vi: khởi chạy nó, chạy thử một feature theo cách người dùng làm, và thu bằng chứng. Skill này tạo ra điều đó dưới dạng một skill cục bộ của dự án (`.cursor/skills/verify-<app>/`) được may đo cho repo. Bạn viết output của bộ tạo cho agent tiếp theo, không phải cho con người: nó sẽ được đọc từ đầu, giữa chừng một task, bởi một agent chưa bao giờ thấy app.

## 1. Phỏng vấn repo, không phỏng vấn người dùng

Trả lời những câu sau từ codebase và chỉ hỏi người dùng những gì bạn không thể quan sát:

- **Bề mặt:** người dùng thật sự chạm vào cái gì? Một web UI, một CLI/TUI, một app desktop, một API, một app mobile, một thư viện? Một repo có thể có nhiều cái; chọn cái chính và ghi chú phần còn lại.
- **Chạy:** app khởi động ở local thế nào? Ưu tiên lệnh dev được ghi trong tài liệu của chính repo (package script, Makefile, quickstart trong README). Ghi chú port, biến môi trường, dữ liệu seed, xác thực.
- **Điều khiển:** một agent có thể tương tác với nó theo cách lập trình thế nào? Harness có sẵn trước — spec Playwright/Cypress, script expect, helper PTY, endpoint gọi được bằng curl, một debug port. Chỉ sau đó mới chọn một công thức chung: browser/CDP cho web và Electron, một harness tmux/PTY cho CLI/TUI, HTTP thuần cho service.
- **Quan sát:** có thể thu được bằng chứng gì? Screenshot, transcript terminal, phần thân response, log, exit code, trạng thái DB.
- **Cô lập:** hai instance có thể chạy cạnh nhau không (port, thư mục dữ liệu, profile)? Nếu không, hãy nói vậy trong skill được tạo: từ chối điều khiển kép một instance dùng chung tốt hơn làm hỏng session của người dùng.

Nếu checkout không build hoặc khởi động được như hiện có, hãy sửa điều đó trước (hoặc báo cáo chính xác) trước khi tạo; một skill được viết trên một nền bị hỏng sẽ dạy các bước sai. Khi một asset không liên quan bị thiếu chặn việc khởi động (một thư mục static mà API không bao giờ phục vụ, một config mẫu), skill được tạo có thể tạo ra nó, đánh dấu rõ ràng là khung sườn kiểm chứng, và xóa nó khi dọn dẹp.

## 2. Tạo skill

Viết `.cursor/skills/verify-<app>/SKILL.md` với YAML frontmatter (`name: verify-<app>` và một `description` gọi tên app, bề mặt, và khi nào nên dùng nó — không có frontmatter thì skill không bao giờ được đăng ký) và các phần sau, mỗi phần dựa trên những gì cuộc phỏng vấn thật sự tìm ra (không để lại placeholder nào):

- **Launch:** lệnh chính xác khởi động app để kiểm chứng, và cách biết nó đã sẵn sàng (một dòng log, một prompt). Launch phải đạt đến một trạng thái dùng được từ một thư mục dữ liệu trống, bao gồm mọi migration và dữ liệu seed. Sẵn sàng nghĩa là dùng được, không chỉ là một process trả lời. Một phép kiểm tra sức khỏe database có thể pass trong khi các script khởi tạo của nó vẫn đang chạy. Bao gồm cả teardown. Với một CLI hoặc TUI sống ngắn, không có server nào cần giữ sống: launch nghĩa là build binary (hoặc cài dependency) một lần, rồi bắt đầu mỗi lần điều khiển trong một session PTY hoặc tmux cô lập riêng.
- **Doctor:** một phép kiểm tra chỉ đọc trả lời câu hỏi "instance này có đáng điều khiển không?" — process đang chạy, đúng phiên bản/build, port do ta sở hữu, xác thực hợp lệ. Một agent chạy nó trước tiên bất cứ khi nào có gì đó trông không ổn.
- **Drive:** công thức harness với selector/lệnh thật từ repo này, không phải ví dụ. Ưu tiên các handle ổn định (nhãn ARIA, data attribute, chuỗi prompt, đường dẫn route) thay vì tọa độ và thứ tự tab.
- **Evidence:** cần thu gì cho một bằng chứng và nó đi đâu. Nêu các tiêu chuẩn bằng chứng: chạy thử đường đi thật của người dùng, không phải setter nội bộ hay endpoint chỉ dành cho test; thu cả hành động và trạng thái kết quả, không chỉ màn hình cuối; kiểm chứng các tác dụng phụ (file được ghi, dòng được chèn, tin nhắn được gửi) cùng với những gì nhìn thấy được; chỉ mock ở nơi một ranh giới production đã cô lập hệ thống bên ngoài. Khi đường an toàn là một chế độ dry-run hoặc test, hãy kiểm chứng những gì nó thật sự bỏ qua bằng cách quan sát (file, mạng, git ref) thay vì tin vào tên của nó: một số dry-run vẫn chạm vào mạng hoặc mở trình duyệt.
- **Cleanup:** cách dọn các instance mà lượt chạy đã tạo. Không bao giờ kill theo tên process; kill những gì bạn đã khởi động. Cleanup xóa các instance và trạng thái nháp, không bao giờ xóa bằng chứng: các artifact bằng chứng sống sót qua teardown, ở một vị trí mà skill gọi tên.
- **Helpers:** mọi script mà skill đi kèm đều có thể thực thi và cách gọi nó được cho thấy trong phần thân skill. Một helper mà người đọc phải dịch ngược thì không phải là helper.

## 3. Gieo feature map

Tạo `.cursor/skills/verify-<app>/features/README.md` cùng mỗi feature hướng người dùng mà bạn xác định được một file (nhắm đến 3-5 cái hàng đầu để bắt đầu, từ route, lệnh, menu, hoặc tài liệu). Làm theo hình dạng trong [`references/feature-map-example/`](references/feature-map-example/), với một README index và mỗi feature một file. Mỗi file trả lời, từ góc nhìn của người dùng: feature là gì, làm sao đến được nó, làm sao điều khiển nó bằng harness, và trạng thái cuối quan sát được nào chứng minh nó hoạt động. Bốn H2 là `Sub-features`, `How to get to it (user POV)`, `Driving it with <harness>`, và `Gotchas`. Nếu dữ liệu seed thiếu một điều kiện tiên quyết mà một hành trình cần, hành trình đó báo cáo một thất bại và lý do đi vào `Gotchas` của feature đó. Không bao giờ làm yếu hành trình để nó pass. Map là nguồn kiểm chứng được bảo trì của repo; một bằng chứng điều khiển một điểm vào tiện lợi là chưa đầy đủ khi map liệt kê những điểm khác.

## 4. Chứng minh skill được tạo trước khi bàn giao

Chạy chính các chỉ dẫn của nó từ đầu đến cuối một lần: launch, doctor, điều khiển MỘT feature đã có trong map (một là đủ; map tồn tại để các lượt chạy sau có thể bao phủ phần còn lại), thu bằng chứng, dọn dẹp. Sau khi dọn dẹp, xác nhận bằng chứng vẫn tồn tại ở vị trí được gọi tên — một lần dọn dẹp ăn mất bằng chứng là thất bại ở bước này. Sửa những gì thất bại, và cũng chạy cleanup được tạo sau mọi vòng lặp thất bại, để các lần thử hỏng không bỏ lại process và port. Một skill được tạo mà chưa bao giờ được thực thi là một bản nháp, không phải sản phẩm bàn giao. Nếu bạn đã chứng minh nó trên một vật thay thế cho mục tiêu thật (một container thay cho một VM mới, một stack local thay cho một stack từ xa), hãy liệt kê mọi bước thiết lập mà vật thay thế đã làm mà mục tiêu sẽ không làm. Những bước đó vẫn chưa được kiểm chứng cho đến khi một lượt chạy trên mục tiêu thật bao phủ chúng.

## 5. Đề xuất vòng lặp bảo trì

Chỉ người dùng đến `/maintain-verification-skill` để giữ cho map trung thực khi app thay đổi. Chỉ đề xuất tần suất nếu họ hỏi.
