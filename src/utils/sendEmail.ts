import nodemailer from 'nodemailer';
import { loadEmailTemplate } from './loadEmailTemplate';
import config from '../config';

export const sendEmail = async (
  to: string,
  subject: string,
  templateName: string,
  replacements: { [key: string]: string },
) => {
  const htmlContent = loadEmailTemplate(templateName, replacements);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: config.emailSender.email,
      pass: config.emailSender.app_pass,
    },
  });

  const mailOptions = {
    from: 'Movie Series platform 👻 web.moniruzzaman1@gmail.com',
    to,
    subject: subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};
