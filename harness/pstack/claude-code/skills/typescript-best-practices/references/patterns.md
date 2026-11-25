# Các mẫu TypeScript

Ví dụ code cho mỗi quy tắc trong `SKILL.md`. Các nguyên tắc nền tảng không phụ thuộc ngôn ngữ. Xem các principle skill **type-system-discipline** và **boundary-discipline**.

## Branded types

Brand các primitive để chúng không bị lẫn lộn. Validate một lần tại ranh giới. Code phía sau tin tưởng type.

```ts
type AgentId = string & { readonly __brand: "AgentId" };

function isAgentId(input: string): input is AgentId {
  return isUUID(input);
}

function parseAgentId(input: string): AgentId {
  if (!isAgentId(input)) throw new Error(`Invalid agent id: ${input}`);
  return input;
}

function focusAgent(id: AgentId): void {
  /* input is trusted */
}
```

Khớp với hình dạng `readonly __brand: 'X'`. Đừng tự nghĩ ra một quy ước mới.

## Discriminated unions

Mô hình hóa các biến thể bằng một discriminant literal. Mọi biến thể dùng chung tên field và giá trị của mỗi biến thể là duy nhất, nên các tổ hợp không thể không biểu diễn được.

```ts
// Don't. Boolean + optionals lets contradictory states exist.
type DiffState = { loading: boolean; diff?: GitDiff; error?: string };

// Do. Only valid states exist.
type DiffState =
  | { kind: "loading" }
  | { kind: "ready"; diff: GitDiff }
  | { kind: "error"; error: string };
```

Chọn một tên discriminant (`kind`, `type`, `tag`) và giữ nguyên nó.

## Constructive modeling

Xây type từ các phần đều hợp lệ thay vì giới hạn một type lỏng lẻo bằng các phép kiểm tra runtime.

Không rỗng, qua một variadic tuple:

```ts
type NonEmpty<T> = [T, ...T[]];

// Don't: T[] plus a length check every caller must repeat
function pickWinner(entries: string[]): string {
  if (entries.length === 0) throw new Error("no entries");
  return entries[Math.floor(Math.random() * entries.length)];
}

// Do: an empty value of the type can't exist
function pickWinner(entries: NonEmpty<string>): string {
  return entries[Math.floor(Math.random() * entries.length)];
}
```

Ở nơi một `T[]` thường đi vào, hãy thu hẹp một lần bằng một guard. Sự thật đó sau đó đi theo type:

```ts
const isNonEmpty = <T>(arr: T[]): arr is NonEmpty<T> => arr.length > 0;
```

Độ dài chẵn, dưới dạng các cặp:

```ts
type Pairs<T> = [T, T][];
```

Một khoảng thời gian, dưới dạng điểm bắt đầu cộng thời lượng:

```ts
// Don't: a comment holds the invariant
type TimeRange = { start: Date; end: Date }; // start <= end

// Do: a negative range can't be written; derive end when needed
type TimeRange = { start: Date; durationMs: number };
```

Giữ `durationMs` là một number thường. Chỉ brand nó (theo phần Branded types) nếu một number thô có thể bị truyền vào nơi cần một thời lượng, không phải theo phản xạ. Chọn cách biểu diễn làm cho trạng thái xấu không thể được tạo ra, rồi cung cấp cách đọc bạn cần ở bên trên (`pairs.flat()`, một helper `rangeEnd()`).

## Simplest total type

Đừng làm chặt mọi thứ. Giữ `T[]` khi mọi thao tác trên nó là toàn phần:

```ts
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0); // [] is 0, fine
```

Làm chặt khi type lỏng lẻo buộc phải nói dối tại một nơi dùng. Dấu hiệu là `!`, `arr[0] as T`, và một throw "không bao giờ nên xảy ra":

```ts
// Don't: partiality smuggled past the compiler
function newestSession(sessions: Session[]): Session {
  return sessions.at(0)!;
}

// Do: strengthen the input; the assertion disappears
function newestSession(sessions: NonEmpty<Session>): Session {
  return sessions[0];
}
```

Nới lỏng kết quả thành `Session | undefined` là signature toàn phần còn lại.

## `unknown` over `any`

Dữ liệu bên ngoài luôn là `unknown`. Thu hẹp trước khi dùng.

```ts
// Don't
function handle(input: any) {
  return input.foo.bar;
}

// Do
function handle(input: unknown) {
  if (typeof input === "object" && input !== null && "foo" in input) {
    // narrowed; compiler verifies access
  }
}
```

Các nguồn bên ngoài bao gồm payload RPC, `JSON.parse`, `postMessage`, IPC, nội dung file, biến môi trường, kết quả database.

## Schemas before hand-rolled guards

Trước khi viết một type guard kiểm tra từng property cho dữ liệu bên ngoài, hãy tìm thư viện schema runtime và các schema có sẵn của repository. Để một schema sở hữu việc validate và suy ra type TypeScript từ nó. Đừng duy trì một schema, một interface trùng lặp, và một guard có thể lệch nhau.

```ts
import { z } from "zod";

const UserSchema = z.object({
  id: z.string().uuid(),
  role: z.enum(["admin", "member"]),
});

type User = z.infer<typeof UserSchema>;

function parseUser(input: unknown): User {
  return UserSchema.parse(input);
}
```

Dùng `safeParse` khi thất bại là một nhánh được mong đợi. Dùng helper suy luận tương đương khi repository dùng một thư viện schema khác. Đừng thêm một dependency schema mới chỉ cho một guard. Quy tắc này ưu tiên hệ thống schema mà codebase đã tin tưởng.

