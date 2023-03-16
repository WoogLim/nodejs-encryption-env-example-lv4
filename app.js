require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.SERVER_PORT;

const apiRouter = require("./routes")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use("/api", [apiRouter]);

app.get("/", (req, res) => {
  res.send('SPA-POST-WITH-MYSQL');
})

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
})