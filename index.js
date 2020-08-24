const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
var MongoClient = require("mongodb").MongoClient;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// mongodb+srv://seniorobd2:seniorobd2@seniorproject-f0o8e.mongodb.net/test?retryWrites=true&w=majority
// mongodb://127.0.0.1:27017

MongoClient.connect(
  "mongodb+srv://seniorobd2:seniorobd2@seniorproject-f0o8e.mongodb.net/test?retryWrites=true&w=majority",
  (error, client) => {
    if (error) throw error;
    var db = client.db("test");

    app.get("/", (req, res) => {
      res.send("Hello World, Carlytic Test");
    });

    app.post("/api/data", function (req, res) {
      // console.log(req);
      // console.log("555");
      // console.log(req.body);
      // res.send("ok")
      db.collection("userTest").insertOne(
        {
          // eml: req.body.eml,
          // v: req.body.v,
          // session: req.body.session,
          // id: req.body.id,
          // time: req.body.time,
          // kff1007: req.body.kff1007,

          fName: req.body.fName,
          lName: req.body.lName,
        },
        (err, result) => {
          if (err) return res.status(500).send(err.toString());
          console.log("ok Test");
          console.log(result.ops);

          axios
            .post("http://localhost:5000/fetchData", ...result.ops)
            .then((result) => {
              res.sendStatus(200);
              // console.log(req.body);
            });
        }
      );
    });

    app.get("/api/data", function (req, res, next) {
      console.log("object");
      console.log(req.body);

      db.collection("dataIOT2")
        .find()
        .toArray((err, result) => {
          if (err) return res.status(500).send(err.toString());

          res.status(200).send(result);
        });
    });
    //! : เป็นการเชื่อม port ว่าเราจะไป portไหน
    const PORT = process.env.PORT || 5555;
    app.listen(PORT, () => {
      console.log("server started : " + PORT);
    });
  }
);
