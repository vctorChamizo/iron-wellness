const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const mailSender = async ({ email, subject, context, template }) => {
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
      subject,
      template: template,
      context
    });
  } catch (error) {
    return null;
  }
};

module.exports = mailSender;
