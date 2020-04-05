const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const handleContext = (template, info) => {
  return template === "welcome"
    ? {
        name: info.name,
        surname: info.surname,
        email: info.email,
        username: info.username,
      }
    : template === "modifiedClass"
    ? {
        name: info.user.name,
        surname: info.user.surname,
        email: info.user.email,
        username: info.user.username,
      }
    : {
        name: info.user.name,
        surname: info.user.surname,
        email: info.user.email,
        username: info.user.username,
      };
};

const mailSender = async ({ email, subject, info, template }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const options = {
    viewEngine: {
      extname: ".hbs",
      layoutsDir: "mail/templates",
      defaultLayout: "layout",
      partialsDir: "mail/templates/partials",
    },
    viewPath: "mail/templates",
    extName: ".hbs",
  };

  transporter.use("compile", hbs(options));

  try {
    const context = handleContext(template, info);

    return await transporter.sendMail({
      to: email,
      subject,
      template: template,
      context,
    });
  } catch (error) {
    return null;
  }
};

module.exports = mailSender;
