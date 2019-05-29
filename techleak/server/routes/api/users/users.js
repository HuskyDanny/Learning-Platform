const { userValidator, User } = require("../../../models/Users");
const { Router } = require("express");
const passport = require("passport");
const auth = require("../../auth");
const sgMail = require("../../../config/sgMail");
const jwt = require("jsonwebtoken");
const router = Router();

router.get("/comfirmation/:token", auth.optional, async (req, res) => {
  const secret = process.env.JWT_SECRET;
  try {
    const { _id } = jwt.verify(req.params.token, secret);
    await User.findOneAndUpdate({ _id: _id }, { confirmed: true });
    res.json({ message: "verified" });
  } catch (error) {
    res.json(error.message);
  }
  return res.redirect("http://localhost:3001/index");
});

router.get("/all", auth.required, async (req, res) => {
  try {
    let users = await User.find();
    users = users.map(user => user.userView());
    return res.json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.get("/", auth.required, async (req, res) => {
  const {
    payload: { _id }
  } = req;

  try {
    const user = await User.findOne({ _id: _id });
    if (!user) return res.status(400).json("User not Found");
    return res.json({ user: user.userView() });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.patch("/tags/:id", auth.required, async (req, res) => {
  const {
    body: { tags },
    params: { id }
  } = req;

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { tags: tags },
      { new: true }
    );
    return res.json(user.userView());
  } catch (error) {
    return res.json(error.message);
  }
});

router.post("/signup", auth.optional, async (req, res) => {
  //wrap everything as user
  const {
    body: { user }
  } = req;

  //validate content
  const { error } = userValidator(user);
  if (error) return res.status(400).json(error.message);

  //salt and hash the newuser
  let newUser = new User(user);
  newUser.setPassword(user.password);

  //save to mongodb
  try {
    newUser = await newUser.save();
    res.status(201).json({ message: "Created Account" });

    const url = "http://localhost:3000/comfirmation/" + newUser.generateJWT();
    const msg = {
      to: newUser.email,
      from: "welcome@techleak.com",
      templateId: "d-55aeeafbdc834ef7879e7f33c5726199",
      subject: "Welcome To Techleak, Enjoy Learning",
      dynamic_template_data: {
        username: newUser.username,
        url: url
      }
    };

    await sgMail.send(msg);
  } catch (error) {
    //duplicate error return to user
    if (error.code === 11000) {
      let message = { email: "", username: "" };
      if (error.errmsg.includes("email")) {
        message.email = "email has been taken";
      }
      if (error.errmsg.includes("username")) {
        message.username = "username has been taken";
      }
      return res.status(400).json(message);
    }
  }
});

router.post("/login", (req, res) => {
  return passport.authenticate("local", { session: false }, function(
    err,
    user,
    info
  ) {
    if (err) {
      next(err);
    }
    if (user) {
      return res.json(user.toAuthJSON());
    }
    if (!user.confirmed) {
      return res.json({ message: "Please verify first" });
    }
    return res.status(400).json(info);
  })(req, res);
});

module.exports = router;
