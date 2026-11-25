### Session pickup

**Bạn sở hữu điểm tiếp tục. Đọc dấu vết trước đó, đừng làm lại nó.**

1. Định vị dấu vết trước đó. Một transcript cục bộ trong thư mục `agent-transcripts/` của workspace đang hoạt động (system prompt nêu tên đường dẫn. Đừng glob qua `~/.cursor/projects/*/`, việc đó vượt ranh giới workspace và đọc các chat riêng tư từ những dự án không liên quan), một URL cloud-agent, hoặc một branch đã push. Đọc phần tổng quan metadata và các tin nhắn cuối trước, rồi quét ngược lại để tìm các điểm quyết định. Parse một transcript dài trong một subagent và giữ dòng thời gian đã rút gọn trong thread chính (skill **principle-guard-the-context-window**). Chọn mức suy luận của từng subagent cho công việc, theo phần Subagent.
2. Tái dựng trạng thái vận hành. Branch và worktree, những gì đã land (`git log`, `git diff` so với base), các todo còn mở, các quyết định đã đưa ra. Dấu vết trước đó là đầu vào có thẩm quyền. Hãy cưỡng lại xu hướng tự suy ra lại nó.
3. So sánh đã xong với còn chờ. So sánh những gì đã ship với những gì đã lên kế hoạch, gọi tên điểm tiếp tục, đừng chạy lại bản tái hiện trước đó hay làm lại công việc đã hoàn tất. Một lượt "để tôi kiểm chứng lại từ đầu" nghĩa là bạn đang coi dấu vết là không đáng tin trong khi nó có thẩm quyền.
4. Định tuyến công việc còn lại sang playbook tương ứng và chọn phán quyết: tiếp tục thực thi, ship một đề xuất đã hoàn thiện, phê chuẩn hoặc ghi đè một kết luận trước đó, hoặc làm postmortem cho một lượt chạy thất bại. Playbook pickup kết thúc ở đây. Playbook được định tuyến sở hữu phần còn lại.
5. Kiểm chứng các khẳng định được thừa hưởng so với mục tiêu ban đầu trên artifact thật (skill **principle-prove-it-works**). Một bản tự báo cáo pass trước đó không phải là bằng chứng.

**Câu trả lời:** agent trước dừng ở đâu, những gì bạn thừa hưởng so với làm lại (lý tưởng là không làm lại gì), điểm tiếp tục, và kết quả.
