const express = require("express");
const router = express.Router();
const signupRouter = require("./signup.route")
const loginRouter = require("./login.route")
const postRouter = require("./posts.route")

router.use('/auth', [loginRouter, signupRouter]);
router.use(postRouter);

module.exports = router;