---
name: poteto-help
description: Hướng dẫn người dùng qua việc thiết lập pstack, /poteto-mode, và chọn skill, playbook, hoặc nguyên tắc cho một task. Gõ /poteto-help kèm một câu hỏi.
disable-model-invocation: true
---

# Trợ giúp Poteto

Trả lời câu hỏi của người dùng về pstack, đưa cho họ một prompt họ có thể gửi, và link đến file mà câu trả lời lấy từ đó. Với một câu hỏi trợ giúp, đừng bắt đầu làm việc. Người dùng hỏi làm thế nào, và một lượt chạy pstack tiêu tốn token thật, nên hãy để họ tự gửi prompt.

Một tin nhắn yêu cầu làm việc, như "dùng pstack để sửa bug này", không phải là một câu hỏi trợ giúp. Đọc [`poteto-mode`](../poteto-mode/SKILL.md), làm việc theo nó, và nhắc một lần rằng một Custom Mode giữ nó luôn bật.

File này ánh xạ các câu hỏi đến các skill và trang hướng dẫn chứa câu trả lời. Các file đó sở hữu chi tiết. Đọc file bạn định tuyến đến trước khi trích dẫn nó, và tin nó khi nó không khớp với bản đồ này. Các link ở đây trỏ vào plugin đã cài, mà người dùng có thể không mở được, nên hãy đưa cho người dùng bản công khai của file: `https://github.com/hanh9898/vietnamese-pstack/blob/main/pstack/` theo sau là đường dẫn của nó.

## Tìm hiểu họ cần gì

Suy ra nhu cầu từ tin nhắn và cuộc hội thoại. Một tình huống được gọi tên, như "skill nào review một PR?", đi thẳng đến phần của nó. Nếu nhu cầu vẫn chưa rõ, hãy hỏi một câu hỏi trắc nghiệm với các lựa chọn này, rồi chỉ trả lời phần họ chọn:

- Thiết lập
- Bắt đầu một task với `/poteto-mode`
- Chọn một skill cho một tình huống
- Sửa một lượt chạy bị sai
- Biến pstack thành của riêng tôi

Kiểm tra trạng thái làm thay đổi câu trả lời, và chỉ nhắc đến nó khi nó làm thay đổi:

- Không có `~/.cursor/rules/pstack-models.mdc` nghĩa là `/setup-pstack` chưa chạy cho người dùng này, nên mọi vai trò dùng model mặc định của nó.
- Không có skill `verify-*` hay harness app nào khác trong dự án nghĩa là agent không có cách nào được viết script để điều khiển app. Nhắc đến `/create-verification-skill` khi câu hỏi là về việc chứng minh một thay đổi hoạt động.
- Không có formal verification skill trong dự án nghĩa là không có tính chất nào được kiểm tra vượt quá những gì test chạm đến. Nhắc đến `/create-formal-verification-skill` khi câu hỏi là về một race condition, một bất biến, hoặc một trường hợp khác mà test hiếm khi chạm đến. Khi đã có một cái và code nó bao phủ đã thay đổi sau commit mà nó ghi là lần đồng bộ cuối, hãy nhắc đến `/maintain-formal-verification-skill` nếu câu hỏi chạm đến code đó.

Khi thiếu rule model và điều đó quan trọng, hãy hỏi người dùng có muốn chọn model cho mỗi vai trò và một ngân sách reasoning ngay bây giờ không. Nó quan trọng khi người dùng mới, câu hỏi là về thiết lập hoặc chi phí, hoặc câu trả lời phụ thuộc vào model nào chạy. Hỏi tối đa một lần mỗi chat. Nếu nhu cầu cũng chưa rõ, hãy hỏi cả hai câu cùng lúc. Đưa ra hai lựa chọn:

- Bây giờ: đưa cho họ `/setup-pstack` để gõ, và cũng trả lời câu hỏi của họ.
- Để sau: trả lời câu hỏi của họ, và thêm một dòng nói rằng mọi vai trò giữ model mặc định cho đến khi họ chạy `/setup-pstack`.

## Thiết lập

1. Cài bằng `/add-plugin pstack` trong chat, hoặc từ Customize trên thanh bên.
2. Chạy [`/setup-pstack`](../setup-pstack/SKILL.md). Nó hỏi một ngân sách reasoning, ánh xạ một model cho mỗi vai trò, và ghi một rule. Rule áp dụng cho các chat mới. Sau đó nó đề xuất mỗi thứ một lần: tạo một verification skill và một formal verification skill cho dự án, trừ khi dự án đã có.
3. Bắt đầu một task thật với `/poteto-mode`, một mục tiêu, và một phép kiểm tra có thể pass hoặc fail.

