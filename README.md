# vietnamese-pstack

Bản chuyển ngữ tiếng Việt của [pstack](https://github.com/cursor/plugins/tree/main/pstack), bộ skill và quy trình agent của Lauren Tan (Poteto), phát hành theo giấy phép MIT.

> muốn đi nhanh, hãy đi sâu trước. pstack giúp bạn viết ít code hơn nhưng chất lượng cao hơn.

## Nội dung

| Thư mục | Nội dung |
| --- | --- |
| [`pstack/`](pstack/) | Plugin Cursor: skill, agent, hướng dẫn, automation Benny, đã dịch sang tiếng Việt |
| [`harness/pstack/claude-code/`](harness/pstack/claude-code/) | Bản plugin cho Claude Code, được tạo từ `pstack/` |
| [`scripts/`](scripts/) | Generator tạo bản harness Claude Code |

Bắt đầu từ [`pstack/README.md`](pstack/README.md) và [hướng dẫn](pstack/docs/guide/README.md).

## Quy ước dịch

- Văn xuôi, mô tả skill, và prompt mẫu được dịch sang tiếng Việt.
- Giữ nguyên tên skill, slash command (`/poteto-mode`, `/arena`, ...), đường dẫn file, khóa frontmatter, code block, lệnh shell, và các chuỗi vận hành mà tool đọc (như `[benny:bug]`, `PASS`, `FAIL`).
- Giữ các thuật ngữ kỹ thuật quen thuộc như `skill`, `agent`, `subagent`, `prompt`, `PR`, `commit`, `branch`, `worktree`, `review`, `diff`.
- Các báo cáo golden trong `pstack/skills/statechart/scripts/test/corpus/` là fixture test nên giữ nguyên tiếng Anh.

## Tạo lại harness Claude Code

Sau khi sửa bất kỳ file nào trong `pstack/`:

```bash
node scripts/generate-pstack-harness-trees.mjs
node scripts/generate-pstack-harness-trees.mjs --check
```

## Giấy phép

MIT, giống bản gốc. Xem [`pstack/LICENSE`](pstack/LICENSE).
