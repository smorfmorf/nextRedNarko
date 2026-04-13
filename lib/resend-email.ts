import { Resend } from "resend";

export const sendEmail = async (subject: string, template: React.ReactNode) => {
  const resend = new Resend("re_BJwHVKhK_JxfpDGHhy9aTu3EJYuoUgha5");

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: ["malalamobilelegends@gmail.com"],
    subject,
    text: "",
    react: template,
  });

  if (error) {
    throw error;
  }

  return data;
};
