import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactEmail({ name, email, company, message }) {
  await transporter.sendMail({
    from: `"NetNova Site" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECEIVER,
    subject: `New contact from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || '—'}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });
}
