---
name: principle-separate-before-serializing-shared-state
description: "Áp dụng khi các tác nhân đồng thời có thể ghi vào cùng một file, branch, key, hoặc state object. Loại bỏ việc dùng chung trước; chỉ tuần tự hóa về mặt cấu trúc khi một bên ghi dùng chung duy nhất là một bất biến thật."
disable-model-invocation: true
---

# Separate Before Serializing Shared State

Khi các tác nhân đồng thời có thể ghi vào cùng một file, branch, key, hoặc object, trước hết hãy hỏi chúng cần một object dùng chung hay đang công bố các sự thật độc lập. Mặc định cho mỗi tác nhân file, key, branch, hoặc thư mục state riêng, và chỉ hợp nhất ở nơi state được đọc. Hai worker ghi trường riêng của mình vào một `state.json` vẫn là thay đổi dùng chung.

Chỉ khi một đích ghi dùng chung là một bất biến thật, hãy tuần tự hóa việc truy cập về mặt cấu trúc (một lockfile, một bên ghi duy nhất, các giai đoạn tuần tự, compare-and-swap). Chỉ dẫn không phải là kiểm soát đồng thời, và "ta cần một lock" là một mùi cần kiểm tra trước.
