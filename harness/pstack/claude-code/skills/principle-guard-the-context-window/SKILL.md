---
name: principle-guard-the-context-window
description: "Áp dụng khi context đang đầy lên: output lớn, file dài, đọc lặp lại, lập kế hoạch tỏa ra song song. Chuyển khối lượng lớn cho subagent; giữ bản tóm tắt trong thread chính, không phải payload thô."
disable-model-invocation: true
---

# Guard the Context Window

**Tại sao:** Tràn context làm giảm chất lượng suy luận, tạo ra các sai lệch do nén, và làm đình trệ tiến độ.

**Mẫu:**
- **Định cỡ các giai đoạn và giới hạn phạm vi.** Giới hạn số file mỗi giai đoạn, đặt budget số lượt, tính đến chi phí của cơ chế.
