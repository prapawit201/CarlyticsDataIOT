const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
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

    app.post("/api/data", function (req, res, next) {
      console.log(req.body);

      db.collection("dataIOT2").insertOne(
        {
          
          eml: String,
          v:String,
          session : String,
          id: String,
          time: String,
          kff1007: String
          // ArduinoNo: req.body.ArduinoNo,
          // Temperature: req.body.Temperature,
          // Humidity: req.body.Humidity,
        },
        (err, result) => {
          if (err) return res.status(500).send(err.toString());
          console.log("ok");
          res.sendStatus(200);
        }
      );
      
    });

    app.get("/api/data", function (req, res, next) {
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
