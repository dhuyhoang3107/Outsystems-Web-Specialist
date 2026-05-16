# OutSystems Web Specialist — ôn luyện (static)

Repo chứa **website tĩnh** (không backend) giúp ôn chứng chỉ **Web Developer Specialist (OutSystems 11)** theo mô tả công khai trên cổng chứng chỉ OutSystems: reactive web nâng cao, best practices, tiến trình bất đồng bộ, tích hợp, troubleshooting.

- **Nội dung:** lý thuyết (tiếng Việt), câu hỏi trắc nghiệm theo chủ đề, bài thi thử có bấm giờ (90 phút, 40 câu — minh họa, không phải đề thật).
- **Mã nguồn site:** thư mục [`docs/`](./docs/).

## Xem site chỉ bằng GitHub (không cần máy chỉnh sửa hay Python)

Bạn chỉ cần thao tác trên trang repo GitHub và trình duyệt.

1. **Đưa code có thư mục `docs/` lên nhánh mặc định** (thường là `main`): merge pull request (nếu site đang nằm trên nhánh khác) để trên `main` có đủ thư mục `docs/`.
2. Vào repo → **Settings** (tab cài đặt của repo).
3. Cột trái chọn **Pages** (trong mục “Code and automation”).
4. **Build and deployment → Source:** chọn **Deploy from a branch**.
5. **Branch:** chọn nhánh mặc định (ví dụ `main`), **folder** chọn **`/docs`**, rồi bấm **Save**.
6. Sau khoảng một phút, GitHub hiển thị đường dẫn site dạng  
   `https://<tên-user>.github.io/<tên-repo>/`  
   — mở URL đó trên trình duyệt là dùng được toàn bộ ôn luyện và thi thử.

**Lưu ý:** Mở file `index.html` trực tiếp trên tab “Code” của GitHub thường **không** chạy đủ site (asset và module có thể bị chặn). Cách đúng là bật **GitHub Pages** như trên.

**Lưu ý nội dung:** Tài liệu trong site mang tính giáo dục; luôn đối chiếu guided path, exam details và tài liệu chính thức của OutSystems.

### (Tùy chọn) Xem trên máy cá nhân

Chỉ dành cho ai muốn thử local khi sửa code — **không bắt buộc** để dùng site trên GitHub.

```bash
cd docs && python3 -m http.server 8080
```

Sau đó mở `http://localhost:8080/`.
