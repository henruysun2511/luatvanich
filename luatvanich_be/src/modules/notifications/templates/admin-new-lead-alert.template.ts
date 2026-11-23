import { NewLeadNotificationPayload } from '../interfaces/new-lead-notification.interface';

export function generateAdminNewLeadAlertHtml(
  payload: NewLeadNotificationPayload,
  adminUrl: string,
): string {
  const channelDisplay: Record<string, string> = {
    phone: 'Điện thoại trực tiếp',
    email: 'Email',
    zalo: 'Zalo',
    wechat: 'WeChat (微信)',
  };

  const channelText = channelDisplay[payload.contactChannel] || payload.contactChannel;
  const channelDetail = payload.contactChannelId
    ? ` (${channelText}: ${payload.contactChannelId})`
    : ` (${channelText})`;

  const formattedDate = new Date(payload.createdAt).toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thông báo Yêu cầu tư vấn mới</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: #1e293b; color: #ffffff; padding: 24px; text-align: center; border-bottom: 3px solid #c5a059; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #cbd5e1; }
    .badge { display: inline-block; background-color: #ef4444; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; margin-top: 8px; }
    .body { padding: 24px; }
    .lead-box { background-color: #f1f5f9; border-radius: 6px; border: 1px solid #e2e8f0; padding: 16px; margin-bottom: 20px; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
    .row:last-child { border-bottom: none; }
    .label { color: #64748b; font-weight: 500; }
    .value { color: #0f172a; font-weight: 600; text-align: right; }
    .content-box { background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 14px; margin-top: 16px; }
    .content-title { font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 8px; }
    .content-text { font-size: 13px; line-height: 1.6; color: #1e293b; white-space: pre-wrap; margin: 0; }
    .btn-container { text-align: center; margin: 28px 0 16px; }
    .btn { display: inline-block; background: #c5a059; color: #ffffff !important; text-decoration: none; padding: 12px 28px; font-size: 14px; font-weight: 600; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .footer { background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>HÃNG LUẬT VẠN ÍCH (WAN YI)</h1>
      <p>Hệ thống Quản lý Khách hàng & Hồ sơ Tư vấn (CRM Portal)</p>
      <span class="badge">YÊU CẦU TƯ VẤN MỚI</span>
    </div>

    <div class="body">
      <p style="font-size: 14px; margin-top: 0;">Kính gửi <strong>Ban Quản trị & Đội ngũ Luật sư</strong>,</p>
      <p style="font-size: 13px; color: #475569; margin-bottom: 16px;">
        Hệ thống vừa tiếp nhận một yêu cầu tư vấn pháp lý mới từ khách hàng qua cổng thông tin trực tuyến. Dưới đây là thông tin chi tiết:
      </p>

      <div class="lead-box">
        <div class="row">
          <span class="label">Họ và tên khách hàng:</span>
          <span class="value" style="font-size: 14px; color: #0284c7;">${payload.fullName}</span>
        </div>
        ${payload.companyName ? `
        <div class="row">
          <span class="label">Doanh nghiệp / Đơn vị:</span>
          <span class="value">${payload.companyName}</span>
        </div>` : ''}
        <div class="row">
          <span class="label">Số điện thoại liên hệ:</span>
          <span class="value" style="font-family: monospace; font-size: 14px;">${payload.phone}</span>
        </div>
        ${payload.email ? `
        <div class="row">
          <span class="label">Địa chỉ Email:</span>
          <span class="value">${payload.email}</span>
        </div>` : ''}
        <div class="row">
          <span class="label">Kênh liên hệ ưu tiên:</span>
          <span class="value" style="color: #059669;">${channelText}${payload.contactChannelId ? ` [${payload.contactChannelId}]` : ''}</span>
        </div>
        ${payload.preferredContactTime ? `
        <div class="row">
          <span class="label">Giờ tiện liên hệ:</span>
          <span class="value">${payload.preferredContactTime}</span>
        </div>` : ''}
        <div class="row">
          <span class="label">Lĩnh vực chuyên môn:</span>
          <span class="value">${payload.practiceAreaName || 'Tư vấn chung'}</span>
        </div>
        ${payload.lawyerName ? `
        <div class="row">
          <span class="label">Luật sư được chỉ định:</span>
          <span class="value" style="color: #7c3aed;">${payload.lawyerName}</span>
        </div>` : ''}
        ${payload.attachmentCount ? `
        <div class="row">
          <span class="label">Hồ sơ đính kèm:</span>
          <span class="value">${payload.attachmentCount} tệp tài liệu</span>
        </div>` : ''}
        <div class="row">
          <span class="label">Thời điểm tiếp nhận:</span>
          <span class="value" style="font-size: 12px; color: #64748b;">${formattedDate}</span>
        </div>
      </div>

      <div class="content-box">
        <div class="content-title">Nội dung yêu cầu tư vấn:</div>
        <p class="content-text">${payload.content}</p>
      </div>

      <div class="btn-container">
        <a href="${adminUrl}" class="btn" target="_blank">
          Mở Hồ sơ trên Trang Quản trị CMS &rarr;
        </a>
      </div>
    </div>

    <div class="footer">
      Email này được gửi tự động từ Cổng thông tin Hãng luật Vạn Ích (Việt Nam & Trung Quốc).<br>
      Vui lòng không trả lời trực tiếp email này.
    </div>
  </div>
</body>
</html>
  `;
}
