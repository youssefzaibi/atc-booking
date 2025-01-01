const express = require("express");
const app = express();
const cors = require("cors");
app.timeout = 300000;
app.use(
  cors({
    origin: "*",
    credentials: true,
    exposedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
server = app.listen(3300, function () {
  console.log("Server is listening on port 3300");
});

app.use("/api/auth", require("./routes/route.login"));