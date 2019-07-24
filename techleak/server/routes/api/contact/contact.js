var express = require('express');
var router = express.Router();
const sgMail = require("../../../config/sgMail");

router.post("/contact", (req, res, next) => {
  var firstname = req.body.firstname
  var familyname = req.body.familyname
  var email = req.body.email
  var phone = req.body.phone
  var title = req.body.title
  var message = req.body.message
  var content = `Firstname: ${firstname} \n Familyname: ${familyname} \n Email: ${email} \n Phone: ${phone} \n \n Message: ${message}`

  const msg = {
    to: "exploreprograming@gmail.com",
    from: "contactUs@techleak.com",
    subject: "[Contact Us Message] " + title,
    text: content
  };
  sgMail.send(msg);
})

module.exports = router;
