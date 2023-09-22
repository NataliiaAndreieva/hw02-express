require('dotenv').config();

const nodemailer = require('nodemailer');

const { META_USER, META_PASSWORD } = process.env;

const transport = nodemailer.createTransport({
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_USER,
    pass: META_PASSWORD,
  },
});

const sendEmail = async (data) => {
    const dataFull = { ...data, from: META_USER };
    await transport
        .sendMail(dataFull)
      .then(() => console.log("Email sent successfully"))
        .catch((error) => console.log(error.message));
};

module.exports = sendEmail;