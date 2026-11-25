### Pause safely

**Bạn sở hữu một lần dừng sạch sẽ. Để lại một checkpoint mà một agent khởi động lạnh có thể tiếp tục từ đó.** Việc này chỉ diễn ra khi được yêu cầu rõ ràng. Với "cứ làm tiếp", "đi ngủ đây, cứ làm tiếp", hoặc "đừng dừng", đừng tạm dừng.

1. Dừng ở một ranh giới an toàn. Hoàn tất bước nguyên tử hiện tại hoặc lùi khỏi nó. Không bắt đầu gì mới, và hủy mọi subagent lồng nhau.
2. Không thực hiện hành động không thể đảo ngược nào để tạm dừng. Không PR và không push trừ khi bạn đã có sẵn một cái.
3. Làm cho công việc bền vững. Commit các chỉnh sửa chưa commit thành một commit `wip:` rõ ràng trên branch hiện tại để không mất gì. Nếu tree đang hỏng, hãy nói vậy trong thân commit bằng một dòng.
4. Viết ghi chú tiếp tục ra ngoài context. Ghi lại ý định, việc bạn đang làm, tiến độ và những gì đã kiểm chứng, trạng thái hiện tại, các bước tiếp theo, các file chính, và các cạm bẫy. Với trigger compaction, hãy ghi nó vào một file như `/tmp/<slug>-resume.md`. Nếu đã có một dấu vết show-me-your-work, hãy trỏ đến nó thay vì sao chép.

**Câu trả lời:** bạn đang ở đâu trong vòng lặp, những gì đã nằm trên đĩa so với những gì vẫn còn trong đầu bạn (đường dẫn, không dump diff), các commit bạn đã tạo và tree có sạch không, và hành động đầu tiên khi tiếp tục. Đây là một lần tạm dừng, không phải báo cáo cuối cùng.
