import { createTransport } from 'nodemailer';

const sendMail = async ({ email, subject, name, otp }) => {
    const transport = createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
        user: "webd222222@gmail.com",
        pass: "uxxfcjediukeoldt"
        },
    });

    const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2 style="color: #333;">Your OTP Code</h2>
            <p>Dear ${name},</p>
            <p>Your OTP code is:</p>
            <h1 style="color: #4CAF50;">${otp}</h1>
            <p>Please use this code to complete your verification.</p>
            <p>Thank you!</p>
        </div>
    `;

    await transport.sendMail({
        from: process.env.GMAIL ||'webd222222@gmail.com',
        to: email,
        subject,
        html,
    });
};

export default sendMail;
