var express = require("express");
const bodyParser = require("body-parser");
var showdown = require("showdown");
converter = new showdown.Converter({
  ghCompatibleHeaderId: true,
  simpleLineBreaks: true,
  ghMentions: true
});
converter.setFlavor("github");
var fs = require("fs");
var app = express();
app.set("x-powered-by", false);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

styleData = fs.readFileSync("./style.css", "utf-8");
app.get("/md", async (req, res) => {
  try {
    const filename = req.query.filename;

    text = fs.readFileSync("./docs/" + filename, "utf-8");
    let pageTitle = filename;
    let preContent =
      `
    <html>
      <head>
        <title>` +
      pageTitle +
      `</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <div id='content'>
    `;

    let postContent =
      `
        </div>
        <style type='text/css'>` +
      styleData +
      `</style>
      </body>
    </html>`;

    html = preContent + converter.makeHtml(text) + postContent;

    res.send(html);
    console.log(filename);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
});

//nginx
// location users/(.+) {
//   try_files /$1;
// }

app.get("*", function(err, req, res, next) {
  res.status(err.status || 500);

  res.render("error", {
    viewHelperParams: viewHelperParams,
    message: "",
    error: err
  });
  console.log(err);
});

app.listen(4540);
console.log("app listen on port 4540");
