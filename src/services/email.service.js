require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});


transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});


const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"FineTech-Bank" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegistrationEmail(userEmail , name){

    const subject = "FineTech-Banking"
    const text = `Hello ${name},\n\nWelcome to FineTech-Banking! Your account has been successfully created. 
                  We are th93ehrilled to have you with us.\n\nBest regards,\nThe FineTech-Banking Team`

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }
            .header { background-color: #1a73e8; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px; line-height: 1.6; color: #333; }
            .button { display: inline-block; padding: 12px 24px; background-color: #1a73e8; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 20px; }
            .footer { background-color: #f8f9fa; color: #777; padding: 20px; text-align: center; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>FineTech-Banking</h1>
            </div>
            <div class="content">
                <h2>Hello ${name},</h2>
                <p>Thank you for choosing <strong>FineTech-Banking</strong>. We are excited to help you manage your finances with ease and security.</p>
                <p>Your account has been successfully registered. You can now log in to your dashboard to view your transactions, manage your profile, and more.</p>
                <p>If you did not create this account, please ignore this email or contact our support team immediately.<br><br>Regards,<br><strong>FineTech CEO</strong></p>
            </div>
            <div class="footer">
                <p>&copy; 2026 FineTech-Banking System. All rights reserved.</p>
                <p>Secure. Reliable. Innovative.</p>
            </div>
        </div>
    </body>
    </html>
    `;

    await sendEmail(userEmail , subject , text , html)
}

async function sendTransactionEmail(userEmail, toAccount, name, amount) {
  const subject = `Transaction Successful!`;
  const text = `Hello ${name}, an amount of ${amount} PKR was sent to account ${toAccount} successfully.`;
  const html = `<p>${text}</p>`;
  
  // You must actually call the helper function!
  await sendEmail(userEmail, subject, text, html); 
}

async function sendFailedTransactionEmail(userEmail, amount, toAccount) {
  const subject = `Transaction Failed!`;
  const text = `We're sorry, your transaction of ${amount} to account ${toAccount} failed.`;
  const html = `<p>${text}</p>`;
  
  await sendEmail(userEmail, subject, text, html);
}

module.exports = {sendRegistrationEmail , transporter , sendTransactionEmail , sendFailedTransactionEmail };

