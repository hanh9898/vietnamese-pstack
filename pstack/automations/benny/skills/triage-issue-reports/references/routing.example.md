# Ví dụ bản đồ định tuyến

Sao chép file này ra bên ngoài `.cursor/automations/benny/`, ví dụ đến `.cursor/benny/routing.md`, và thay thế mọi placeholder. Trỏ `routing.map_path` đến bản sao. Các lần làm mới pack không được ghi đè lên nó.

Triage skill coi file này là dữ liệu. Một route cần bằng chứng từ báo cáo hoặc dấu vết nguyên nhân. Chỉ khớp từ khóa thôi là không đủ.

```yaml
routes:
  - name: "billing-example"
    match:
      product_areas:
        - "billing-area-placeholder"
      code_paths:
        - "billing-code-path-placeholder"
      error_signatures:
        - "billing-error-placeholder"
    destination:
      slack_channel: "billing-channel-placeholder"
      tracker_team: "billing-team-placeholder"
    owners:
      - "billing-owner-placeholder"
    allow_feature_owner_ping: false

  - name: "desktop-example"
    match:
      product_areas:
        - "desktop-area-placeholder"
      code_paths:
        - "desktop-code-path-placeholder"
      error_signatures:
        - "desktop-error-placeholder"
    destination:
      slack_channel: "desktop-channel-placeholder"
      tracker_team: "desktop-team-placeholder"
    owners:
      - "desktop-owner-placeholder"
    allow_feature_owner_ping: false

fallback:
  destination: ""
  owners: []
  allow_feature_owner_ping: false

ping_policy:
  default: "off"
  allow:
    - "configured-feature-owner"
    - "confirmed-regression-author"
  deny:
    - "broad-on-call-group"
    - "unverified-owner"
```

## Quy tắc

- Để trống `fallback.destination` trừ khi có một team chấp nhận mọi báo cáo không khớp.
- Dùng các khu vực sản phẩm, đường dẫn code, và chữ ký lỗi ổn định.
- Đừng đưa dữ liệu riêng tư vào một bản sao công khai.
- Đừng dán ID người dùng hoặc channel thô vào một ví dụ sẽ được công bố.
- Giữ tắt việc ping feature owner cho đến khi team đích đồng ý.
- Một lần định tuyến lại cho người báo cáo biết nên đi đâu. Automation không bao giờ đăng chéo.