Việc cài đặt không thay đổi gì cho đến khi người dùng gọi một skill. Chỉ `/setup-pstack` được nạp từ lời của người dùng. [README](../../README.md) và [trang hướng dẫn 1](../../docs/guide/01-setup.md) có chi tiết. Đề nghị cùng họ viết prompt đầu tiên, theo [`references/prompting.md`](references/prompting.md).

Nếu chi phí là mối lo, hãy nói token đi đâu và làm sao tiêu ít hơn. pstack tiêu thêm token cho subagent và panel review. Chạy lại `/setup-pstack` và chọn một ngân sách nhỏ hơn hoặc model rẻ hơn. Một vai trò đặt là `auto` hoặc `inherit-parent` chạy trên model của chat, giúp tiết kiệm token khi chat chạy trên Auto hoặc một model rẻ hơn. Một danh sách panel ngắn hơn chạy ít subagent hơn, mỗi mục một cái. Để dành `/poteto-mode` cho công việc cần sự nghiêm ngặt.

pstack được xây dựng cho Cursor. Trong Claude Code, trong terminal chạy `claude plugin marketplace add hanh9898/vietnamese-pstack`, rồi `claude plugin install --scope user pstack@vietnamese-pstack`; trong một session đang mở, dùng `/plugin marketplace add hanh9898/vietnamese-pstack`, rồi `/plugin install pstack@vietnamese-pstack`. Nếu đã cài upstream từ `cursor/plugins`, trước tiên tắt rồi gỡ `pstack@cursor-plugins` để tránh trùng namespace `/pstack:`:

```bash
claude plugin disable --scope user pstack@cursor-plugins
claude plugin uninstall --scope user pstack@cursor-plugins
```

Nếu bản upstream được cài ở phạm vi `project` hoặc `local`, thay `user` thành cùng phạm vi trong lệnh `disable`, `uninstall` ở trên và lệnh `install` ở trên. Trong giao diện, chọn cùng phạm vi đó. Ở Claude Code, mỗi lệnh có tiền tố `pstack:`, như `/pstack:poteto-mode`. [Adapter Claude Code](../../docs/harness/claude-code.md) ánh xạ các tên Cursor, và một bước cần một tính năng chỉ có trên Cursor, như Bugbot hoặc Automations, sẽ được bỏ qua kèm một ghi chú một dòng.

Các công cụ khác có thể đọc các skill, vì chúng dùng định dạng Agent Skills. Nhưng hầu hết các skill quy trình, bao gồm `/poteto-mode`, `/how`, và `/teach`, khởi chạy subagent của Cursor, một số với model theo vai trò, và Custom Modes cùng `/loop` là tính năng của Cursor, nên những phần đó có thể không hoạt động ở đó.

## Bắt đầu một task với `/poteto-mode`

`/poteto-mode` khớp task với một playbook, sao chép các bước của playbook vào todo list, và chạy các skill khác khi các bước cần đến. Một prompt tốt nêu mục tiêu và cách biết khi nào đã xong. Nó không liệt kê skill, vì một chuỗi viết tay có xu hướng bỏ hoặc đổi thứ tự các bước mà playbook sẽ giữ. Đọc [`references/prompting.md`](references/prompting.md) trước khi bạn giúp viết một prompt. [Trang hướng dẫn 2](../../docs/guide/02-poteto-mode.md) có ví dụ.

Việc `/poteto-mode` có luôn bật hay không phụ thuộc vào cách người dùng bắt đầu nó:

- Enter trên `/poteto-mode` gắn skill vào một tin nhắn. Nó mờ dần khi chat tiếp diễn.
- Option+Enter trên Mac hoặc Alt+Enter trên Windows, hoặc Use as Mode từ mục skill, biến nó thành một Custom Mode. Nó ở trong context mọi lượt cho đến khi người dùng thoát mode, và nó đứng ngoài các lượt trò chuyện thông thường.
- Tài liệu của Cursor liệt kê Custom Modes trong Agents Window và CLI. Ở nơi khác, hãy bắt đầu mỗi task mới bằng `/poteto-mode`.

