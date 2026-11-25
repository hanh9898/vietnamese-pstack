# Render một biểu đồ

Render mỗi file `.mmd` mà bạn hiển thị bằng npm package `pele@1.9.0`, và đưa cho người dùng file SVG. Cài Pele một lần, bên ngoài repo. Ghi mỗi SVG cạnh file `.mmd` của nó, với cùng tên. API ở https://pele.run/api. Truyền `{ limit: 1_000_000, outputLimit: 8_000_000, maxEdges: 10_000 }` làm tùy chọn của `render`. Mặc định của Pele nhỏ hơn kích thước mà một biểu đồ 500 trạng thái có thể đạt. Khi Pele ném ra một `PeleError`, hãy cho người dùng xem chữ Mermaid và lỗi.

## Màu sắc

Pele bỏ qua `theme` và `themeVariables` của Mermaid. Đặt các biến CSS `--pele-*` của nó trên `.pele`. https://pele.run/theming liệt kê chúng. Lệnh gán cho mỗi trạng thái class màu của nhóm nó, như `class sN teal`. Nó đánh dấu mỗi trạng thái xấu bằng `class sN breaks` hoặc `class sN mayBreak`, mỗi trạng thái trên đường ngắn nhất đến một bug bằng `class sN bugPath`, và mỗi trạng thái mà một phản ví dụ PROPERTY lặp lại mãi mãi bằng `class sN repeats`. Pele đặt các class này lên node của trạng thái. Tô màu các class bằng CSS.

File `.mmd` có một dòng `classDef` cho `breaks` và cho `mayBreak`, để mọi trình xem Mermaid đều hiển thị các dấu bug. Nó không có `classDef` cho màu nhóm, `bugPath`, hay `repeats`. Pele ghi màu của mỗi `classDef` thành một thuộc tính `style` trên node, và một thuộc tính `style` thắng một rule CSS thông thường. Vì vậy các rule cho các dấu bên dưới dùng `!important`. Không có nó, một theme tối sẽ giữ màu dấu sáng. Một dấu bug đặt màu nền và chữ, còn `bugPath` và `repeats` đặt viền. Đặt các rule của dấu sau màu nhóm, để dấu hiển thị đè lên màu nhóm.

Các màu này là gợi ý. Chúng là màu của skill cũ. Đặt chúng trong một phần tử `<style>` ở đầu mỗi SVG. Mỗi SVG khi đó tuân theo cài đặt sáng hoặc tối của trình xem.

```css
.pele {
  --pele-bg: #ffffff;
  --pele-fg: #1c1c1c;
  --pele-muted: #656565;
  --pele-line: #808080;
  --pele-surface: #fcfcfc;
  --pele-surface-alt: #f1f1f1;
  --pele-border: #c9c9c9;
}
.pele .blue rect { fill: #c3e0ff; }
.pele .orange rect { fill: #f0d3bf; }
.pele .purple rect { fill: #e3d5ff; }
.pele .yellow rect { fill: #f0dcbf; }
.pele .teal rect { fill: #bfe3df; }
.pele .tan rect { fill: #e5d9ce; }
.pele .pink rect { fill: #ffcbe6; }
.pele .breaks rect {
  fill: #ffecee !important;
  stroke: #e72e3b !important;
  stroke-width: 2.5px !important;
}
.pele .breaks text {
  fill: #cd2834 !important;
}
.pele .mayBreak rect {
  fill: #fff3e6 !important;
  stroke: #e8730c !important;
  stroke-width: 2.5px !important;
}
.pele .mayBreak text {
  fill: #b85a06 !important;
}
.pele .bugPath rect {
  stroke: #1680f3 !important;
  stroke-width: 2.5px !important;
}
.pele .repeats rect {
  stroke: #9b35d6 !important;
  stroke-width: 2.5px !important;
  stroke-dasharray: 6 3;
}
@media (prefers-color-scheme: dark) {
  .pele {
    --pele-bg: #1f1f1f;
    --pele-fg: #f5f5f5;
    --pele-muted: #acacac;
    --pele-line: #939393;
    --pele-surface: #121212;
    --pele-surface-alt: #2c2c2c;
    --pele-border: #4e4e4e;
  }
  .pele .blue rect { fill: #1b3857; }
  .pele .orange rect { fill: #573117; }
  .pele .purple rect { fill: #3c2e57; }
  .pele .yellow rect { fill: #573d17; }
  .pele .teal rect { fill: #174641; }
  .pele .tan rect { fill: #3d3127; }
  .pele .pink rect { fill: #57233e; }
  .pele .breaks rect {
    fill: #2e2021 !important;
    stroke: #cf2b35 !important;
  }
  .pele .breaks text {
    fill: #ff6463 !important;
  }
  .pele .mayBreak rect {
    fill: #2e2619 !important;
    stroke: #d0700f !important;
  }
  .pele .mayBreak text {
    fill: #ffa257 !important;
  }
  .pele .bugPath rect {
    stroke: #116dd2 !important;
  }
  .pele .repeats rect {
    stroke: #9a3fcf !important;
  }
}
```
