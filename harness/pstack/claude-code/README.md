# pstack

tôi là [poteto](https://x.com/poteto). tôi không phải tổng thống hay ceo, nhưng tôi đã làm việc với hàng triệu dòng code ở Meta, Netflix và Cursor. tôi cũng ở trong react core team, nơi tôi giúp xây dựng và duy trì react compiler.

ngày càng có nhiều người thấy rằng ai viết ra quá nhiều code rác (slop). tôi đồng ý. tôi không muốn ship như một đội gồm hai mươi "nghệ sĩ slop". năng suất mà không có chất lượng không phải là mục tiêu tôi theo đuổi. nếu muốn đi nhanh, hãy đi sâu trước.

**pstack là câu trả lời của tôi.** đây chính là những skill tôi dùng mỗi ngày để ship code chất lượng cao ở Cursor. nó biến cursor thành một đội kỹ sư thực thụ. mục tiêu không phải là tối đa số dòng code, thật ra là ngược lại. pstack giúp bạn viết ít code hơn, nhưng chất lượng cao hơn.

**pstack cho bạn khả năng chạy song song mà không phải lo lắng.** khi bạn có thể đi sâu với một agent và tin rằng nó viết code tốt, kiểm chứng được, bạn thật sự có thể chạy song song một cách tự tin. hãy khởi động nhiều agent với `poteto-mode` và tin rằng chúng sẽ áp dụng các nguyên tắc kỹ thuật chặt chẽ vào công việc.

**cursor cho bạn những gì tốt nhất của mọi thế giới.** mỗi frontier model đều có điểm mạnh và điểm yếu riêng. dùng model nào với pstack cũng được. thật ra, nhiều skill của tôi dùng quy trình nhiều model để tận dụng điểm mạnh riêng của từng model.

hãy fork nó. cải tiến nó. biến nó thành của bạn. PR luôn được chào đón!

## cài đặt

```bash
/add-plugin pstack
```

trong claude code:

```bash
claude plugin marketplace add hanh9898/vietnamese-pstack
claude plugin install pstack@vietnamese-pstack
```

trong một session đang mở, bạn cũng có thể chạy `/plugin marketplace add hanh9898/vietnamese-pstack`, rồi `/plugin install pstack@vietnamese-pstack` và chọn phạm vi cài đặt trong bảng plugin. claude code tắt auto-update cho các marketplace bên thứ ba, nên pstack giữ nguyên phiên bản bạn đã cài. để bật nó, chạy `/plugin`, mở tab **marketplaces**, chọn `vietnamese-pstack` và chọn **enable auto-update**. để cập nhật thủ công một lần, chạy `claude plugin update pstack@vietnamese-pstack`.

claude code thêm tiền tố cho lệnh và agent của plugin, nên `/poteto-mode` thành `/pstack:poteto-mode`. [bộ chuyển đổi claude code](./docs/harness/claude-code.md) ánh xạ mọi tên cursor còn lại. trong claude code, `/pstack:setup-pstack` ghi lựa chọn model của bạn vào `~/.claude/rules/pstack-models.md`, và bước nào cần tính năng chỉ có trên cursor, như bugbot hay automations, sẽ bị bỏ qua kèm một dòng ghi chú.

claude code cài một bản sao được sinh tự động của pstack, gồm cả readme này và hướng dẫn, từ [`harness/pstack/claude-code`](https://github.com/hanh9898/vietnamese-pstack/tree/main/harness/pstack/claude-code) ở gốc repository. sau khi thay đổi pstack, chạy `node scripts/generate-pstack-harness-trees.mjs` từ gốc repository và commit kết quả. ci sẽ fail khi bản sao sinh tự động bị lỗi thời.

## bắt đầu

hai bước:

1. chạy [`/setup-pstack`](./skills/setup-pstack/SKILL.md), chọn mức ngân sách suy luận (reasoning budget) và chọn các model bạn muốn.
2. dùng [`/poteto-mode`](./skills/poteto-mode/SKILL.md) bất cứ khi nào bạn làm việc gì đòi hỏi sự chặt chẽ.

mới đến? [hướng dẫn pstack](./docs/guide/README.md) dẫn bạn qua một task thật đầu tiên, từ cài đặt và viết prompt đến kiểm chứng và chạy qua đêm. bị kẹt, hoặc không chắc skill nào phù hợp? hỏi [`/poteto-help`](./skills/poteto-help/SKILL.md).

vậy thôi. các skill khác chỉ dùng theo tình huống, và skill mode sẽ tự dùng chúng cho bạn khi cần. mặc định, các delegate viết code (feature, refactoring, bug fix, perf, hillclimb), văn bản và phán đoán được giao cho opus 5.5 ở mức xhigh, và không vai trò nào chạy trên mức xhigh. ngoài review panel, fable 5.2 chỉ chạy khi bạn gọi tên nó hoặc sau khi hai lần chạy opus 5.5 với cùng một brief đều thất bại. panel mặc định là fable 5.2 / opus 5.5 / gemini 4 neon. [`/setup-pstack`](./skills/setup-pstack/SKILL.md) thay đổi được tất cả những điều này.

## cách dùng

dùng [`/poteto-mode`](./skills/poteto-mode/SKILL.md) khi bắt đầu một task. nó đọc yêu cầu của bạn, chọn từ một bộ playbook, và chạy các skill khác khi các bước cần đến chúng.

chọn `/poteto-mode` từ menu `/` trước khi gõ task, để cursor đính kèm skill vào tin nhắn.

### cứ dùng [`/poteto-mode`](./skills/poteto-mode/SKILL.md)

skill này là lối tắt chính. tôi dùng nó bất cứ khi nào cần agent làm công việc kỹ thuật chặt chẽ. nó đi kèm hai mươi hai playbook:

```
/poteto-mode pr này có một bug khó thấy: thanh cuộn bị trôi mỗi 750ms kể cả khi không làm gì. tái hiện
trước, rồi sửa và kiểm chứng.
```

```
/poteto-mode tôi đi ngủ đây. land cả stack kể cả khi ci chập chờn. tôi muốn mọi thứ được merge trước
sáng mai.
```

<details>
<summary>hai mươi hai playbook</summary>

| playbook | dùng cho |
|---|---|
| [investigation](./skills/poteto-mode/playbooks/investigation.md) | một câu hỏi chỉ đọc. x hoạt động thế nào, tại sao y được xây như vậy, ta có chắc không. |
| [bug fix](./skills/poteto-mode/playbooks/bug-fix.md) | tái hiện một lỗi, tìm nguyên nhân gốc, và sửa với bằng chứng runtime. |
| [perf](./skills/poteto-mode/playbooks/perf-issue.md) | lần theo một sự chậm đã đo được và cải thiện nó so với baseline. |
| [hillclimb](./skills/poteto-mode/playbooks/hillclimb.md) | cải thiện bền bỉ, có phương pháp khoa học, một chỉ số so với mục tiêu, lặp các giả thuyết với phép đo trước/sau và một commit cho mỗi cải tiến được chấp nhận. |
| [runtime forensics](./skills/poteto-mode/playbooks/runtime-forensics.md) | chẩn đoán một triệu chứng đang xảy ra (leak, cpu quay vòng khi rảnh, glitch) từ instrumentation. |
| [trace forensics](./skills/poteto-mode/playbooks/trace-forensics.md) | chẩn đoán một artifact profiling đã thu được (cpuprofile, trace, spindump, heap snapshot). |
| [feature](./skills/poteto-mode/playbooks/feature.md) | hành vi mới hoặc thay đổi, xây từ một data shape có tên. |
| [refactoring](./skills/poteto-mode/playbooks/refactoring.md) | một thay đổi giữ nguyên hành vi đối với cấu trúc hoặc hình dạng. |
| [prototype](./skills/poteto-mode/playbooks/prototype.md) | một bản phác thảo dùng xong bỏ để đưa ra quyết định thiết kế hoặc hành vi với chi phí thấp, hoặc để giải quyết một ngã rẽ thực nghiệm bằng cách quan sát nó. |
| [visual parity](./skills/poteto-mode/playbooks/visual-parity.md) | tương đương ui chính xác đến từng pixel giữa hai bản cài đặt. |
| [authoring a skill](./skills/poteto-mode/playbooks/authoring-a-skill.md) | viết hoặc sửa một SKILL.md. |
| [eval](./skills/poteto-mode/playbooks/eval.md) | kiểm tra một thay đổi skill hoặc prompt ảnh hưởng thế nào đến hành vi agent, theo kiểu blind. |
| [babysit](./skills/poteto-mode/playbooks/babysit.md) | đưa một pr hoặc một stack đến trạng thái sẵn sàng merge: conflict, review thread, ci. |
| [shipping](./skills/poteto-mode/playbooks/shipping.md) | kiểm chứng độc lập một stack đã xanh, rồi land chuỗi liên tiếp đã kiểm chứng từ dưới lên qua github theo mặc định, hoặc qua origin khi có. |
| [autonomous run](./skills/poteto-mode/playbooks/autonomous-run.md) | đẩy một task dài đến khi hoàn thành mà không dừng lại. |
| [autopilot-full](./skills/poteto-mode/playbooks/autopilot-full.md) | chạy các pr độc lập đến khi merge với một owner cho mỗi pr. một swarm kiểm chứng từng head đã sẵn sàng về code, và mọi thay đổi sau đó lên patch đều được kiểm tra lại từ đầu. |
| [autopilot-stack](./skills/poteto-mode/playbooks/autopilot-stack.md) | autopilot-full nhưng không merge. xây và kiểm chứng các pr để operator review và land, chỉ stack một pr lên một pr mà nó dựa vào. |
| [session pickup](./skills/poteto-mode/playbooks/session-pickup.md) | tiếp tục hoặc tiếp quản công việc dở dang của một agent trước đó. |
| [pause safely](./skills/poteto-mode/playbooks/pause-safely.md) | tạm dừng gọn gàng công việc đang làm để có thể tiếp tục sau. |
| [multi-phase plan](./skills/poteto-mode/playbooks/multi-phase-plan.md) | công việc trải qua nhiều giai đoạn hoặc nhiều PR xếp chồng. |
| [worktree cleanup](./skills/poteto-mode/playbooks/worktree-cleanup.md) | lấy lại dung lượng đĩa bằng cách dọn các worktree đã merge hoặc bị bỏ và các ios simulator cũ, có cổng an toàn. |
| [opening a pr](./skills/poteto-mode/playbooks/opening-a-pr.md) | mở một pr sẵn sàng từ các commit nhỏ có thứ tự, với tiêu đề theo conventional commits và phần mô tả kiểu briefing. được gọi ở cuối mọi playbook khác. |

</details>



khi được gọi, nó:

1. khớp task của bạn với một [playbook](./skills/poteto-mode/playbooks/) và mở một todo list với các mục đầu tiên là các bước của playbook đó, chép nguyên văn.
2. chuyển sang các skill khác khi các bước kích hoạt.
3. viết câu trả lời đã được unslop, trình bày cho người dùng và người bảo trì.

toàn bộ quy tắc và playbook nằm trong [`skills/poteto-mode/SKILL.md`](./skills/poteto-mode/SKILL.md).

để giữ [`/poteto-mode`](./skills/poteto-mode/SKILL.md) bật qua nhiều lượt, chọn nó từ menu `/` và nhấn option+enter (mac) hoặc alt+enter (windows) thay vì enter. việc đó biến nó thành một [custom mode](https://cursor.com/docs/skills#using-a-skill-as-a-custom-mode), có trong cửa sổ agents và cli của cursor. nó ở lại trong context mọi lượt cho đến khi bạn thoát mode. nhấn enter thường chỉ đính kèm nó vào một tin nhắn.

[`/poteto-mode`](./skills/poteto-mode/SKILL.md) hoạt động cực kỳ tốt với lệnh `/loop` của cursor. bạn có thể để cursor làm việc nhiều giờ liền mà không phải hy sinh sự chặt chẽ.

## skills

[`/poteto-mode`](./skills/poteto-mode/SKILL.md) tự chạy phần lớn các skill này cho bạn khi một bước cần đến (`why`, `architect`, `arena`, `swarm`, `interrogate`, `unslop`, `no-comments`, `technical-writing`, `tdd`, và các nguyên tắc). bảng dưới đây dành cho khi bạn muốn gọi trực tiếp một skill:

```
/how chúng ta hủy các run thế nào? có bị n+1 khi tra từng run cần hủy không?
```

```
/interrogate review pr này.
```

<details>
<summary>tất cả skill</summary>

| skill | dùng khi |
|---|---|
| [`/poteto-mode`](./skills/poteto-mode/SKILL.md) | điểm vào mặc định cho mọi task không tầm thường. |
| [`/poteto-help`](./skills/poteto-help/SKILL.md) | bạn mới dùng pstack, hoặc không chắc skill, playbook hay nguyên tắc nào phù hợp. tìm hiểu bạn đang muốn làm gì, trả lời phần đó, và đưa bạn một prompt để gõ. chỉ chạy khi bạn gõ `/poteto-help`. |
| [`/in-your-own-words`](./skills/in-your-own-words/SKILL.md) | bạn muốn agent nhắc lại mục tiêu và vấn đề của bạn trước khi bắt đầu. chỉ chạy khi bạn gõ `/in-your-own-words`. |
| [`/sharpen`](./skills/sharpen/SKILL.md) | bạn muốn một prompt sâu hơn, không phải dài hơn, trước khi gửi: điều một chuyên gia hàng đầu sẽ làm mà bạn chưa yêu cầu, nguyên liệu thô họ sẽ bắt đầu từ đó, phương pháp và công cụ của họ, và một bước kiểm tra bên ngoài rằng kết quả là đúng. trả lại prompt đã viết lại, trong đó yêu cầu agent prototype mọi lựa chọn mà một thí nghiệm có thể giải quyết và để các lựa chọn về sản phẩm và sở thích cho bạn. không làm task. chỉ chạy khi bạn gõ `/sharpen`. |
| [`/reframe`](./skills/reframe/SKILL.md) | bạn không gọi tên được thứ mình đang xây, nên không thể yêu cầu agent một cách rõ ràng. bắt đầu từ file và lời của chính bạn. nếu chúng có thể mô tả nhiều hơn một vấn đề, nó liệt kê hai hoặc ba vấn đề có thể, kèm dấu hiệu phân biệt từng cái, và chọn cái khả dĩ nhất. sau đó nó đưa ra 8 đến 12 thuật ngữ chuyên môn xếp theo mức độ chúng sẽ thay đổi thứ bạn xây, mỗi thuật ngữ gắn với phần mô tả của bạn mà nó gọi tên và với một dự án thật có link đã được kiểm tra. mượn thuật ngữ từ 2 hoặc 3 lĩnh vực lân cận đã giải cùng vấn đề dưới tên khác, nói rõ mỗi phép so sánh sai ở đâu, rồi viết lại mô tả của bạn bằng những từ mới. chỉ chạy khi bạn gõ `/reframe`. |
| [`/how`](./skills/how/SKILL.md) | bạn muốn được dẫn đi xem một subsystem hoạt động thế nào. |
| [`/why`](./skills/why/SKILL.md) | bạn muốn biết tại sao một thứ được xây như vậy. trả lời từ hồ sơ lịch sử, không phải từ code: các commit và thảo luận pr đã tạo ra nó và từng thay đổi sau đó, cùng các nguồn khác khi dấu vết đó mỏng. trích dẫn những gì tác giả đã viết, đánh dấu suy luận của chính nó, và nói rõ hồ sơ không trả lời được điều gì. |
| [`/recall`](./skills/recall/SKILL.md) | bạn đang bắt đầu hoặc tiếp tục công việc và muốn context gần đây về một chủ đề được dựng lại từ lịch sử chat của chính bạn và hồ sơ chung, trả về dưới dạng một bản tóm tắt trạng thái hiện tại gọn gàng. |
| [`/ketchup`](./skills/ketchup/SKILL.md) | bạn muốn biết những gì đã thay đổi trong chat này kể từ tin nhắn cuối của bạn, bằng lời đơn giản và hình minh họa nhỏ, với mọi mục đang chờ bạn được liệt kê và có thể quyết định chỉ từ câu trả lời, kể cả khi điều đó làm câu trả lời dài. |
| [`/ketchup-video`](./skills/ketchup-video/SKILL.md) | bạn muốn bản cập nhật `/ketchup` dưới dạng một video slide ngắn có phụ đề, với các quyết định đang chờ bạn ở dạng văn bản bên dưới. |
| [`/blast-radius`](./skills/blast-radius/SKILL.md) | bạn có một thay đổi trông nhỏ và muốn biết nó còn có thể làm hỏng gì khác, với một sự thật duy nhất khiến nó an toàn được chứng minh bằng cách chạy code, không phải chỉ khẳng định. |
| [`/architect`](./skills/architect/SKILL.md) | bạn sắp viết code vượt qua ranh giới hàm và muốn cách dùng của caller, các type, và hình dạng module được chốt trước. |
| [`/arena`](./skills/arena/SKILL.md) | bạn muốn N lần thử song song cho cùng một việc, rồi lấy những phần tốt nhất của mỗi lần. |
| [`/swarm`](./skills/swarm/SKILL.md) | bạn muốn N worker song song trên các phần khác nhau hoặc các cuộc đua khác nhau, rồi một báo cáo tổng hợp. |
| [`/interrogate`](./skills/interrogate/SKILL.md) | bạn có một diff và muốn các model khác nhau cố gắng phá nó, chỉ giữ lại những phát hiện được một lần chạy chứng minh. |
| [`/automate-me`](./skills/automate-me/SKILL.md) | bạn muốn skill `-mode` của riêng mình, được soạn từ cách bạn thực sự đã làm việc. |
| [`/make-bot-ui`](./skills/make-bot-ui/SKILL.md) | bạn muốn một trang hoặc dashboard có các nút đánh thức một Grok Bot qua webhook, bao gồm việc bàn giao sender-key và Tailscale. |
| [`/setup-pstack`](./skills/setup-pstack/SKILL.md) | bạn muốn chọn model pstack dùng cho từng vai trò. phát hiện các model của bạn và ghi một config rule. |
| [`/reflect`](./skills/reflect/SKILL.md) | một task dài đã hoàn thành và bạn muốn công thức được ghi lại thành một chỉnh sửa skill. |
| [`/correct`](./skills/correct/SKILL.md) | bạn cứ phải sửa agent vì cùng những lỗi lặp lại. đào lịch sử tìm các nhóm lỗi, sửa mỗi nhóm ở tầng cao nhất có hiệu quả (kiến trúc, rồi type, lint và ci, rồi test, docs sau cùng), và giữ một bảng ghép mỗi quy tắc với thứ thực thi nó. |
| [`/teach`](./skills/teach/SKILL.md) | bạn muốn thật sự hiểu một thay đổi hoặc subsystem, không chỉ được tóm tắt. chạy how + why và đan thành một lời giải thích đơn giản, xây dần qua từng sơ đồ. |
| [`/tdd`](./skills/tdd/SKILL.md) | bạn đang sửa một bug và có đường test cục bộ rẻ. viết test fail trước, rồi mới sửa. |
| [`/benchmark-checklist`](./skills/benchmark-checklist/SKILL.md) | bạn đã chạy benchmark hoặc đo được một sự tăng tốc hay suy giảm. thẩm định con số (yếu tố giới hạn, tuning, lỗi, chạy lặp lại, mức liên quan end-to-end) trước khi bạn báo cáo hoặc hành động dựa trên nó. |
| [`/no-comments`](./skills/no-comments/SKILL.md) | gỡ comment trước khi review; khởi chạy Comment Sicko, sửa các phát hiện được chấp nhận, đề xuất cách mã hóa cho các ràng buộc được tuyên bố. |
| [`/typescript-best-practices`](./skills/typescript-best-practices/SKILL.md) | bạn đang đọc hoặc sửa typescript. neo nguyên tắc type-system-discipline vào cú pháp. |
| [`/figure-it-out`](./skills/figure-it-out/SKILL.md) | không playbook đi kèm nào phù hợp. thiết kế một playbook chặt chẽ, kiểm toán được cho task. |
| [`/show-me-your-work`](./skills/show-me-your-work/SKILL.md) | bạn muốn một dấu vết quyết định có thể review. ghi các quyết định vào một file tsv bạn có thể commit. |
| [`/create-verification-skill`](./skills/create-verification-skill/SKILL.md) | dự án của bạn chưa có cách nào bằng script để chứng minh hành vi ứng dụng. sinh một verify skill cục bộ cho dự án kèm feature map, cho mọi ngôn ngữ hay nền tảng. |
| [`/maintain-verification-skill`](./skills/maintain-verification-skill/SKILL.md) | feature map của verify skill đã lệch khỏi ứng dụng. một đợt đọc source + một lượt chạy thật, tối đa một PR gồm các sửa đổi đã được chứng minh. |
| [`/create-formal-verification-skill`](./skills/create-formal-verification-skill/SKILL.md) | test không chạm tới được trường hợp làm hỏng một race, retry, state machine, parser hay unsafe code. kiểm chứng một thuộc tính bằng công cụ phù hợp và sinh một skill cục bộ cho dự án để kiểm tra lại nó ở mỗi thay đổi. |
| [`/maintain-formal-verification-skill`](./skills/maintain-formal-verification-skill/SKILL.md) | code mà formal verification của bạn bao phủ đã thay đổi kể từ lần kiểm tra cuối. cập nhật model, harness hoặc thuộc tính cho khớp với code, chạy lại, và nói rõ mỗi lỗi là do verification bị lệch hay do bug trong code. |
| [`/statechart`](./skills/statechart/SKILL.md) | người chịu trách nhiệm về hành vi cần nhìn thấy nó, không phải đọc spec. kiểm tra một model tla+, vẽ những gì người dùng thấy thành một mermaid statechart, đánh dấu mỗi trạng thái vi phạm quy tắc, và đưa ra đường đi ngắn nhất đến từng trạng thái đó. |
| [`/unslop`](./skills/unslop/SKILL.md) | bạn đang chỉnh sửa văn bản. loại bỏ các dấu hiệu AI. |
| [`/bro`](./skills/bro/SKILL.md) | bạn muốn tin nhắn cuối được nói lại bằng ngôn ngữ đời thường, không thuật ngữ. |
| [`/technical-writing`](./skills/technical-writing/SKILL.md) | tiêu chuẩn tài liệu nhiều lớp (Diátaxis + Google developer style + STE + Global English) cho docs, RFC, readme, mô tả PR, commit message. |

</details>



### ví dụ

phần lớn thời gian tôi gõ [`/poteto-mode`](./skills/poteto-mode/SKILL.md) khi bắt đầu một task và để nó chọn playbook. các skill khác kích hoạt khi các bước cần đến. một vài skill tôi gọi trực tiếp.


<details>
<summary>tất cả ví dụ</summary>

```
bug fix:           /poteto-mode pr này có một bug khó thấy: thanh cuộn bị trôi mỗi 750ms kể cả khi
                   không làm gì. tái hiện trước, rồi sửa và kiểm chứng.
perf:              /poteto-mode một danh sách lớn mất một hai giây để tải dù đã dùng virtualize.
                   chạy cpu trace và cho tôi biết tại sao.
feature:           /poteto-mode xây một feature nhỏ sau feature flag. kiểm chứng rằng nó thật sự chạy.
prototype:         /poteto-mode xây hai prototype của markdown renderer để chúng ta so sánh.
                   khởi chạy một agent cho mỗi cái.
multi-phase:       /poteto-mode open source các skill này thành một plugin. không để lộ gì nội bộ, làm
                   trong thư mục tạm, cho tôi xem dependency graph trước.
overnight run:     /poteto-mode tôi đi ngủ đây. land cả stack kể cả khi ci chập chờn. tôi muốn
                   mọi thứ được merge trước sáng mai.
babysit:           /poteto-mode kiểm tra pr 123. còn gì tồn đọng không?
visual parity:     /poteto-mode khoảng cách giữa các hàng quá cao khi bật flag này. ảnh thứ hai
                   là đúng. tái hiện và sửa cho đến khi khớp.
figure it out:     /poteto-mode tôi đi vắng một lúc. chuyển mọi caller từ store đồng bộ sang
                   store async mới, giữ hành vi y hệt. tôi muốn tin được là nó đã được làm
                   đúng khi tôi quay lại.
how:               /how chúng ta hủy các run thế nào? có bị n+1 khi tra từng run cần hủy không?
why:               /why tại sao feature flag này vẫn chưa bật?
architect:         thiết kế phần instrumentation này sao cho tín hiệu cao, không có false positive.
                   /architect nó trước.
arena:             /arena đưa nguyên văn prompt của tôi vào arena. tôi muốn so sánh đề xuất của chúng
                   với của bạn.
swarm:             /swarm kiểm tra mọi package trong packages/ với check.sh của nó. một worker cho mỗi
                   package. một báo cáo.
interrogate:       /interrogate review pr này.
tdd:               /tdd implement
unslop:            mình unslop và làm gọn các thay đổi mới được không?
reflect:           /reflect việc này mất quá lâu. ghi lại những gì đã học để lần chạy sau không
                   lặp lại.
correct:           /correct
show-me-your-work: /show-me-your-work giữ một dấu vết quyết định để tôi review khi quay lại.
automate-me:       /automate-me
help:              /poteto-help tôi nên dùng skill nào để review branch này?
```

</details>

## subagent `poteto-agent` và Comment Sicko

[`/poteto-mode`](./skills/poteto-mode/SKILL.md) chạy trong chính chat nhận nó. chat đó sở hữu playbook, todo list, và mọi lần khởi chạy subagent.

pstack cũng đi kèm [`subagent_type: "poteto-agent"`](./agents/poteto-agent.md) làm lớp bọc cho các delegate được khởi chạy trong một lần chạy. nó đọc toàn bộ `poteto-mode`, kể cả mục lục nguyên tắc nội tuyến, trước khi làm bất cứ việc gì. thay bằng `generalPurpose` sẽ bỏ qua bước đọc đó và bị lệch hướng. đừng khởi chạy `poteto-agent` để chạy chính playbook.

[`/poteto-mode`](./skills/poteto-mode/SKILL.md) và [`subagent_type: "poteto-agent"`](./agents/poteto-agent.md) đi qua cùng một lớp bọc.

pstack cũng đi kèm [Comment Sicko](./agents/comment-sicko.md), một reviewer comment chỉ đọc, có sẵn dưới dạng `subagent_type: "comment-sicko"`. thường thì gọi nó qua [`/no-comments`](./skills/no-comments/SKILL.md), không gọi trực tiếp.

## nguyên tắc

hai mươi bốn skill ngắn, mỗi skill một nguyên tắc. `poteto-mode` lập mục lục chúng ngay trong file và đọc mục lục đó khi bắt đầu task. các file riêng lẻ tồn tại để những skill khác có thể tham chiếu một nguyên tắc theo tên, và để mục lục có thể trỏ tới quy tắc đầy đủ của từng nguyên tắc.

<details>
<summary>cả hai mươi bốn nguyên tắc</summary>

| nguyên tắc | nhóm | quy tắc |
|---|---|---|
| [laziness-protocol](./skills/principle-laziness-protocol/SKILL.md) | core | Ưu tiên xóa bỏ và thay đổi nhỏ nhất giải quyết được vấn đề. |
| [foundational-thinking](./skills/principle-foundational-thinking/SKILL.md) | core | Áp dụng trước khi viết logic: chọn các type và cấu trúc dữ liệu cốt lõi, sắp thứ tự giữa việc dựng khung và làm feature, hỏi xem các tác nhân chạy đồng thời chia sẻ những gì. Làm đúng cấu trúc dữ liệu để code phía sau trở nên hiển nhiên. |
| [redesign-from-first-principles](./skills/principle-redesign-from-first-principles/SKILL.md) | core | Thiết kế lại như thể yêu cầu đó đã là một giả định nền tảng ngay từ ngày đầu, thay vì gắn thêm vào. |
| [attack-the-premise](./skills/principle-attack-the-premise/SKILL.md) | core | Áp dụng khi hai bản sửa trở lên có chung một tiền đề đã cùng thất bại ở một cổng kiểm tra. Viết tiền đề đó ra và kiểm tra trực tiếp trước khi viết thêm một bản sửa khác dựa trên nó. |
| [subtract-before-you-add](./skills/principle-subtract-before-you-add/SKILL.md) | core | Loại bỏ phần thừa, các validator dư thừa và các tham chiếu stub trước, rồi xây trên nền đơn giản hơn. |
| [minimize-reader-load](./skills/principle-minimize-reader-load/SKILL.md) | core | Đếm số lớp giữa câu hỏi và câu trả lời, và trạng thái ẩn mà người đọc phải giữ trong đầu; gộp các wrapper chỉ có một caller và thu hẹp phạm vi có thể thay đổi. |
| [outcome-oriented-execution](./skills/principle-outcome-oriented-execution/SKILL.md) | core | Áp dụng trong các đợt viết lại và migration có kế hoạch với ranh giới giai đoạn rõ ràng. Hội tụ về kiến trúc đích; đừng giữ các trạng thái trung gian êm ả bằng code tương thích dùng xong bỏ. |
| [experience-first](./skills/principle-experience-first/SKILL.md) | core | Chọn sự hài lòng của người dùng thay vì sự tiện lợi khi cài đặt; ship ít feature trau chuốt hơn là nhiều feature thô. |
| [exhaust-the-design-space](./skills/principle-exhaust-the-design-space/SKILL.md) | core | Xây 2-3 prototype cạnh tranh và so sánh song song trước khi chốt. |
| [build-the-lever](./skills/principle-build-the-lever/SKILL.md) | core | Áp dụng cho mọi công việc không tầm thường, không chỉ công việc hàng loạt: chỉnh sửa, migration, phân tích, kiểm tra. Xây công cụ làm việc đó hoặc chứng minh nó (codemod, script, generator, hoặc một skill mà subagent của bạn làm theo) thay vì làm bằng tay. Công cụ chính là artifact mà reviewer có thể chạy lại. |
| [model-the-domain](./skills/principle-model-the-domain/SKILL.md) | architecture | Mã hóa domain vào một cấu trúc thay vì các điều kiện rải rác. |
| [boundary-discipline](./skills/principle-boundary-discipline/SKILL.md) | architecture | Tập trung các guard ở ranh giới hệ thống (CLI, config, network, API bên ngoài); tin vào các type nội bộ và giữ business logic trong các hàm thuần. |
| [type-system-discipline](./skills/principle-type-system-discipline/SKILL.md) | architecture | Làm cho trạng thái bất hợp lệ không thể biểu diễn, brand các kiểu nguyên thủy mang ngữ nghĩa, parse dữ liệu bên ngoài ở ranh giới, xử lý hết mọi biến thể, suy ra từ các schema chính thống. |
| [make-operations-idempotent](./skills/principle-make-operations-idempotent/SKILL.md) | architecture | Hội tụ về cùng một trạng thái cuối bất kể các lần chạy dở dang trước đó. |
| [migrate-callers-then-delete-legacy-apis](./skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md) | architecture | Chuyển các caller và xóa API cũ trong cùng một đợt thay vì giữ các lớp tương thích. |
| [separate-before-serializing-shared-state](./skills/principle-separate-before-serializing-shared-state/SKILL.md) | architecture | Loại bỏ việc chia sẻ trước; chỉ tuần tự hóa về mặt cấu trúc khi một writer chung duy nhất là bất biến thật sự. |
| [prove-it-works](./skills/principle-prove-it-works/SKILL.md) | verification | Áp dụng sau khi hoàn thành một task, trước khi tuyên bố xong. Kiểm chứng với artifact thật (chạy feature, đọc giá trị thực, xem diff), không phải một đại diện, lời tự báo cáo, hay 'nó compile được'. |
| [fix-root-causes](./skills/principle-fix-root-causes/SKILL.md) | verification | Lần theo từng triệu chứng về nơi đầu tiên hệ thống đi sai và sửa ở đó. Một guard chỉ là bản sửa khi trạng thái nó xử lý là hợp lệ. |
| [sequence-verifiable-units](./skills/principle-sequence-verifiable-units/SKILL.md) | verification | Áp dụng cho công việc nhiều bước (quét diện rộng, migration, chuỗi chỉnh sửa tương tự) và cho cách bạn xếp chồng commit và PR. Chia công việc thành các đơn vị nhỏ, mỗi đơn vị kết thúc ở một trạng thái kiểm chứng được, kiểm tra từng đơn vị trước khi sang đơn vị tiếp theo, và sắp thứ tự bàn giao để chuỗi đó tự chứng minh với reviewer. |
| [test-behavior-not-implementation](./skills/principle-test-behavior-not-implementation/SKILL.md) | verification | Áp dụng khi bạn viết, thay đổi hoặc giữ lại một test. Assert những gì người dùng của code có thể quan sát, để test fail khi hành vi đó hỏng và vẫn pass khi chỉ phần bên trong thay đổi. |
| [explain-the-number](./skills/principle-explain-the-number/SKILL.md) | verification | Áp dụng trước khi bạn tin, báo cáo, hoặc hành động dựa trên một con số bạn đã đo: một sự tăng tốc, một sự suy giảm, throughput, latency, hoặc kết quả eval. Tìm thứ giới hạn nó, và loại trừ khả năng nó đã đo một thứ khác với công việc bạn nghĩ. |
| [guard-the-context-window](./skills/principle-guard-the-context-window/SKILL.md) | delegation | Chuyển phần khối lượng lớn cho subagent; giữ bản tóm tắt trong luồng chính, không giữ payload thô. |
| [never-block-on-the-human](./skills/principle-never-block-on-the-human/SKILL.md) | delegation | Cứ tiến hành, trình bày kết quả, để con người điều chỉnh sau; chỉ xin xác nhận cho các hành động không thể đảo ngược. |
| [encode-lessons-in-structure](./skills/principle-encode-lessons-in-structure/SKILL.md) | meta | Mã hóa quy tắc thành một lint, metadata flag, runtime check hoặc script thay vì thêm chữ. |

</details>

## không đi kèm ở đây

một vài thứ `poteto-mode` tham chiếu nhưng không đóng gói kèm:

- `/deslop` và skill `deslop` đi kèm trong plugin `cursor-team-kit`.
- `control-cli` (cho CLI và TUI) và `control-ui` (cho browser, Electron, web) cũng đi kèm trong `cursor-team-kit`.
- `/create-skill` là tính năng có sẵn của cursor. cursor cũng có sẵn `/autopilot` theo dõi một pr. bên trong `poteto-mode`, các yêu cầu về trạng thái pr được chuyển sang [babysit playbook](./skills/poteto-mode/playbooks/babysit.md).

cài `cursor-team-kit` cùng với pstack nếu bạn muốn bộ đầy đủ.

## tại sao không có skill lập kế hoạch?

cursor đã có một plan mode rất tốt, chạy rất ăn ý với pstack. nhưng cá nhân tôi không tin vào việc lập kế hoạch. spec tốt nhất là code. nếu bạn vẫn muốn lập kế hoạch, [`/poteto-mode`](./skills/poteto-mode/SKILL.md) có hỗ trợ, nhưng đó không phải mặc định.

## biến nó thành của bạn

`poteto-mode` là phong cách của tôi. có thể bạn không muốn y hệt như vậy.

gõ [`/automate-me`](./skills/automate-me/SKILL.md). nó đào các transcript gần đây của bạn, soạn một skill `<your-name>-mode` từ cách bạn thực sự đã làm việc, và bên dưới vẫn đi qua pstack. bạn giữ pstack làm nền và có thêm skill định tuyến của riêng mình bên cạnh `poteto-mode`.

model cũng cấu hình được. gõ [`/setup-pstack`](./skills/setup-pstack/SKILL.md). nó phát hiện các model bạn có quyền truy cập và ghi một rule nhỏ luôn được áp dụng (always-applied rule), ánh xạ mỗi vai trò (code, phán đoán, các review panel) tới một model. mọi skill đều đọc nó và quay về các mặc định hợp lý khi không có rule, nên bạn chỉ ghi đè những gì mình muốn.

khi một mặc định thay đổi, rule được ghi trước thay đổi đó vẫn ghim mặc định cũ cho đến khi bạn chạy lại `/setup-pstack`. lần chạy đó thay các mặc định cũ mà nó nhận ra và giữ mọi vai trò khác có model khác với mặc định. để bỏ một giá trị ghim mà nó không nhận ra, hãy xóa dòng của vai trò đó hoặc xóa file trước.

## automations

pstack cũng đi kèm một [gói automation benny](https://github.com/hanh9898/vietnamese-pstack/tree/main/pstack/automations/benny) ở trạng thái nghỉ. benny phân loại các báo cáo sự cố trên slack, rồi tái hiện và sửa các bug đã xác nhận với bằng chứng ui thật. các file của nó không được đăng ký làm slash skill.

để thiết lập, hãy trỏ cursor tới [`FOR_AGENTS.md`](https://github.com/hanh9898/vietnamese-pstack/blob/main/pstack/automations/benny/FOR_AGENTS.md). quá trình thiết lập sao chép gói vào repository đích tại `.cursor/automations/benny/`, bật pstack ở đó cho các skill dùng chung, và giữ cấu hình người dùng bên ngoài gói đã sao chép. benny chạy trên cursor automations, nên nó chỉ dành cho cursor.

## giấy phép

MIT
