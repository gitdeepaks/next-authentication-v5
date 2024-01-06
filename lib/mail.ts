import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendVerificationMail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3001/auth/new-verfication?token=${token}`;

  await resend.emails.send({
    from: "deepaksankhyan92@outlook.com",
    to: email,
    subject: "Please verify your email address",
    html: `<p>Click <a href="${confirmLink}"></a> to confirm email.</p>`,
  });
};
