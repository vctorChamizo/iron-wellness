const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const mailSender = async ({ email, subject, context }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const options = {
    viewEngine: {
      extname: ".hbs",
      layoutsDir: "mail/templates",
      defaultLayout: "layout",
      partialsDir: "mail/templates/partials"
    },
    viewPath: "mail/templates",
    extName: ".hbs"
  };

  transporter.use("compile", hbs(options));

  try {
    return await transporter.sendMail({
      to: email,
      subject: subject,
      template: "welcome",
      context
    });
  } catch (error) {
    return null;
  }
};

module.exports = mailSender;

// const result = await mailSender({
//   email: "victor.chamizo96@gmail.com",
//   subject: "Prueba Email",
//   context: { message: "Esto es el contexto" }
// });

// return result
//   ? user
//     ? res.status(200).json(user)
//     : res.status(400).json({ status: "BadRequest" })
//   : res.status(400).json({ status: "EmailSenderError", user });
