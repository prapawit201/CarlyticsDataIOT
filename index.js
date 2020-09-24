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
      res.send("Hello World, Carlytic Test MongoDB SuSu Babe");
    });

    app.post("/api/data", function (req, res) {
      // console.log(req.body);
      console.log(req.body);
      db.collection("test6").insertOne(
        {
          time: req.body.Time,
          eml: req.body.dataRecord.eml,
          kff1005: req.body.dataRecord.kff1005,
          kff1006: req.body.dataRecord.kff1006,
          kd: req.body.dataRecord.kd,
          kc: req.body.dataRecord.kc
        },
        (err, result) => {
          if (err) return res.status(500).send(err.toString());
          axios
            .post(
              "https://carlytic-data-detect.herokuapp.com/fetchData",
              ...result.ops
            )
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
