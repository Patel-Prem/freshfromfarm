export const mailTemplates = {
  VERIFICATION_CODE: {
    SUBJECT: `FreshFromFarm | Your One-Time Password (OTP)`,
    BODY: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>OTP Verification</title>
        <style>
          body {
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 500px;
            background: #ffffff;
            margin: 40px auto;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            padding: 30px 20px;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #22c55e;
            padding-bottom: 10px;
          }
          .header h1 {
            color: #16a34a;
            font-size: 22px;
            margin: 0;
          }
          .content {
            text-align: center;
            padding: 20px 10px;
          }
          .content p {
            color: #4b5563;
            font-size: 16px;
            line-height: 1.5;
          }
          .otp-box {
            display: inline-block;
            background: #f0fdf4;
            color: #16a34a;
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 6px;
            padding: 12px 20px;
            border-radius: 8px;
            margin: 20px 0;
            border: 1px solid #bbf7d0;
          }
          .footer {
            text-align: center;
            font-size: 13px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
            padding-top: 15px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>FreshFromFarm Verification</h1>
          </div>
          <div class="content">
            <p>Hello {{USER_NAME}},</p>
            <p>
              Please use the following One-Time Password (OTP) to verify your email
              address. The code will expire in <strong>5 minutes</strong>.
            </p>
            <div class="otp-box">{{OTP_CODE}}</div>
            <p>If you didn’t request this code, you can safely ignore this email.</p>
          </div>
          <div class="footer">
            <p>© 2025 FreshFromFarm. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
    `,
  },

  PASSWORD_RESET: {
    SUBJECT: `FreshFromFarm | Reset Your Password`,
    BODY: `
    <h2>Hello {{USER_NAME}},</h2>
    <p>Click below to reset your password:</p>
    <a href="{{RESET_LINK}}" style="background:#22c55e;color:white;padding:10px 16px;border-radius:6px;text-decoration:none;">Reset Password</a>
    <p>In case of Rest Password button does not work, copy and paste below link in your browser </p>
    <p>{{RESET_LINK}}</p>
    <p>If you didn’t request a password reset, please ignore this email.</p>
    `,
  },

  WELCOME_EMAIL: {
    SUBJECT: `Welcome to FreshFromFarm, {{USER_NAME}}!`,
    BODY: `
    <h2>Hey {{USER_NAME}} 👋</h2>
    <p>Thanks for joining FreshFromFarm! We’re excited to have you.</p>
    <p>Start exploring fresh local products today.</p>
    `,
  },
};
