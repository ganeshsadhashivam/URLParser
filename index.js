const express = require("express");
const cors = require("cors");

//connect to mongodb
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//connect to db
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  //useUnifiedTopology: true,
  maxPoolSize: 100,

  // waitQueueTimeoutMS: 2500,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDb database connection established successfully ");
});

const http = require("http");
const fs = require("fs");
const url = require("url");

// const address =
//   "http://localhost:8080/index.php?type=page&action=update&id=5221";

const reqUrl =
  "https://www.google.com/twitter?type=page&action=search&id=WhenTheyNeedYou";

//server
const server = http.createServer((request, response) => {
  //   fs.readFile("index.html", (err, data) => {
  //     if (err) throw err;

  // response.writeHead(200, { "Content-Type": "text/html" });
  // response.write(data);

  // const queryData = url.parse(request.url, true).query;
  // const msg = queryData.name + " is " + queryData.age + " years old";

  // response.write(msg);

  //const urlObject = url.parse(reqUrl, true);

  const urlObject = url.parse(request.url, true);

  const fileName = "./frontend" + urlObject.pathname;

  fs.readFile(fileName, function (error, data) {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/html" });
      return response.end("404 Not Found");
    }

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);

    response.end();
  });
});
// });

//listen to server
// server.listen(3000, () => {
//   console.log("Server is running...");
// });

//server to use our files

//require the files

const URLRouter = require("./routes/urlparser");

//use the files

//when someone goes api/v1/products router it will use this
app.use("/api/v1/URL", URLRouter);

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});

//Export the Express API
module.exports = app;
