"""
Script tự động đẩy danh sách Backlog dự án Luật Vạn Ích lên Jira Cloud (Project SU).
Sử dụng:
  python push_to_jira.py <EMAIL> <API_TOKEN>
"""
import sys
import base64
import json
import urllib.request
import urllib.error

JIRA_DOMAIN = "binh2304tto.atlassian.net"
PROJECT_KEY = "LUATVANICH"

EPICS = [
    {"name": "Hạ tầng, Khởi tạo & Cấu hình Hệ thống (Infra & Foundations)", "summary": "[EPIC-01] Hạ tầng, Khởi tạo & Cấu hình Hệ thống", "description": "Khởi tạo NestJS, Next.js, Docker Compose, MinIO S3 Object Storage"},
    {"name": "Xác thực & Phân quyền Quản trị (Auth & RBAC)", "summary": "[EPIC-02] Xác thực & Phân quyền Quản trị", "description": "Đăng nhập JWT, Refresh Token, phân quyền Role, Route Guard bảo vệ Admin"},
    {"name": "Dịch vụ Pháp lý Song ngữ (Legal Services)", "summary": "[EPIC-03] Dịch vụ Pháp lý Song ngữ", "description": "CRUD Dịch vụ, Kéo thả đổi vị trí, Dịch thuật Vi/Zh, Trang Listing & Detail"},
    {"name": "Trình kéo thả Trang trực quan (Page Builder - Puck)", "summary": "[EPIC-04] Trình kéo thả Trang trực quan", "description": "Bộ khối kéo thả Puck, Lưu cấu trúc JSON, Xem trước & Xuất bản, Lịch sử phiên bản"},
    {"name": "Đội ngũ Luật sư & Văn phòng Đại diện (Lawyers & Offices)", "summary": "[EPIC-05] Đội ngũ Luật sư & Văn phòng Đại diện", "description": "Hồ sơ luật sư song ngữ, Chức danh, Học vấn, Văn phòng Hà Nội/HCM/TQ"},
    {"name": "Cẩm nang, Bài viết & Tin tức (Posts & Knowledge Base)", "summary": "[EPIC-06] Cẩm nang, Bài viết & Tin tức", "description": "Quản lý chuyên mục, Rich Text Editor, Mục lục tự động bên phải bài viết"},
    {"name": "Yêu cầu Tư vấn & Khách hàng (Consultations / Leads)", "summary": "[EPIC-07] Yêu cầu Tư vấn & Tiếp nhận Khách hàng", "description": "Form tư vấn kèm file đính kèm MinIO, Email thông báo, CRM quản lý Lead"},
    {"name": "Cấu hình Site, Theme & Thư viện Media (Site Settings & Media)", "summary": "[EPIC-08] Cấu hình Site, Theme & Thư viện Media", "description": "Quản lý Media tập trung, Đổi bảng màu P1/P2, Menu đa cấp, Hotline/WeChat"},
    {"name": "SEO, Tối ưu Hiệu năng & Bàn giao (SEO & Performance)", "summary": "[EPIC-09] SEO, Tối ưu Hiệu năng & Bàn giao", "description": "Sitemap tự động, Hreflang song ngữ, Tối ưu Core Web Vitals, Hướng dẫn sử dụng"},
]

