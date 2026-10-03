import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing Middleware
app.use(cors());
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// In-Memory Simple Rate Limiter (Max 5 submissions per 15 minutes per IP)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

const rateLimiter = (req, res, next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-ip';
  const now = Date.now();

  const userRecord = rateLimitMap.get(clientIp) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };

  if (now > userRecord.resetTime) {
    userRecord.count = 1;
    userRecord.resetTime = now + RATE_LIMIT_WINDOW_MS;
  } else {
    userRecord.count += 1;
  }

  rateLimitMap.set(clientIp, userRecord);

  if (userRecord.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      success: false,
      message: 'Too many contact requests from this IP. Please try again after 15 minutes.'
    });
  }

  next();
};

// Helper function to sanitize string inputs against HTML injection
const sanitize = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();
};

// Email Transporter Factory
const createTransporter = () => {
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const smtpSecure = process.env.SMTP_SECURE === 'true';
  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASSWORD;

  if (!smtpUser || !smtpPass) {
    return null; // SMTP not configured yet
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });
};

// POST /api/contact - Handle Contact Form Submissions
app.post('/api/contact', rateLimiter, async (req, res) => {
  try {
    const { name, email, phone, subject, message, company } = req.body;

    // 1. Honeypot check (hidden 'company' field for bot protection)
    if (company && company.trim() !== '') {
      // Silently accept without sending email to block spam bots
      return res.status(200).json({
        success: true,
        message: "Thanks for reaching out! Your message has been sent successfully. I'll get back to you soon."
      });
    }

    // 2. Sanitization
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanPhone = sanitize(phone);
    const cleanSubject = sanitize(subject);
    const cleanMessage = sanitize(message);

    // 3. Server-side Validation
    if (!cleanName) {
      return res.status(400).json({ success: false, message: 'Please provide your name.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (!cleanSubject) {
      return res.status(400).json({ success: false, message: 'Please provide a message subject.' });
    }

    if (!cleanMessage || cleanMessage.length < 10) {
      return res.status(400).json({ success: false, message: 'Message must be at least 10 characters long.' });
    }

    if (cleanMessage.length > 2000) {
      return res.status(400).json({ success: false, message: 'Message exceeds maximum length of 2000 characters.' });
    }

    // 4. Transport Verification & Email Dispatch
    const transporter = createTransporter();
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const receiverEmail = process.env.CONTACT_RECEIVER || process.env.EMAIL_TO || smtpUser || 'msundar677@gmail.com';

    if (!transporter) {
      console.warn('⚠️  SMTP credentials not set in environment variables.');
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured on the server. Please check SMTP environment variables.'
      });
    }

    // Main notification email sent to site owner
    const mailOptions = {
      from: `"Portfolio Contact Form" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: `"${cleanName}" <${cleanEmail}>`,
      subject: `New Portfolio Contact: ${cleanSubject}`,
      text: `New Portfolio Contact Submission

Name: ${cleanName}
Email: ${cleanEmail}
Phone: ${cleanPhone || 'Not provided'}
Subject: ${cleanSubject}

Message:
${cleanMessage}

--
Sent from Portfolio Website`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #080808; color: #ffffff; border: 1px solid #2a2a2a; border-radius: 12px; padding: 24px;">
          <h2 style="color: #F59E0B; border-bottom: 1px solid #2a2a2a; padding-bottom: 12px; margin-top: 0;">New Portfolio Contact</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #999999; width: 100px;"><strong>Name:</strong></td>
              <td style="padding: 8px 0; color: #ffffff;">${cleanName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999999;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; color: #ffffff;"><a href="mailto:${cleanEmail}" style="color: #F59E0B; text-decoration: none;">${cleanEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999999;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0; color: #ffffff;">${cleanPhone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999999;"><strong>Subject:</strong></td>
              <td style="padding: 8px 0; color: #ffffff;">${cleanSubject}</td>
            </tr>
          </table>
          <div style="background: #121212; border: 1px solid #2a2a2a; border-radius: 8px; padding: 16px;">
            <p style="color: #999999; margin-top: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;"><strong>Message Content:</strong></p>
            <p style="color: #cccccc; white-space: pre-wrap; line-height: 1.6; margin-bottom: 0;">${cleanMessage}</p>
          </div>
          <p style="font-size: 12px; color: #666666; margin-top: 20px; text-align: center;">Tip: Reply directly to this email to respond to ${cleanName} (${cleanEmail}).</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    // Optional confirmation email sent to visitor
    try {
      const confirmMailOptions = {
        from: `"Sundar M" <${smtpUser}>`,
        to: cleanEmail,
        subject: `Thank you for reaching out, ${cleanName}`,
        text: `Hi ${cleanName},

Thank you for contacting me through my portfolio website! I have received your message regarding "${cleanSubject}" and will get back to you as soon as possible.

Best regards,
Sundar M
Software Developer`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #080808; color: #ffffff; border: 1px solid #2a2a2a; border-radius: 12px; padding: 24px;">
            <h2 style="color: #F59E0B; margin-top: 0;">Message Received!</h2>
            <p style="color: #cccccc; line-height: 1.6;">Hi <strong>${cleanName}</strong>,</p>
            <p style="color: #cccccc; line-height: 1.6;">Thank you for reaching out through my portfolio website! I have received your message regarding <strong>"${cleanSubject}"</strong> and will review it shortly.</p>
            <p style="color: #cccccc; line-height: 1.6;">I'll get back to you as soon as possible at <a href="mailto:${cleanEmail}" style="color: #F59E0B;">${cleanEmail}</a>.</p>
            <hr style="border: 0; border-top: 1px solid #2a2a2a; margin: 24px 0;" />
            <p style="color: #999999; font-size: 13px; margin: 0;">Best regards,<br /><strong style="color: #ffffff;">Sundar M</strong><br />Software Developer</p>
          </div>
        `
      };
      await transporter.sendMail(confirmMailOptions);
    } catch (confirmError) {
      console.warn('Visitor auto-reply confirmation failed:', confirmError.message);
      // Non-critical, main notification email was already sent
    }

    return res.status(200).json({
      success: true,
      message: "Thanks for reaching out! Your message has been sent successfully. I'll get back to you soon."
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message due to a server error. Please try again later or email directly.'
    });
  }
});

// Production Static Assets & SPA Fallback
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.status(404).send('Build output not found. Run `npm run build` before starting the server.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio server running on port ${PORT}`);
});
