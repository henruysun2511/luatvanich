# Hạ tầng và hướng dẫn triển khai – Website công ty luật

> Phạm vi: một website (Next.js) + API (NestJS) + PostgreSQL, chạy trên **một VPS** bằng Docker Compose, đặt sau Cloudflare.
> Đối tượng đọc: người triển khai và người vận hành sau bàn giao. Ngày lập: 10/11/2026 · Phiên bản 1.0

## Mục lục

1. [Tổng quan kiến trúc](#1-tổng-quan-kiến-trúc)
2. [Thông số máy chủ và các thứ cần chuẩn bị](#2-thông-số-máy-chủ-và-các-thứ-cần-chuẩn-bị)
3. [Quy ước dùng trong tài liệu](#3-quy-ước-dùng-trong-tài-liệu)
4. [Bước 1: Tên miền, DNS và Cloudflare](#4-bước-1-tên-miền-dns-và-cloudflare)
5. [Bước 2: Khởi tạo và bảo mật máy chủ](#5-bước-2-khởi-tạo-và-bảo-mật-máy-chủ)
6. [Bước 3: Cài Docker](#6-bước-3-cài-docker)
7. [Bước 4: Cấu trúc thư mục và biến môi trường](#7-bước-4-cấu-trúc-thư-mục-và-biến-môi-trường)
8. [Bước 5: Đóng gói ứng dụng (Dockerfile)](#8-bước-5-đóng-gói-ứng-dụng-dockerfile)
9. [Bước 6: Docker Compose](#9-bước-6-docker-compose)
10. [Bước 7: Nginx và chứng chỉ SSL](#10-bước-7-nginx-và-chứng-chỉ-ssl)
11. [Bước 8: Khởi tạo cơ sở dữ liệu và chạy lần đầu](#11-bước-8-khởi-tạo-cơ-sở-dữ-liệu-và-chạy-lần-đầu)
12. [Bước 9: Lưu trữ ảnh và tệp](#12-bước-9-lưu-trữ-ảnh-và-tệp)
13. [Bước 10: Sao lưu và khôi phục](#13-bước-10-sao-lưu-và-khôi-phục)
14. [Bước 11: CI/CD với GitHub Actions](#14-bước-11-cicd-với-github-actions)
15. [Bước 12: Giám sát và cảnh báo](#15-bước-12-giám-sát-và-cảnh-báo)
16. [Môi trường staging](#16-môi-trường-staging)
17. [Checklist bảo mật](#17-checklist-bảo-mật)
18. [Vận hành hằng ngày](#18-vận-hành-hằng-ngày)
19. [Xử lý sự cố thường gặp](#19-xử-lý-sự-cố-thường-gặp)
20. [Checklist trước khi ra mắt (go-live)](#20-checklist-trước-khi-ra-mắt-go-live)
21. [Bàn giao](#21-bàn-giao)

---

## 1. Tổng quan kiến trúc

```
                     Khách truy cập
                           │
                  ┌────────▼─────────┐
                  │    Cloudflare    │  DNS, SSL, CDN, tường lửa (WAF)
                  └────────┬─────────┘
                           │ HTTPS
┌──────────────────────────▼──────────────────────────────┐
│ VPS (Ubuntu LTS)                                        │
│                                                         │
│   Nginx (cổng 80/443)                                   │
│    ├─ /uploads/public/*  ──► đọc trực tiếp từ ổ đĩa     │
│    ├─ /api/*             ──► 127.0.0.1:4000 (NestJS)    │
│    └─ /*                 ──► 127.0.0.1:3000 (Next.js)   │
│                                                         │
│   Docker Compose                                        │
│    ├─ web       (Next.js)                               │
│    ├─ api       (NestJS)  ── ghi ảnh vào ./data/uploads │
│    └─ postgres  (không mở ra ngoài, chỉ mạng nội bộ)    │
│                                                         │
│   Cron: sao lưu hằng ngày ──► kho lưu ngoài máy chủ     │
└─────────────────────────────────────────────────────────┘
        ▲                                   ▲
   GitHub Actions (build, triển khai)   UptimeRobot, Sentry (giám sát)
```

### 1.1 Các thành phần

| Thành phần | Vai trò | Cổng | Mở ra internet? |
|---|---|---|---|
| Cloudflare | DNS, SSL phía khách, CDN, chống tấn công | – | Có (đứng trước máy chủ) |
| Nginx (cài trực tiếp trên máy chủ) | Cổng vào duy nhất, chuyển yêu cầu, phục vụ ảnh công khai, SSL | 80, 443 | Có |
| `web` (Next.js) | Website công khai và trang `/admin` | 3000 | Không (chỉ `127.0.0.1`) |
| `api` (NestJS) | API, đăng nhập, xử lý ảnh, gửi thông báo, tác vụ định kỳ | 4000 | Không (chỉ `127.0.0.1`) |
| `postgres` | Cơ sở dữ liệu | 5432 | Không (chỉ mạng Docker nội bộ) |
| Thư mục `data/uploads` | Ảnh công khai và tệp đính kèm riêng tư | – | Chỉ phần `public` qua Nginx |
| rclone + cron | Sao lưu ra ngoài máy chủ | – | Kết nối đi ra |

### 1.2 Luồng một yêu cầu

1. Khách mở `https://example.com/dich-vu/...` → Cloudflare → Nginx.
2. Nginx chuyển cho `web` (Next.js). Next.js gọi `api` qua mạng nội bộ (`http://api:4000`) để lấy nội dung, dựng HTML và trả về (có cache ISR).
3. Khi khách gửi form tư vấn, trình duyệt gọi `https://example.com/api/public/leads` → Nginx (giới hạn tần suất) → `api` → ghi vào PostgreSQL → gửi thông báo email/Telegram.
4. Khi admin bấm **Xuất bản**, `api` gọi Next.js làm mới cache đúng trang đó (revalidate), nên nội dung hiện ngay.

---

## 2. Thông số máy chủ và các thứ cần chuẩn bị

### 2.1 Cấu hình đề xuất

| Hạng mục | Đề xuất | Ghi chú |
|---|---|---|
| Hệ điều hành | Ubuntu Server LTS (24.04) | Bản LTS đang được hỗ trợ |
| CPU, RAM | 2 vCPU, 4 GB RAM | 2 GB chạy được nhưng sát khi build; luôn bật swap |
| Ổ đĩa | 40–80 GB SSD/NVMe | Đủ cho hệ điều hành, ảnh Docker, cơ sở dữ liệu, ảnh website và sao lưu cục bộ |
| Băng thông | Từ 1 TB/tháng trở lên | Website công ty dùng rất ít |
| Địa chỉ IP | 1 IPv4 cố định | |
| Vị trí | Việt Nam (khách trong nước) hoặc Singapore | Cần chốt cùng khách (câu hỏi 7.1.3 của bản yêu cầu) |
| Snapshot/backup của nhà cung cấp | Nên bật nếu có | Là lớp dự phòng bổ sung, **không thay thế** sao lưu ở mục 13 |

### 2.2 Tài khoản và thông tin cần có trước khi bắt đầu

| Thứ cần có | Ai đứng tên | Dùng để |
|---|---|---|
| Tên miền | Khách | Địa chỉ website |
| Tài khoản Cloudflare | Khách | DNS, SSL, CDN, WAF |
| Tài khoản nhà cung cấp VPS | Khách | Máy chủ |
| Tổ chức GitHub (hoặc GitLab) | Khách | Kho mã nguồn, CI/CD, kho image |
| Dịch vụ gửi email (SMTP/Resend) | Khách | Gửi thông báo yêu cầu tư vấn |
| Bot Telegram hoặc Zalo OA (nếu dùng) | Khách | Thông báo tức thời |
| Kho sao lưu ngoài (Cloudflare R2, Backblaze B2...) | Khách | Lưu bản sao lưu |
| Tài khoản Sentry, UptimeRobot (gói miễn phí) | Khách | Giám sát |
| Trình quản lý mật khẩu (Bitwarden, 1Password...) | Khách | Giữ mọi mật khẩu và khóa |

> Mọi tài khoản nên **đứng tên khách** ngay từ đầu, bên làm được thêm vào với quyền quản trị. Cách này tránh phải chuyển quyền khi bàn giao (mục 7.4 của bản yêu cầu).

---

## 3. Quy ước dùng trong tài liệu

| Giá trị mẫu | Thay bằng |
|---|---|
| `example.com` | Tên miền thật của khách |
| `203.0.113.10` | Địa chỉ IP của VPS |
| `deploy` | Tên người dùng không phải root trên VPS |
| `/srv/lawsite` | Thư mục dự án trên VPS |
| `<org>` | Tên tổ chức/tài khoản GitHub (viết thường) |
| `@app/api`, `@app/web`, `@app/shared` | Tên package trong monorepo pnpm của dự án |

- Lệnh bắt đầu bằng `sudo` chạy với quyền quản trị; các lệnh khác chạy với người dùng `deploy`.
- Phiên bản image trong tài liệu (Node.js, PostgreSQL) là bản LTS/ổn định tại thời điểm viết. **Kiểm tra bản đang được hỗ trợ trước khi dùng** và ghim đúng phiên bản chính (major) cho mọi môi trường.
- Dockerfile và workflow là **mẫu**, cần chỉnh theo cấu trúc monorepo thực tế (tên package, đường dẫn).

---

## 4. Bước 1: Tên miền, DNS và Cloudflare

### 4.1 Đưa tên miền về Cloudflare

1. Tạo tài khoản Cloudflare (đứng tên khách), chọn **Add a site**, nhập `example.com`, chọn gói **Free**.
2. Cloudflare đưa ra hai máy chủ tên (nameserver). Vào nhà đăng ký tên miền, đổi nameserver sang hai địa chỉ đó.
3. Chờ trạng thái chuyển sang **Active** (từ vài phút đến vài giờ).

Nếu website cũ đang chạy, **chép lại toàn bộ bản ghi DNS cũ** (đặc biệt MX, TXT của email) vào Cloudflare trước khi đổi nameserver, tránh làm gián đoạn email.

### 4.2 Bản ghi DNS

| Loại | Tên | Giá trị | Proxy | Ghi chú |
|---|---|---|---|---|
| A | `@` | `203.0.113.10` | Bật (đám mây cam) | Website chính |
| CNAME | `www` | `example.com` | Bật | Chuyển hướng về tên miền không `www` |
| A | `staging` | `203.0.113.10` | Bật | Môi trường duyệt (xem mục 16) |
| MX, TXT (SPF, DKIM, DMARC) | – | Theo nhà cung cấp email | Tắt | **Không đụng** nếu email công ty đang chạy |

Trước ngày chuyển website cũ sang mới, hạ **TTL** của bản ghi xuống 5 phút để đổi IP nhanh khi cần.

### 4.3 Cài đặt Cloudflare nên bật

| Mục | Giá trị | Lý do |
|---|---|---|
| SSL/TLS → Overview | **Full (strict)** | Cloudflare kiểm tra chứng chỉ trên máy chủ gốc, tránh bị nghe lén đoạn Cloudflare ↔ VPS |
| SSL/TLS → Edge Certificates | Always Use HTTPS: bật; Minimum TLS Version: 1.2 | Ép dùng HTTPS |
| Caching → Cache Rules | **Bỏ qua cache** (Bypass) cho `/api/*` và `/admin*` | Không cache dữ liệu động và trang quản trị |
| Security → WAF | Bật bộ quy tắc quản lý miễn phí | Chặn tấn công phổ biến |
| Security → Bots | Bật Bot Fight Mode | Giảm bot xấu |
| Speed → Optimization | Bật Brotli | Nén nhanh hơn |

> Cloudflare gói Free không có mạng riêng tại Trung Quốc đại lục. Nếu khách có nhiều người dùng ở đó, tốc độ và khả năng truy cập cần được kiểm tra riêng trước khi cam kết.

---

## 5. Bước 2: Khởi tạo và bảo mật máy chủ

### 5.1 Đăng nhập lần đầu, cập nhật hệ thống

```bash
ssh root@203.0.113.10

apt update && apt -y upgrade
timedatectl set-timezone Asia/Ho_Chi_Minh
```

### 5.2 Tạo người dùng `deploy`

```bash
adduser deploy                    # đặt mật khẩu mạnh khi được hỏi
usermod -aG sudo deploy

mkdir -p /home/deploy/.ssh
cp /root/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh && chmod 600 /home/deploy/.ssh/authorized_keys
```

Mở **một cửa sổ terminal khác** và kiểm tra đăng nhập được bằng khóa SSH:

```bash
ssh deploy@203.0.113.10
sudo whoami      # phải in ra: root
```

### 5.3 Khóa đăng nhập root và mật khẩu

Chỉ làm sau khi bước 5.2 đã thành công.

```bash
sudo tee /etc/ssh/sshd_config.d/99-hardening.conf > /dev/null <<'EOF'
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
EOF

sudo sshd -t && sudo systemctl reload ssh
```

> **Giữ nguyên cửa sổ SSH cũ đang mở** cho đến khi xác nhận mở được phiên mới. Nếu cấu hình sai, bạn bị khóa ngoài máy chủ.

### 5.4 Tường lửa UFW

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

> **Lưu ý quan trọng:** Docker tự thêm quy tắc mạng, **bỏ qua UFW** với các cổng được công bố (`ports:`). Vì vậy trong `docker-compose.yml` mọi cổng đều gắn vào `127.0.0.1` (ví dụ `127.0.0.1:3000:3000`), không viết `3000:3000`.

### 5.5 Chống dò mật khẩu SSH, tự cập nhật bản vá

```bash
sudo apt install -y fail2ban unattended-upgrades
sudo systemctl enable --now fail2ban
sudo dpkg-reconfigure -plow unattended-upgrades     # chọn Yes
```

### 5.6 Tạo swap (khuyến nghị cho VPS 4 GB hoặc nhỏ hơn)

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
free -h
```

---

## 6. Bước 3: Cài Docker

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker deploy
```

Đăng xuất rồi đăng nhập lại để quyền nhóm có hiệu lực, sau đó kiểm tra:

```bash
docker version
docker compose version
```

Giới hạn dung lượng nhật ký của container (tránh đầy ổ đĩa):

```bash
sudo tee /etc/docker/daemon.json > /dev/null <<'EOF'
{
  "log-driver": "json-file",
  "log-opts": { "max-size": "10m", "max-file": "3" }
}
EOF
sudo systemctl restart docker
```

> Cài Docker bằng script `get.docker.com` tiện cho máy chủ mới. Nếu tổ chức yêu cầu cài từ kho `apt` chính thức của Docker, làm theo tài liệu cài đặt chính thức của Docker.

---

## 7. Bước 4: Cấu trúc thư mục và biến môi trường

### 7.1 Thư mục trên máy chủ

```bash
sudo mkdir -p /srv/lawsite/{data/uploads/public,data/uploads/private,backups,scripts}
sudo chown -R deploy:deploy /srv/lawsite
chmod 700 /srv/lawsite/data/uploads/private
cd /srv/lawsite
```

```
/srv/lawsite
├── docker-compose.yml        # mục 9
├── .env                      # bí mật, KHÔNG đưa vào Git (mục 7.2)
├── data/
│   └── uploads/
│       ├── public/           # ảnh công khai, Nginx phục vụ trực tiếp
│       └── private/          # tệp đính kèm của khách, chỉ API đọc được
├── backups/                  # bản sao lưu cục bộ (giữ 14 ngày)
└── scripts/
    ├── deploy.sh             # mục 14
    ├── backup.sh             # mục 13
    └── check-disk.sh         # mục 15
```

Sao chép `docker-compose.yml` và các script từ kho mã nguồn lên máy chủ (hoặc để quy trình CI/CD đồng bộ). Mã nguồn ứng dụng **không** nằm trên máy chủ: máy chủ chỉ kéo các image đã build sẵn.

### 7.2 Tệp `.env`

Tạo `/srv/lawsite/.env` (`chmod 600 .env`). **Không** đặt dấu nháy hoặc khoảng trắng quanh giá trị; mật khẩu và khóa nên tạo bằng lệnh:

```bash
openssl rand -base64 48 | tr -d '\n=+/' ; echo
```

| Biến | Ví dụ | Dùng ở | Giải thích |
|---|---|---|---|
| `POSTGRES_DB` | `lawsite` | postgres | Tên cơ sở dữ liệu |
| `POSTGRES_USER` | `lawsite` | postgres | Người dùng cơ sở dữ liệu |
| `POSTGRES_PASSWORD` | (chuỗi ngẫu nhiên dài) | postgres | Mật khẩu; không dùng ký tự `@ : / ?` để khỏi lỗi khi ghép vào `DATABASE_URL` |
| `DATABASE_URL` | `postgresql://lawsite:MATKHAU@postgres:5432/lawsite?schema=public` | api | Chuỗi kết nối; máy chủ là `postgres` (tên service) |
| `JWT_ACCESS_SECRET` | (ngẫu nhiên) | api | Khóa ký token truy cập |
| `JWT_REFRESH_SECRET` | (ngẫu nhiên, khác khóa trên) | api | Khóa ký refresh token |
| `PUBLIC_SITE_URL` | `https://example.com` | api, web | Địa chỉ công khai của website |
| `CORS_ORIGIN` | `https://example.com` | api | Chỉ cho phép tên miền này gọi API từ trình duyệt |
| `API_INTERNAL_URL` | `http://api:4000` | web | Next.js (phía máy chủ) gọi API qua mạng nội bộ |
| `WEB_INTERNAL_URL` | `http://web:3000` | api | API gọi Next.js để làm mới cache (revalidate) |
| `REVALIDATE_SECRET` | (ngẫu nhiên) | api, web | Mã bí mật bảo vệ đường dẫn revalidate |
| `UPLOAD_DIR` | `/data/uploads` | api | Thư mục lưu tệp trong container |
| `COOKIE_SECURE` | `true` | api | Cookie đăng nhập chỉ gửi qua HTTPS |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` | theo nhà cung cấp | api | Gửi email thông báo |
| `TURNSTILE_SECRET` (hoặc `RECAPTCHA_SECRET`) | | api | Xác thực chống spam cho form |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | | api | Thông báo Telegram (tùy chọn) |
| `SENTRY_DSN` | | api, web | Báo lỗi (tùy chọn) |
| `DEPLOY_UID`, `DEPLOY_GID` | kết quả `id -u deploy`, `id -g deploy` | compose | Chạy container `api` bằng chính người dùng này để ghi được vào `data/uploads` và sao lưu đọc được |
| `IMAGE_PREFIX` | `ghcr.io/<org>/lawsite` | compose | Tiền tố tên image |
| `NODE_ENV` | `production` | api, web | Chế độ chạy thật |

> Các biến bắt đầu bằng `NEXT_PUBLIC_` được **ghi cứng vào mã khi build** (không đổi được lúc chạy). Đặt chúng ở bước build của CI (mục 14), không đặt trong `.env` máy chủ.

Tạo bản mẫu `.env.example` (không chứa giá trị thật) trong kho mã nguồn để người sau biết cần những biến nào. `.env` thật thì lưu bản sao trong trình quản lý mật khẩu của khách.

---

## 8. Bước 5: Đóng gói ứng dụng (Dockerfile)

Hai Dockerfile đặt trong kho mã nguồn, ngữ cảnh build là **thư mục gốc của monorepo**. Image được build trên GitHub Actions (mục 14), không build trên VPS để khỏi tốn RAM của máy chủ.

### 8.1 `apps/api/Dockerfile` (NestJS + Prisma)

```dockerfile
FROM node:24-alpine AS build
RUN corepack enable
WORKDIR /repo
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @app/shared build
RUN pnpm --filter @app/api exec prisma generate
RUN pnpm --filter @app/api build

FROM node:24-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /repo/apps/api
# Sao chép nguyên workspace đã build: đơn giản và chắc chắn,
# đồng thời giữ lại công cụ prisma để chạy migration trong cùng image.
COPY --from=build /repo /repo
EXPOSE 4000
CMD ["node", "dist/main.js"]
```

Ghi chú:
- Image lớn hơn mức tối thiểu vì chứa cả thư viện phát triển. Đây là đánh đổi có chủ đích để việc chạy `prisma migrate deploy` đơn giản. Có thể thu nhỏ sau bằng `pnpm deploy`.
- Ứng dụng NestJS cần: tiền tố đường dẫn `api` (`app.setGlobalPrefix('api')`), `app.enableShutdownHooks()`, `trust proxy` bật, endpoint kiểm tra sức khỏe `GET /api/health` (dùng `@nestjs/terminus`).

### 8.2 `apps/web/Dockerfile` (Next.js)

Trong `next.config.js` bật chế độ gọn: `output: 'standalone'` và, vì là monorepo, `outputFileTracingRoot` trỏ về thư mục gốc repo.

```dockerfile
FROM node:24-alpine AS build
RUN corepack enable
WORKDIR /repo
COPY . .
RUN pnpm install --frozen-lockfile
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN pnpm --filter @app/shared build
RUN pnpm --filter @app/web build

FROM node:24-alpine AS runtime
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
WORKDIR /app
COPY --from=build /repo/apps/web/.next/standalone ./
COPY --from=build /repo/apps/web/.next/static ./apps/web/.next/static
COPY --from=build /repo/apps/web/public ./apps/web/public
USER node
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
```

Ghi chú:
- Đường dẫn `apps/web/server.js` đúng khi `outputFileTracingRoot` là thư mục gốc monorepo; nếu cấu trúc khác, kiểm tra vị trí `server.js` trong thư mục `.next/standalone`.
- Dùng tệp `.dockerignore` ở gốc repo để loại `node_modules`, `.git`, `.next`, `dist`, `.env*`, giúp build nhanh và không lọt bí mật vào image.

---

## 9. Bước 6: Docker Compose

Tệp `/srv/lawsite/docker-compose.yml`:

```yaml
name: lawsite

services:
  postgres:
    image: postgres:17-alpine
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    command: >
      postgres
      -c shared_buffers=512MB
      -c effective_cache_size=1536MB
      -c max_connections=50
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 6
    networks: [internal]

  api:
    image: ${IMAGE_PREFIX}-api:${IMAGE_TAG:-latest}
    restart: unless-stopped
    user: "${DEPLOY_UID}:${DEPLOY_GID}"
    env_file: .env
    depends_on:
      postgres:
        condition: service_healthy
    ports:
      - "127.0.0.1:4000:4000"
    volumes:
      - ./data/uploads:/data/uploads
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://127.0.0.1:4000/api/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 30s
    networks: [internal]

  web:
    image: ${IMAGE_PREFIX}-web:${IMAGE_TAG:-latest}
    restart: unless-stopped
    env_file: .env
    depends_on:
      api:
        condition: service_healthy
    ports:
      - "127.0.0.1:3000:3000"
    networks: [internal]

volumes:
  pgdata:

networks:
  internal:
```

| Điểm cần chú ý | Giải thích |
|---|---|
| `127.0.0.1:` trước cổng | Chỉ Nginx trên cùng máy mới truy cập được; Docker không mở cổng ra internet |
| `postgres` không có `ports` | Cơ sở dữ liệu chỉ dùng được trong mạng Docker |
| `user: DEPLOY_UID:DEPLOY_GID` | Container `api` ghi tệp bằng quyền của `deploy`, nên thư mục `data/uploads` không bị lỗi quyền và sao lưu đọc được |
| `shared_buffers`, `effective_cache_size` | Cấu hình gợi ý cho máy 4 GB RAM dùng chung với web và API; chỉnh nếu RAM khác |
| `pgdata` (volume có tên) | Dữ liệu PostgreSQL nằm ngoài container, giữ nguyên khi cập nhật image. **Không** chạy `docker compose down -v` trừ khi muốn xóa dữ liệu |
| `healthcheck` | `web` chỉ khởi động sau khi `api` khỏe, `api` chỉ sau khi `postgres` sẵn sàng |

Nếu image `wget` không có sẵn trong image Node alpine tối giản, thay lệnh kiểm tra bằng `node -e "fetch('http://127.0.0.1:4000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"`.

---

## 10. Bước 7: Nginx và chứng chỉ SSL

### 10.1 Cài Nginx và Certbot

```bash
sudo apt install -y nginx certbot
sudo mkdir -p /var/www/certbot
sudo rm -f /etc/nginx/sites-enabled/default
```

### 10.2 Lấy IP thật của khách khi đi qua Cloudflare

Khi bật proxy Cloudflare, Nginx chỉ thấy IP của Cloudflare. Cấu hình để Nginx lấy IP thật từ header `CF-Connecting-IP` (cần cho giới hạn tần suất và nhật ký):

```bash
sudo sh -c '
{
  for ip in $(curl -s https://www.cloudflare.com/ips-v4; echo; curl -s https://www.cloudflare.com/ips-v6); do
    echo "set_real_ip_from $ip;"
  done
  echo "real_ip_header CF-Connecting-IP;"
} > /etc/nginx/conf.d/cloudflare-realip.conf'
```

Danh sách IP của Cloudflare thỉnh thoảng thay đổi; nên chạy lại lệnh này vài tháng một lần. Nếu **không** dùng proxy Cloudflare thì bỏ bước này.

### 10.3 Giới hạn tần suất cho form tư vấn

`/etc/nginx/conf.d/rate-limit.conf`:

```nginx
limit_req_zone $binary_remote_addr zone=lead_form:10m rate=6r/m;
```

### 10.4 Cấu hình site

Lấy chứng chỉ trước (mục 10.5) rồi mới bật khối 443. Tệp `/etc/nginx/sites-available/lawsite.conf`:

```nginx
# Cổng 80: chuyển sang HTTPS, vẫn cho Certbot xác minh
server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;

    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 301 https://example.com$request_uri; }
}

# www -> không www
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.example.com;
    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    return 301 https://example.com$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name example.com;

    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    client_max_body_size 25m;          # giới hạn tệp tải lên (khớp giới hạn trong API)

    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    # Bật HSTS sau khi chắc chắn HTTPS chạy ổn định:
    # add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Ảnh công khai: Nginx đọc thẳng từ ổ đĩa, cache lâu
    location /uploads/public/ {
        alias /srv/lawsite/data/uploads/public/;
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
        try_files $uri =404;
    }

    # Form tư vấn: giới hạn tần suất
    location = /api/public/leads {
        limit_req zone=lead_form burst=5 nodelay;
        proxy_pass http://127.0.0.1:4000;
        include /etc/nginx/snippets/proxy-common.conf;
    }

    # API
    location /api/ {
        proxy_pass http://127.0.0.1:4000;
        include /etc/nginx/snippets/proxy-common.conf;
    }

    # Website (Next.js), gồm cả /admin
    location / {
        proxy_pass http://127.0.0.1:3000;
        include /etc/nginx/snippets/proxy-common.conf;
    }
}
```

Tệp dùng chung `/etc/nginx/snippets/proxy-common.conf`:

```nginx
proxy_http_version 1.1;
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_read_timeout 60s;
```

Kích hoạt:

```bash
sudo ln -s /etc/nginx/sites-available/lawsite.conf /etc/nginx/sites-enabled/lawsite.conf
sudo nginx -t && sudo systemctl reload nginx
```

> Thư mục `/uploads/private/` **không** có `location` nào, vì tệp riêng tư chỉ tải được qua API sau khi kiểm tra quyền đăng nhập.

### 10.5 Chứng chỉ SSL

**Phương án A – Let's Encrypt (khuyến nghị mặc định, miễn phí, tự gia hạn)**

1. Tạm thời đặt bản ghi DNS `@` và `www` sang chế độ **DNS only** (đám mây xám) trong Cloudflare để việc xác minh đi thẳng tới máy chủ, hoặc dùng tạm một khối `server` chỉ có cổng 80.
2. Lấy chứng chỉ:

```bash
sudo certbot certonly --webroot -w /var/www/certbot \
  -d example.com -d www.example.com \
  --deploy-hook "systemctl reload nginx"
```

3. Bật lại proxy (đám mây cam) và đặt SSL/TLS = **Full (strict)**.
4. Kiểm tra gia hạn tự động (Certbot đã tạo sẵn bộ hẹn giờ):

```bash
sudo systemctl list-timers | grep certbot
sudo certbot renew --dry-run
```

Chứng chỉ Let's Encrypt có hạn ngắn (khoảng 90 ngày) và được gia hạn tự động; việc cần làm là **có cảnh báo** nếu gia hạn lỗi (mục 15).

**Phương án B – Chứng chỉ gốc của Cloudflare (Origin CA)**

- Trong Cloudflare: SSL/TLS → Origin Server → Create Certificate, tải về tệp chứng chỉ và khóa, đặt vào `/etc/ssl/cloudflare/` rồi trỏ `ssl_certificate` và `ssl_certificate_key` tới đó.
- Hạn dài, không phải gia hạn thường xuyên, nhưng chỉ được tin cậy khi truy cập **qua Cloudflare**. Nếu sau này tắt proxy hoặc đổi nhà cung cấp, trình duyệt sẽ báo lỗi chứng chỉ.

---

## 11. Bước 8: Khởi tạo cơ sở dữ liệu và chạy lần đầu

### 11.1 Đăng nhập kho image (một lần)

Trên GitHub, tạo token (Personal Access Token hoặc token riêng cho máy chủ) có quyền đọc package, rồi:

```bash
echo "<TOKEN>" | docker login ghcr.io -u <tên-github> --password-stdin
```

### 11.2 Chạy lần đầu

```bash
cd /srv/lawsite
docker compose pull
docker compose up -d postgres
docker compose run --rm -w /repo/apps/api api ./node_modules/.bin/prisma migrate deploy
docker compose up -d
docker compose ps
```

Kết quả mong đợi: `postgres`, `api`, `web` đều ở trạng thái `running` (và `healthy`).

### 11.3 Dữ liệu khởi tạo

Chạy lệnh seed của dự án để tạo ngôn ngữ, vai trò, quyền, menu, trang hệ thống, theme mặc định và tài khoản quản trị đầu tiên (xem mục 8 của tài liệu thiết kế cơ sở dữ liệu). Ví dụ:

```bash
docker compose run --rm -w /repo/apps/api api node dist/seed.js
```

Đăng nhập `/admin` bằng tài khoản vừa tạo, **đổi mật khẩu và bật xác thực hai lớp ngay**.

### 11.4 Kiểm tra nhanh

```bash
curl -I https://example.com
curl -s https://example.com/api/health
docker compose logs --tail=50 api web
```

---

## 12. Bước 9: Lưu trữ ảnh và tệp

### 12.1 Giai đoạn đầu: ổ đĩa của VPS

| Thư mục | Nội dung | Truy cập |
|---|---|---|
| `data/uploads/public/` | Ảnh và tài liệu công khai | Nginx phục vụ trực tiếp tại `/uploads/public/...` |
| `data/uploads/private/` | Tệp đính kèm của khách trong form tư vấn | Chỉ qua API, sau khi kiểm tra quyền `lead.view` |

- Cơ sở dữ liệu chỉ lưu đường dẫn (`media_files.storage_key`), không lưu nội dung ảnh.
- API xử lý ảnh khi tải lên: kiểm tra loại tệp, giới hạn dung lượng, nén và đổi sang WebP (thư viện `sharp`), đặt tên tệp ngẫu nhiên.
- Thư mục `data/uploads` nằm trong phạm vi sao lưu (mục 13).

### 12.2 Khi nào chuyển sang Cloudflare R2 (hoặc S3)

Chuyển khi dung lượng ảnh tiến gần mức ổ đĩa cho phép, cần tách ảnh khỏi máy chủ, hoặc muốn phục vụ qua CDN. Cách chuyển:

1. Tạo bucket R2 công khai cho ảnh (gắn tên miền riêng, ví dụ `media.example.com`) và một bucket **riêng tư** cho tệp đính kèm.
2. API thêm trình điều khiển lưu trữ S3 (R2 tương thích S3), chọn bằng biến môi trường (`STORAGE_DRIVER=s3`).
3. Chép dữ liệu cũ lên bucket bằng `rclone copy`, rồi đổi tiền tố hiển thị ảnh.
4. Bảng `media_files` giữ nguyên cấu trúc, chỉ khác giá trị `storage_key` trỏ vào kho mới.

---

## 13. Bước 10: Sao lưu và khôi phục

**Nguyên tắc:** sao lưu chỉ có giá trị khi (1) **lưu ngoài máy chủ** và (2) **đã thử khôi phục thành công**.

### 13.1 Cái gì cần sao lưu

| Đối tượng | Cách | Tần suất | Giữ |
|---|---|---|---|
| Cơ sở dữ liệu PostgreSQL | `pg_dump` định dạng custom (`-Fc`) | Hằng ngày, 02:00 | 14 ngày trên máy chủ, 30 ngày ngoài máy chủ |
| Thư mục `data/uploads` | Nén `tar.gz` và đồng bộ ngoài | Hằng ngày | Như trên |
| Tệp `.env` và cấu hình Nginx | Chép thủ công vào trình quản lý mật khẩu / kho riêng | Khi thay đổi | Bản mới nhất |
| Snapshot của nhà cung cấp VPS | Bật nếu có | Hằng tuần | Lớp dự phòng bổ sung |

### 13.2 Chuẩn bị kho lưu ngoài với rclone

```bash
sudo apt install -y rclone
rclone config          # tạo remote tên "offsite" (Cloudflare R2, Backblaze B2 hoặc Google Drive)
rclone lsd offsite:    # kiểm tra kết nối
```

Muốn mã hóa bản sao lưu trước khi gửi đi (dữ liệu vụ việc là nhạy cảm), tạo thêm remote kiểu `crypt` bọc ngoài remote trên và dùng remote đó trong script.

### 13.3 Script `scripts/backup.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail
cd /srv/lawsite

STAMP=$(date +%Y%m%d-%H%M%S)
DEST=/srv/lawsite/backups
mkdir -p "$DEST"

# 1. Cơ sở dữ liệu (dùng biến môi trường có sẵn trong container)
docker compose exec -T postgres sh -c \
  'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc' > "$DEST/db-$STAMP.dump"

# 2. Ảnh và tệp
tar -czf "$DEST/uploads-$STAMP.tar.gz" -C data uploads

# 3. Đẩy ra ngoài máy chủ (copy, không đồng bộ xóa)
rclone copy "$DEST" offsite:lawsite-backups --include "*-$STAMP.*"

# 4. Dọn bản cũ
find "$DEST" -type f -mtime +14 -delete
rclone delete offsite:lawsite-backups --min-age 30d

echo "Backup xong: $STAMP"
```

```bash
chmod +x /srv/lawsite/scripts/backup.sh
crontab -e
# thêm dòng:
0 2 * * * /srv/lawsite/scripts/backup.sh >> /var/log/lawsite-backup.log 2>&1
```

```bash
sudo touch /var/log/lawsite-backup.log && sudo chown deploy:deploy /var/log/lawsite-backup.log
```

### 13.4 Khôi phục

```bash
cd /srv/lawsite
# 1. Dừng ứng dụng, giữ cơ sở dữ liệu chạy
docker compose stop web api

# 2. Tạo lại cơ sở dữ liệu trống và nạp bản sao lưu
docker compose exec -T postgres sh -c \
  'dropdb -U "$POSTGRES_USER" --if-exists "$POSTGRES_DB" && createdb -U "$POSTGRES_USER" "$POSTGRES_DB"'
docker compose exec -T postgres sh -c \
  'pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --no-owner' < backups/db-YYYYMMDD-HHMMSS.dump

# 3. Khôi phục ảnh
tar -xzf backups/uploads-YYYYMMDD-HHMMSS.tar.gz -C data

# 4. Chạy lại ứng dụng
docker compose up -d
```

Nếu bản sao lưu nằm ở kho ngoài, tải về trước: `rclone copy offsite:lawsite-backups backups/ --include "*-YYYYMMDD-*"`.

### 13.5 Thử khôi phục định kỳ

- **Hằng quý** (ít nhất): khôi phục bản sao lưu mới nhất lên môi trường staging hoặc một VPS tạm, đăng nhập admin, mở vài trang và ảnh để chắc chắn dữ liệu đầy đủ.
- Ghi lại ngày thử và thời gian khôi phục thực tế (đối chiếu với mục tiêu RPO/RTO ở mục 6.17 của bản yêu cầu).

---

## 14. Bước 11: CI/CD với GitHub Actions

### 14.1 Quy trình

```
Đẩy mã lên nhánh main
   └─► Kiểm tra (cài đặt, lint, kiểm tra kiểu, kiểm thử)
        └─► Build 2 image (api, web) và đẩy lên GHCR, gắn nhãn theo mã commit
             └─► SSH vào VPS, chạy scripts/deploy.sh <mã commit>
                  ├─ kéo image mới
                  ├─ chạy migration cơ sở dữ liệu
                  └─ khởi động lại api, web
```

### 14.2 Bí mật cần thêm vào GitHub (Settings → Secrets and variables → Actions)

| Tên | Giá trị |
|---|---|
| `SSH_HOST` | IP hoặc tên miền VPS |
| `SSH_USER` | `deploy` |
| `SSH_PRIVATE_KEY` | Khóa riêng SSH **dành riêng cho CI** (thêm khóa công khai tương ứng vào `~/.ssh/authorized_keys` của `deploy`) |
| `SITE_URL` (biến, không phải bí mật) | `https://example.com`, dùng làm `NEXT_PUBLIC_SITE_URL` khi build |

### 14.3 `.github/workflows/deploy.yml`

```yaml
name: deploy

on:
  push:
    branches: [main]

concurrency:
  group: deploy-production
  cancel-in-progress: false

env:
  IMAGE_PREFIX: ghcr.io/<org>/lawsite    # viết thường toàn bộ

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm -r lint
      - run: pnpm -r typecheck
      - run: pnpm -r test

  build:
    needs: test
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v6
        with:
          context: .
          file: apps/api/Dockerfile
          push: true
          tags: |
            ${{ env.IMAGE_PREFIX }}-api:${{ github.sha }}
            ${{ env.IMAGE_PREFIX }}-api:latest
      - uses: docker/build-push-action@v6
        with:
          context: .
          file: apps/web/Dockerfile
          push: true
          build-args: |
            NEXT_PUBLIC_SITE_URL=${{ vars.SITE_URL }}
          tags: |
            ${{ env.IMAGE_PREFIX }}-web:${{ github.sha }}
            ${{ env.IMAGE_PREFIX }}-web:latest

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: /srv/lawsite/scripts/deploy.sh ${{ github.sha }}
```

> Phiên bản chính của các action (`@v4`, `@v6`...) là bản phổ biến tại thời điểm viết; kiểm tra bản mới nhất trước khi dùng. Với GHCR, tên image bắt buộc viết thường.

### 14.4 Script `scripts/deploy.sh` trên VPS

```bash
#!/usr/bin/env bash
set -euo pipefail
cd /srv/lawsite

export IMAGE_TAG="${1:-latest}"
echo "Triển khai phiên bản: $IMAGE_TAG"

docker compose pull api web

# Chạy migration bằng chính image mới, trước khi bật phiên bản mới
docker compose run --rm -w /repo/apps/api api ./node_modules/.bin/prisma migrate deploy

docker compose up -d api web
docker image prune -f

# Kiểm tra sau triển khai
sleep 10
curl -fsS http://127.0.0.1:4000/api/health > /dev/null && echo "API khỏe"
curl -fsS -o /dev/null http://127.0.0.1:3000 && echo "Web khỏe"
```

```bash
chmod +x /srv/lawsite/scripts/deploy.sh
```

### 14.5 Quay lui (rollback)

```bash
cd /srv/lawsite
export IMAGE_TAG=<mã commit của bản trước>
docker compose pull api web
docker compose up -d api web
```

- Viết migration theo hướng **tương thích ngược** (thêm cột mới trước, bỏ cột cũ ở lần phát hành sau) để quay lui mã nguồn không cần quay lui cơ sở dữ liệu.
- Nếu migration đã phá dữ liệu mà phải lùi, khôi phục từ bản sao lưu (mục 13.4). Vì vậy **luôn chạy `backup.sh` thủ công trước khi phát hành thay đổi cơ sở dữ liệu lớn**.

---

## 15. Bước 12: Giám sát và cảnh báo

| Cái cần theo dõi | Công cụ | Cách làm |
|---|---|---|
| Website còn sống | UptimeRobot (hoặc Better Stack) gói miễn phí | Giám sát `https://example.com` và `https://example.com/api/health` mỗi 5 phút, báo qua email/Telegram |
| Chứng chỉ SSL sắp hết hạn | UptimeRobot hoặc Cloudflare | Bật cảnh báo hết hạn chứng chỉ trước 14 ngày |
| Lỗi ứng dụng | Sentry (gói miễn phí) | Gắn `SENTRY_DSN` cho `api` và `web` |
| Ổ đĩa đầy | Script dưới đây | Cảnh báo khi dùng trên 80% |
| Sao lưu thất bại | Kiểm tra nhật ký + thư mục `backups` | Cảnh báo nếu không có bản mới trong 26 giờ |
| Container khởi động lại liên tục | `docker compose ps`, `docker compose logs` | Xem định kỳ hoặc bật cảnh báo của UptimeRobot |

### Script cảnh báo ổ đĩa và sao lưu (`scripts/check-disk.sh`)

```bash
#!/usr/bin/env bash
set -euo pipefail

TOKEN="<TELEGRAM_BOT_TOKEN>"
CHAT="<TELEGRAM_CHAT_ID>"
send() { curl -s "https://api.telegram.org/bot${TOKEN}/sendMessage" -d chat_id="$CHAT" -d text="$1" > /dev/null; }

USED=$(df --output=pcent / | tail -1 | tr -dc '0-9')
[ "$USED" -ge 80 ] && send "Cảnh báo: ổ đĩa máy chủ dùng ${USED}%"

LATEST=$(find /srv/lawsite/backups -name 'db-*.dump' -mmin -1560 | head -1)
[ -z "$LATEST" ] && send "Cảnh báo: không có bản sao lưu cơ sở dữ liệu trong 26 giờ qua"
exit 0
```

```bash
chmod +x /srv/lawsite/scripts/check-disk.sh
# crontab: chạy mỗi giờ
0 * * * * /srv/lawsite/scripts/check-disk.sh
```

Nhật ký ứng dụng xem bằng `docker compose logs -f --tail=100 api`. Nhật ký Nginx ở `/var/log/nginx/`.

---

## 16. Môi trường staging

Dùng cho khách duyệt trước khi phát hành. Có thể chạy trên **cùng VPS** nếu đủ RAM, hoặc VPS nhỏ riêng.

| Hạng mục | Cách làm |
|---|---|
| Thư mục | `/srv/lawsite-staging` với `docker-compose.yml` riêng, tên project khác (`name: lawsite-staging`) |
| Cổng | `127.0.0.1:3100` (web), `127.0.0.1:4100` (api) |
| Cơ sở dữ liệu | Volume và `.env` riêng, **không dùng chung** dữ liệu với production |
| Tên miền | `staging.example.com`, khối `server` Nginx riêng |
| Chặn công cụ tìm kiếm | Thêm `add_header X-Robots-Tag "noindex, nofollow" always;` |
| Chặn người ngoài | Đặt mật khẩu cơ bản: `sudo apt install apache2-utils`, `sudo htpasswd -c /etc/nginx/.htpasswd khach`, rồi trong `server` thêm `auth_basic "Staging"; auth_basic_user_file /etc/nginx/.htpasswd;` |
| Triển khai | Workflow riêng chạy khi đẩy lên nhánh `develop`, gọi `deploy.sh` của staging |
| Dữ liệu thử | Không dùng dữ liệu thật của khách hàng (yêu cầu tư vấn). Dùng dữ liệu mẫu hoặc dữ liệu đã ẩn danh |

---

## 17. Checklist bảo mật

**Máy chủ**
- [ ] Đăng nhập SSH chỉ bằng khóa, tắt root và mật khẩu
- [ ] UFW chỉ mở SSH, 80, 443
- [ ] Mọi cổng container gắn `127.0.0.1`; PostgreSQL không có cổng ra ngoài
- [ ] Fail2ban và tự cập nhật bản vá bảo mật đang chạy
- [ ] Nhật ký container có giới hạn dung lượng

**Ứng dụng**
- [ ] `.env` quyền `600`, không nằm trong Git; mọi khóa/mật khẩu sinh ngẫu nhiên và khác nhau giữa staging và production
- [ ] Cookie đăng nhập: `httpOnly`, `Secure`, `SameSite`
- [ ] Admin bắt buộc bật 2FA; vô hiệu hóa tài khoản người đã nghỉ
- [ ] CORS chỉ cho phép tên miền chính; `helmet` bật trong NestJS
- [ ] Giới hạn tần suất: `@nestjs/throttler` ở API và `limit_req` ở Nginx cho form
- [ ] Kiểm tra và làm sạch mọi dữ liệu nhập (zod, sanitize-html); giới hạn loại và dung lượng tệp tải lên
- [ ] Tệp đính kèm của khách ở thư mục riêng tư, chỉ tải được sau khi xác thực

**Dữ liệu**
- [ ] Sao lưu hằng ngày ra ngoài máy chủ, có mã hóa nếu chứa dữ liệu nhạy cảm
- [ ] Đã thử khôi phục thành công ít nhất một lần
- [ ] Có quy định thời gian lưu giữ và quy trình xóa dữ liệu cá nhân theo yêu cầu (Nghị định 13/2023/NĐ-CP)

**Cloudflare**
- [ ] SSL/TLS Full (strict), Always Use HTTPS
- [ ] WAF và Bot Fight Mode bật; không cache `/api/*`, `/admin*`
- [ ] Tài khoản Cloudflare bật 2FA

---

## 18. Vận hành hằng ngày

| Việc | Lệnh / cách làm | Tần suất |
|---|---|---|
| Xem trạng thái | `cd /srv/lawsite && docker compose ps` | Khi cần |
| Xem nhật ký | `docker compose logs -f --tail=100 api` (hoặc `web`) | Khi cần |
| Phát hành bản mới | Đẩy mã lên `main`; CI/CD tự triển khai | Khi có thay đổi |
| Khởi động lại một dịch vụ | `docker compose restart api` | Khi cần |
| Cập nhật bản vá hệ điều hành | `sudo apt update && sudo apt upgrade`, khởi động lại nếu cần (`sudo reboot`) | Hằng tháng |
| Cập nhật image nền (Node, PostgreSQL) | Build lại ứng dụng; với PostgreSQL chỉ nâng bản **nhỏ** (minor), nâng bản chính phải có kế hoạch riêng (dump và restore) | Hằng quý |
| Cập nhật danh sách IP Cloudflare cho Nginx | Chạy lại lệnh ở mục 10.2, sau đó `sudo nginx -t && sudo systemctl reload nginx` | 3–6 tháng/lần |
| Kiểm tra gia hạn SSL | `sudo certbot renew --dry-run` | Hằng quý |
| Dọn image Docker cũ | `docker image prune -f` | Hằng tháng |
| Thử khôi phục sao lưu | Mục 13.5 | Hằng quý |
| Gia hạn tên miền, VPS | Theo lịch của nhà cung cấp | Hằng năm / hằng tháng |

---

## 19. Xử lý sự cố thường gặp

| Triệu chứng | Nguyên nhân thường gặp | Cách xử lý |
|---|---|---|
| Trình duyệt báo 502 Bad Gateway | Container `web` hoặc `api` đã dừng hoặc đang khởi động | `docker compose ps`; `docker compose logs --tail=100 web api`; `docker compose up -d` |
| Trang tải rất chậm, máy chủ treo | Hết RAM (không có swap) hoặc ổ đĩa đầy | `free -h`, `df -h`; bật swap; xóa bản sao lưu cũ và `docker image prune -f` |
| `api` không khởi động, lỗi kết nối cơ sở dữ liệu | Sai `DATABASE_URL` hoặc `postgres` chưa sẵn sàng | Kiểm tra `.env` (máy chủ phải là `postgres`); `docker compose logs postgres` |
| Không tải được ảnh lên, lỗi quyền | Thư mục `data/uploads` không thuộc `DEPLOY_UID` | `sudo chown -R deploy:deploy /srv/lawsite/data/uploads` và kiểm tra `DEPLOY_UID/GID` trong `.env` |
| Sửa nội dung nhưng website không đổi | Revalidate lỗi (sai `REVALIDATE_SECRET` hoặc `WEB_INTERNAL_URL`) hoặc Cloudflare cache | Xem nhật ký `api`; kiểm tra Cache Rule bỏ qua `/api/*`; xóa cache Cloudflare |
| Báo lỗi chứng chỉ SSL / 525, 526 | Chứng chỉ hết hạn hoặc sai chế độ SSL của Cloudflare | `sudo certbot certificates`; `sudo certbot renew`; kiểm tra chế độ **Full (strict)** |
| Form tư vấn gửi được nhưng không có email | Sai cấu hình SMTP hoặc bị đánh dấu spam | Xem nhật ký `api`; kiểm tra SPF/DKIM/DMARC của tên miền gửi thư |
| Nhiều yêu cầu spam từ form | Bot gửi hàng loạt | Bật Turnstile/reCAPTCHA; giảm `rate` trong `rate-limit.conf`; bật Bot Fight Mode |
| Lỗi 413 khi tải tệp | Vượt `client_max_body_size` | Tăng giá trị trong Nginx và giới hạn tương ứng trong API |
| Triển khai CI/CD thất bại ở bước SSH | Sai khóa hoặc quyền | Kiểm tra `SSH_PRIVATE_KEY`, `authorized_keys`, và `deploy` có thuộc nhóm `docker` |

---

## 20. Checklist trước khi ra mắt (go-live)

**Hạ tầng**
- [ ] Tên miền đã trỏ đúng, SSL hợp lệ (kiểm tra bằng trình duyệt và `curl -I`)
- [ ] Cloudflare: Full (strict), Always HTTPS, WAF bật, không cache `/api/*` và `/admin*`
- [ ] Mọi cổng nội bộ chỉ nghe trên `127.0.0.1`; quét từ ngoài chỉ thấy 22, 80, 443
- [ ] Bản sao lưu đầu tiên chạy thành công, đã thử khôi phục
- [ ] Giám sát uptime và cảnh báo hoạt động (thử tắt `web` xem có nhận cảnh báo không)

**Ứng dụng**
- [ ] Gửi thử form tư vấn: lưu vào cơ sở dữ liệu, email/Telegram đến đúng người
- [ ] Đăng nhập admin, bật 2FA, thử đăng bài lên lịch và xuất bản (trang đổi ngay)
- [ ] Tải thử ảnh và tệp đính kèm; ảnh riêng tư không mở được bằng đường dẫn trực tiếp
- [ ] Kiểm tra trên điện thoại thật, kể cả trình duyệt trong WeChat/Zalo nếu khách yêu cầu
- [ ] Kiểm tra Lighthouse (tốc độ, SEO, khả năng tiếp cận) đạt mục tiêu đã thống nhất

**SEO và chuyển đổi**
- [ ] Đã chuyển hướng 301 từ các URL của website cũ (bảng `redirects`)
- [ ] `sitemap.xml`, `robots.txt` đúng; gỡ `noindex` khỏi production
- [ ] Đã khai báo Google Search Console và gửi sitemap; cài Google Analytics
- [ ] Hạ TTL DNS xuống 5 phút trước ngày chuyển, đặt lại bình thường sau khi ổn định

---

## 21. Bàn giao

| Hạng mục | Nội dung |
|---|---|
| Quyền sở hữu tài khoản | Tên miền, Cloudflare, VPS, GitHub, kho sao lưu, Sentry, UptimeRobot: đều đứng tên khách và đã bật 2FA |
| Mã nguồn | Toàn bộ kho trên GitHub của khách, kèm `.env.example`, Dockerfile, `docker-compose.yml`, workflow CI/CD |
| Mật khẩu và khóa | Chuyển vào trình quản lý mật khẩu của khách; thu hồi mọi khóa SSH và token của bên làm sau khi bàn giao |
| Tài liệu | Tài liệu này, tài liệu thiết kế cơ sở dữ liệu, tài liệu API (Swagger), hướng dẫn sử dụng cho quản trị viên |
| Sổ tay vận hành | Mục 18 và 19 của tài liệu này, in hoặc lưu kèm số liên hệ hỗ trợ |
| Sao lưu | Một bản sao lưu đầy đủ đầu tiên kèm biên bản thử khôi phục thành công |
| Đào tạo | Buổi hướng dẫn quản trị viên (đăng bài, kéo thả, đổi theme, xử lý yêu cầu tư vấn) và buổi hướng dẫn người phụ trách kỹ thuật (mục 18, 19) |
| Bảo trì | Hợp đồng bảo trì (nếu có): phạm vi, thời gian phản hồi, kênh liên hệ |

---

*Hết tài liệu. Các đoạn mã là mẫu đã được viết để chạy được trên Ubuntu LTS với Docker Compose, nhưng cần được thử trên máy chủ thật (nên thử trên staging trước) và chỉnh theo cấu trúc dự án cụ thể.*
