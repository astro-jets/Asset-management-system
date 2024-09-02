import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { mailTemplate } from "./templates/mailTemplate";

type mailProps = {
  name: string;
  subject: string;
  to: string;
  body: string;
};

export async function sendMail({ name, subject, to, body }: mailProps) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: { user: SMTP_EMAIL, pass: SMTP_PASSWORD },
  });

  try {
    const testResult = await transport.verify();

    console.log(testResult);
  } catch (err) {
    console.log("Email verify error", err);
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });

    console.log(sendResult);
  } catch (err) {
    console.log("Email send error", err);
    return;
  }
}

export function compileTemplate(name: string, url: string, message: string) {
  const template = handlebars.compile(mailTemplate);
  const htmlBody = template({
    name: name,
    url: url,
    message: message,
  });
  return htmlBody;
}
