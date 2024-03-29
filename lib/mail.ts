import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

// export const sendTwoFactorTokenMail = async (email: string, token: string) => {
//   const conformLink = `http://localhost:3000/auth/verify?token=${token}`;
// };

export const sendTwoFactorTokenMail = async (email: string, token: string) => {
  const resetLink = await resend.emails.send({
    from: "admin@deepaksankhyan.in",
    to: email,
    subject: "Your 2FA Code",
    html: `<p>Your 2FA Code is ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "mail@auth-masterclass-tutorial.com",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationMail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verfication?token=${token}`;

  await resend.emails.send({
    from: "admin@deepaksankhyan.in",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
