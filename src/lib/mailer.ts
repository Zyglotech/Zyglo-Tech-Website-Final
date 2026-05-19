import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM = `"Zyglo Tech Enterprise" <${process.env.SMTP_USER}>`;
const NOTIFY_TO = process.env.NOTIFY_EMAIL ?? 'zyglotech@gmail.com';

/* Auto-reply to the person who submitted the form */
export async function sendAutoReply({
  toName,
  toEmail,
  subject,
  bodyHtml,
}: {
  toName: string;
  toEmail: string;
  subject: string;
  bodyHtml: string;
}) {
  await transporter.sendMail({
    from: FROM,
    to: `"${toName}" <${toEmail}>`,
    subject,
    html: bodyHtml,
  });
}

/* Internal notification to the Zyglo team */
export async function sendInternalNotification({
  subject,
  bodyHtml,
}: {
  subject: string;
  bodyHtml: string;
}) {
  await transporter.sendMail({
    from: FROM,
    to: NOTIFY_TO,
    subject,
    html: bodyHtml,
  });
}

/* Shared HTML wrapper */
export function emailWrapper(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Zyglo Tech Enterprise</title>
</head>
<body style="margin:0;padding:0;background:#060B17;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#060B17;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:#0B1424;border-radius:16px 16px 0 0;padding:28px 36px;border-bottom:1px solid rgba(255,255,255,0.06);">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:12px;">
                    <svg width="36" height="36" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="25" cy="14" r="9" fill="#06CCE8"/>
                      <rect x="-8" y="-32" width="16" height="64" rx="8" fill="#06CCE8" transform="translate(35 34) rotate(38)"/>
                    </svg>
                  </td>
                  <td>
                    <div style="font-size:15px;font-weight:900;letter-spacing:0.14em;color:#ffffff;">ZYGLO</div>
                    <div style="font-size:8px;font-weight:500;letter-spacing:0.22em;color:rgba(6,204,232,0.7);text-transform:uppercase;">Tech Enterprise</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background:#0B1424;padding:36px 36px 28px;border-radius:0 0 16px 16px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 0;text-align:center;">
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.3);">
                Zyglo Tech Enterprise Pvt. Ltd. · Chennai, India<br/>
                <a href="https://www.zyglo.tech" style="color:#06CCE8;text-decoration:none;">www.zyglo.tech</a> ·
                <a href="mailto:zyglotech@gmail.com" style="color:#06CCE8;text-decoration:none;">zyglotech@gmail.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
