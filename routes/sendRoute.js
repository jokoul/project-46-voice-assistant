const router = require("express").Router();
const nodemailer = require("nodemailer");
const password = process.env.PASSWORD_MAIL;
const myEmail = process.env.EMAIL;

router.post("/send", (req, res) => {
  let data = req.body;
  //   console.log(data);
  //   return res.status(200).json({msg: "test sendRoute"})
  if (
    data.name.length === 0 ||
    data.email.length === 0 ||
    data.newMessage.length === 0
  ) {
    return res.json({ msg: "Please fill all the fields" });
  }
  let smtpTransporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    auth: {
      user: myEmail,
      pass: password,
    },
    host: "smtp.gmail.com",
  });

  //Option
  let mailOptions = {
    to: myEmail,
    subject: `message from ${data.name}`,
    html: `
                <h3>Message vocal to text email</h3>
                <ul>
                    <li>Sender Information : </li>
                    <li>Name: ${data.name}</li>
                    <li>Email: ${data.email}</li>
                </ul>
                <h3>Sender Message</h3>
                <p>${data.newMessage}</p>
        `,
  };

  smtpTransporter.sendMail(mailOptions, (error) => {
    try {
      if (error) {
        return res
          .status(400)
          .json({ msg: "Please Fill all the fields!", error: error });
      }
      return res.status(200).json({ msg: "Thank you for your email." });
    } catch (error) {
      if (error) return res.status(500).json({ msg: "There is server error" });
    }
  });

  let mailOptions2 = {
    to: data.email,
    subject: `Email confirmation send by ${data.name} on Voice-Assistance App`,
    html: `
      Voice-Assistant app confirm that your email sent on the app is well delivered.
    `,
  };

  let smtpTransporter2 = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    auth: {
      user: myEmail,
      pass: password,
    },
    host: "smtp.gmail.com",
  });

  smtpTransporter2.sendMail(mailOptions2, (error) => {
    try {
      if (error) {
        return res
          .status(400)
          .json({ msg: "Please Fill all the fields!", error: error });
      }
      return res.status(200).json({ msg: "Thank you for your email." });
    } catch (error) {
      if (error) return res.status(500).json({ msg: "There is server error" });
    }
  });
});

module.exports = router;