Link đến [tài liệu skill của Cursor](https://cursor.com/docs/skills) khi chủ đề này xuất hiện. Giữa chat, "new task" (hoặc "task mới") khiến mode khớp một playbook mới. `/poteto-mode` đã dùng `poteto-agent` cho các subagent mà các bước playbook của nó khởi chạy. Để có cùng phong cách từ một subagent của riêng bạn, hãy khởi chạy nó với `subagent_type: "poteto-agent"`.

## Chọn một skill

Câu trả lời mặc định là `/poteto-mode`, chạy hầu hết các skill khác khi các bước của nó cần đến. Gọi tên trực tiếp một skill khi người dùng muốn nhiều hơn hoặc ít hơn một điều gì đó so với những gì playbook đưa ra. Đọc skill trước khi bạn đề xuất nó, và đưa ra một prompt ví dụ.

| Người dùng muốn | Skill |
|---|---|
| Làm bất kỳ task không tầm thường nào một cách nghiêm ngặt | [`/poteto-mode`](../poteto-mode/SKILL.md) |
| Kiểm tra agent đã hiểu mục tiêu và vấn đề của họ trước khi bắt đầu | [`/in-your-own-words`](../in-your-own-words/SKILL.md) |
| Viết lại một prompt sâu hơn, không phải dài hơn, trước khi gửi: những gì một chuyên gia hàng đầu sẽ thêm vào, nguyên liệu thô và phương pháp của họ, và một phép kiểm tra bên ngoài. Nó trả về prompt và không làm task | [`/sharpen`](../sharpen/SKILL.md) |
| Học các thuật ngữ chuyên môn cho thứ họ đang xây dựng, kể cả từ mượn từ các lĩnh vực lân cận, với mọi nguồn được trích dẫn đều đã kiểm tra, và viết lại mô tả của họ bằng chúng | [`/reframe`](../reframe/SKILL.md) |
| Biết code hiện hoạt động thế nào, hoặc code mới nên nằm ở đâu | [`/how`](../how/SKILL.md) |
| Biết tại sao code có hình dạng như vậy, hoặc một con số đến từ đâu | [`/why`](../why/SKILL.md) |
| Hiểu một thay đổi hoặc subsystem, được giải thích đơn giản | [`/teach`](../teach/SKILL.md) |
| Nắm lại công việc gần đây của chính họ về một chủ đề | [`/recall`](../recall/SKILL.md) |
| Nắm lại những gì đã thay đổi trong chat này kể từ tin nhắn cuối của họ, bằng lời lẽ đơn giản và hình minh họa nhỏ, với mọi mục đang chờ họ được liệt kê và có thể quyết định chỉ từ câu trả lời | [`/ketchup`](../ketchup/SKILL.md) |
| Nắm lại như `/ketchup`, trong một video slide ngắn có phụ đề, với các quyết định đang chờ dưới dạng chữ bên dưới | [`/ketchup-video`](../ketchup-video/SKILL.md) |
| Biết một diff nhỏ có thể làm hỏng gì bên ngoài nó | [`/blast-radius`](../blast-radius/SKILL.md) |
| Chốt type và hình dạng module trước khi viết code vượt qua ranh giới hàm | [`/architect`](../architect/SKILL.md) |
| Có nhiều lần thử cho cùng một brief, được gộp thành cái tốt nhất | [`/arena`](../arena/SKILL.md) |
| Chạy các phép kiểm tra song song trên các lát cắt, hoặc cho các worker đua nhau, dưới dạng cloud agent | [`/swarm`](../swarm/SKILL.md) |
| Để các model khác nhau review một diff và cố làm hỏng nó | [`/interrogate`](../interrogate/SKILL.md) |
| Sửa một bug theo kiểu test trước khi có một test local rẻ | [`/tdd`](../tdd/SKILL.md) |
| Áp dụng các quy tắc TypeScript cho công việc với `.ts` hoặc `.tsx` | [`/typescript-best-practices`](../typescript-best-practices/SKILL.md) |
| Bỏ comment trước khi review, dùng một reviewer không phải người viết chúng | [`/no-comments`](../no-comments/SKILL.md) |
| Làm sạch các dấu hiệu AI khỏi văn bản | [`/unslop`](../unslop/SKILL.md) |
| Viết tài liệu, một RFC, một README, một mô tả PR, hoặc một commit message theo chuẩn | [`/technical-writing`](../technical-writing/SKILL.md) |
| Nghe lại câu trả lời cuối bằng lời lẽ đơn giản | [`/bro`](../bro/SKILL.md) |
| Cho agent một cách được viết script để điều khiển app và chứng minh hành vi | [`/create-verification-skill`](../create-verification-skill/SKILL.md) |
| Đưa một verification skill và feature map của nó trở lại đồng bộ với app | [`/maintain-verification-skill`](../maintain-verification-skill/SKILL.md) |
| Kiểm chứng hình thức một race condition, bất biến, hoặc tính chất khác mà test hiếm khi chạm đến | [`/create-formal-verification-skill`](../create-formal-verification-skill/SKILL.md) |
| Đưa một kiểm chứng hình thức trở lại đồng bộ sau khi code nó bao phủ thay đổi, và biết một thất bại là sự lệch hay một bug | [`/maintain-formal-verification-skill`](../maintain-formal-verification-skill/SKILL.md) |
| Cho một PM hoặc designer thấy những gì người dùng thấy dưới dạng một biểu đồ được kiểm tra bởi một model TLA+, với đường ngắn nhất đến mỗi trạng thái phá vỡ một quy tắc | [`/statechart`](../statechart/SKILL.md) |
| Thẩm định một con số hiệu năng trước khi báo cáo hoặc hành động dựa trên nó | [`/benchmark-checklist`](../benchmark-checklist/SKILL.md) |
| Chạy một thay đổi lớn hoặc xuyên suốt, hoặc một thay đổi cần review sau khi rời đi | [`/figure-it-out`](../figure-it-out/SKILL.md) |
| Giữ một log quyết định trong một lượt chạy, và review nó sau đó | [`/show-me-your-work`](../show-me-your-work/SKILL.md) |
| Chọn model cho mỗi vai trò và một ngân sách reasoning | [`/setup-pstack`](../setup-pstack/SKILL.md) |
| Biến thói quen làm việc của chính họ thành một mode skill cá nhân | [`/automate-me`](../automate-me/SKILL.md) |
| Biến những gì một task đã xong dạy được thành các chỉnh sửa skill | [`/reflect`](../reflect/SKILL.md) |
| Ngăn agent lặp lại cùng các lỗi trong repo này | [`/correct`](../correct/SKILL.md) |
| Xây một trang có các nút đánh thức một Grok Bot qua webhook | [`/make-bot-ui`](../make-bot-ui/SKILL.md) |
| Tìm đường trong pstack | `/poteto-help` |

Nếu một thư mục skill cạnh thư mục này không có trong bảng, hãy đọc frontmatter của nó và định tuyến theo description. Các thư mục `principle-*` được bao phủ trong phần nguyên tắc bên dưới.

Các trường hợp sát nhau:

- `/how` giải thích code làm gì. `/why` giải thích lý do. `/teach` chạy một hoặc cả hai và giải thích kết quả một cách đơn giản.
- `/arena` đưa cho mọi worker cùng một brief và gộp các phần tốt nhất. `/swarm` chia công việc thành các lát cắt hoặc một cuộc đua và trả về một báo cáo.
- `/interrogate` review diff. `/blast-radius` tìm chỗ hỏng bên ngoài diff và chứng minh một sự thật khiến thay đổi an toàn.
- `/recall` dựng lại context qua các chat gần đây. `/ketchup` chỉ bao phủ chat này kể từ tin nhắn cuối của người dùng. Tiếp tục một chat hoặc branch cụ thể là playbook Session pickup.
- `/figure-it-out` thiết kế một lượt chạy nghiêm ngặt. Playbook Autonomous run đẩy một task đến một điều kiện kết thúc.

Không có trong pstack:

- `/deslop`, `control-cli`, và `control-ui` đi kèm plugin `cursor-team-kit`.
- `/loop` và `/create-skill` là tính năng có sẵn của Cursor.
- pstack không có skill `/orchestrate`. Nếu menu slash hiển thị `/orchestrate`, một plugin khác cung cấp nó.

## Playbook và nguyên tắc

Playbook là các danh sách bước bên trong `/poteto-mode`, không phải skill, nên chúng không có lệnh slash. Bên trong `/poteto-mode`, mô tả task sẽ chọn một cái, và các cụm từ sau gọi tên trực tiếp một cái:

- "babysit this pr" hoặc "check on pr 123" chạy Babysit. Nó đưa PR đến trạng thái sẵn sàng merge và dừng ở đó. Nó không merge trừ khi người dùng yêu cầu merge, land, hoặc ship.
- "land the stack" chạy Shipping.
- "take over this branch" chạy Session pickup.
- "pause safely" chạy Pause safely.
- "full autopilot on this queue" chạy Autopilot-full. "autopilot, don't merge" chạy Autopilot-stack.
- "run the eval playbook" chạy Eval.

Khi không có `/poteto-mode`, một cụm từ như "babysit this pr" có thể khởi động skill riêng của Cursor cho cùng việc đó. Phần Playbook của [`poteto-mode`](../poteto-mode/SKILL.md) liệt kê mọi playbook. [Trang hướng dẫn 6](../../docs/guide/06-verify-and-ship.md) bao gồm việc mở, babysit, và land một PR.

pstack không có skill lập kế hoạch. Plan Mode của Cursor hoạt động cùng với nó. Với công việc trải qua nhiều giai đoạn hoặc các PR xếp chồng, yêu cầu `/poteto-mode` lập một kế hoạch sẽ chạy [playbook Multi-phase plan](../poteto-mode/playbooks/multi-phase-plan.md), playbook này viết kế hoạch và không cài đặt nó. Với một câu hỏi thiết kế, playbook Prototype hoặc `/architect` chốt nó trong code trước.

Nguyên tắc là các skill một quy tắc mà `/poteto-mode` đọc và trích dẫn trong câu trả lời của nó. Người dùng hiếm khi gọi một cái. Thay vào đó họ điều hướng bằng tên, như trong "áp dụng prove it works. cho tôi xem output thật." Gõ `/principle-<name>` vẫn nạp một cái theo yêu cầu. [Trang hướng dẫn 8](../../docs/guide/08-principles.md) liệt kê chúng.

## Sửa một lượt chạy bị sai

| Triệu chứng | Cách sửa |
|---|---|
| Mode ngừng áp dụng sau vài lượt | Nó được bắt đầu bằng Enter. Bắt đầu nó như một Custom Mode, hoặc bắt đầu mỗi task bằng `/poteto-mode`. |
| Một câu hỏi bị coi là bước tiếp theo của task trước | Nói "new task" (hoặc "task mới"), hoặc nói lượt này không cần mode. |
| Một lựa chọn model mới không có tác dụng | Rule từ `/setup-pstack` áp dụng cho các chat mới. Bắt đầu một chat mới. |
| Các lượt chạy tốn hơn dự kiến | Xem đoạn về chi phí trong phần Thiết lập. |
| Một skill không tự nạp | Chỉ `/setup-pstack` được nạp từ lời của người dùng. Các skill khác được nạp khi người dùng gõ chúng hoặc khi `/poteto-mode` chạy chúng, và nó không chạy mọi skill. |
| Các agent song song ghi đè lên nhau | Cho mỗi agent một worktree riêng, hoặc chạy chúng dưới dạng cloud agent, mỗi cái có máy riêng. |
| Một lượt chạy qua đêm có tiến triển nhưng không hoàn thành gì | `/loop` cần một phép kiểm tra có thể pass hoặc fail, không phải một khoảng thời gian. Xem [trang hướng dẫn 7](../../docs/guide/07-overnight.md). |
| Câu trả lời tuyên bố thành công dựa trên một build xanh | Yêu cầu lệnh, luồng, giá trị được lưu, hoặc profile thật. Đó là nguyên tắc prove-it-works. |

Với một lượt chạy bị trôi, [`references/prompting.md`](references/prompting.md) có các câu điều hướng một dòng. [Trang hướng dẫn 10](../../docs/guide/10-recipes-and-pitfalls.md) có thêm các cạm bẫy và các công thức đáng sao chép.

## Biến pstack thành của riêng tôi

- [`/automate-me`](../automate-me/SKILL.md) soạn một mode skill cá nhân từ chính lịch sử của người dùng, để dùng cùng với `/poteto-mode`.
- [`/reflect`](../reflect/SKILL.md) sau một session biến các bài học của nó thành các chỉnh sửa skill mà người dùng phê duyệt.
- `/poteto-mode write a skill for <workflow>` (hoặc `/poteto-mode viết một skill cho <workflow>`) chạy playbook viết skill. Playbook eval test một thay đổi skill theo kiểu mù.
- Sửa một skill hoạt động sai trong PR riêng của nó, không phải bên trong công việc feature nơi nó đã sai.

[Trang hướng dẫn 9](../../docs/guide/09-make-it-yours.md) bao gồm từng điều này.

## Trả lời

Bắt đầu bằng câu trả lời. Đưa ra tối đa một prompt ví dụ trong một code block, điều chỉnh từ [`references/recipes.md`](references/recipes.md) khi có cái phù hợp, rồi link đến file đó. Giữ ngắn gọn trừ khi người dùng yêu cầu toàn bộ bản đồ.
