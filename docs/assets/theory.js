/**
 * Lý thuyết ôn tập — căn cứ mô tả công khai chứng chỉ Web Developer Specialist (O11)
 * và kiến thức nền tảng Reactive Web / Service Studio (không sao chép đề thi).
 */

export const theorySections = [
  {
    slug: "tong-quan-ky-thi",
    title: "Tổng quan kỳ thi & cách chuẩn bị",
    html: `
      <p><span class="tag">O11</span><span class="tag">Web Developer Specialist</span></p>
      <p>Chứng chỉ chính thức là <strong>Web Developer Specialist (OutSystems 11)</strong>. Thời gian thi thường là <strong>90 phút</strong>, định dạng trắc nghiệm (theo cổng chứng chỉ); có thể chọn ngôn ngữ đề nếu được hỗ trợ.</p>
      <p>Đề cương công khai nhấn mạnh: <strong>Reactive Web nâng cao</strong>, <strong>thực hành tốt (best practices)</strong>, <strong>tiến trình bất đồng bộ</strong>, <strong>tích hợp (REST và mở rộng)</strong>, <strong>xử lý sự cố / troubleshooting</strong> — hướng tới developer đã từng làm app cấp doanh nghiệp, không chỉ làm theo tutorial.</p>

      <div class="callout">
        <strong>Việc bắt buộc trước khi thi:</strong> vào <a class="link" href="https://www.outsystems.com/certifications/" target="_blank" rel="noopener">trang chứng chỉ OutSystems</a>, tải <em>Exam details / preparation materials</em> được liệt kê, làm guided path “Get Ready” (hoặc tương đương theo thời điểm), đọc doc được chỉ định. Đây là nguồn duy nhất khớp 100% với đề.
      </div>

      <h2>So sánh nhanh: Associate vs Specialist</h2>
      <div class="table-scroll-wrap"><table class="results-table">
        <thead><tr><th>Khía cạnh</th><th>Associate</th><th>Web Specialist</th></tr></thead>
        <tbody>
          <tr><td>Độ sâu</td><td>Nền tảng: Screen, Table, Aggregate cơ bản, logic đơn giản</td><td>Luồng client–server, transaction, REST, async, lỗi runtime, hiệu năng, kiến trúc module</td></tr>
          <tr><td>Bối cảnh</td><td>App nhỏ, ít tích hợp</td><td>App lớn, nhiều module, consumer/producer, môi trường nhiều tầng</td></tr>
          <tr><td>Kỹ năng “hay thiếu”</td><td>Ít Integration Studio</td><td>Cộng đồng thường nhắc ôn <strong>Integration Studio</strong>, <strong>Integration Builder</strong> vì không phải dự án nào cũng dùng hằng ngày</td></tr>
        </tbody>
      </table></div>

      <h2>Chủ đề nên nắm vững (bản đồ ôn tập)</h2>
      <ol>
        <li><strong>Reactive &amp; UI:</strong> Screen/Block, Input/Output, Event, Public Client Action, Data Action, Aggregate vs preparation data, refresh / Ajax Refresh.</li>
        <li><strong>Logic phía server:</strong> Server Action, transaction scope, exception (AllExceptions, Raise Exception), an toàn khi gọi lồng nhau.</li>
        <li><strong>REST:</strong> Consume (auth, timeout, OnBeforeRequest), Expose (bảo vệ endpoint), mapping Structure/JSON.</li>
        <li><strong>Bất đồng bộ:</strong> Timers (lịch, log, fail), BPT ở mức khái niệm nếu tổ chức dùng; email / tác vụ nền.</li>
        <li><strong>Vận hành:</strong> Service Center (lỗi, integration, timer), publish, version; Debugger trong Service Studio.</li>
        <li><strong>Chất lượng:</strong> performance Aggregate, pagination, ít round-trip, security (role, validate server), tách module.</li>
      </ol>

      <h2>Cách học hiệu quả cho trắc nghiệm</h2>
      <ul>
        <li>Mỗi chủ đề: đọc lý thuyết → làm vài câu trong site → mở Service Studio <strong>thử lại</strong> (ví dụ tạo REST Consume, bắt exception, xem timer log).</li>
        <li>Chuẩn bị từ vựng tiếng Anh của doc (transaction, rollback, scope, endpoint…) vì đề/đáp án thường dùng thuật ngữ gốc.</li>
        <li>Ghi chú riêng các “cạm bẫy” hay gặp: client validate không thay server; nhiều Server Action gọi tuần tự = nhiều request; ẩn nút ≠ bảo mật.</li>
      </ul>
    `,
  },
  {
    slug: "reactive-va-vong-doi",
    title: "Reactive Web: mô hình & vòng đời",
    html: `
      <h2>1. Hai tầng: Client runtime và Server</h2>
      <p>Reactive Web tách rõ nơi code chạy:</p>
      <ul>
        <li><strong>Trình duyệt (client):</strong> phần lớn UI, biểu thức binding, Client Actions, điều hướng (Navigate), một số biến client.</li>
        <li><strong>Server:</strong> Server Actions, Aggregates (thực thi truy vấn), REST (Consume/Expose logic), session phía server, tài nguyên nhạy cảm.</li>
      </ul>
      <p><strong>Hệ quả thi:</strong> mọi thứ “bảo mật / ghi DB / gọi API có secret” phải qua server. Câu hỏi hay đảo chiều: “Có thể làm X hoàn toàn trên Client Action không?” — thường là không nếu X liên quan DB hoặc tin cậy nghiệp vụ.</p>

      <h2>2. Screen và Block</h2>
      <div class="table-scroll-wrap"><table class="results-table">
        <thead><tr><th>Thành phần</th><th>Vai trò</th><th>Ghi nhớ</th></tr></thead>
        <tbody>
          <tr><td>Screen</td><td>Trang có route; điểm vào người dùng</td><td>Tham số URL/Input; lifecycle gắn với điều hướng</td></tr>
          <tr><td>Block</td><td>Tái sử dụng UI + logic client có giới hạn</td><td>Input/Output như “API” của block; có thể có <strong>Public Client Action</strong></td></tr>
        </tbody>
      </table></div>
      <p><strong>Event từ Block:</strong> Block phát sự kiện (kèm tham số), Screen/Block cha lắng nghe. Lợi ích: block không cần biết cha là ai → dễ tái sử dụng, dễ test tư duy “ai chịu trách nhiệm cập nhật state”.</p>

      <h2>3. Chuẩn bị dữ liệu: Aggregate, Data Action, Preparation</h2>
      <ul>
        <li><strong>Aggregate:</strong> mô hình hóa truy vấn (filter, sort, join) chạy trên server; ưu tiên khi chỉ cần đọc/ghi entity theo mô hình.</li>
        <li><strong>Data Action:</strong> chạy trong luồng chuẩn bị dữ liệu của Screen/Block; có thể gọi Server Action, tính toán, gom dữ liệu trước khi bind.</li>
        <li><strong>Khi nào “quá tay” Aggregate:</strong> khi cần logic phứcạp không gọn trong aggregate, hoặc cần gọi nhiều nguồn — cân nhắc Data Action + Server Action có kiểm soát.</li>
      </ul>

      <h2>4. Refresh dữ liệu và Block con</h2>
      <p>Khi bạn <strong>refresh</strong> một phần UI hoặc dữ liệu:</p>
      <ul>
        <li>Data Action / nguồn dữ liệu của vùng đó có thể chạy lại.</li>
        <li>State chỉ tồn tại trên client (biến local, widget) có thể mất nếu không được thiết kế lại — câu hỏi Specialist hay liên quan “tại sao sau refresh mất lựa chọn?”.</li>
        <li>Block con có lifecycle riêng: hiểu “refresh block” vs “refresh screen” giúp tránh lỗi dữ liệu không đồng bộ giữa cha–con.</li>
      </ul>

      <h2>5. Client Variables, Site Properties, Session</h2>
      <ul>
        <li><strong>Client Variable:</strong> dữ liệu trên trình duyệt, phù hợp UI tạm; không an toàn cho bí mật.</li>
        <li><strong>Site Properties / tương đương theo phiên bản:</strong> cấu hình theo môi trường (URL API, cờ tính năng) — hay là nguồn lỗi “Dev chạy được, Prod fail”.</li>
        <li><strong>Session (server):</strong> giữ ngữ cảnh qua request; khác hoàn toàn client variable về phạm vi và bảo mật.</li>
      </ul>

      <div class="callout ok">
        <strong>Mẹo ôn:</strong> Vẽ sơ đồ một request: User click → Client Action → Server Action → DB/REST → phản hồi → cập nhật biến/refresh UI. Mọi câu hỏi “chạy ở đâu / khi nào commit / khi nào rollback” đều bám vào sơ đồ này.
      </div>
    `,
  },
  {
    slug: "server-client-actions",
    title: "Server Actions & Client Actions",
    html: `
      <h2>1. Server Action — khi nào bắt buộc?</h2>
      <p>Dùng Server Action cho:</p>
      <ul>
        <li>Thao tác <strong>Database</strong> (đọc/ghi có quy tắc nghiệp vụ).</li>
        <li>Gọi <strong>REST Consume</strong> cần bảo vệ API key / client secret.</li>
        <li>Kiểm tra <strong>quyền</strong> và quy tắc không được tin tưởng từ client.</li>
        <li>Tái sử dụng logic giữa nhiều Screen, Timer, Process.</li>
      </ul>

      <h2>2. Client Action — vai trò đúng</h2>
      <ul>
        <li>Điều khiển UI: ẩn/hiện, validate định dạng nhẹ, focus, scroll.</li>
        <li>Gọi <strong>Server Action</strong> như “remote procedure”.</li>
        <li>Điều hướng: mở Screen khác, truyền Input parameter.</li>
      </ul>
      <p><strong>Nguyên tắc vàng:</strong> Client là môi trường <em>không tin cậy</em> — người dùng có thể can thiệp request hoặc script. Mọi quyết định nghiệp vụ quan trọng phải được <strong>xác nhận lại trên server</strong>.</p>

      <h2>3. Chuỗi gọi (chaining) và hiệu năng</h2>
      <p>Một Client Action gọi tuần tự 5 Server Action → thường là <strong>5 vòng giao tiếp</strong> (round-trip), độ trễ cộng dồn, dễ timeout trên mạng yếu.</p>
      <ul>
        <li>Giải pháp hướng kiến trúc: gộp thành <strong>một</strong> Server Action (hoặc ít hơn), trả về structure đủ dữ liệu.</li>
        <li>Trade-off: Server Action dài hơn, khó đọc — cân bằng bằng tách <em>private</em> server actions nội bộ module.</li>
      </ul>

      <h2>4. Tham số, kiểu dữ liệu, và “contract”</h2>
      <ul>
        <li>Input/Output của Server Action nên rõ ràng; tránh “mọi thứ Text”.</li>
        <li>Record lists lớn: cân nhắc pagination, không trả về hàng chục nghìn dòng một lần.</li>
        <li>Null vs default: đồng bộ với cách entity/structure định nghĩa để tránh lỗi runtime khó tái hiện.</li>
      </ul>

      <h2>5. Phân quyền (Roles) gắn với Screen vs Server</h2>
      <p>Ẩn Screen theo role chỉ bảo vệ <strong>điều hướng UI</strong>. Server Action vẫn phải kiểm tra quyền nếu có thể gọi từ nơi khác hoặc nếu client bị giả mạo. Ôn kỹ mô hình <strong>least privilege</strong>.</p>

      <div class="callout">
        <strong>Câu dạng thi thường gặp:</strong> “Hành động nào an toàn khi làm trên Client?” / “Cách nào giảm số request?” / “Dữ liệu nhạy cảm nên lưu ở đâu?” — trả lời bằng ranh giới client–server và nguyên tắc không tin client.
      </div>
    `,
  },
  {
    slug: "transaction-exception",
    title: "Transaction & xử lý Exception",
    html: `
      <h2>1. Transaction là gì trong ngữ cảnh OutSystems?</h2>
      <p>Transaction (giao dịch DB) đảm bảo nhóm thao tác <strong>hoàn thành cùng nhau</strong> hoặc <strong>hoàn tác cùng nhau (rollback)</strong> khi có lỗi. Trên thực tế, phạm vi transaction phụ thuộc vào cách bạn tổ chức Server Actions, thao tác Database, và các lời gọi lồng nhau — cần đọc doc phiên bản cụ thể của bạn (đây là phần Specialist hay đào sâu).</p>

      <h2>2. Exception và luồng xử lý</h2>
      <ul>
        <li><strong>Database exception:</strong> vi phạm ràng buộc, deadlock, timeout…</li>
        <li><strong>Business exception (Raise Exception):</strong> bạn chủ động báo lỗi nghiệp vụ (“Số dư không đủ”, “Trùng mã”).</li>
        <li><strong>AllExceptions:</strong> bắt “mọi loại” để log / bọc an toàn — tránh nuốt lỗi mà không log.</li>
      </ul>

      <h2>3. Abort / Rollback và trải nghiệm người dùng</h2>
      <p>Khi transaction bị hủy:</p>
      <ul>
        <li>Dữ liệu chưa commit không xuất hiện cho user khác.</li>
        <li>User hiện tại cần thông báo rõ ràng (không leak stack trace, connection string, SQL chi tiết).</li>
        <li>Log phía server nên đủ để support, nhưng tuân GDPR / nội quy công ty về PII.</li>
      </ul>

      <h2>4. Gọi lồng nhau Server Action ↔ Integration</h2>
      <p>Khi Server Action A gọi B gọi REST rồi ghi DB:</p>
      <ul>
        <li>Lỗi ở REST có thể hoặc không được map sang exception giống lỗi DB — phụ thuộc cách bạn xử lý status code và Raise Exception.</li>
        <li>Thiết kế tốt: quyết định rõ “lỗi tích hợp có rollback toàn bộ nghiệp vụ không?”.</li>
      </ul>

      <h2>5. Idempotency (tính lặp an toàn)</h2>
      <p>Liên quan trực tiếp REST + transaction: nếu client retry (mất mạng, double tap), server có tạo <strong>hai bản ghi</strong> không? Specialist thường kiểm tra tư duy thiết kế: khóa nghiệp vụ, mã tham chiếu, kiểm tra tồn tại trước khi insert.</p>

      <div class="callout ok">
        <strong>Checklist ôn:</strong> (1) Khi nào dữ liệu được commit? (2) Exception nào rollback? (3) Thông báo user vs log server khác nhau thế nào? (4) Có chỗ nào nuốt exception không?
      </div>
    `,
  },
  {
    slug: "rest-tich-hop",
    title: "REST: Consume, Expose & bảo mật",
    html: `
      <h2>1. REST Consume — gọi API bên ngoài</h2>
      <p>Luồng điển hình: định nghĩa <strong>REST API</strong> trong module → cấu hình method (GET/POST/…), URL (thường kết hợp Site Property), request/response <strong>Structures</strong> → xử lý trong Server Action.</p>
      <ul>
        <li><strong>Authentication:</strong> Basic, Bearer token, OAuth2 client credentials, API Key trong header — nắm khái niệm, không học thuộc từng click UI.</li>
        <li><strong>Timeout:</strong> quá ngắn → lỗi ngẫu nhiên; quá dài → treo worker. Cân bằng theo SLA API.</li>
        <li><strong>OnBeforeRequest / OnAfterResponse:</strong> chỉnh header (Authorization), refresh token, log correlation id.</li>
        <li><strong>Status code:</strong> 2xx thành công; 4xx lỗi phía client/auth; 5xx lỗi server đối tác — map sang Raise Exception hoặc thông điệp UX.</li>
      </ul>

      <h2>2. REST Expose — mở API cho hệ thống khác</h2>
      <ul>
        <li>Endpoint gắn với method HTTP và method OutSystems (screenless API hoặc theo mô hình phiên bản bạn dùng).</li>
        <li><strong>Bắt buộc có lớp bảo vệ:</strong> authentication + phân quyền; không để “public không kiểm soát” cho dữ liệu nhạy cảm.</li>
        <li>Tư duy thi: “Ai được gọi API?” = role / IT user / API key theo chính sách tổ chức.</li>
      </ul>

      <h2>3. Structures và JSON</h2>
      <div class="table-scroll-wrap"><table class="results-table">
        <thead><tr><th>Vấn đề</th><th>Hệ quả</th><th>Cách tránh</th></tr></thead>
        <tbody>
          <tr><td>Field optional / null</td><td>Deserialize lỗi hoặc giá trị mặc định sai</td><td>Nullable đúng kiểu, test với payload thật</td></tr>
          <tr><td>Đổi contract API đối tác</td><td>Consume fail sau deploy</td><td>Version API, feature flag, kiểm thử hợp đồng (contract test)</td></tr>
          <tr><td>Danh sách lớn trong JSON</td><td>Chậm, tràn bộ nhớ</td><td>Pagination phía đối tác hoặc batch</td></tr>
        </tbody>
      </table></div>

      <h2>4. Độ tin cậy: retry và “retry storm”</h2>
      <p>Khi API chậm, code retry vô hạn có thể làm <strong>sập</strong> cả hai phía. Best practice: backoff, giới hạn số lần, phân biệt lỗi không nên retry (401, 400) với lỗi tạm (503, timeout).</p>

      <h2>5. SOAP / SAP / khác</h2>
      <p>Web Specialist tập trung REST; nếu exam details nhắc SOAP/Integration Builder, bổ sung đọc doc tương ứng. Nguyên tắc chung vẫn là: <strong>timeout, auth, mapping lỗi, logging</strong>.</p>

      <div class="callout">
        <strong>Ôn nhanh:</strong> Viết một trang giấy: Consume vs Expose | auth types | hooks | status code | khi nào Raise Exception sau REST.
      </div>
    `,
  },
  {
    slug: "async-timer-bpt",
    title: "Tiến trình bất đồng bộ",
    html: `
      <h2>1. Vì sao Specialist quan tâm async?</h2>
      <p>Ứng dụng enterprise không chỉ “request → response”. Có <strong>tác vụ nền</strong>: đồng bộ đêm, gửi báo cáo, xử lý hàng đợi, nhắc việc — không gắn với một click cụ thể.</p>

      <h2>2. Timers</h2>
      <ul>
        <li><strong>Vai trò:</strong> chạy theo lịch trên server, gọi Server Action hoặc luồng xử lý đã cấu hình.</li>
        <li><strong>Giới hạn thời gian chạy:</strong> timer quá lâu có thể bị cắt theo chính sách môi trường — thiết kế batch nhỏ hoặc chia job.</li>
        <li><strong>Khi fail:</strong> xem Service Center / log; xử lý idempotent để chạy lại an toàn.</li>
        <li><strong>Scheduling:</strong> tránh chồng lấn nhiều timer cùng sửa một bảng nếu không có khóa nghiệp vụ.</li>
      </ul>

      <h2>3. Business Process Technology (BPT)</h2>
      <p>BPT phục vụ quy trình <strong>kéo dài</strong> (giờ, ngày), có thể có bước chờ người (human activity), rẽ nhánh theo điều kiện. Khác Timer (thường định kỳ, tác vụ ngắn hơn) và khác request HTTP đồng bộ.</p>
      <ul>
        <li>Khái niệm cần nắm: instance process, trạng thái, chờ / tiếp tục, kết thúc.</li>
        <li>Nếu tổ chức bạn không dùng BPT, vẫn nên đọc overview trong doc để trả lời câu hỏi khái niệm.</li>
      </ul>

      <h2>4. Email và thông báo</h2>
      <p>Gửi email từ server có thể mất thời gian hoặc fail (SMTP). UX: không giả định “đã gửi xong” trong cùng một click trừ khi luồng nghiệp vụ yêu cầu đồng bộ và bạn xử lý lỗi rõ.</p>

      <h2>5. So sánh nhanh</h2>
      <div class="table-scroll-wrap"><table class="results-table">
        <thead><tr><th>Loại</th><th>Kích hoạt</th><th>Phù hợp</th></tr></thead>
        <tbody>
          <tr><td>Server Action từ UI</td><td>User</td><td>Logic đồng bộ theo tương tác</td></tr>
          <tr><td>Timer</td><td>Lịch</td><td>Batch, dọn dẹp, đồng bộ định kỳ</td></tr>
          <tr><td>BPT</td><td>Sự kiện nghiệp vụ / con người</td><td>Quy trình dài, nhiều bước</td></tr>
        </tbody>
      </table></div>
    `,
  },
  {
    slug: "integration-studio",
    title: "Integration Studio & mở rộng .NET",
    html: `
      <p>Đây là phần nhiều developer <strong>ít chạm tay</strong> nhưng lại xuất hiện trong chứng chỉ nâng cao. Mục tiêu ôn: hiểu <em>vai trò</em>, <em>vòng đời publish</em>, và <em>rủi ro</em>, không cần thuộc lòng từng dòng C#.</p>

      <h2>1. Integration Studio là gì?</h2>
      <p>IDE riêng để xây <strong>Extension</strong> (.NET), định nghĩa Actions/Structures mà Service Studio import như thư viện native. Dùng khi:</p>
      <ul>
        <li>Cần thư viện .NET không có sẵn trên platform.</li>
        <li>Cần tối ưu hiệu năng hoặc gọi SDK đặc thù (ví dụ crypto, file đặc biệt).</li>
        <li>Tích hợp legacy theo cách không gói gọn trong REST.</li>
      </ul>

      <h2>2. Vòng đời extension</h2>
      <ol>
        <li>Sửa code trong Integration Studio.</li>
        <li>Build / compile thành công.</li>
        <li>Publish extension lên môi trường (theo quy trình tổ chức).</li>
        <li>Trong Service Studio: refresh references, giải quyết lỗi version, publish module consumer.</li>
      </ol>

      <h2>3. An toàn và vận hành</h2>
      <ul>
        <li>Không hard-code secret trong DLL (vẫn có thể trích xuất); dùng cấu hình server an toàn.</li>
        <li>Exception trong native code: bọc try/catch, map sang lỗi có ý nghĩa cho OutSystems.</li>
        <li>Phiên bản .NET / dependency phải tương thích với server OutSystems — lỗi hay gặp sau nâng cấp platform.</li>
      </ul>

      <h2>4. Integration Builder (nếu có trong exam details)</h2>
      <p>Công cụ/hướng tích hợp khác với REST thuần — nắm <strong>mục đích</strong> (tạo kết nối, sinh artifact, publish) theo doc hiện tại. Nếu exam details không nhắc, ưu tiên Integration Studio.</p>

      <div class="callout">
        <strong>Gợi ý thực hành:</strong> Mở Integration Studio, tạo extension mẫu, thêm một Action đơn giản, publish và gọi từ Server Action — trải nghiệm một lần sẽ nhớ lâu hơn đọc lý thuyết suông.
      </div>
    `,
  },
  {
    slug: "debug-service-center",
    title: "Troubleshooting & Service Center",
    html: `
      <h2>1. Quy trình gỡ lỗi có hệ thống</h2>
      <ol>
        <li><strong>Tái hiện:</strong> môi trường nào (Dev/Test/Prod), user nào, bước cụ thể.</li>
        <li><strong>Phân lớp:</strong> UI (binding, validation) vs Server Action vs REST vs DB vs timer.</li>
        <li><strong>Log &amp; dấu vết:</strong> Service Center, integration log, stack trace server.</li>
        <li><strong>Sửa &amp; kiểm chứng:</strong> fix + regression test trên dữ liệu gần giống prod (ẩn danh).</li>
      </ol>

      <h2>2. Debugger trong Service Studio</h2>
      <ul>
        <li>Đặt breakpoint trong Server Action; theo dõi biến, bước từng bước.</li>
        <li>Kiểm tra giá trị sau mỗi node Database / REST.</li>
        <li>Lưu ý: một số lỗi chỉ xảy ra trên môi trường có dữ liệu/khối lượng khác local.</li>
      </ul>

      <h2>3. Service Center — module quan tâm</h2>
      <ul>
        <li><strong>Monitoring / Errors:</strong> lỗi runtime, tần suất, stack.</li>
        <li><strong>Timers:</strong> lần chạy cuối, trạng thái fail.</li>
        <li><strong>Integrations:</strong> REST/SOAP consumers, lỗi HTTP, latency.</li>
        <li><strong>Factory / version:</strong> module version nào đang chạy, consumer của producer nào.</li>
      </ul>

      <h2>4. Publish &amp; môi trường</h2>
      <p>Lỗi “chạy local đúng, lên môi trường sai” thường do:</p>
      <ul>
        <li>Site Property / endpoint khác nhau.</li>
        <li>Module chưa publish hoặc version consumer lệch producer.</li>
        <li>Quyền role / dữ liệu khác nhau.</li>
      </ul>

      <h2>5. Lifetime / pipeline (mức tổng quan)</h2>
      <p>Hiểu luồng đưa thay đổi từ Dev → QA → Prod giúp trả lời câu hỏi vận hành và trách nhiệm ai approve publish production.</p>
    `,
  },
  {
    slug: "best-practices",
    title: "Best practices & hiệu năng",
    html: `
      <h2>1. Hiệu năng Aggregate &amp; dữ liệu</h2>
      <ul>
        <li>Luôn có <strong>filter</strong> hợp lý; tránh “select * toàn bộ bảng lớn”.</li>
        <li><strong>Pagination / lazy load</strong> cho danh sách dài.</li>
        <li>Đánh index DB (phối hợp DBA) cho cột filter/sort thường dùng — phần này nằm ở ranh giới OutSystems + SQL.</li>
        <li>Giảm dữ liệu đưa về client: chỉ field cần hiển thị.</li>
      </ul>

      <h2>2. Kiến trúc module</h2>
      <ul>
        <li>Tách <strong>module theo bounded context</strong> (CRM, Billing, Catalog) để team làm song song, giảm conflict.</li>
        <li>Tránh circular dependency giữa producer/consumer.</li>
        <li>Public Server Actions cần tên và mục đích rõ — API nội bộ giữa module.</li>
      </ul>

      <h2>3. Bảo mật ứng dụng</h2>
      <ul>
        <li><strong>Validate đầu vào</strong> trên server cho mọi thao tác ghi/side-effect.</li>
        <li><strong>Least privilege:</strong> role tối thiểu cần thiết.</li>
        <li>Không tin dữ liệu từ query string / hidden field cho quyết định nhạy cảm.</li>
        <li>HTTPS, cookie flags, và các chủ đề Security Specialist — Web Specialist chỉ cần mức “không mắc lỗi cơ bản”.</li>
      </ul>

      <h2>4. UI &amp; CSS</h2>
      <ul>
        <li>Dùng theme / style guide; tránh copy style trùng lặp khó bảo trì.</li>
        <li>Accessibility cơ bản: label, contrast (tùy yêu cầu dự án).</li>
      </ul>

      <h2>5. Danh sách tự kiểm (trước ngày thi)</h2>
      <ul>
        <li>□ Có chỗ nào gọi REST không có timeout?</li>
        <li>□ Có Server Action “khổng lồ” nên tách?</li>
        <li>□ Có trang nào chỉ ẩn nút mà không check quyền server?</li>
        <li>□ Timer / job có idempotent không?</li>
      </ul>
    `,
  },
  {
    slug: "lam-viec-nhom",
    title: "Làm việc nhóm & kiểm soát phiên bản",
    html: `
      <h2>1. Làm việc song song trên cùng module</h2>
      <p>Khi nhiều developer sửa cùng module:</p>
      <ul>
        <li>Rủi ro <strong>merge conflict</strong> (Git) hoặc cơ chế merge tương đương môi trường bạn dùng.</li>
        <li>Giảm thiểu: chia trách nhiệm theo module/feature, giao tiếp trước khi đổi element dùng chung.</li>
      </ul>

      <h2>2. Git với OutSystems (khái niệm)</h2>
      <ul>
        <li>Branch feature → merge vào nhánh chính theo quy ước team.</li>
        <li>Conflict trên OML: cần công cụ merge 3-way; hiểu “accept mine / theirs / manual”.</li>
        <li>Publish: ai chịu trách nhiệm publish môi trường chung sau merge.</li>
      </ul>

      <h2>3. Producer / Consumer</h2>
      <p>Thay đổi interface public (Entity, Structure, Server Action signature) ở producer ảnh hưởng <strong>tất cả</strong> consumer. Quy trình: version, changelog, compile consumer sau khi cập nhật reference.</p>

      <h2>4. Technical debt có chủ đích</h2>
      <p>Specialist không chỉ code chạy mà còn “sống lâu”: đặt tên, tài liệu nội bộ ngắn, TODO có ticket — phản ánh kinh nghiệm dự án thật.</p>

      <div class="callout ok">
        <strong>Tổng kết:</strong> Lý thuyết trên site bổ sung cho exam details và doc chính thức — hãy luôn đối chiếu và luyện thêm bằng câu hỏi + thực hành Service Studio.
      </div>
    `,
  },
];
