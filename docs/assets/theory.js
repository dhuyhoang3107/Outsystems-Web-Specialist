/**
 * Lý thuyết ôn tập — căn cứ công khai: mô tả chứng chỉ Web Developer Specialist (O11)
 * trên trang certifications của OutSystems và tài liệu sản phẩm chung.
 * Không phải đề thi thật hay tài liệu NDA.
 */

export const theorySections = [
  {
    slug: "tong-quan-ky-thi",
    title: "Tổng quan kỳ thi & cách chuẩn bị",
    html: `
      <p><span class="tag">O11</span><span class="tag">Web Developer Specialist</span></p>
      <p>Tên chứng chỉ chính thức trên cổng OutSystems là <strong>Web Developer Specialist (O11)</strong> (thường gọi tắt là chuyên môn Web). Thời gian thi <strong>90 phút</strong>, ngôn ngữ có thể chọn (gồm tiếng Anh, Tây Ban Nha, v.v. theo trang chứng chỉ).</p>
      <p>Theo mô tả công khai, nội dung tập trung vào <strong>phát triển Reactive Web nâng cao</strong>: thực hành tốt, tiến trình bất đồng bộ, tích hợp và xử lý sự cố — dành cho developer đã có kinh nghiệm dự án cấp doanh nghiệp.</p>
      <div class="callout">
        <strong>Nên làm trên cổng chính thức:</strong> tải <em>exam details</em> (chi tiết kỳ thi) từ trang chứng chỉ, làm guided path “Get Ready”, đọc toàn bộ tài liệu được liệt kê. Cộng đồng cũng nhắc ôn <strong>Integration Studio</strong> và <strong>Integration Builder</strong> vì không phải dự án nào cũng dùng hằng ngày.
      </div>
      <h2>Điểm khác với Associate</h2>
      <p>Associate kiểm tra nền tảng (màn hình, logic, dữ liệu cơ bản). Specialist đi sâu <strong>giao tiếp client–server</strong>, <strong>nhất quán dữ liệu</strong>, <strong>REST</strong>, <strong>timer / process</strong>, <strong>debugging</strong>, <strong>hiệu năng</strong> và <strong>tuân thủ kiến trúc</strong> trong app lớn.</p>
      <h2>Gợi ý lộ trình ôn</h2>
      <ol>
        <li>Đọc lại <strong>Reactive Web</strong>: lifecycle Screen/Block, Input/Output, Event, Client Actions.</li>
        <li>Ôn <strong>Server Actions</strong>: transaction, exception, CommitTransaction/Rollback, Database vs Logic.</li>
        <li>Ôn <strong>REST</strong>: Consume/Expose, authentication, structures, error handling.</li>
        <li>Ôn <strong>Async</strong>: Timers, BPT (nếu dùng trong tổ chức), gửi email, queue.</li>
        <li>Ôn <strong>Service Center</strong> &amp; môi trường: version, publish, logs.</li>
        <li>Lướt <strong>Architecture Dashboard</strong> / best practices trong tài liệu.</li>
      </ol>
    `,
  },
  {
    slug: "reactive-va-vong-doi",
    title: "Reactive Web: mô hình & vòng đời",
    html: `
      <h2>Mô hình thực thi</h2>
      <p>Reactive Web chia rõ <strong>Client Runtime</strong> và <strong>Server</strong>. Phần lớn UI và Client Actions chạy trên trình duyệt; Server Actions và Aggregates chạy trên máy chủ. Hiểu ranh giới này giúp tránh lỗi “gọi nhầm tầng” và tối ưu round-trip.</p>
      <h2>Screen &amp; Block</h2>
      <ul>
        <li><strong>Screen</strong>: trang có URL; có thể nhận tham số đầu vào.</li>
        <li><strong>Block</strong>: thành phần tái sử dụng; có thể có <em>public actions</em> (client) để cha gọi.</li>
        <li><strong>Events</strong>: Block phát sự kiện, Screen hoặc Block cha xử lý — giảm coupling.</li>
      </ul>
      <h2>Input / Output &amp; tham số</h2>
      <p>Tham số đầu vào của Screen/Block nên được thiết kế rõ (kiểu, bắt buộc hay không). Thay đổi contract ảnh hưởng mọi nơi gọi — đây là chủ đề hay gặp trong câu hỏi về bảo trì và làm việc nhóm.</p>
      <h2>Fetch từ Aggregate &amp; Data Action</h2>
      <p><strong>Aggregate</strong> tối ưu truy vấn trên server. <strong>Data Action</strong> chạy khi Screen/Block cần dữ liệu — phù hợp tổng hợp hoặc gọi logic trước khi render. Cần phân biệt khi nào dùng Aggregate thuần so với khi cần xử lý thêm trong Data Action.</p>
      <div class="callout ok">
        <strong>Mẹo thi:</strong> nắm thứ tự thực thi (prepare data → render) và tác động của <strong>refresh</strong> / <strong>ajax refresh</strong> tới Block con.
      </div>
    `,
  },
  {
    slug: "server-client-actions",
    title: "Server Actions & Client Actions",
    html: `
      <h2>Server Action</h2>
      <p>Chạy trên server, có thể truy cập Database, Integration, Session đầy đủ. Thích hợp cho quy tắc nghiệp vụ, thao tác ghi dữ liệu, gọi API ngoài cần bảo mật khóa API.</p>
      <h2>Client Action</h2>
      <p>Chạy trên trình duyệt; phù hợp điều hướng UI, validate nhẹ, gọi Server Action. Không được phép thao tác DB trực tiếp.</p>
      <h2>Chaining &amp; async</h2>
      <p>Chuỗi gọi Server Action từ Client tạo nhiều request — cần cân nhắc gộp logic hoặc dùng pattern phù hợp để giảm độ trễ.</p>
      <h2>Session &amp; biến</h2>
      <p>Biến Server Session vs Client — phạm vi và độ bền khác nhau. Câu hỏi Specialist thường kiểm tra bạn có biết dữ liệu “sống” ở đâu và rủi ro đồng bộ.</p>
    `,
  },
  {
    slug: "transaction-exception",
    title: "Transaction & xử lý Exception",
    html: `
      <h2>Transaction mặc định</h2>
      <p>Mỗi lần thực thi Server Action, OutSystems có thể bọc trong transaction tùy theo thao tác (đọc/ghi). Hiểu điểm <strong>commit</strong> và khi nào thay đổi được ghi vĩnh viễn là cốt lõi.</p>
      <h2>AllExceptions &amp; Abort Transaction</h2>
      <p>Luồng xử lý lỗi: bắt exception, ghi log, thông báo người dùng, và quyết định có <strong>rollback</strong> hay tiếp tục. Một số pattern dùng <strong>AllExceptions</strong> để không để lỗi “im lặng”.</p>
      <h2>Raised exceptions tùy chỉnh</h2>
      <p>Exception do nghiệp vụ ném ra cần thông điệp rõ, không lộ chi tiết nhạy cảm ra client.</p>
      <div class="callout">
        <strong>Lưu ý:</strong> gọi lồng nhau giữa các Server Actions / Integrations có thể ảnh hưởng phạm vi transaction — ôn kỹ tài liệu về <em>database operations</em> và <em>exception handling</em>.
      </div>
    `,
  },
  {
    slug: "rest-tich-hop",
    title: "REST: Consume, Expose & bảo mật",
    html: `
      <h2>REST Consume</h2>
      <p>Định nghĩa method, URL, structures request/response, authentication (Basic, OAuth2, API Key…). Xử lý timeout, status code, mapping lỗi sang UX.</p>
      <h2>REST Expose</h2>
      <p>API do OutSystems cung cấp: URL methods, authentication, rate limiting theo cấu hình platform. Phân quyền endpoint theo role.</p>
      <h2>OnBeforeRequest / OnAfterResponse</h2>
      <p>Hook cho phép can thiệp header, token refresh, logging — thường xuất hiện trong kịch bản tích hợp thực tế.</p>
      <h2>JSON &amp; Structures</h2>
      <p>Ánh xạ kiểu, nullable, danh sách; tránh “rời rạc” bằng cách dùng Structure thống nhất.</p>
    `,
  },
  {
    slug: "async-timer-bpt",
    title: "Tiến trình bất đồng bộ",
    html: `
      <h2>Timers</h2>
      <p>Timers chạy theo lịch trên server, phù hợp batch, đồng bộ định kỳ, dọn dẹp. Cần biết giới hạn thời gian chạy, scheduling, và xem log khi timer fail.</p>
      <h2>Business Processes (BPT)</h2>
      <p>Quy trình dài hạn, chờ con người hoặc sự kiện — khác với request–response ngắn. Ôn khái niệm hoạt động, wait, close human activity (theo tài liệu phiên bản bạn dùng).</p>
      <h2>Emails &amp; hàng đợi</h2>
      <p>Gửi email không đồng bộ với request người dùng; xử lý lỗi gửi và retry có thể là chủ đề liên quan kiến trúc ứng dụng.</p>
    `,
  },
  {
    slug: "integration-studio",
    title: "Integration Studio & mở rộng .NET",
    html: `
      <p>Theo kinh nghiệm cộng đồng được OutSystems dẫn link, thi có thể hỏi về <strong>Integration Studio</strong> — công cụ mở rộng server-side bằng extension .NET (C#), build và publish ra module.</p>
      <h2>Khái niệm cần nhớ</h2>
      <ul>
        <li>Action / Structure được định nghĩa trong extension và gọi từ Service Studio như native.</li>
        <li>Quản lý dependency, phiên bản extension, tương thích server.</li>
        <li>An toàn: không lộ secrets; xử lý exception trong native code.</li>
      </ul>
      <p><strong>Integration Builder</strong> (khi tổ chức dùng): tích hợp với hệ thống back-office — nắm vai trò tổng quan và luồng publish.</p>
    `,
  },
  {
    slug: "debug-service-center",
    title: "Troubleshooting & Service Center",
    html: `
      <h2>Debugger trong Service Studio</h2>
      <p>Đặt breakpoint, trace Server Action, theo dõi biến, client vs server. Biết cách đọc stack và isolate lỗi UI vs logic vs integration.</p>
      <h2>Service Center</h2>
      <p>Monitor: errors, timers, integrations, environment health. Tìm log chi tiết, version module, consumer/producer.</p>
      <h2>Factory &amp; Lifetime (tổng quan)</h2>
      <p>Hiểu pipeline publish giữa các môi trường (Dev/Test/Prod) giúp trả lời câu hỏi vận hành và versioning.</p>
    `,
  },
  {
    slug: "best-practices",
    title: "Best practices & hiệu năng",
    html: `
      <ul>
        <li>Giảm số round-trip: gộp Server Actions khi hợp lý.</li>
        <li>Aggregate có filter/pagination; tránh mang dataset lớn về client.</li>
        <li>Tách Block nhỏ có trách nhiệm rõ; tránh “Screen khổng lồ”.</li>
        <li>Đặt tên module, public actions, roles nhất quán theo chuẩn tổ chức.</li>
        <li>Bảo mật: principle of least privilege, validate đầu vào, không tin client.</li>
        <li>CSS: tái sử dụng theme; tránh duplicate style không cần thiết.</li>
      </ul>
    `,
  },
  {
    slug: "lam-viec-nhom",
    title: "Làm việc nhóm & kiểm soát phiên bản",
    html: `
      <p>OutSystems hỗ trợ làm việc với Git (tùy cấu hình). Ôn các kịch bản <strong>merge conflict</strong> trên module, trách nhiệm publish, và quy ước nhánh/feature.</p>
      <p>Trong thi lý thuyết có thể hỏi về <strong>tác động khi hai developer sửa cùng element</strong> hoặc cách giảm xung đột bằng chia module.</p>
    `,
  },
];