## No `as` casts

Mỗi `as` là một lần crash runtime tiềm tàng. Chỉ cast sau khi hệ thống type đã kiểm chứng khẳng định.

```ts
import { z } from "zod";

// Don't
const user = data as User;

// Don't
function isUser(data: unknown): data is User {
  return typeof data === "object" && data !== null && "id" in data;
}

// Do
const userSchema = z.object({ id: z.string(), name: z.string() });
type User = z.infer<typeof userSchema>;

function parseUser(data: unknown): User {
  return userSchema.parse(data);
}
```

Khi type có trước, hãy chú thích validator bằng type mà nó chứng minh. Compiler khi đó sẽ từ chối một validator chứng minh ít hơn type. Bỏ `name` khỏi object bên dưới và phép gán sẽ không compile được.

```ts
type User = { id: string; name: string };

const userSchema: z.ZodType<User> = z.object({ id: z.string(), name: z.string() });
```

Khi refactor để loại một `as` khỏi code hiện có, hãy xác định tại sao TypeScript không suy luận được:

- Thiếu discriminant: thêm một cái, chuyển sang discriminated union.
- Type nguồn quá rộng (ví dụ `Record<string, unknown>`): thu hẹp nó.
- Ranh giới không có type: parse bằng schema sở hữu hình dạng đó. Chỉ thêm schema ở nơi chưa có.
- Thật sự không thể biểu diễn: dùng branded type hoặc `satisfies`.

## Narrowing hierarchy

Từ tốt nhất đến phương án cuối cùng:

1. **Switch / if trên discriminated union.** Compiler tự động thu hẹp.
2. **Toán tử `in`.** `"key" in obj` thu hẹp về các biến thể chứa key đó.
3. **`typeof` / `instanceof`.** Cho primitive và instance của class.
4. **Type guard tự định nghĩa.** Khi những cách trên không đủ.
5. **Cast bằng `as`.** Chỉ sau khi validate.

```ts
function area(s: Shape): number {
  if ("radius" in s) return Math.PI * s.radius ** 2; // narrowed to circle
  return s.width * s.height; // narrowed to rect
}
```

## Type guards

Một guard phải thật sự kiểm chứng khẳng định. Một guard nói dối còn tệ hơn `as`.

```ts
function isCircle(s: Shape): s is Shape & { kind: "circle" } {
  return s.kind === "circle";
}
```

Ưu tiên thu hẹp bằng discriminant khi có thể.

## Exhaustiveness

Trong nhánh default, gán discriminant cho một biến cục bộ có type `never`.

```ts
// Value-returning switch
function area(s: Shape): number {
  switch (s.kind) {
    case "circle":
      return Math.PI * s.radius ** 2;
    case "rect":
      return s.width * s.height;
    default: {
      const _exhaustive: never = s;
      return _exhaustive;
    }
  }
}

// Void switch
function handle(s: Shape): void {
  switch (s.kind) {
    case "circle":
      drawCircle(s);
      break;
    case "rect":
      drawRect(s);
      break;
    default: {
      const _exhaustive: never = s;
      void _exhaustive;
    }
  }
}
```

Kiểu return trong switch trả về giá trị, kiểu void trong switch dạng câu lệnh.

## `satisfies` over `as`

`satisfies` validate mà không nới rộng literal type.

```ts
// Don't. Widens, loses literal types.
const config = { theme: "dark", cols: 3 } as Config;

// Do. Validates AND preserves literal types.
const config = { theme: "dark", cols: 3 } satisfies Config;
// config.theme is "dark" (literal), not string
```

## Boundary validation

Validate một lần ở nơi dữ liệu đi vào. Tin type bên trong. Xem principle skill **boundary-discipline**.

- **Định dạng truyền tải** (proto, JSON-RPC): parse với `ignoreUnknownFields` để các thay đổi tương thích về sau không làm hỏng client cũ.
- **JSON được lưu trữ:** blob có phiên bản với try/catch quanh bước parse.
- **Đừng validate lại** sâu trong chuỗi lời gọi.

## Schema-derived types

Khi một `.proto`, đặc tả OpenAPI, schema GraphQL, hoặc migration database đã định nghĩa một hình dạng, hãy suy ra từ các type được sinh ra thay vì nhân bản chúng.

```ts
// Don't. Duplicate shape, drifts when the schema changes.
type CheckSummary = {
  totalCount: number;
  checks: { name: string; status: string }[];
};
function renderChecks(s: CheckSummary) {
  /* ... */
}

// Do. Derive from the generated schema type.
import type { ChecksMessage } from "<generated module>";
function renderChecks(s: Pick<ChecksMessage, "totalCount" | "checks">) {
  /* ... */
}
```

Dùng `Pick`, `Omit`, `Parameters`, `ReturnType`, `Awaited`, `typeof` trước khi viết một interface mới.

## Object args

```ts
// Don't. Swap two args, still compiles.
openFile(uri, {
  startLineNumber: 10,
  startColumn: 1,
  endLineNumber: 10,
  endColumn: 1,
});

// Do. Order-independent, self-documenting.
openFile({
  uri,
  selection: {
    startLineNumber: 10,
    startColumn: 1,
    endLineNumber: 10,
    endColumn: 1,
  },
});
```

Bỏ qua trên hot path: render mỗi frame, tokenizer, parser, bất cứ thứ gì trong một vòng lặp chặt nơi chi phí cấp phát có ý nghĩa.