TASKS = [
    # EPIC 1
    {"epic_idx": 0, "summary": "SU-101: Thiết lập bộ khung Backend NestJS + TypeORM + PostgreSQL", "desc": "Khởi tạo project luatvanich_be chạy cổng 4000. Cấu hình TypeORM kết nối PostgreSQL, chuẩn hóa BaseEntity, ResponseInterceptor, HttpExceptionFilter và tích hợp Swagger Docs tại /api/docs.\n\n*Acceptance Criteria*:\n- npm run dev chạy cổng 4000 không lỗi\n- Swagger hiển thị đầy đủ API\n- npm run build exit code 0", "priority": "High"},
    {"epic_idx": 0, "summary": "SU-102: Thiết lập bộ khung Frontend Next.js 15 + Tailwind CSS + Design Tokens", "desc": "Khởi tạo luatvanich_fe chạy cổng 3000. Cấu hình Tailwind CSS với bảng màu nhận diện thương hiệu P1, thiết lập TanStack Query v5, Axios interceptors tự động truyền ?lang= và JWT token.\n\n*Acceptance Criteria*:\n- npm run dev chạy cổng 3000 không lỗi\n- Giao diện áp dụng đúng màu thương hiệu, responsive", "priority": "High"},
    {"epic_idx": 0, "summary": "SU-103: Tích hợp MinIO S3 Object Storage qua Docker", "desc": "Cấu hình MinIO S3 trong docker-compose.yml. Cài đặt @aws-sdk/client-s3 trên backend, tự động tạo 2 Bucket (luatvanich-public và luatvanich-private), hỗ trợ sinh Presigned URL cho tài liệu nhạy cảm.\n\n*Acceptance Criteria*:\n- Container MinIO khởi chạy thành công\n- Backend tự tạo bucket khi khởi động, upload được file", "priority": "High"},
    {"epic_idx": 0, "summary": "SU-104: Thiết lập Dockerfile & Docker Compose toàn hệ thống", "desc": "Viết Dockerfile multi-stage tối ưu cho cả luatvanich_be và luatvanich_fe. Viết docker-compose.yml liên kết 4 dịch vụ (postgres, minio, api, web).\n\n*Acceptance Criteria*:\n- Chạy lệnh docker compose up -d --build khởi động thành công toàn bộ hệ thống", "priority": "Medium"},

    # EPIC 2
    {"epic_idx": 1, "summary": "SU-201: API Đăng nhập, Làm mới Token & Đăng xuất (Backend)", "desc": "Xây dựng module auth. API POST /admin/auth/login kiểm tra mật khẩu bằng bcrypt, cấp cặp token: Access Token (15m) và Refresh Token (7 ngày, httpOnly cookie). API POST /admin/auth/refresh xoay vòng token.\n\n*Acceptance Criteria*:\n- Đăng nhập đúng trả về Access Token + thông tin người dùng\n- Sai mật khẩu báo lỗi 401 rõ ràng\n- Đăng xuất thu hồi token trong DB", "priority": "Highest"},
    {"epic_idx": 1, "summary": "SU-202: Phân quyền Quản trị RBAC & Guards (Backend)", "desc": "Module users. Định nghĩa 4 Roles: superadmin, admin, editor, viewer. Tạo decorator @RequirePermission và guard PermissionsGuard kiểm tra quyền theo từng action.\n\n*Acceptance Criteria*:\n- Chặn request 403 nếu tài khoản không có quyền tương ứng\n- Superadmin bypass toàn bộ quyền", "priority": "High"},
    {"epic_idx": 1, "summary": "SU-203: Màn hình Đăng nhập Quản trị viên (Frontend)", "desc": "Xây dựng trang /admin/login với thiết kế thương hiệu Luật Vạn Ích. Form kiểm tra validate bằng React Hook Form + Zod, hiển thị thông báo toast lỗi qua Sonner.\n\n*Acceptance Criteria*:\n- Giao diện đẹp, chuyên nghiệp, responsive\n- Đăng nhập thành công lưu token và chuyển hướng vào /admin", "priority": "Highest"},
    {"epic_idx": 1, "summary": "SU-204: Middleware bảo vệ khu vực Admin (Frontend Route Guard)", "desc": "Thiết lập middleware.ts chặn tất cả các route /admin/* (ngoại trừ /admin/login). Tự động redirect về trang login nếu chưa đăng nhập.\n\n*Acceptance Criteria*:\n- Chưa đăng nhập gõ link /admin bị điều hướng về /admin/login\n- Có token truy cập bình thường", "priority": "Highest"},

    # EPIC 3
    {"epic_idx": 2, "summary": "SU-301: API CRUD & Quản lý Bản dịch Dịch vụ Pháp lý (Backend)", "desc": "Module legal-services. Bảng services và service_translations (song ngữ Vi/Zh). Hỗ trợ lọc theo trạng thái, tìm kiếm từ khóa, tự động sinh slug tiếng Việt/Trung không trùng lặp.\n\n*Acceptance Criteria*:\n- Public API GET /legal-services chỉ trả về dịch vụ đã published\n- Tự động fallback về tiếng Việt nếu chưa có bản dịch tiếng Trung", "priority": "High"},
    {"epic_idx": 2, "summary": "SU-302: API Sắp xếp Thứ tự Kéo thả Dịch vụ (Reorder API)", "desc": "Endpoint PATCH /api/v1/admin/legal-services/reorder nhận mảng UUID theo thứ tự mới để cập nhật display_order.\n\n*Acceptance Criteria*:\n- Kéo thả đổi thứ tự trên UI gọi API và lưu đúng vị trí trong DB", "priority": "Medium"},
    {"epic_idx": 2, "summary": "SU-303: Màn hình Quản trị Dịch vụ Pháp lý (Frontend Admin)", "desc": "Trang /admin/services hoàn chỉnh: Bảng danh sách dịch vụ, bộ lọc phân trang, tìm kiếm từ khóa debounced, Dialog Thêm/Sửa dịch vụ đa ngôn ngữ, upload ảnh MinIO.\n\n*Acceptance Criteria*:\n- Kết nối gọi API backend thật thành công\n- Có thông báo xác nhận khi xóa dịch vụ", "priority": "High"},
    {"epic_idx": 2, "summary": "SU-304: Trang Danh sách Dịch vụ Công khai (Frontend Public)", "desc": "Trang /[lang]/services hiển thị danh sách 12 dịch vụ trọng tâm. Hỗ trợ lọc theo lĩnh vực pháp lý.\n\n*Acceptance Criteria*:\n- Render dữ liệu từ API backend\n- Chuyển đổi ngôn ngữ Việt / Trung cập nhật đúng nội dung", "priority": "High"},
    {"epic_idx": 2, "summary": "SU-305: Trang Chi tiết Dịch vụ Pháp lý theo Slug (Frontend Public)", "desc": "Trang /[lang]/services/[slug] hiển thị quy trình thực hiện, biểu phí tham khảo, luật sư phụ trách và nút CTA Đặt lịch tư vấn.\n\n*Acceptance Criteria*:\n- Hỗ trợ SEO meta tags, OpenGraph chuẩn theo slug dịch vụ", "priority": "High"},

    # EPIC 4
    {"epic_idx": 3, "summary": "SU-401: Thiết lập Cấu hình & Bộ Khối Cơ bản Puck (Page Builder Engine)", "desc": "Cấu hình @measured/puck với bộ khối: HeroBanner, StatsCounter, CoreValues, ProcessSteps, ConsultationFormBlock, RichTextBlock.\n\n*Acceptance Criteria*:\n- Kéo thả được các khối mượt mà, cấu hình được nội dung trong panel bên phải", "priority": "High"},
    {"epic_idx": 3, "summary": "SU-402: API Lưu trữ & Xuất bản Cấu trúc Trang (Backend Pages Module)", "desc": "Module pages. Lưu trữ cấu trúc JSON của Puck trong cột content_json. Hỗ trợ trạng thái draft và published.\n\n*Acceptance Criteria*:\n- Lưu nháp không ảnh hưởng trang public; ấn Xuất bản mới cập nhật ra ngoài", "priority": "High"},
    {"epic_idx": 3, "summary": "SU-403: Màn hình Trình Soạn Thảo Kéo Thả Trang (Frontend Admin Builder)", "desc": "Trang /admin/pages/[id]/builder nhúng giao diện Puck, có nút Lưu nháp, Xem trước (Desktop / Tablet / Mobile), và Xuất bản.\n\n*Acceptance Criteria*:\n- Lưu và tải lại dữ liệu trang chính xác không mất style", "priority": "High"},
    {"epic_idx": 3, "summary": "SU-404: Renderer Dựng Trang Phía Khách (Public Page Renderer)", "desc": "Component PageRenderer đọc JSON cấu trúc trang và render thành các khối HTML có style chuẩn Tailwind CSS tương thích SEO (SSR).\n\n*Acceptance Criteria*:\n- Khách vào trang chủ /vi hoặc /zh-CN thấy đúng các khối admin đã sắp xếp", "priority": "High"},
    {"epic_idx": 3, "summary": "SU-405: Lịch sử Phiên bản Trang (Page Versioning - Phục hồi dữ liệu)", "desc": "Lưu snapshot JSON vào bảng page_versions mỗi lần xuất bản. Admin có thể xem lại lịch sử và ấn Khôi phục phiên bản này.\n\n*Acceptance Criteria*:\n- Khôi phục thành công phiên bản cũ không lỗi dữ liệu", "priority": "Medium"},

    # EPIC 5
    {"epic_idx": 4, "summary": "SU-501: Module Backend Luật sư & Chức danh (Lawyers Module)", "desc": "Module lawyers. Bảng lawyers, lawyer_translations, lawyer_credentials. Lưu trữ: họ tên song ngữ, chức danh, số năm kinh nghiệm, học vấn, ngôn ngữ giao tiếp, ảnh chân dung.\n\n*Acceptance Criteria*:\n- CRUD luật sư, quản lý danh sách học vấn/chứng chỉ hành nghề", "priority": "Medium"},
    {"epic_idx": 4, "summary": "SU-502: Quản lý Văn phòng Đại diện (Offices Module)", "desc": "Module offices. Thông tin văn phòng Hà Nội, TP.HCM và đầu mối liên hệ Trung Quốc (Địa chỉ, SĐT, email, Google Maps).\n\n*Acceptance Criteria*:\n- Hiển thị danh sách văn phòng ở Footer và trang Liên hệ", "priority": "Medium"},
    {"epic_idx": 4, "summary": "SU-503: Trang Danh Sách & Chi Tiết Hồ Sơ Luật Sư (Frontend)", "desc": "Trang /[lang]/lawyers và /[lang]/lawyers/[id]. Hiển thị thẻ luật sư chuyên nghiệp, lĩnh vực chuyên môn phụ trách, các vụ việc tiêu biểu.\n\n*Acceptance Criteria*:\n- Responsive, hình ảnh chân dung hiển thị theo tỷ lệ chuẩn 4:5", "priority": "Medium"},
    {"epic_idx": 4, "summary": "SU-504: Admin CMS Quản Lý Đội Ngũ Luật Sư (Frontend Admin)", "desc": "Trang /admin/lawyers: Danh sách, Thêm/Sửa luật sư, upload ảnh đại diện vào MinIO.\n\n*Acceptance Criteria*:\n- Upload ảnh luật sư lên MinIO thành công, lưu DB", "priority": "Medium"},

    # EPIC 6
    {"epic_idx": 5, "summary": "SU-601: Module Bài viết & Chuyên mục (Backend Posts Module)", "desc": "Module posts. Chuyên mục: Tiêu điểm luật, Văn hóa kinh doanh Việt - Trung, Hướng dẫn đầu tư. Quản lý nội dung bài viết, tác giả luật sư, ngày xuất bản, SEO meta.\n\n*Acceptance Criteria*:\n- Hỗ trợ bài viết song ngữ Vi/Zh, tính năng tự động tính reading time", "priority": "Medium"},
    {"epic_idx": 5, "summary": "SU-602: Trình Soạn Thảo Bài Viết Admin CMS (Frontend Admin)", "desc": "Trang /admin/posts/new và edit: Nhúng Rich Text Editor hỗ trợ chèn heading, ảnh từ MinIO, bảng biểu, trích dẫn.\n\n*Acceptance Criteria*:\n- Chèn ảnh mượt mà, lưu định dạng HTML chuẩn", "priority": "Medium"},
    {"epic_idx": 5, "summary": "SU-603: Trang Danh Sách Tin Tức / Cẩm Nang (Frontend Public)", "desc": "Trang /[lang]/posts hiển thị bài viết dạng lưới thẻ, lọc theo chuyên mục, phân trang, thanh tìm kiếm bài viết.\n\n*Acceptance Criteria*:\n- Phân trang mượt mà, bài viết mới nhất đưa lên đầu", "priority": "Medium"},
    {"epic_idx": 5, "summary": "SU-604: Trang Chi Tiết Bài Viết & Mục Lục Tự Động (Frontend Public)", "desc": "Trang /[lang]/posts/[slug]. Tự động trích xuất các thẻ H2/H3 để tạo thanh Mục lục bài viết (Table of Contents) cố định bên phải màn hình.\n\n*Acceptance Criteria*:\n- Click vào mục lục tự động cuộn mượt (smooth scroll) tới vị trí tương ứng", "priority": "Medium"},

    # EPIC 7
    {"epic_idx": 6, "summary": "SU-701: Form Gửi Yêu Cầu Tư Vấn Công Khai (Frontend Public)", "desc": "Form đặt lịch tư vấn tại trang chủ, trang liên hệ và popup nhanh: Họ tên, Số điện thoại/Zalo/WeChat, Email, Lĩnh vực quan tâm, Tệp hồ sơ đính kèm, Honeypot chống spam.\n\n*Acceptance Criteria*:\n- Upload tệp đính kèm bí mật vào bucket luatvanich-private của MinIO\n- Gửi form thành công hiển thị modal xác nhận trang trọng", "priority": "High"},
    {"epic_idx": 6, "summary": "SU-702: API Tiếp Nhận & Quản Lý Yêu Cầu Tư Vấn (Backend Consultations)", "desc": "Module consultations. Lưu yêu cầu vào DB với trạng thái new. Hỗ trợ đổi trạng thái (new, in_progress, done, spam), ghi chú nội bộ của luật sư.\n\n*Acceptance Criteria*:\n- Chỉ admin/luật sư có quyền mới xem và tải được tệp đính kèm riêng tư (qua Presigned URL)", "priority": "High"},
    {"epic_idx": 6, "summary": "SU-703: Tự Động Gửi Email Thông Báo Tư Vấn (Mailer Integration)", "desc": "Khi khách gửi form thành công: (1) Gửi email xác nhận tự động cho khách hàng; (2) Gửi email thông báo ngay cho ban quản trị / luật sư phụ trách.\n\n*Acceptance Criteria*:\n- Email gửi nhanh, template HTML trang trọng mang thương hiệu Luật Vạn Ích", "priority": "Medium"},
    {"epic_idx": 6, "summary": "SU-704: Màn Hình CRM Quản Lý Khách Hàng Tư Vấn (Frontend Admin)", "desc": "Trang /admin/consultations. Bảng danh sách lead, bộ lọc theo trạng thái, ngày gửi, xem chi tiết yêu cầu, tải tệp đính kèm và lưu ghi chú xử lý.\n\n*Acceptance Criteria*:\n- Quản lý trạng thái lead trực quan, hỗ trợ xuất báo cáo", "priority": "High"},

    # EPIC 8
    {"epic_idx": 7, "summary": "SU-801: Quản Lý Thư Viện Media Trực Quan (Media Library CMS)", "desc": "Module media trên Admin /admin/media. Quản lý tập trung toàn bộ ảnh/tài liệu tải lên MinIO. Hỗ trợ xem trước ảnh, sao chép URL ảnh nhanh, đổi tên và xóa tệp.\n\n*Acceptance Criteria*:\n- Tải lên nhiều ảnh cùng lúc, phân chia thư mục rõ ràng", "priority": "Medium"},
    {"epic_idx": 7, "summary": "SU-802: Cấu Hình Thông Tin Toàn Site (Site Settings Module)", "desc": "Module site-settings. Quản lý tên công ty, slogan song ngữ, hotline, email, kênh mạng xã hội, mã QR WeChat, mã nhúng Google Analytics / Baidu Tongji.\n\n*Acceptance Criteria*:\n- Admin thay đổi số hotline hoặc logo thì toàn bộ website đổi theo", "priority": "Medium"},
    {"epic_idx": 7, "summary": "SU-803: Tùy Biến Giao Diện Toàn Site (Theme Customizer - Module M05)", "desc": "Admin có thể chọn chuyển đổi giữa 2 Palette màu: P1 (Navy + Gold) và P2 (Đỏ đô + Vàng kem); thay đổi font chữ và bo góc.\n\n*Acceptance Criteria*:\n- Cập nhật biến CSS toàn trang ngay lập tức sau khi lưu theme", "priority": "Medium"},
    {"epic_idx": 7, "summary": "SU-804: Quản Lý Cấu Trúc Menu Đa Cấp (Menus Module - M09)", "desc": "Quản lý các mục hiển thị trên Header MegaMenu và Footer, cho phép kéo thả đổi vị trí và liên kết trỏ tới trang tương ứng.\n\n*Acceptance Criteria*:\n- Thêm, sửa, xóa menu link động", "priority": "Medium"},

    # EPIC 9
    {"epic_idx": 8, "summary": "SU-901: Cấu Hình SEO Nâng Cao, Sitemap & Thẻ Hreflang", "desc": "Tự động sinh sitemap.xml và robots.txt chứa tất cả đường dẫn trang, bài viết, dịch vụ. Thêm thẻ hreflang vi và zh-CN chuẩn SEO Google/Baidu cho website song ngữ.\n\n*Acceptance Criteria*:\n- File sitemap.xml tự động cập nhật khi xuất bản bài viết/dịch vụ mới", "priority": "Medium"},
    {"epic_idx": 8, "summary": "SU-902: Tối Ưu Hóa Tốc Độ Tải Trang & Core Web Vitals", "desc": "Tối ưu hình ảnh tự động qua WebP, lazy-load các khối bên dưới màn hình đầu tiên, nén tài nguyên gzip/brotli.\n\n*Acceptance Criteria*:\n- Điểm Google PageSpeed Insights trên Mobile đạt >= 85, Desktop đạt >= 95", "priority": "Medium"},
    {"epic_idx": 8, "summary": "SU-903: Kiểm Thử Tổng Thể & Tài Liệu Hướng Dẫn Sử Dụng Admin", "desc": "Test toàn bộ luồng nghiệp vụ end-to-end. Soạn tài liệu hướng dẫn bàn giao quản trị viên: cách đăng dịch vụ mới, cách kéo thả trang chủ, cách tải ảnh lên MinIO và cách tiếp nhận yêu cầu tư vấn.\n\n*Acceptance Criteria*:\n- Hệ thống vận hành ổn định, không phát sinh lỗi 500 hay unstyled layout", "priority": "Medium"},
]

