import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrpytjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrpytjs.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '86c49b0c6e78c5',
        pass: 'c65d97c07a83e0',
      },
    });

    const mailOptions = {
      from: 'sagar@gmail.com',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify your Email' : 'Reset your Password',
      html: `<p>Click <a href='${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}'>here</a> to ${
        emailType === 'VERIFY' ? 'Verify your Email' : 'Reset your Password'
      } or copy and paste the link below in your browser . <br> ${
        process.env.DOMAIN
      }verifyemail?token=${hashedToken}</p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.mesaage);
  }
};
