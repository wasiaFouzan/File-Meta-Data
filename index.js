var express = require("express");
var cors = require("cors");
require("dotenv").config();

var app = express();
var formidable = require("formidable");

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("get-file-size", function (req, res) {
  var reply = {};
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    if (err) throw err;

    reply = {
      size: files.uploadedFile.size,
    };

    res.json(reply);
    res.end();
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