def make_jira_request(url, email, api_token, method="GET", data=None):
    auth_str = f"{email}:{api_token}".encode("ascii")
    auth_header = "Basic " + base64.b64encode(auth_str).decode("ascii")
    
    headers = {
        "Authorization": auth_header,
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    
    body = json.dumps(data).encode("utf-8") if data else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    
    try:
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode("utf-8")
            return json.loads(content) if content else {}
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode("utf-8")
        print(f"❌ HTTP Error {e.code}: {err_msg}")
        return None
    except Exception as e:
        print(f"❌ Lỗi kết nối: {e}")
        return None

def main():
    if len(sys.argv) < 3:
        print("Sử dụng: python push_to_jira.py <EMAIL> <API_TOKEN>")
        sys.exit(1)
        
    email = sys.argv[1]
    token = sys.argv[2]
    
    base_url = f"https://{JIRA_DOMAIN}/rest/api/3"
    
    print(f"🚀 Bắt đầu kết nối Jira ({JIRA_DOMAIN}) với tài khoản: {email}...")
    
    # 1. Kiểm tra xác thực
    user_info = make_jira_request(f"{base_url}/myself", email, token)
    if not user_info:
        print("❌ Xác thực thất bại! Vui lòng kiểm tra lại Email và API Token.")
        sys.exit(1)
        
    print(f"✅ Đăng nhập thành công: {user_info.get('displayName')} ({user_info.get('emailAddress')})")
    
    # 2. Lấy Issue Types của project SU
    project_info = make_jira_request(f"{base_url}/project/{PROJECT_KEY}", email, token)
    if not project_info:
        print(f"❌ Không tìm thấy dự án {PROJECT_KEY} trên Jira!")
        sys.exit(1)
        
    issue_types = {it['name'].lower(): it['id'] for it in project_info.get('issueTypes', [])}
    epic_type_id = issue_types.get('epic') or issue_types.get('task')
    task_type_id = issue_types.get('story') or issue_types.get('task') or list(issue_types.values())[0]
    
    print(f"📌 Project: {project_info.get('name')} | Epic Type ID: {epic_type_id} | Task Type ID: {task_type_id}")
    
    # 3. Tạo các Epics
    created_epics = []
    print("\n📦 Bắt đầu tạo 9 Epics...")
    for idx, ep in enumerate(EPICS):
        epic_payload = {
            "fields": {
                "project": {"key": PROJECT_KEY},
                "summary": ep["summary"],
                "issuetype": {"id": epic_type_id},
                "description": {
                    "type": "doc",
                    "version": 1,
                    "content": [
                        {"type": "paragraph", "content": [{"type": "text", "text": ep["description"]}]}
                    ]
                }
            }
        }
        res = make_jira_request(f"{base_url}/issue", email, token, method="POST", data=epic_payload)
        if res and "key" in res:
            epic_key = res["key"]
            created_epics.append(epic_key)
            print(f"  ✅ [{idx+1}/9] Tạo Epic thành công: {epic_key} - {ep['summary']}")
        else:
            created_epics.append(None)
            print(f"  ⚠️ Không thể tạo Epic: {ep['summary']}")
            
    # 4. Tạo các Stories/Tasks
    print(f"\n📝 Bắt đầu tạo {len(TASKS)} Tasks...")
    created_count = 0
    for idx, task in enumerate(TASKS):
        epic_key = created_epics[task["epic_idx"]] if task["epic_idx"] < len(created_epics) else None
        
        task_payload = {
            "fields": {
                "project": {"key": PROJECT_KEY},
                "summary": task["summary"],
                "issuetype": {"id": task_type_id},
                "description": {
                    "type": "doc",
                    "version": 1,
                    "content": [
                        {"type": "paragraph", "content": [{"type": "text", "text": task["desc"]}]}
                    ]
                }
            }
        }
        
        # Gắn parent Epic nếu có
        if epic_key:
            task_payload["fields"]["parent"] = {"key": epic_key}
            
        res = make_jira_request(f"{base_url}/issue", email, token, method="POST", data=task_payload)
        if res and "key" in res:
            created_count += 1
            print(f"  ✅ [{idx+1}/{len(TASKS)}] Đã tạo: {res['key']} - {task['summary'][:40]}...")
        else:
            print(f"  ⚠️ Lỗi khi tạo: {task['summary'][:40]}...")
            
    print(f"\n🎉 Hoàn thành! Đã tạo thành công {len(created_epics)} Epics và {created_count}/{len(TASKS)} Tasks trên Jira Backlog.")

if __name__ == "__main__":
    main()
