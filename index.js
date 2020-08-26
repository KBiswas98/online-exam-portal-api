const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
var morgan = require("morgan");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
app.use(morgan("dev"));
app.use(express.json());

app.use(
     express.urlencoded({
          extended: false,
     })
);
app.use(
     cors({
          origin: "*",
          methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
          preflightContinue: false,
          optionsSuccessStatus: 204,
     })
);

const adminRoute = require("./src/routes/Admin_route");
const studentRoute = require("./src/routes/Student_route");
const questionRoute = require("./src/routes/Question_route");
const answerRoute = require("./src/routes/Answer_route");

app.use("/admin", adminRoute);
app.use("/student", studentRoute);
app.use("/question", questionRoute);
app.use("/answer", answerRoute);

app.get("/", (req, res, next) => {
     res.send("Node start");
});

mongoose
     .connect(process.env.MONGODB, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
     })
     .then(() => {
          console.log("connected to database");
     })
     .catch((err) => console.log(err));

app.listen(process.env.PORT, () =>
     console.log(`Server listening on port ${process.env.PORT}!`)
);
